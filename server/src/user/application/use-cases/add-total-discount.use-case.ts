import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/common/ports/transaction-manager.port';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

@Injectable()
export class addTotalDiscount {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transaction: TransactionManager,
  ) {}
  async execute(id: number, money: number): Promise<boolean> {
    const updatedUser = await this.transaction.execute(async (queryRunner) => {
      const user = await this.userRepository.findBy('id', id);
      if (!user) {
        return false;
      }
      user.addDiscount(money);
      const isUpdated = await this.userRepository.update(queryRunner, user);
      if (!isUpdated) {
        return false;
      }
      return true;
    });
    return updatedUser;
  }
}
