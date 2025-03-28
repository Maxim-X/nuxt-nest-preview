import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {SignupDto} from "./dto/signup.dto";
import {SignupResponseInterface} from "./interfaces/signup-response.interface";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {LoginDto} from "./dto/login.dto";
import {LoginResponseInterface} from "./interfaces/login-response.interface";
import {InitDto} from "./dto/init.dto";

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/signup')
  private async signup(@Body() signupDto: SignupDto): Promise<AppHttpResponse<SignupResponseInterface>> {
    return await this.appService.signup(signupDto);
  }

  @Post('/auth/login')
  private async login(@Body() loginDto: LoginDto): Promise<AppHttpResponse<LoginResponseInterface>> {
    return await this.appService.login(loginDto);
  }

  @Get('/auth/init')
  private async init(@Query() initDto: InitDto) {
    return await this.appService.init(initDto);
  }
}
