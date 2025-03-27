import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {SignOptions} from "jsonwebtoken";

export class GenerateJwtTokenDto {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    optionsJwt?: SignOptions;
}