import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./_database/schemas/user.schema";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //, load: [dbConfiguration]
    MongooseModule.forRoot('mongodb://localhost/auth_service'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
