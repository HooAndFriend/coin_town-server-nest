import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../infrastructure/company.repository';

@Injectable()
export class CompanyService {
    constructor (
        private readonly CompanyRepository: CompanyRepository
    ) {}

    async saveCompany(name: string, imgPath: string) {
        try {
            const company = this.CompanyRepository.create({ name, imgPath });
            return await this.CompanyRepository.save(company);
        } catch(err) {
            console.log(err);
        }
    }
    
    async findAll() {
        try {
            return await this.CompanyRepository.find();
        } catch(err) {
            console.log(err);
        }
    }

    async findByIdx(idx: number) {
        try {
            return await this.CompanyRepository.findOne({
                where: {idx: idx}
            })
        } catch(err) {
            console.log(err);
        }
    }

    async update(idx: number, updateData) {
        try {
            return await this.CompanyRepository.update(idx, updateData);
        } catch(err) {
            console.log(err);
        }
    }

    async delete(idx: number) {
        try {
            return await this.CompanyRepository.delete(idx);
        } catch(err) {
            console.log(err);
        }
    }


}
