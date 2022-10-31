import { BaseTimeEntity } from 'src/common/entity/basetime.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity({ name: 'tbl_user' })
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
