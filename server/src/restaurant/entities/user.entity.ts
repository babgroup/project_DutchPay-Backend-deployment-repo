import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FoodFareRoom } from './food-fare-room.entity';
import { FoodJoinUser } from './food-join-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  studentNumber: number;

  @Column()
  totalDiscount: number;

  @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.creatorUser)
  foodFareRooms: FoodFareRoom[];

  @OneToMany(() => FoodJoinUser, (foodJoinUser) => foodJoinUser.user)
  foodJoinUsers: FoodJoinUser;
}
