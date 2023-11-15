import { Injectable } from '@nestjs/common';
import { Report } from './domain/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/request/create-report.dto';
import { User } from 'src/users/domain/user.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>
    ) {}

    create(
        createReport: CreateReportDto,
        user: User
    ): Promise<Report> {
        const report = this.reportRepository.create({...createReport, user});

        return this.reportRepository.save(report);
    }

    findAllReports():Promise<Report[]> {
        return this.reportRepository.find();
    }
}
