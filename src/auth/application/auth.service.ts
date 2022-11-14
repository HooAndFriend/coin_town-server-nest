import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { LocalSaveDto } from '../dto/user.save.dto'
import { UserRepository } from '../infrastructure/user.repository'
import * as bcrypt from 'bcryptjs'
import { User } from '../domain/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  /** Local User 저장 */
  async localSave(body: LocalSaveDto): Promise<User> {
    try {
      const findUser: User = await this.userRepository.findOne({
        where: { email: body.email },
      })
      if (findUser)
        throw new HttpException(
          '이미 존재하는 Email 입니다.',
          HttpStatus.BAD_REQUEST,
        )
      const hash = await bcrypt.hash(body.password, 5)
      const saveUser = this.userRepository.create({
        email: body.email,
        password: hash,
        name: body.name,
      })
      return await this.userRepository.save(saveUser)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /** Local User Login */
  async localLogin(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } })
      await this.compareBcrypt(password, user.password)
      return user
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Idx를 이용한 User 조회 */
  async getUserByIdx(idx: number) {
    try {
      return this.userRepository.findOne({ where: { idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND)
    }
  }

  async compareBcrypt(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)
    console.log(result)
    if (!result)
      throw new HttpException('Password ERROR', HttpStatus.BAD_REQUEST)
  }
}
