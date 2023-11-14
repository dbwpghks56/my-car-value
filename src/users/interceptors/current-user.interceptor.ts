import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";
import { User } from "../domain/user.entity";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        private readonly userService:UsersService
    ){}

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if(userId) {
            const user:User = await this.userService.findById(userId);
            request.currentUser = user;
        }

        return next.handle();
    }

}