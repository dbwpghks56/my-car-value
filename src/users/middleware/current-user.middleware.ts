import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../domain/user.entity";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async use(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const {userId} = req.session || {};

        if(userId) {
            const user:User = await this.usersService.findById(userId);
            
            // @ts-ignore
            req.currentUser = user;
        }

        next();
    }
}