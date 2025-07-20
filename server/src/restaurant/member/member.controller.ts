import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { MemberService } from './member.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CustomRequest } from 'src/shared/types/custom-request';

@Controller('restaurant/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Get('/:id')
  //내 생각에는 리더는 프론트에서 /leader로 보내는 요청이 리더임을 확인하고 보내면 인자로 userId를 안보내도 띄울 수 있는데
  // 멤버는 userId를 안보내면 누가 시킨 메뉴인지 체크가 안되서 userId를 같이 보내야할듯 함. 다른 방법이 있는지 고민
  @UseGuards(AuthGuard)
  async getMemberMenu(@Req() req: CustomRequest, @Param('id') id: string) {
    const result = await this.memberService.getMemberMenu(id, req.user.id)
    return {
      message: `${id}방 정보`,
    };
  }

  @Patch('delivery-confirmation/:id')
  async patch2Delivery(@Param('id') id: string) {
    await this.memberService.patch2Delivery(id)
    return {
      message: `foodJoinUser ${id}번 방에서 delivery_confirmation 1로 변경`,
    };
  }
}
