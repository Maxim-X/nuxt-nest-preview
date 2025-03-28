import {Body, Controller, Get, Post, Query, Req} from '@nestjs/common';
import { AppService } from './app.service';
import AuthSignupDto from "./dto/auth/auth-signup.dto";
import {AuthSignupResponseInterface} from "./interfaces/auth/auth-signup-response.interface";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {ResponseInterface} from "./_integrations/auth-service-api/interfaces/response.interface";
import AuthLoginDto from "./dto/auth/auth-login.dto";
import {AuthLoginResponseInterface} from "./interfaces/auth/auth-login-response.interface";
import AuthInitDto from "./dto/auth/auth-init.dto";
import {AuthInitResponseInterface} from "./interfaces/auth/auth-init-response.interface";
import ProductSyncMockupDto from "./dto/product/product-sync-mockup.dto";
import {ProductSyncMockupResponseInterface} from "./interfaces/product/product-sync-mockup-response.interface";
import ProductGetProductsDto from "./dto/product/product-get-products.dto";
import {ProductGetProductsResponseInterface} from "./interfaces/product/product-get-products-response.interface";
import ProductGetProductDto from "./dto/product/product-get-product.dto";
import {ProductGetProductResponseInterface} from "./interfaces/product/product-get-product-response.interface";
import ProductEditProductDto from "./dto/product/product-edit-product.dto";
import {ProductEditProductResponseInterface} from "./interfaces/product/product-edit-product-response.interface";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
  ) {}

  @Post('/auth/signup')
  public async authSignup(@Body() authSignupDto: AuthSignupDto): Promise<AppHttpResponse<AuthSignupResponseInterface>> {
    return await this.appService.authSignup(authSignupDto);
  }

  @Post('/auth/login')
  public async authLogin(@Body() authLoginDto: AuthLoginDto): Promise<AppHttpResponse<AuthLoginResponseInterface>> {
    return await this.appService.authLogin(authLoginDto);
  }

  @Get('/auth/init')
  public async authInit(@Req() request: Request): Promise<AppHttpResponse<AuthInitResponseInterface>>{
    return new AppHttpResponse('Ok', 'Ok', {user: JSON.parse(request['user'])});
  }

  @Post('/product/sync-mockup')
  public async productSyncMockup(@Body() productSyncMockupDto: ProductSyncMockupDto): Promise<AppHttpResponse<ProductSyncMockupResponseInterface>> {
    return await this.appService.productSyncMockup(productSyncMockupDto);
  }

  @Get('/product/get-products')
  public async productGetProducts(@Query() productGetProductsDto: ProductGetProductsDto): Promise<AppHttpResponse<ProductGetProductsResponseInterface>> {
    return await this.appService.productGetProducts(productGetProductsDto);
  }

  @Get('/product/get-product')
  public async productGetProduct(@Query() productGetProductDto: ProductGetProductDto): Promise<AppHttpResponse<ProductGetProductResponseInterface>> {
    return await this.appService.productGetProduct(productGetProductDto);
  }

  @Post('/product/edit-product')
  public async productEditProduct(@Body() productEditProductDto: ProductEditProductDto): Promise<AppHttpResponse<ProductEditProductResponseInterface>> {
    return await this.appService.productEditProduct(productEditProductDto);
  }
}
