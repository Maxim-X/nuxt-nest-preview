import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {Method} from "axios";

export class ResponseInterface<T> {
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  user_message?: string;

  @IsOptional()
  @IsObject()
  data: T;
}