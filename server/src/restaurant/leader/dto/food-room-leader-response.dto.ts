import { Type } from 'class-transformer';

class FoodOrderInformationDto {
  itemName: string;
  quantity: number;
  price: number;
}

class JoinUserInformationDto {
  userId: number;
  userName: string;
  @Type(() => FoodOrderInformationDto)
  foodOrder: FoodOrderInformationDto[];
}

export class FoodRoomLeaderResponseDto {
  restaurantName: string;
  minUser: number;
  deadline: string;
  deliveryFee: number;
  @Type(() => JoinUserInformationDto)
  user: JoinUserInformationDto[];
}
