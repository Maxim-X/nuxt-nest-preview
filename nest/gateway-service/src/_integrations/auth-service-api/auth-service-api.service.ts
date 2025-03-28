import { Injectable } from '@nestjs/common';
import {RequestDto} from "./dto/request.dto";
import {HttpService} from "@nestjs/axios";
import { ConfigService } from '@nestjs/config';
import {AppHttpException} from "../../_shared/utils/AppHttpException";
import {SignupDto} from "./dto/signup.dto";
import {ResponseInterface} from "./interfaces/response.interface";
import {SignupInterfaces} from "./interfaces/signup.interfaces";
import {AppHttpResponse} from "../../_shared/utils/AppHttpResponse";
import {LoginDto} from "./dto/login.dto";
import {LoginInterface} from "./interfaces/login.interface";
import {InitInterface} from "./interfaces/init.interface";
import InitDto from "./dto/init.dto";

@Injectable()
export class AuthServiceApiService {
    protected baseUrlService: null | string = null;
    // protected baseAuthKeyService = null;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrlService = configService.get<string>('AUTH_SERVICE_BASE_URL') ?? null;
    }

    public async signup(signupDto: SignupDto): Promise<AppHttpResponse<SignupInterfaces>> {
        return await this.request<SignupInterfaces>({
            method: 'POST',
            url: '/api/auth/signup',
            data: signupDto,
        }) as AppHttpResponse<SignupInterfaces>;
    }

    public async login(loginDto: LoginDto): Promise<AppHttpResponse<LoginInterface>> {
        return await this.request<LoginInterface>({
            method: 'POST',
            url: '/api/auth/login',
            data: loginDto,
        }) as AppHttpResponse<LoginInterface>;
    }

    public async init(initDto: InitDto): Promise<AppHttpResponse<InitInterface>> {
        return await this.request<InitInterface>({
            method: 'GET',
            url: '/api/auth/init',
            params: initDto,
        }) as AppHttpResponse<InitInterface>;
    }

    public async request<T>(requestDto: RequestDto): Promise<AppHttpResponse<T>>{
        if (this.baseUrlService === null) {
            throw new AppHttpException('Отсутствует хост сервиса авторизации.', 'Возникла техническая неполадка. Пожалуйста, повторите попытку. Если ошибка повторится — свяжитесь с нашей службой поддержки!');
        }

        try {
            const response: AppHttpResponse<T> = await this.httpService.axiosRef.request({
                baseURL: this.baseUrlService,
                method: requestDto.method,
                url: requestDto.url,
                params: requestDto.params,
                data: requestDto.data,
                timeout: 30000,
            });
            return response.data as AppHttpResponse<T>;
        }catch (e) {
            // Выводим ошибку в логи, а на клиент отправляем ответ без лишних данных
            console.error({exception: {name: e.name, message: e.message, stack: e.stack, response: e?.response?.data}});
            const defaultExceptionUserMessage = 'Возникла техническая неполадка. Пожалуйста, повторите попытку. Если ошибка повторится — свяжитесь с нашей службой поддержки!';
            throw new AppHttpException(
                e?.response?.data?.user_message ?? defaultExceptionUserMessage,
                e?.response?.data?.user_message ?? defaultExceptionUserMessage,
            );
        }
    }
}
