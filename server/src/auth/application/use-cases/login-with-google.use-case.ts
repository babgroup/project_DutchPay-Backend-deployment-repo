import { Injectable } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

export interface LoginWithGoogleInput {
  email: string;
}

@Injectable()
export class LoginWithGoogleUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}
  async execute(
    input: LoginWithGoogleInput,
  ): Promise<{ userId: number; accessToken: string }> {
    // googleId로 유저 찾기
    const user = await this.userRepository.findBy('email', input.email);
    if (!user) throw new Error('연결된 계정을 찾을 수 없습니다.');

    // accessToken 발급
    const accessToken = await this.tokenService.generateAccessToken(user.id);
    return { userId: user.id, accessToken };
  }
}
