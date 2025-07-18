import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { FoodResult } from './food-result.entity';
import { Restaurant } from './restaurant.entity';
import { FoodJoinUser } from './food-join-user.entity';
import { User } from './user.entity';

@Entity()
export class FoodFareRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.foodFareRooms, { onDelete: 'CASCADE' })
  creatorUser: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodFareRooms, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'datetime' })
  deadline: Date; //서비스에서 작업하다보니 엔티티와 dto의 자료형 차이로 오류가 발생
  // 얘를 string으로 바꾸는것은 typeorm에서 date연산할때 안좋다고는 하는데 우리가 쓰는 date 연산이 없는듯해서 고민.
  //현재는 string으로 형변환시킬에정

  @Column({ default: 1 })
  minMember: number;

  @OneToMany(() => FoodResult, (foodResult) => foodResult.foodFareRoom)
  foodResults: FoodResult[];

  @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.foodFareRoom)
  foodJoinUsers: FoodJoinUser[];
}
