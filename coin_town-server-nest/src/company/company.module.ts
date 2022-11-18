import { Module } from '@nestjs/common';
import { CompanyController } from './ui/company.controller';
import { CompanyService } from './application/company.service';
import { CompanyRepository } from './infrastructure/company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
