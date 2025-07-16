import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/common/ports/transaction-manager.port';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

@Injectable()
export class ChangeUserName {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transaction: TransactionManager,
  ) {}
  async execute(id: number, name: string): Promise<boolean> {
    const updatedUser = await this.transaction.execute(async (queryRunner) => {
      const user = await this.userRepository.updateName(queryRunner, id, name);
      return user;
    });
    return updatedUser;
  }
}
