import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { UserOrmEntity } from '../entities/user.entity';
import { toDomain, toOrmEntity } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

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

  // 객체 업데이트
  async update(queryRunner: QueryRunner, user: User): Promise<boolean> {
    const exist = await this.dataSource.manager.findOneBy(UserOrmEntity, {
      id: user.id,
    });
    if (!exist) return false;
    await queryRunner.manager.update(
      UserOrmEntity,
      { id: user.id },
      toOrmEntity(user),
    );
    return true;
  }

  // 유저 찾기
  async findBy<K extends keyof UserOrmEntity>(
    col: K,
    data: UserOrmEntity[K],
  ): Promise<User | null> {
    const user = await this.dataSource.manager.findOne(UserOrmEntity, {
      where: { [col]: data },
    });
    return user ? toDomain(user) : null;
  }
}
