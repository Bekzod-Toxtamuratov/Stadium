import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { LoginUserDto } from './dto/login_user.dto';
import { FindeUserDto } from './dto/find-user.dto';
import { PhoneUserDto } from './dto/phone-user.dto';

import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { Otp } from '../otp/model/otp.model';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { dates, decode, encode } from '../helpers/crypto';
import { Json } from 'sequelize/types/utils';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
    private readonly smsService: SmsService,
  ) {}
  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('This email is already registered');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password  lar bir birga most emas');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newUser);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();
    console.log('activation link ', activation_link);
    const updateUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newUser.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    // 76___________________________________dars**************
    try {
      await this.mailService.sendMail(updateUser[1][0]);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }
    const response = {
      message: 'user registered ',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is required');
    }
    const updatedUser = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updatedUser[1][0].is_active,
    };
    return response;
  }
  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('user not found');
    }
    if (!user.is_active) {
      throw new BadRequestException('user it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(user);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.userRepo.update(
      { hashed_refresh_token },
      {
        where: { id: user.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User logged in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }
  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('user not verifed');
    }
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: userData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'user logged out successfully',
      user_refresh_token: updateUser[1][0].hashed_refresh_token,
    };
    return response;
  }
  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (userId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilamgan ');
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(user);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.userRepo.update(
      { hashed_refresh_token },
      {
        where: { id: user.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User refreshed',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }
  // 77-dars bu yerda biz bilan shug'ullanadi;
  async findUser(findUserDto: FindeUserDto) {
    const where = {};
    if (findUserDto.full_name) {
      where['full_name'] = {
        [Op.like]: `%${findUserDto.full_name}%`,
      };
    }
    if (findUserDto.email) {
      where['email'] = {
        [Op.like]: `%${findUserDto.email}%`,
      };
    }
    if (findUserDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findUserDto.phone}%`,
      };
    }
    if (findUserDto.tg_link) {
      where['tg_link'] = {
        [Op.like]: `%${findUserDto.tg_link}%`,
      };
    }
    console.log(where);
    const users = await this.userRepo.findAll({ where });
    if (users.length == 0) {
      throw new BadRequestException('user not  found');
    }
    return users;
  }
  // **********************NewOTP bilan shug'ullanamiz siz bilan;

  async newOTP(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    console.log('phone_number ::: ', phone_number);
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log('otp ', otp);

    const isSend = await this.botService.sendOtp(phone_number, otp);

    if (!isSend) {
      throw new BadRequestException(`avval botdan ro'yhatdan o'ting`);
    }

    const resp = await this.smsService.sendSms(phone_number,otp);

    if (resp.status!==200)
    {
       throw new ServiceUnavailableException('OTP yuborishda xatolik');
    }

    const message =
      'Code has been sent to ***' + phone_number.slice(phone_number.length - 4);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({ where: { check: phone_number } });
    const newOtp = await this.otpRepo.create({
      id: v4(),
      otp,
      expiration_time,
      check: phone_number,
    });

    const details = {
      timestamp: now,
      check: phone_number,
      otp_id: newOtp.id,
    };

    console.log('details: ' + details);
    const encoded = await encode(JSON.stringify(details));
    console.log('encoded', encoded);
    return { status: 'succes', details: encoded, message };
  }
  // this method verifiOtp methos all the world
  async verifyOtp(veriFyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, check } = veriFyOtpDto;
    const currentDate = new Date();
    const decoded = await decode(verification_key);
    const details = JSON.parse(decoded);

    console.log('deteils', details);

    if (details.check != check) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }

    const resultOtp = await this.otpRepo.findOne({
      where: { id: details.otp_id },
    });

    console.log('resultOtp', resultOtp);

    if (resultOtp == null) {
      throw new BadRequestException('bunday otp yoq');
    }
    if (resultOtp.verified) {
      throw new BadRequestException('Bu OTP allaqachon tekshirilgan');
    }
    if (!dates.compare(resultOtp.expiration_time, currentDate)) {
      throw new BadRequestException('OTP vaqti tugagan');
    }
    if (otp !== resultOtp.otp) {
      throw new BadRequestException('OTP mos emas');
    }
    const user = await this.userRepo.update(
      {
        is_owner: true,
      },
      {
        where: { phone: check },
        returning: true,
      },
    );
    if (!user[1][0]) {
      throw new BadRequestException('Bunday foydalanuvchi yoq');
    }
    await this.otpRepo.update(
      { verified: true },
      { where: { id: details.otp_id } },
    );

    const response = {
      message: 'siz owner boldingiz ',
      user: user[1][0],
    };
    return response;
  }

  // ***********************CRUD BU YERDA *****************************************************8
  findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    const userData = await this.userRepo.findByPk(id);

    if (!userData) {
      throw new NotFoundException(`user type with ID ${id} not found`);
    }
    return userData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.userRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `user with ID ${id} was removed successfully.`;
      } else {
        return `user with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing user with ID ${id}: ${error.message}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [numberOfAffectedRows, [updatedUser]] = await this.userRepo.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return updatedUser;
  }
}
