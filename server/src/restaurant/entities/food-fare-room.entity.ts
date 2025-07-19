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
import { UserOrmEntity } from 'src/user/infra/entities/user.entity';

@Entity()
export class FoodFareRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserOrmEntity, (user) => user.foodFareRooms, { onDelete: 'CASCADE' })
  creatorUser: UserOrmEntity;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodFareRooms, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'datetime' })
  deadline: Date;

  @Column({ default: 1 })
  minMember: number;

  @OneToMany(() => FoodResult, (foodResult) => foodResult.foodFareRoom)
  foodResults: FoodResult[];

  @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.foodFareRoom)
  foodJoinUsers: FoodJoinUser[];
}
