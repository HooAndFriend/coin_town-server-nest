import { BaseTimeEntity } from 'src/common/entity/basetime.entity'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_board' })
export class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: Number
}
