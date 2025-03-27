import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {SignupDto} from "./dto/signup.dto";
import {SignupResponseInterfaces} from "./interfaces/signup-response.interfaces";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {LoginDto} from "./dto/login.dto";
import {LoginResponseInterfaces} from "./interfaces/login-response.interfaces";

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
}
