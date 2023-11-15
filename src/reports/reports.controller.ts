import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/request/create-report.dto';
import { Report } from './domain/report.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportService: ReportsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(
        @Body() body: CreateReportDto,
    ): Promise<Report> {
        return this.reportService.create(body);
    }
}
