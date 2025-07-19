import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './restaurant.controller';
import { LeaderController } from './leader/leader.controller';
import { MemberController } from './member/member.controller';
import { RestaurantService } from './restaurant.service';
import { LeaderService } from './leader/leader.service';
import { MemberService } from './member/member.service';
import { Restaurant } from './entities/restaurant.entity';
import { FoodResult } from './entities/food-result.entity';
import { FoodJoinUser } from './entities/food-join-user.entity';
import { FoodFareRoom } from './entities/food-fare-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, FoodFareRoom, FoodResult, FoodJoinUser,])],
  controllers: [RestaurantController, LeaderController, MemberController],
  providers: [RestaurantService, LeaderService, MemberService],
})
export class RestaurantModule {}
