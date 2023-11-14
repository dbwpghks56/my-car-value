import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';
import { plainToClass, plainToInstance } from "class-transformer";
import { UserResponseDto } from "src/users/dto/response/user.response";
import { BasicResponse } from "src/common/dto/response/response.dto";

/**
 * 
 */
interface ClassConstructor {
    new (...args: []): {}
}

/**
 * 
 * @param dto 
 * @returns 
 */
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * 
 */
export class SerializeInterceptor implements NestInterceptor {
    constructor(private readonly dto: any) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        )
    }

}





