import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import AuthSignupDto from "./dto/auth/auth-signup.dto";
import {AuthSignupResponseInterface} from "./interfaces/auth/auth-signup-response.interface";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/signup')
  public async authSignup(@Body() authSignupDto: AuthSignupDto): Promise<AppHttpResponse<AuthSignupResponseInterface>> {
    return await this.appService.authSignup(authSignupDto);
  }
}
