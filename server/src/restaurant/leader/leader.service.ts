import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodFareRoom } from '../entities/food-fare-room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRoomLeaderResponseDto } from './dto/food-room-leader-response.dto';
import { FoodResult } from '../entities/food-result.entity';

@Injectable()
export class LeaderService {
  constructor(
    @InjectRepository(FoodFareRoom)
    private readonly foodFareRoomRepo: Repository<FoodFareRoom>,

    @InjectRepository(FoodResult)
    private readonly foodResultRepo: Repository<FoodResult>,
  ) {}

  async getLeaderFoodFareRoom(id: string): Promise<FoodRoomLeaderResponseDto> {
    const leaderFoodFareRoom = await this.foodFareRoomRepo.findOne({
      where: { id: +id },
      relations: ['restaurant', 'foodJoinUsers', 'foodJoinUsers.user', 'foodJoinUsers.foodOrders', 'foodJoinUsers.foodOrders.foodItem'],
    });
    if (!leaderFoodFareRoom) {
      throw new NotFoundException('FoodFareRoom not found');
    }
    return {
      restaurantName: leaderFoodFareRoom.restaurant.restaurantName,
      minUser: leaderFoodFareRoom.minMember,
      deadline: leaderFoodFareRoom.deadline.toISOString(),
      deliveryFee: leaderFoodFareRoom.restaurant.deliveryFee,
      user: leaderFoodFareRoom.foodJoinUsers.map((join) => ({
        userId: join.user.studentNumber,
        userName: join.user.name,
        foodOrder: join.foodOrders.map((order) => ({
          itemName: order.foodItem.itemName,
          quantity: order.quantity,
          price: order.foodItem.price,
        })),
      })),
    };
  }

  async patch3Progress(id: string): Promise<void> {
    const roomProgress = await this.foodResultRepo.findOne({
      where: {foodFareRoom: {id: +id}},
    })

    if(!roomProgress) {
      throw new NotFoundException(`${id} 방이 존재하지 않음`)
    }
    //위 코드가 없어도 돌아가긴함. nest 자체적으로 아래 progress 할당시 존재하지 않으면 500을 전달하기 때문
    roomProgress.progress = 3;

    await this.foodResultRepo.save(roomProgress)
  }

  async patch4Progress(id: string): Promise<void> {
    const roomProgress = await this.foodResultRepo.findOne({
      where: {foodFareRoom: {id: +id}},
    })

    if(!roomProgress) {
      throw new NotFoundException(`${id} 방이 존재하지 않음`)
    }

    roomProgress.progress = 4;

    await this.foodResultRepo.save(roomProgress)
  }
}
