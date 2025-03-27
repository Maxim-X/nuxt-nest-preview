import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceApiModule } from './_integrations/auth-service-api/auth-service-api.module';
import {ConfigModule} from "@nestjs/config";
import {AuthMiddleware} from "./_middlewares/auth.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthServiceApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .exclude(
            { path: '/auth/signup', method: RequestMethod.POST },
            { path: '/auth/login', method: RequestMethod.POST },
        )
        .forRoutes(AppController);
  }
}
