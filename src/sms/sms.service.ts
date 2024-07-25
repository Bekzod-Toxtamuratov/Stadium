import { Injectable } from '@nestjs/common';
import axios from 'axios';

const FormData = require('form-data');

@Injectable()
export class SmsService {
  async sendSms(phone: string, otp: string) {
    const formdata = new FormData();
    formdata.append('mobile_phone', phone);
    formdata.append('message', `Your verification code is: 1234`);
    formdata.append('from', '4546');

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: formdata,
    };
    try {
      const resp = await axios(config);
      return resp;
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }
}
