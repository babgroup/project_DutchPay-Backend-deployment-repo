import { Controller, Get, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { RestaurantService } from './restaurant.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CustomRequest } from 'src/shared/types/custom-request';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('current-rooms')
  async getCurrentRooms() {
    const result = await this.restaurantService.getCurrentRooms();

    return {
      message: '현재 생성된 방 전체',
      data: result,
    };
  }

  @Get('list')
  async getRestaurantList() {
    const result = await this.restaurantService.getRestaurantList();

    return {
      message: '레스토랑 목록 전체',
      data: result,
    };
  }

  @Get('user-list/:id')
  async getUserInRoom(@Param('id') id: string) {
    const result = await this.restaurantService.getUserInRoom(id);
    return {
      message: `${id}방에 참여한 유저 목록`,
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Post('food-fare-room')
  async createFoodFareRoom(@Req() req: CustomRequest, @Body() dto: FoodFareRoomDto) {
    return await this.restaurantService.createFoodFareRoom(dto, req.user.id);
  }
}
