import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {SignupDto} from "./dto/signup.dto";
import {SignupResponseInterfaces} from "./interfaces/signup-response.interfaces";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {LoginDto} from "./dto/login.dto";
import {LoginResponseInterfaces} from "./interfaces/login-response.interfaces";
import {InitDto} from "./dto/init.dto";

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/signup')
  private async signup(@Body() signupDto: SignupDto): Promise<AppHttpResponse<SignupResponseInterfaces>> {
    return await this.appService.signup(signupDto);
  }

  @Post('/auth/login')
  private async login(@Body() loginDto: LoginDto): Promise<AppHttpResponse<LoginResponseInterfaces>> {
    return await this.appService.login(loginDto);
  }

  @Get('/auth/init')
  private async init(@Query() initDto: InitDto) {
    return await this.appService.init(initDto);
  }
}
