import { Expose } from "class-transformer";
import { BasicResponse } from "src/common/dto/response/response.dto";

export class UserResponseDto extends BasicResponse {
    @Expose()
    id: number;

    @Expose()
    email: string;
}