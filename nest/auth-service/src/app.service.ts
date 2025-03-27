import { Injectable } from '@nestjs/common';
import {SignupResponseInterfaces} from "./interfaces/signup-response.interfaces";
import {SignupDto} from "./dto/signup.dto";
import {AppHttpResponse} from "./_shared/utils/AppHttpResponse";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./_database/schemas/user.schema";
import {Document, Model, Types} from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {GenerateJwtTokenDto} from "./dto/generate-jwt-token.dto";
import {ConfigService} from "@nestjs/config";
import {AppHttpException} from "./_shared/utils/AppHttpException";
import {LoginDto} from "./dto/login.dto";
import {LoginResponseInterfaces} from "./interfaces/login-response.interfaces";

@Injectable()
export class AppService {
  constructor(
      @InjectModel(User.name) private readonly userModel: Model<User>,
      private readonly configService: ConfigService,
  ) {
  }

  public async signup(signupDto: SignupDto): Promise<AppHttpResponse<SignupResponseInterfaces>> {
    const checkUser  = await this.userModel.exists({
      email: signupDto.email
    });

    if (checkUser){
      return new AppHttpResponse(false, 'Пользователь с данным Email уже зарегистрирован.', 'Пользователь с данным Email уже зарегистрирован.', {});
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);

    const newUser = new this.userModel({
      email: signupDto.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const jwtToken: string = this.generateJwtToken({
      _id: user._id.toString(),
      email: user.email
    });

    return new AppHttpResponse('Ok', 'Ok', {jwt_token: jwtToken});
  }

  public async login(loginDto: LoginDto): Promise<AppHttpResponse<LoginResponseInterfaces>> {
    const user = await this.userModel.findOne({
      email: loginDto.email
    });

    if (user === null){
      return new AppHttpResponse('Неправильные данные для входа: неверный адрес электронной почты или пароль.', 'Неправильные данные для входа: неверный адрес электронной почты или пароль.');
    }

    const verified: boolean = await bcrypt.compare(loginDto.password, user.password);
    if (verified === false){
      throw new AppHttpException('Неправильные данные для входа: неверный адрес электронной почты или пароль.', 'Неправильные данные для входа: неверный адрес электронной почты или пароль.');
    }

    const jwtToken: string = this.generateJwtToken({
      _id: user._id.toString(),
      email: user.email
    });
    return new AppHttpResponse('Ok', 'Ok', {jwt_token: jwtToken});
  }

  public generateJwtToken(generateJwtTokenDto: GenerateJwtTokenDto): string {
    const jwtSecret: string | undefined = this.configService.get<string>('JWT_SECRET');

    if (jwtSecret === undefined){
      throw new AppHttpException('Отсутствует JWT SECRET.', 'Возникла техническая неполадка. Пожалуйста, повторите попытку. Если ошибка повторится — свяжитесь с нашей службой поддержки!')
    }

    return jwt.sign({
      _id: generateJwtTokenDto._id,
      email: generateJwtTokenDto.email,
    }, jwtSecret);
  }
}
