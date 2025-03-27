import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class GenerateJwtTokenDto {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}