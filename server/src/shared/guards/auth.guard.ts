import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// 로그인 유저를 확인
@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  // 전략 로직 수행 'jwt'라는 텍스트로 jwt.strategy.ts 파일을 찾는다.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
