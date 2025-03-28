import {IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";

export default class EditProductDto {
    @IsNotEmpty()
    @IsString()
    id: string

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