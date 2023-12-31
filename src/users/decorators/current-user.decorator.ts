import {
    ExecutionContext,
    createParamDecorator
} from '@nestjs/common'
import { User } from '../domain/user.entity';


export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        return request.currentUser;
    }
)