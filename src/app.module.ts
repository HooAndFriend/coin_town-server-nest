import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config/dist/config.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
