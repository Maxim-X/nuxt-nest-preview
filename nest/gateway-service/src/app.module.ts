import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceApiModule } from './_integrations/auth-service-api/auth-service-api.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthServiceApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
