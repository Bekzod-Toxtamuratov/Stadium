import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { Bot } from './models/bot.models';
import { BOT_NAME } from '../add.constants';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepo.findByPk(userId);
    if (!user) {
      await this.botRepo.create({
        user_id: userId,
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
      });
      await ctx.reply(`Iltimos, <b>Telefon raqamingizni yuboring</b>`, {
        parse_mode: 'HTML',
        ...Markup.keyboard([
          [Markup.button.contactRequest('Telefon raqamini yuborish')],
        ])
          .resize()
          .oneTime(),
      });
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos, <b>Telefon raqamingizni yuboring</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .resize()
            .oneTime(),
        },
      );
    } else {
      await ctx.reply(
        `Bu bot orqali stadium dasturi bilan muloqot ornatiladi!`,
        {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        },
      );
    }
  }

  async onContact(ctx: Context) {
    if ('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botRepo.findByPk(userId);
      if (!user) {
        await ctx.reply(`Iltimos, "/start" tugmasini bosing`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .resize()
            .oneTime(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply(`Iltimos, o'zingizni raqamingizni yuboring!`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .resize()
            .oneTime(),
        });
      } else {
        await this.botRepo.update(
          {
            phone_number: ctx.message.contact.phone_number,
            status: true,
          },
          { where: { user_id: userId } },
        );
        await ctx.reply(`Tabriklayman, ro'yxatdan o'tdingiz!`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    try {
      console.log('ctx ', ctx.from);
      const userId = ctx.from.id;
      const user = await this.botRepo.findByPk(userId);
      console.log('user ', user);
      if (!user) {
        await ctx.reply(
          `Siz avval ro'yhatdan otmagansiz, "/start" tugmasini bosing`,
          {
            parse_mode: 'HTML',
            ...Markup.keyboard([['/start']])
              .resize()
              .oneTime(),
          },
        );
      } else if (user.status) {
        await this.botRepo.update(
          {
            status: false,
            phone_number: null,
          },
          { where: { user_id: userId } },
        );
        await ctx.reply(
          `Siz Botdan chiqdingiz qayta foydalanish uchun "/start" tugmasini bosing`,
          {
            parse_mode: 'HTML',
            ...Markup.keyboard([['/start']])
              .resize()
              .oneTime(),
          },
        );
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // sendOpt bu yerda yoziladi;
  async sendOtp(phoneNumber: string, OTP: string): Promise<boolean> {
    const user = await this.botRepo.findOne({
      where: { phone_number: phoneNumber },
    });
    if (!user || !user.status) {
      return false;
    }
    await this.bot.telegram.sendChatAction(user.user_id, 'typing');
    await this.bot.telegram.sendMessage(
      user.user_id,
      'verify code' + OTP,
    );

    return true;
  }
}
