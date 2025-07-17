import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

@Injectable()
export class GetUserInfo {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findBy('id', id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
