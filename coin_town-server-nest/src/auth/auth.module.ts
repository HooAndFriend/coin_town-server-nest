import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './application/auth.service'
import { UserRepository } from './infrastructure/user.repository'
import { JwtStrategy } from './passport/passport.jwt.strategy'
import { LocalStrategy } from './passport/passport.local.strategy'
import { AuthController } from './ui/auth.controller'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRESIN'),
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
