import { Injectable } from '@nestjs/common';
import {SignupResponseInterfaces} from "./interfaces/signup-response.interfaces";
import {SignupDto} from "./dto/signup.dto";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";

@Injectable()
export class AppService {
  public async signup(signupDto: SignupDto): Promise<AppHttpResponse<SignupResponseInterfaces>> {
    return new AppHttpResponse('Ok', 'Ok', {a: 1});
  }
}
