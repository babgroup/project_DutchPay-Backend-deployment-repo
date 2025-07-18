import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FoodFareRoomDto } from './dto/create-food-fare-room.dto';
import { RestaurantService } from './restaurant.service';

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

  @Post('food-fare-room')
  async createFoodFareRoom(@Body() dto: FoodFareRoomDto) {
    return await this.restaurantService.createFoodFareRoom(dto);
  }
  // @Post('test')
  // async createTest(@Body() dto: FoodFareRoomDto) {
  //   return await this.restaurantService.createTest(dto);
  // }

  // @Get('test')
  // async getTest() {
  //   return await this.restaurantService.getTest();
  // }

  // @Patch('test/:id')
  // async patch(@Param('id') id: string, @Body() dto: Partial<FoodFareRoomDto>) {
  //   return await this.restaurantService.patchTest(Number(id), dto);
  // }

  // @Delete('test/:id')
  // async deleteTest(@Param('id') id: string) {
  //   return await this.restaurantService.deleteTest(Number(id));
  // }
}
