import { Expose, Transform } from "class-transformer";
import { BasicResponse } from "src/common/dto/response/response.dto";
import { User } from "src/users/domain/user.entity";

export class ReportResponseDto extends BasicResponse {
    @Expose()
    id:number;

    @Expose()
    price: number;

    @Expose()
    year:number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;
    
    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    mileage: number;

    @Expose()
    @Transform(({obj}) => {
        console.log(obj);
        return obj.user.id;
    } )
    userId: number;

}