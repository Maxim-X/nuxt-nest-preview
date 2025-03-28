import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {Method} from "axios";

export class LoginInterface {
  @IsString()
  jwt_token?: string;
}