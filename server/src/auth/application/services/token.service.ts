// jwt 발급 담당
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

// 토큰 생성하기 위한 서비스
@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  // token 생성, 내부 정보: userId,name,email , 유효시간 5시간
  async generateAccessToken(
    userId: number,
    name: string,
    email: string,
  ): Promise<string> {
    const payload = { id: userId, name, email };
    const options = {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME') || '5h',
    };
    const token = await this.jwt.signAsync(payload, options);
    return token;
  }
}
