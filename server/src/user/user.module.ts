import { Module } from '@nestjs/common';
import { UsersController } from './interface/controllers/user.controller';
import { ChangeUserName } from './application/use-cases/change-user-name-use-case';
import { GetUserInfo } from './application/use-cases/get-user-info.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { TypeormUserRepository } from './infra/repositories/typeorm-user.repository';
import { CommonModule } from 'src/common/common.module';
import { ChangeStudentNumber } from './application/use-cases/change-student-number.use-case';

@Module({
  imports: [CommonModule],
  exports: [GetUserInfo, UserRepository],
  controllers: [UsersController],
  providers: [
    ChangeUserName,
    ChangeStudentNumber,
    GetUserInfo,
    {
      useClass: TypeormUserRepository,
      provide: UserRepository,
    },
  ],
})
export class UserModule {}
