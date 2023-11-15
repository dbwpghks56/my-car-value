import { IsString } from "class-validator";
import { BasicResponse } from "src/common/dto/response/response.dto";


export class CreateReportDto extends BasicResponse {
    make: string;
    model: string;
    year: number;
    mileage: number;
    lng: number;
    lat: number;
    price: number;
}