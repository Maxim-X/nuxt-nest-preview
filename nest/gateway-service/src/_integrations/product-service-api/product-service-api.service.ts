import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {AppHttpResponse} from "../../_shared/utils/AppHttpResponse";
import SyncMockupDto from "./dto/sync-mockup.dto";
import {AppHttpException} from "../../_shared/utils/AppHttpException";
import {SyncMockupResponseInterfaces} from "./interfaces/sync-mockup-response.interfaces";
import {RequestDto} from "./dto/request.dto";
import GetProductsDto from "./dto/get-products.dto";
import {GetProductsResponseInterfaces} from "./interfaces/get-products-response.interfaces";
import GetProductDto from "./dto/get-product.dto";
import {GetProductResponseInterfaces} from "./interfaces/get-product-response.interfaces";

@Injectable()
export class ProductServiceApiService {
    protected baseUrlService: null | string = null;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrlService = configService.get<string>('PRODUCT_SERVICE_BASE_URL') ?? null;
    }

    public async syncMockup(syncMockupDto: SyncMockupDto): Promise<AppHttpResponse<SyncMockupResponseInterfaces>> {
        return await this.request<SyncMockupResponseInterfaces>({
            method: 'POST',
            url: '/api/sync-mockup',
            data: syncMockupDto,
        }) as AppHttpResponse<SyncMockupResponseInterfaces>;
    }

    public async getProducts(getProductsDto: GetProductsDto): Promise<AppHttpResponse<GetProductsResponseInterfaces>> {
        return await this.request<GetProductsResponseInterfaces>({
            method: 'GET',
            url: '/api/get-products',
            params: getProductsDto,
        }) as AppHttpResponse<GetProductsResponseInterfaces>;
    }

    public async getProduct(getProductDto: GetProductDto): Promise<AppHttpResponse<GetProductResponseInterfaces>> {
        return await this.request<GetProductResponseInterfaces>({
            method: 'GET',
            url: '/api/get-product',
            params: getProductDto,
        }) as AppHttpResponse<GetProductResponseInterfaces>;
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
