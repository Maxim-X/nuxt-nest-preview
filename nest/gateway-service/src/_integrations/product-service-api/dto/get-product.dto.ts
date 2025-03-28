import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export default class GetProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}