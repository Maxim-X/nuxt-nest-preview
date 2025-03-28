import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {Method} from "axios";

export class InitInterface {
    user: {
        _id: string,
        email: string,
    }
}