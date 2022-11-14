import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiResponse } from 'src/common/response/reponse.dto'
import { AuthService } from '../application/auth.service'
import { LocalSaveDto } from '../dto/user.save.dto'
import { LocalGuard } from '../passport/passport.local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local')
  @UseGuards(LocalGuard)
  async localLogin() {}

  @Post('/')
  async localSave(@Body() body: LocalSaveDto) {
    const response = await this.authService.localSave(body)
    return ApiResponse.of({
      data: response,
      message: 'Success Find Book',
      statusCode: 200,
    })
  }
}
