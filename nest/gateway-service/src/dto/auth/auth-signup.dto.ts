import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export default class AuthSignupDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}