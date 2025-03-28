import {Product} from "../../_database/schemas/product.schema";
import {Document, Types} from "mongoose";

export class GetProductResponseInterface {
    product: (Document<unknown, {}, Product> & Product & {     _id: Types.ObjectId } & {     __v: number }) | null;
}