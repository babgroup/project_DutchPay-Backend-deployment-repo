import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { googleUser } from '../types/google.user';
import { CreateGoogleUserUseCase } from 'src/auth/application/use-cases/create-user-google.use-case';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly googleUserCreate: CreateGoogleUserUseCase,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');
    if (!clientID || !clientSecret || !callbackURL)
      throw new Error('oauth관련 환경변수를 확인해 주십시오.');
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<googleUser> {
    try {
      // googleId로 찾고, 있으면 oauth로 받은 데이터를 반환
      const userAuth = await this.userRepository.findByEmail(
        profile.emails[0].value,
      );
      // user가 있다면 해당 유저의 정보를 반환
      if (userAuth)
        return {
          sub: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };
      // userAuth가 없다면 해당 googleId로 등록한 사용자가 없음 => 새로운 유저를 생성해야 함
      const { createDate, ...user } = await this.googleUserCreate.execute({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      console.log(createDate);
      const googleUser = { ...user, sub: profile.id };
      return googleUser;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
