import {IsEmail, IsJWT, IsNotEmpty, IsString} from "class-validator";

export class InitDto {
    @IsNotEmpty()
    @IsJWT()
    jwt: string;
}