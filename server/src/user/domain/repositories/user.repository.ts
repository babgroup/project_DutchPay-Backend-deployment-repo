import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(queryRunner, user: User): Promise<User>;
  abstract findBy(col: string, data: any): Promise<User | null>;
  abstract update(queryRunner, user: User): Promise<boolean>;
}
