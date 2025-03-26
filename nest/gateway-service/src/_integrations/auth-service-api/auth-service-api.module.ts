import {Global, Module} from '@nestjs/common';
import { AuthServiceApiService } from './auth-service-api.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule
  ],
  providers: [AuthServiceApiService],
  exports: [AuthServiceApiService],
})
export class AuthServiceApiModule {}
