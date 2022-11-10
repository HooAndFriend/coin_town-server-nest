import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from '../application/company.service';

@Controller('company')
export class CompanyController {
    constructor (
        private readonly CompanyService: CompanyService
    ) {}

    @Post()
    async saveCompany(@Body() body) {
        return await this.CompanyService.saveCompany(body.name, body.imgPath);
    }

    @Get()
    async findAll() {
        return await this.CompanyService.findAll();
    }

    @Get('/:id')
    async findByIdx(@Param('id') idx: number) {
        return await this.CompanyService.findByIdx(idx);
    }

    @Patch('/:id')
    async update(@Param('id') idx: number, @Body() body) {
        return await this.CompanyService.update(idx, body);
    }

    @Delete('/:id')
    async delete(@Param('id') idx: number) {
        return await this.CompanyService.delete(idx);
    }   

}
