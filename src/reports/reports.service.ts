import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './domain/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/request/create-report.dto';
import { User } from 'src/users/domain/user.entity';
import { ApproveReportDto } from './dto/request/approve-report.dto';
import { GetEstimateDto } from './dto/request/get-estimate.dto';

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

    async approveReport(
        id: number,
        approveReport: ApproveReportDto
    ): Promise<Report> {
        const report = await this.reportRepository.findOne({where: {id: id}});
        if(!report) {
            throw new NotFoundException('없는 Report 인데?');
        }

        report.status = approveReport.approve;

        return this.reportRepository.save(report);
    }

    createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.reportRepository
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('status IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }
}
