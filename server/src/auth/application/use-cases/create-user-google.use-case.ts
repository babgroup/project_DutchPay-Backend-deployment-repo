import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { TransactionManager } from 'src/common/ports/transaction-manager.port';

export interface CreateGoogleUserInput {
  name: string;
  email: string;
  googleId: string;
}

@Injectable()
export class CreateGoogleUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transaction: TransactionManager,
  ) {}

  async execute(input: CreateGoogleUserInput): Promise<User> {
    // 같은 email의 사용자가 존재하는지 확인
    const exists = await this.userRepository.findByEmail(input.email);
    if (exists) throw new BadRequestException('사용중인 이메일 입니다.');

    const user = await this.transaction.execute(async (queryRunner) => {
      // 객체 생성
      const user = User.create(input.name, input.email);
      const userInfo = await this.userRepository.save(queryRunner, user);
      return userInfo;
    });
    return user;
  }
}
