import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentFoodRoomsResponseType } from './Type/current-food-rooms-response.type';
import { FoodResult } from './entities/food-result.entity';
import { ListResponseType } from './Type/list-response.type';
import { Restaurant } from './entities/restaurant.entity';
import { UserResponseType } from './Type/user-list-response.type';
import { FoodJoinUser } from './entities/food-join-user.entity';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { FoodFareRoom } from './entities/food-fare-room.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(FoodResult)
    private readonly foodResultRepo: Repository<FoodResult>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    @InjectRepository(FoodJoinUser)
    private readonly foodJoinUserRepo: Repository<FoodJoinUser>,

    @InjectRepository(FoodFareRoom)
    private readonly foodFareRoomRepo: Repository<FoodFareRoom>,
  ) {}
  async getCurrentRooms(): Promise<CurrentFoodRoomsResponseType[]> {
    const currentRooms = await this.foodResultRepo.find({
      where: { progress: 0 },
      relations: [
        'foodFareRoom',
        'foodFareRoom.restaurant',
        'foodFareRoom.foodJoinUsers',
      ],
    });

    return currentRooms.map((result) => {
      const room = result.foodFareRoom;

      return {
        id: room.id,
        restaurantName: room.restaurant.restaurantName,
        deliveryFee: room.restaurant.deliveryFee,
        minUser: room.minMember,
        currentUsers: room.foodJoinUsers.length,
        deadline: room.deadline.toISOString(),
        imageUrl: room.restaurant.imageUrl,
      };
    });
  }

  async getRestaurantList(): Promise<ListResponseType[]> {
    const restaurantList = await this.restaurantRepo.find();

    return restaurantList.map((restaurant) => ({
      id: restaurant.id,
      restaurantName: restaurant.restaurantName,
      deliveryFee: restaurant.deliveryFee,
      imageUrl: restaurant.imageUrl,
      businessHours: restaurant.businessHours,
    }));
  }

  async getUserInRoom(id: string): Promise<UserResponseType[]> {
    const userInRoom = await this.foodJoinUserRepo.find({
      where: { foodFareRoom: { id: +id } },
      relations: ['user', 'foodFareRoom', 'foodFareRoom.creatorUser'],
    });

    return userInRoom.map((room) => ({
      user_id: room.user.studentNumber,
      name: room.user.name,
      student_number: room.user.studentNumber,
      is_creator: room.user.id === room.foodFareRoom.creatorUser.id,
    }));
  }

  async createFoodFareRoom(dto: FoodFareRoomDto, userId: number) {
    const foodFareRoom = this.foodFareRoomRepo.create({
      restaurant: { id: dto.restaurantId },
      creatorUser: { id: userId },
      deadline: new Date(dto.deadline),
      minMember: dto.minMember,
    });
    return this.foodFareRoomRepo.save(foodFareRoom);
  }
}