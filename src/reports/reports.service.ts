import { Injectable } from '@nestjs/common';
import { Report } from './domain/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/request/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>
    ) {}

    create(
        createReport: CreateReportDto
    ): Promise<Report> {
        const report = this.reportRepository.create(createReport);

        return this.reportRepository.save(report);
    }

    findAllReports():Promise<Report[]> {
        return this.reportRepository.find();
    }
}
