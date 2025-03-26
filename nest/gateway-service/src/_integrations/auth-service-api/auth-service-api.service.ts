import { Injectable } from '@nestjs/common';
import {RequestDto} from "./dto/request.dto";
import {HttpService} from "@nestjs/axios";
import { ConfigService } from '@nestjs/config';
import {AppHttpException} from "../../_shared/utils/AppHttpException";
import {SignupResponse} from "./dto/signup.dto";
import {ResponseInterfaces} from "./interfaces/response.interfaces";
import {SignupInterfaces} from "./interfaces/signup.interfaces";

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

    public async signup(signupResponse: SignupResponse): Promise<SignupInterfaces> {
        const response: ResponseInterfaces<SignupInterfaces> | AppHttpException = await this.request<SignupInterfaces>({
            method: 'POST',
            url: '/api/auth/signup',
            data: signupResponse,
        });

        return response.data;
    }

    public async request<T>(requestDto: RequestDto): Promise<ResponseInterfaces<T>>{
        if (this.baseUrlService === null) {
            throw new AppHttpException('Отсутствует хост сервиса авторизации.', 'Возникла техническая неполадка. Пожалуйста, повторите попытку. Если ошибка повторится — свяжитесь с нашей службой поддержки!');
        }

        try {
            const response: ResponseInterfaces<T> = await this.httpService.axiosRef.request({
                baseURL: this.baseUrlService,
                method: requestDto.method,
                url: requestDto.url,
                params: requestDto.params,
                data: requestDto.data,
                timeout: 30000,
            });

            return response;
        }catch (e) {
            console.error({exception: {name: e.name, message: e.message, stack: e.stack}});
            throw new AppHttpException(
                e.message,
                'Возникла техническая неполадка. Пожалуйста, повторите попытку. Если ошибка повторится — свяжитесь с нашей службой поддержки!',
                {exception: {name: e.name, message: e.message, stack: e.stack}}
            );
        }
    }
}
