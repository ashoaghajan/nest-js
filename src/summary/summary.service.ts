import { Injectable } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {

    constructor(
        private readonly reportService: ReportService
    ){}

    calculateSummary(){
        const reports = [
            ...this.reportService.getAllReports(ReportType.EXPENSE), 
            ...this.reportService.getAllReports(ReportType.INCOME)
        ];
        const balance = reports.reduce((prev, current) => {
            return current.type === 'income' ? prev + current.amount : prev - current.amount
        }, 0);
        return balance;
    }
}
