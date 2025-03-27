import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export default class AuthLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}