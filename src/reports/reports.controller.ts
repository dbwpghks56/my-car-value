import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/request/create-report.dto';
import { Report } from './domain/report.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { ReportResponseDto } from './dto/response/response.report';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
@Serialize(ReportResponseDto)
export class ReportsController {
    constructor(
        private readonly reportService: ReportsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(
        @Body() body: CreateReportDto,
        @CurrentUser() user: User
    ): Promise<Report> {
        return this.reportService.create(body, user);
    }

    @Get()
    findAllReports(): Promise<Report[]> {
        return this.reportService.findAllReports();
    }

}
