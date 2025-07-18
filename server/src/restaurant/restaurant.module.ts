import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './restaurant.controller';
import { LeaderController } from './leader/leader.controller';
import { MemberController } from './member/member.controller';
import { RestaurantService } from './restaurant.service';
import { LeaderService } from './leader/leader.service';
import { MemberService } from './member/member.service';
import { Restaurant } from './entities/restaurant.entity';
import { FoodFareRoom } from './entities/test.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, FoodFareRoom])],
  controllers: [RestaurantController, LeaderController, MemberController],
  providers: [RestaurantService, LeaderService, MemberService],
})
export class RestaurantModule {}
