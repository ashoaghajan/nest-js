import { data, Report, ReportType } from "../data";
import { Injectable } from '@nestjs/common'; 
import { v4 as uuid } from 'uuid';
import { createReportDto, ReportResponseDto, updateReportDto } from "../dtos/report.dto";


@Injectable()
export class ReportService{

  getAllReports(type: string): ReportResponseDto[]{
    return data.report.filter(report => report.type === type).map(item => (
      new ReportResponseDto(item)
    ));
  } 

  getReportById(type: string, id: string): ReportResponseDto{
    const report =  data.report.find(report => report.type === type && report.id === id);
    return new ReportResponseDto(report);
  }

  createReport(type: string, { source, amount }: createReportDto): ReportResponseDto{
    const newReport: Report = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type as ReportType
    }
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: string, id: string, body: updateReportDto): ReportResponseDto{
    const index = data.report.findIndex(report => report.type === type && report.id === id);
    data.report[index] = {
      ...data.report[index],
      ...body,
      updated_at: new Date()
    }
    return new ReportResponseDto(data.report[index]);
  }

  deleteReport(type: string, id: string){
    const index = data.report.findIndex(report => report.type === type && report.id === id);
    if(index === -1){
      return 'no report found';
    }
    return data.report.splice(index, 1)[0];
  }
}