import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from '../domain/company.entity';
import { LocalSaveDto } from '../dto/user.save.dto';
import { CompanyRepository } from '../infrastructure/company.repository';

@Injectable()
export class CompanyService {
    constructor (
        private readonly CompanyRepository: CompanyRepository
    ) {}

    async localSave(body: LocalSaveDto): Promise<Company> {
        try {
            const findCompany: Company = await this.CompanyRepository.findOne({
                where: { name : body.name },
            })
            if (findCompany) {
                throw new HttpException(
                    '이미 존재하는 회사입니다.',
                    HttpStatus.BAD_REQUEST,
                )
            }
            const saveCompany = this.CompanyRepository.create({
                name: body.name,
                imgPath: body.imgPath,
            })
            return await this.CompanyRepository.save(saveCompany)
        } catch(err) {
            console.log(err)
            throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
        }
    }
    
    async findAll() {
        try {
            return await this.CompanyRepository.find();
        } catch(err) {
            console.log(err);
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
        }
    }

    async getCompantBtIdx(idx: number) {
        try {
            const company = await this.CompanyRepository.findOne({ where: {idx} })
            if(!company) {
                throw new HttpException('회사를 찾을 수 없습니다.', HttpStatus.NOT_FOUND)
            }
            return company;
        } catch(err) {
            console.log(err);
            throw new HttpException('ERROR.', HttpStatus.BAD_REQUEST)
        }
    }
    
    async updateCompanyName(idx: number, updateData: LocalSaveDto) {
        try {
            const company = await this.CompanyRepository.findOne({ where: {idx} })
            if(!company) {
                throw new HttpException('회사를 찾을 수 없습니다.', HttpStatus.NOT_FOUND)
            }    
            return await this.CompanyRepository.update(idx, { name: updateData.name })
        } catch(err) {
            console.log(err);
            throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
        }
    }

    async updateCompanyImgPath(idx: number, updateData: LocalSaveDto) {
        try {
            const company = await this.CompanyRepository.findOne({ where: {idx} })
            if(!company) {
                throw new HttpException('회사를 찾을 수 없습니다.', HttpStatus.NOT_FOUND)
            }    
            return await this.CompanyRepository.update(idx, { imgPath: updateData.imgPath })
        } catch(err) {
            console.log(err);
            throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
        }
    }

    async updateCompanyAll(idx: number, updateData: LocalSaveDto) {
        try {
            const company = await this.CompanyRepository.findOne({ where: {idx} })
            if(!company) {
                throw new HttpException('회사를 찾을 수 없습니다.', HttpStatus.NOT_FOUND)
            }    
            return await this.CompanyRepository.update(
                idx, 
                { 
                    name: updateData.name,
                    imgPath: updateData.imgPath,
                  })
        } catch(err) {
            console.log(err);
            throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteCompany(idx: number) {
        try {
            const company = await this.CompanyRepository.findOne({ where: {idx} })
            if(!company) {
                throw new HttpException('회사를 찾을 수 없습니다.', HttpStatus.NOT_FOUND)
            }    
            return await this.CompanyRepository.delete(idx);
        } catch(err) {
            console.log(err);
            throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
        }
    }


}
