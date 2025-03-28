import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as moment from "moment-timezone";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    origin: string;

    @Prop({ required: true })
    brand: string;

    @Prop({ required: true, default: () => moment.utc().toDate() })
    created_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
