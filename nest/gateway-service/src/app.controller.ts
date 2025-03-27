import {Body, Controller, Get, Post, Query, Req} from '@nestjs/common';
import { AppService } from './app.service';
import AuthSignupDto from "./dto/auth/auth-signup.dto";
import {AuthSignupResponseInterface} from "./interfaces/auth/auth-signup-response.interface";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {ResponseInterfaces} from "./_integrations/auth-service-api/interfaces/response.interfaces";
import AuthLoginDto from "./dto/auth/auth-login.dto";
import {AuthLoginResponseInterface} from "./interfaces/auth/auth-login-response.interface";
import AuthInitDto from "./dto/auth/auth-init.dto";
import {AuthInitResponseInterface} from "./interfaces/auth/auth-init-response.interface";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth/signup')
  public async authSignup(@Body() authSignupDto: AuthSignupDto): Promise<AppHttpResponse<AuthSignupResponseInterface>> {
    return await this.appService.authSignup(authSignupDto);
  }

  @Post('/auth/login')
  public async authLogin(@Body() authLoginDto: AuthLoginDto): Promise<AppHttpResponse<AuthLoginResponseInterface>> {
    return await this.appService.authLogin(authLoginDto);
  }

  @Get('/auth/init')
  public async authInit(@Req() request: Request): Promise<AppHttpResponse<AuthInitResponseInterface>>{
    return new AppHttpResponse('Ok', 'Ok', {user: JSON.parse(request['user'])});
  }
}
