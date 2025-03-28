import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import SyncMockupDto from "./dto/sync-mockup.dto";
import {AppHttpResponse} from "../_shared/utils/AppHttpResponse";
import {SyncMockupResponseInterface} from "./interfaces/sync-mockup-response.interface";
import GetProductsDto from "./dto/get-products.dto";
import {GetProductsResponseInterface} from "./interfaces/get-products-response.interface";
import GetProductDto from "./dto/get-product.dto";
import {GetProductResponseInterface} from "./interfaces/get-product-response.interface";

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sync-mockup')
  private async syncMockup(@Body() syncMockupDto: SyncMockupDto): Promise<AppHttpResponse<SyncMockupResponseInterface>> {
    return await this.appService.syncMockup(syncMockupDto);
  }

  @Get('/get-products')
  private async getProducts(@Query() getProductsDto: GetProductsDto): Promise<AppHttpResponse<GetProductsResponseInterface>> {
    return await this.appService.getProducts(getProductsDto);
  }

  @Get('/get-product')
  private async getProduct(@Query() getProductDto: GetProductDto): Promise<AppHttpResponse<GetProductResponseInterface>> {
    return await this.appService.getProduct(getProductDto);
  }
}
