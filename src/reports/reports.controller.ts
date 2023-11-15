import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/request/create-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportService: ReportsService
    ) {}

    @Post()
    createReport(
        @Body() body: CreateReportDto,
    ) {
        
    }
}
