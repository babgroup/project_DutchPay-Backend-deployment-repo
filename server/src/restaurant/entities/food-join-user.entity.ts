import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { FoodOrder } from './food-order.entity';
import { FoodFareRoom } from './food-fare-room.entity';
import { UserOrmEntity } from 'src/user/infra/entities/user.entity';

@Entity()
export class FoodJoinUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserOrmEntity, (user) => user.foodJoinUsers, { onDelete: 'CASCADE' })
  user: UserOrmEntity;

  @Column()
  deliveryConfirmation: number;

  @ManyToOne(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.foodJoinUsers, {
    onDelete: 'CASCADE',
  })
  foodFareRoom: FoodFareRoom;

  @OneToMany(() => FoodOrder, (foodOrder) => foodOrder.foodJoinUser)
  foodOrders: FoodOrder[];
}
