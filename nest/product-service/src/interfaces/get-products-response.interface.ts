import {Product} from "../../_database/schemas/product.schema";

export class GetProductsResponseInterface {
    products: Product[];
    total: number;
}