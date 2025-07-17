import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoginWithGoogleUseCase } from 'src/auth/application/use-cases/login-with-google.use-case';
import { GoogleAuthGuard } from 'src/shared/guards/google.guard';
import { googleUser } from 'src/auth/types/google.user';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { CreateGoogleUserUseCase } from 'src/auth/application/use-cases/create-user-google.use-case';

@Controller('auth')
export class AuthController {
  LOGIN_REDIRECT_URL: string;
  constructor(
    private readonly loginGoogle: LoginWithGoogleUseCase,
    private readonly createUser: CreateGoogleUserUseCase,
    private readonly configService: ConfigService,
  ) {
    this.LOGIN_REDIRECT_URL = this.configService.get('LOGIN_REDIRECT_URL')!;
  }
  //구글 로그인
  @ApiOperation({
    summary: '구글 로그인 페이지로 이동, 구글로 회원가입 하는 경우도 사용',
    description:
      '이미 구글 연동이나 구글 회원가입을 한 사람이 로그인할때도 사용하고, 구글로 회원가입하고 싶은 사람도 사용하는 엔드포인트',
  })
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    return 'googleLogin';
  }
  // 구글 리다이렉트
  @ApiExcludeEndpoint()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as googleUser;
    if (user.newUser) {
      await this.createUser.execute({ name: user.name, email: user.email });
    }
    const { accessToken } = await this.loginGoogle.execute({
      email: user.email,
    });
    res.cookie('access_token', accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.redirect(`${this.LOGIN_REDIRECT_URL}`);
  }
}
