import { Controller, Post, Get, Body, UseGuards, Patch, Param, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/request/create-report.dto';
import { Report } from './domain/report.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { ReportResponseDto } from './dto/response/response.report';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dto/request/approve-report.dto';
import { AdminGruard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/request/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportService: ReportsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportResponseDto)
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

    @Patch('/:id')
    @UseGuards(AdminGruard)
    approveRport(
        @Param('id') id: string,
        @Body() body: ApproveReportDto
    ): Promise<Report> {
        return this.reportService.approveReport(+id, body);
    }

    @Get('/estimate')
    getEstimate(
        @Query() query: GetEstimateDto
    ): number {
        return null;
    }

}
