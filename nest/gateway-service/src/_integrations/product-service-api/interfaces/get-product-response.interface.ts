import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {Method} from "axios";
import Product from "../../../_shared/interfaces/product.interface";

export class GetProductResponseInterface {
    product: Product;
}