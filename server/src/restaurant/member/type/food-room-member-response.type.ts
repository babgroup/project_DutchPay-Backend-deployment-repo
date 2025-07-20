import { Type } from 'class-transformer';

class MyOrderItemType {
  itemName: string;
  quantity: number;
  price: number;
}

export class FoodRoomMemberResponseType {
  foodJoinUserId: number
  //이거 이름이랑 학번을 보내야하는게 아닌가?? 프론트에서 이 번호만으로 저 화면을 못띄울텐데
  restaurantName: string;
  deadline: string;
  deliveryFee: number;
  memberCount: number;
  @Type(() => MyOrderItemType)
  myOrderItems: MyOrderItemType[];
}
