import { Controller, Get, Patch, Param } from '@nestjs/common';

@Controller('restaurant/member')
export class MemberController {
  @Get('/:id')
  getMemberMenu(@Param('id') id: string) {
    return {
      message: `${id}방 정보`,
    };
  }

  @Patch('delivery-confirmation/:id')
  patch3Progress(@Param('id') id: string) {
    return {
      message: `${id}방에서 progress 3으로 변경`,
    };
  }
}
