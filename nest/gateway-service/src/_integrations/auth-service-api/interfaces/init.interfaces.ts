import {IsBoolean, IsObject, IsOptional, IsString} from "class-validator";
import {Method} from "axios";

export class InitInterfaces {
    user: {
        _id: string,
        email: string,
    }
}