import { Request } from 'express';

// @UseGuards(AuthGuard)를 사용해 인증되는 컨트롤러에서 사용할 수 있는 인터페이스 입니다.
export interface CustomRequest extends Request {
  user: {
    id: number;
    name: string;
    email: string;
  };
}
