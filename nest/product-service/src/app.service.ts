import {Body, Injectable} from '@nestjs/common';
import SyncMockupDto from "./dto/sync-mockup.dto";
import {AppHttpResponse} from "../_shared/utils/AppHttpResponse";
import {SyncMockupResponseInterface} from "./interfaces/sync-mockup-response.interface";
import {PRODUCTS_MOCKUP_CONSTANT} from "../_shared/constants/products-mockup.constant";
import {Product} from "../_database/schemas/product.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, model, Document, Schema, HydratedDocument, Types, Query, ObjectId} from "mongoose";
import GetProductsDto from "./dto/get-products.dto";
import {GetProductsResponseInterface} from "./interfaces/get-products-response.interface";

@Injectable()
export class AppService {
  constructor(
      @InjectModel(Product.name) private productModel: Model<Product>
  ) {

  }

  public async syncMockup(syncMockupDto: SyncMockupDto): Promise<AppHttpResponse<SyncMockupResponseInterface>> {
    await this.productModel.deleteMany();
    const newProducts: Document<Product>[] = []; //: Schema<Product, Model<Product>>[]
    for (const i in PRODUCTS_MOCKUP_CONSTANT){
      const newProduct = new this.productModel({ //<Schema<Product>>
        name: PRODUCTS_MOCKUP_CONSTANT[i].name,
        type: PRODUCTS_MOCKUP_CONSTANT[i].type,
        price: PRODUCTS_MOCKUP_CONSTANT[i].price,
        origin: PRODUCTS_MOCKUP_CONSTANT[i].origin,
        brand: PRODUCTS_MOCKUP_CONSTANT[i].brand,
      }) as Document<Product>;

      newProducts.push(newProduct);
    }

    await this.productModel.bulkSave(newProducts);
    return new AppHttpResponse('Ok', 'Ok', {});
  }

  public async getProducts(getProductsDto: GetProductsDto): Promise<AppHttpResponse<GetProductsResponseInterface>> {
    const totalProducts = await this.productModel.countDocuments();
    let products: (Document<unknown, {}, Product> & Product & {_id: ObjectId; } & {__v: number; })[] = await this.productModel.find({}, {}, {
      skip: (getProductsDto.page - 1) * getProductsDto.take,
      limit: getProductsDto.take
    });

    return new AppHttpResponse('Ok', 'Ok', {products: products, total: totalProducts});
  }
}
