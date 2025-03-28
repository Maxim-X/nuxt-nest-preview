import {Product} from "../../_database/schemas/product.schema";
import {Document, ObjectId, Types} from "mongoose";

export class GetProductsResponseInterface {
    products: (Document<unknown, {}, Product> & Product & {_id: ObjectId; } & {__v: number; })[];
    total: number;
}