import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {AuthServiceApiService} from "../_integrations/auth-service-api/auth-service-api.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authServiceApiService: AuthServiceApiService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        // Получаем токен из заголовков запроса
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: 'No token provided' });
        }

        try {
            // Отправляем запрос в микросервис Auth для проверки токена
            const responseClientInfo = await this.authServiceApiService.init({jwt: token});
            if (responseClientInfo.status === false){
                return res.status(401).send({ message: 'No token provided' });
            }
            console.log(responseClientInfo.data.user)
            // if (!clientInfo.user) {
            //     return res.status(401).send({ message: 'Invalid token' });
            // }

            // Добавляем информацию о клиенте в запрос
            req['user'] = JSON.stringify(responseClientInfo.data.user);

            // Продолжаем обработку запроса
            next();
        } catch (error) {
            return res.status(500).send({ message: 'Error validating token', error });
        }
    }
}