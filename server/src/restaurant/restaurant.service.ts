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
  ) {} //초기에 foodfareroom으로 레포 주입을 했는데 progress를 찾으려니 오류가 생김, progress가 있는걸로
  //바꿨음 QueryBuilder 사용하면 된다는데 더 복잡해보여서.
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
      relations: ['user', 'foodFareRoom'],
    });

    return userInRoom.map((room) => ({
      user_id: room.user.studentNumber,
      name: room.user.name,
      student_number: room.user.studentNumber,
      is_creator: room.user.id === room.foodFareRoom.creatorUser.id,
    }));
  }

  async createFoodFareRoom(dto: FoodFareRoomDto) {
    const foodFareRoom = this.foodFareRoomRepo.create({
      restaurant: { id: dto.restaurantId },
      deadline: new Date(dto.deadline),
      minMember: dto.minMember,
    });
    return this.foodFareRoomRepo.save(foodFareRoom);
  }
}
// async createTest(dto: FoodFareRoomDto) {
//   const test = this.foodFareRoomRepo.create({
//     restaurant_id: dto.restaurant_id,
//     deadline: dto.deadline,
//     min_member: dto.min_member,
//   });
//   return this.foodFareRoomRepo.save(test);
// }

// async getTest() {
//   return this.foodFareRoomRepo.find();
// }

// async patchTest(id: number, dto: Partial<FoodFareRoomDto>) {
//   const test = await this.foodFareRoomRepo.preload({
//     id,
//     ...dto,
//   });
//   if (!test) {
//     throw new NotFoundException({ id, message: 'FoodFareRoom not found' });
//   }
//   return this.foodFareRoomRepo.save(test);
// }

// async deleteTest(id: number) {
//   return this.foodFareRoomRepo.delete(id);
// }
//}
