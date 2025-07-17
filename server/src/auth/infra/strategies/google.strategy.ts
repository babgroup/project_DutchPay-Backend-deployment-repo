import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { googleUser } from '../../types/google.user';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
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
      const userAuth = await this.userRepository.findBy(
        'email',
        profile.emails[0].value,
      );
      // user가 있다면 해당 유저의 정보를 반환
      if (userAuth) {
        return {
          sub: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          newUser: false,
        };
      } else {
        return {
          sub: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          newUser: true,
        };
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
