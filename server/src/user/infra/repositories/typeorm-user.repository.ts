import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { UserOrmEntity } from '../entities/user.entity';
import { toDomain, toOrmEntity } from '../mappers/user.mapper';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TypeormUserRepository extends UserRepository {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  // domain user를 orm entity로 변환하여 저장
  async save(queryRunner: QueryRunner, user: User): Promise<User> {
    const newUser = await queryRunner.manager.save(
      UserOrmEntity,
      toOrmEntity(user),
    );
    return toDomain(newUser);
  }

  // 이름 변경
  async updateName(
    queryRunner: QueryRunner,
    id: number,
    name: string,
  ): Promise<boolean> {
    const exist = await this.dataSource.manager.findOneBy(UserOrmEntity, {
      id,
    });
    if (!exist) throw new BadRequestException('잘못된 접근 입니다.');
    await queryRunner.manager.update(UserOrmEntity, id, { name });
    return true;
  }

  // 이메일로 유저 찾기
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.dataSource.manager.findOne(UserOrmEntity, {
        where: { email },
      });
      return user ? toDomain(user) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 아이디로 유저 찾기
  async findById(userId: number): Promise<User | null> {
    try {
      const user = await this.dataSource.manager.findOne(UserOrmEntity, {
        where: {
          id: userId,
        },
      });
      return user ? toDomain(user) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
