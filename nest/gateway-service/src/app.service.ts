import {Injectable, Query} from '@nestjs/common';
import {AuthSignupResponseInterface} from "./interfaces/auth/auth-signup-response.interface";
import AuthSignupDto from "./dto/auth/auth-signup.dto";
import {AuthServiceApiService} from "./_integrations/auth-service-api/auth-service-api.service";
import {raw} from "express";
import {AppHttpException} from "./_shared/utils/AppHttpException";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {SignupInterfaces} from "./_integrations/auth-service-api/interfaces/signup.interfaces";
import {ResponseInterfaces} from "./_integrations/auth-service-api/interfaces/response.interfaces";
import AuthLoginDto from "./dto/auth/auth-login.dto";
import {LoginInterfaces} from "./_integrations/auth-service-api/interfaces/login.interfaces";
import AuthInitDto from "./dto/auth/auth-init.dto";

@Injectable()
export class AppService {
  constructor(
    private readonly authServiceApiService: AuthServiceApiService,
  ) {}

  public async authSignup(authSignupDto: AuthSignupDto): Promise<AppHttpResponse<SignupInterfaces>> {
    return await this.authServiceApiService.signup(authSignupDto);
  }

  public async authLogin(authLoginDto: AuthLoginDto): Promise<AppHttpResponse<LoginInterfaces>> {
    return await this.authServiceApiService.login(authLoginDto);
  }
}
