import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {SignupDto} from "./dto/signup.dto";
import {SignupResponseInterfaces} from "./interfaces/signup-response.interfaces";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/signup')
  private async signup(@Body() signupDto: SignupDto): Promise<AppHttpResponse<SignupResponseInterfaces>> {
    return await this.appService.signup(signupDto);
  }
}
