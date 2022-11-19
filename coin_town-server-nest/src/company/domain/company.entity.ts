import { BaseTimeEntity } from "src/common/entity/basetime.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'tbl_company' })
export class Company extends BaseTimeEntity {

    @PrimaryGeneratedColumn()
    idx: number

    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 120 })
    imgPath: string
}