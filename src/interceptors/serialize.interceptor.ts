import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { UserResponseDto } from "src/users/dto/response/user.response";

interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private readonly dto: any) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        )
    }

}





