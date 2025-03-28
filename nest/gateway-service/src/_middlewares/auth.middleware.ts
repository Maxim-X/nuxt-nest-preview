import {HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {AuthServiceApiService} from "../_integrations/auth-service-api/auth-service-api.service";
import {AppHttpException} from "../_shared/utils/AppHttpException";
import {AppHttpResponse} from "../_shared/utils/AppHttpResponse";
import {InitInterfaces} from "../_integrations/auth-service-api/interfaces/init.interfaces";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authServiceApiService: AuthServiceApiService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const defaultErrorText = 'Возникла техническая неполадка. Пожалуйста, повторите попытку. Если ошибка повторится — свяжитесь с нашей службой поддержки!';

        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new AppHttpException('No token provided', defaultErrorText, HttpStatus.UNAUTHORIZED);
        }

        try {
            const responseClientInfo: AppHttpResponse<InitInterfaces> = await this.authServiceApiService.init({jwt: token});

            if (responseClientInfo.status === false){
                throw new AppHttpException('No token provided', defaultErrorText, HttpStatus.UNAUTHORIZED);
            }

            req['user'] = JSON.stringify(responseClientInfo.data.user);

            next();
        } catch (error) {
            throw new AppHttpException('Error validating token', defaultErrorText, HttpStatus.UNAUTHORIZED);
        }
    }
}