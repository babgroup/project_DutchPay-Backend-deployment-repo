import { User } from 'src/user/domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.entity';

export const toOrmEntity = (user: User): UserOrmEntity => {
  const orm = new UserOrmEntity();
  orm.email = user.email;
  orm.name = user.name;
  orm.studentNumber = user.studentNumber;
  orm.totalDiscount = user.totalDiscount;
  if (user.id) orm.id = user.id;
  return orm;
};
export const toDomain = (userOrm: UserOrmEntity): User => {
  const domain = new User(
    userOrm.name,
    userOrm.email,
    userOrm.studentNumber,
    userOrm.totalDiscount,
    userOrm.id,
  );
  return domain;
};
