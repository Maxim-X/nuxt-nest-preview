import { Injectable } from '@nestjs/common';
import {AuthSignupResponseInterface} from "./interfaces/auth/auth-signup-response.interface";
import AuthSignupDto from "./dto/auth/auth-signup.dto";
import {AuthServiceApiService} from "./_integrations/auth-service-api/auth-service-api.service";
import {raw} from "express";
import {AppHttpException} from "./_shared/utils/AppHttpException";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";

@Injectable()
export class AppService {
  constructor(
    private readonly authServiceApiService: AuthServiceApiService,
  ) {}

  public async authSignup(authSignupDto: AuthSignupDto): Promise<AppHttpResponse<AuthSignupResponseInterface>> {
    const signup = await this.authServiceApiService.signup(authSignupDto);
    return new AppHttpResponse<AuthSignupResponseInterface>('Ok', 'Ok', signup);
  }
}
