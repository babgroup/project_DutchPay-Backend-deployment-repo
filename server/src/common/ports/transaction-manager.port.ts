import { QueryRunner } from 'typeorm';

// 트랜잭션의 추상클래스
export abstract class TransactionManager {
  abstract execute<T>(
    work: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T>;
}
