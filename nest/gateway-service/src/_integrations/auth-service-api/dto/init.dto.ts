import {IsEmail, IsJWT, IsNotEmpty, IsString} from "class-validator";

export default class InitDto {
    @IsNotEmpty()
    @IsJWT()
    jwt: string;
}