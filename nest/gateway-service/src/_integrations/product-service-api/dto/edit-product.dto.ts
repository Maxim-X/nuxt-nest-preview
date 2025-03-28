import {IsNotEmpty, IsNumber, IsString, Min} from "class-validator";
import {Type} from "class-transformer";

export default class EditProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsString()
    brand: string;
}