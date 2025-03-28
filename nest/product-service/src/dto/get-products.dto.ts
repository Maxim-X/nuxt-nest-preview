import {IsNotEmpty, IsNumber} from "class-validator";
import {Type} from "class-transformer";

export default class GetProductsDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    take: number;
}