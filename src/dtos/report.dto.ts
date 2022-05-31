import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';

export class createReportDto{
    @IsNumber()
    @IsPositive()
    amount: number;
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class updateReportDto{
    @IsNumber()
    @IsPositive()
    @IsOptional()
    amount: number;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    source: string;
}

export class ReportResponseDto{
    id: string;
    source: string;
    amount: number;
    type: ReportType;

    @Exclude()
    created_at: Date;
    @Exclude()
    updated_at: Date;

    @Expose({ name: 'createdAt' })
    transformCreatedAt(){
        return this.created_at
    }

    constructor(parcial: Partial<ReportResponseDto>){
        Object.assign(this, parcial);
    }
}