import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column({ default: 0 })
  studentNumber: number;
  @Column({ default: 0 })
  totalDiscount: number;
  @CreateDateColumn()
  createDate: Date;
}
