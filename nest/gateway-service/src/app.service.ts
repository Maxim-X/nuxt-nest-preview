import {Body, Injectable, Query} from '@nestjs/common';
import {AuthSignupResponseInterface} from "./interfaces/auth/auth-signup-response.interface";
import AuthSignupDto from "./dto/auth/auth-signup.dto";
import {AuthServiceApiService} from "./_integrations/auth-service-api/auth-service-api.service";
import {raw} from "express";
import {AppHttpException} from "./_shared/utils/AppHttpException";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {SignupInterfaces} from "./_integrations/auth-service-api/interfaces/signup.interfaces";
import {ResponseInterfaces} from "./_integrations/auth-service-api/interfaces/response.interfaces";
import AuthLoginDto from "./dto/auth/auth-login.dto";
import {LoginInterfaces} from "./_integrations/auth-service-api/interfaces/login.interfaces";
import AuthInitDto from "./dto/auth/auth-init.dto";
import ProductSyncMockupDto from "./dto/product/product-sync-mockup.dto";
import {ProductServiceApiService} from "./_integrations/product-service-api/product-service-api.service";
import {AuthInitResponseInterface} from "./interfaces/auth/auth-init-response.interface";
import {ProductSyncMockupResponseInterface} from "./interfaces/product/product-sync-mockup-response.interface";
import ProductGetProductsDto from "./dto/product/product-get-products.dto";
import {ProductGetProductsResponseInterface} from "./interfaces/product/product-get-products-response.interface";
import ProductGetProductDto from "./dto/product/product-get-product.dto";
import {ProductGetProductResponseInterface} from "./interfaces/product/product-get-product-response.interface";

@Injectable()
export class AppService {
  constructor(
      private readonly authServiceApiService: AuthServiceApiService,
      private readonly productServiceApiService: ProductServiceApiService,
  ) {}

  public async authSignup(authSignupDto: AuthSignupDto): Promise<AppHttpResponse<SignupInterfaces>> {
    return await this.authServiceApiService.signup(authSignupDto);
  }

  public async authLogin(authLoginDto: AuthLoginDto): Promise<AppHttpResponse<LoginInterfaces>> {
    return await this.authServiceApiService.login(authLoginDto);
  }

  public async productSyncMockup(productSyncMockupDto: ProductSyncMockupDto): Promise<AppHttpResponse<ProductSyncMockupResponseInterface>> {
    return await this.productServiceApiService.syncMockup(productSyncMockupDto);
  }

  public async productGetProducts(productGetProductsDto: ProductGetProductsDto): Promise<AppHttpResponse<ProductGetProductsResponseInterface>> {
    return await this.productServiceApiService.getProducts(productGetProductsDto);
  }

  public async productGetProduct(productGetProductDto: ProductGetProductDto): Promise<AppHttpResponse<ProductGetProductResponseInterface>> {
    return await this.productServiceApiService.getProduct(productGetProductDto);
  }
}
