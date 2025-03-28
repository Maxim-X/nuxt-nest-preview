import {Global, Module} from '@nestjs/common';
import { ProductServiceApiService } from './product-service-api.service';
import {HttpModule} from "@nestjs/axios";

@Global()
@Module({
  imports: [
    HttpModule
  ],
  providers: [ProductServiceApiService],
  exports: [ProductServiceApiService],
})
export class ProductServiceApiModule {}
