import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { CategoriesModule } from './categories/categories.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { District } from './district/models/district.models';
import { Region } from './region/models/region.models';
import { Comfort } from './comfort/models/comfort.models';
import { Category } from './categories/models/category.models';
import { Admin } from './admin/models/admin.models';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { Stadiums } from './stadiums/models/stadium.models';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { ComfortStadium } from './comfort_stadium/models/comfort_stadium.models';
import { MediaModule } from './media/media.module';
import { Media } from './media/models/media.models';
import { CommentModule } from './comment/comment.module';
import { Comments } from './comment/models/comment.models';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { StadiumTime } from './stadium_times/models/stadium_time.models';
import { BotModule } from './bot/bot.module';
import { Telegraf } from 'telegraf';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './add.constants';
import { OrderModule } from './order/order.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { Bot } from './bot/models/bot.models';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/model/otp.model';
import { SmsModule } from './sms/sms.module';
import Mail from 'nodemailer/lib/mailer';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        District,
        Region,
        Comfort,
        Category,
        Admin,
        Stadiums,
        ComfortStadium,
        Media,
        Comments,
        StadiumTime,
        Bot,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    CategoriesModule,
    DistrictModule,
    RegionModule,
    AdminModule,
    MailModule,
    StadiumsModule,
    ComfortStadiumModule,
    MediaModule,
    CommentModule,
    StadiumTimesModule,
    BotModule,
    OrderModule,
    UserCardsModule,
    OtpModule,
    // Otp,
    MailModule,
    SmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
