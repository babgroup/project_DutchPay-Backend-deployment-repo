import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FoodItem } from './food-item.entity';
import { FoodFareRoom } from './food-fare-room.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() //db에는 길이제한이 있는데 굳이 길이 제한을 두어야하나 싶어서 일단 배제했음. 기본적으로 255로 제한됨
  restaurantName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  businessHours: string;

  @Column({ type: 'int', default: 0 })
  deliveryFee: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.restaurant)
  foodItems: FoodItem[];

  @OneToMany(() => FoodFareRoom, (foodFareRoom) => foodFareRoom.restaurant)
  foodFareRooms: FoodFareRoom[];
}
