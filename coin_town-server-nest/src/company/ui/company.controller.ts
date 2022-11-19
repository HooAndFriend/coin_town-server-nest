import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiResponse } from 'src/common/response/reponse.dto';
import { CompanyService } from '../application/company.service';
import { LocalSaveDto } from '../dto/user.save.dto';

@Controller('company')
export class CompanyController {
    constructor (
        private readonly CompanyService: CompanyService
    ) {}

    @Post('/')
    async localSave(@Body() body: LocalSaveDto) {
        const response = await this.CompanyService.localSave(body);
        return ApiResponse.of({
            data: response,
            message: 'Success Save Local Company',
            statusCode: 200,
        })
    }

    @Get('/')
    async findAll() {
        const response = await this.CompanyService.findAll();
        return ApiResponse.of({
            data: response,
            message: 'Success Find All Company',
            statusCode: 200,
        })
    }

    @Get('/:id')
    async getCompanyByIdx(@Param('id') idx: string) {
        const response = await this.CompanyService.getCompantBtIdx(Number(idx))
        return ApiResponse.of({
            data: response,
            message: 'Success Find Company',
            statusCode: 200,
        })
    }

    @Patch('/:id')
    async updateCompanyName(@Param('id') idx: string, @Body() body: LocalSaveDto) {
        const response = await this.CompanyService.updateCompanyName(Number(idx), body)
        return ApiResponse.of({
            data: response,
            message: 'Success Update CompanyName',
            statusCode: 200,
        })
    }

    @Put('/:id')
    async updateCompanyAll(@Param('id') idx: string, @Body() body: LocalSaveDto) {
        const response = await this.CompanyService.updateCompanyAll(Number(idx), body);
        return ApiResponse.of({
            data: response,
            message: 'Success Update CompanyAll',
            statusCode: 200,
        })
    }

    @Delete('/:id')
    async delete(@Param('id') idx: string) {
        const response = await this.CompanyService.deleteCompany(Number(idx))
        return ApiResponse.of({
            data: response,
            message: 'Success Delete Company',
            statusCode: 200,
        })
    }   

}
