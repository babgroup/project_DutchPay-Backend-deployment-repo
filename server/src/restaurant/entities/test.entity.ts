import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FoodFareRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  restaurant_id: number;

  @Column({ type: 'datetime' })
  deadline: Date;

  @Column({ default: 1 })
  min_member: number;
}
