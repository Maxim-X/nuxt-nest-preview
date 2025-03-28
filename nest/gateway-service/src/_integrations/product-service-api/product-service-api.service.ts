import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {AppHttpResponse} from "../../_shared/utils/AppHttpResponse";
import SyncMockupDto from "./dto/sync-mockup.dto";
import {AppHttpException} from "../../_shared/utils/AppHttpException";
import {SyncMockupResponseInterface} from "./interfaces/sync-mockup-response.interface";
import {RequestDto} from "./dto/request.dto";
import GetProductsDto from "./dto/get-products.dto";
import {GetProductsResponseInterface} from "./interfaces/get-products-response.interface";
import GetProductDto from "./dto/get-product.dto";
import {GetProductResponseInterface} from "./interfaces/get-product-response.interface";
import EditProductDto from "./dto/edit-product.dto";
import {EditProductResponseInterface} from "./interfaces/edit-product-response.interface";

@Injectable()
export class ProductServiceApiService {
    protected baseUrlService: null | string = null;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrlService = configService.get<string>('PRODUCT_SERVICE_BASE_URL') ?? null;
    }

    public async syncMockup(syncMockupDto: SyncMockupDto): Promise<AppHttpResponse<SyncMockupResponseInterface>> {
        return await this.request<SyncMockupResponseInterface>({
            method: 'POST',
            url: '/api/sync-mockup',
            data: syncMockupDto,
        }) as AppHttpResponse<SyncMockupResponseInterface>;
    }

    public async getProducts(getProductsDto: GetProductsDto): Promise<AppHttpResponse<GetProductsResponseInterface>> {
        return await this.request<GetProductsResponseInterface>({
            method: 'GET',
            url: '/api/get-products',
            params: getProductsDto,
        }) as AppHttpResponse<GetProductsResponseInterface>;
    }

    public async getProduct(getProductDto: GetProductDto): Promise<AppHttpResponse<GetProductResponseInterface>> {
        return await this.request<GetProductResponseInterface>({
            method: 'GET',
            url: '/api/get-product',
            params: getProductDto,
        }) as AppHttpResponse<GetProductResponseInterface>;
    }

    public async editProduct(editProductDto: EditProductDto): Promise<AppHttpResponse<EditProductResponseInterface>> {
        return await this.request<EditProductResponseInterface>({
            method: 'POST',
            url: '/api/edit-product',
            data: editProductDto,
        }) as AppHttpResponse<EditProductResponseInterface>;
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
