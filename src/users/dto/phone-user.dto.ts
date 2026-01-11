import { IsNotEmpty } from 'class-validator';

export class PhoneUserDto {
  // @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone_number: string;
}
