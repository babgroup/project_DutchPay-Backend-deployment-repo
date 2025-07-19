import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FoodFareRoom } from 'src/restaurant/entities/food-fare-room.entity';
import { FoodJoinUser } from 'src/restaurant/entities/food-join-user.entity';

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
  //밑 두 줄 엔티티 연결하기위해 추가했는데 다른 사람 파일을 건드는 거니까 이 경우도 말을 하고 바꾸는게 좋은가?
  //아님 그냥 주석을 달면 되는가...? user쓰라고 했었는데 
  @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.creatorUser)
  foodFareRooms: FoodFareRoom[];

  @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.user)
  foodJoinUsers: FoodJoinUser[];
}