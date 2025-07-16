import { Module } from '@nestjs/common';
import { AuthController } from './interface/controller/auth.controller';
import { LoginWithGoogleUseCase } from './application/use-cases/login-with-google.use-case';
import { TokenService } from './application/services/token.service';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { GoogleStrategy } from './infra/strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { CreateGoogleUserUseCase } from './application/use-cases/create-user-google.use-case';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') || '5h',
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
    CommonModule,
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [
    // 전략
    JwtStrategy,

    // oauth 전략
    GoogleStrategy,

    // 로그인 use-case
    LoginWithGoogleUseCase,
    // 유저생성 use-case
    CreateGoogleUserUseCase,
    // 토큰발급 서비스
    TokenService,
  ],
})
export class AuthModule {}
