import { Expose } from "class-transformer";
import { BasicResponse } from "src/common/dto/response/response.dto";
import { User } from "src/users/domain/user.entity";

export class UserResponseDto extends BasicResponse {
    @Expose()
    id: number;

    @Expose()
    email: string;
}