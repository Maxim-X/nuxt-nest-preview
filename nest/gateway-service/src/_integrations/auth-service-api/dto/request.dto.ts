import {IsObject, IsOptional, IsString} from "class-validator";
import {Method} from "axios";

export class RequestDto {
  @IsString()
  url: string;

  @IsString()
  method: Method;

  @IsObject()
  @IsOptional()
  params?: object;

  @IsObject()
  @IsOptional()
  data?: object | string;
}