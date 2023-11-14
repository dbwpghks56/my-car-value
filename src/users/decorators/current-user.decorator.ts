import {
    ExecutionContext,
    createParamDecorator
} from '@nestjs/common'
import { User } from '../domain/user.entity';


export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext):User => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId);

        return request.currentUser;
    }
)