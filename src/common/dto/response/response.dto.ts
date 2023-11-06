import { Expose } from "class-transformer";

export class BasicResponse {
    @Expose()
    status: boolean;

    @Expose()
    createdTime: Date;
    
    @Expose()
    updatedTime: Date;

}