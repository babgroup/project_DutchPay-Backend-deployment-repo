import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('토큰 시크릿키를 확인해주세요');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          (request.cookies?.['access_token'] as string) ?? null,
      ]),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    });
  }

  validate(payload: { id: number; studentNumber: string; email: string }) {
    return {
      id: payload.id,
      studentNumber: payload.studentNumber,
      email: payload.email,
    };
  }
}
