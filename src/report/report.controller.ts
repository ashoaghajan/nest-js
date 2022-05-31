import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportType } from '../data';
import { createReportDto, ReportResponseDto, updateReportDto } from '../dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController{

  constructor(
    private readonly reportService: ReportService
  ){}

  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto[]{
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto{
    return this.reportService.getReportById(type, id);
  }

  @Post('')
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { source, amount }: createReportDto
  ): ReportResponseDto{
    return this.reportService.createReport(type, { source, amount });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: updateReportDto
  ): ReportResponseDto{
   return this.reportService.updateReport(type, id, body);
  }

  // @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string
  ){
    return this.reportService.deleteReport(type, id);
  }
}