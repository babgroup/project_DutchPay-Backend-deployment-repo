import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CustomRequest } from 'src/shared/types/custom-request';
import { NameChangeInput } from 'src/user/application/dto/name-change.dto';
import { ChangeUserName } from 'src/user/application/use-cases/change-user-name-use-case';
import { GetUserInfo } from 'src/user/application/use-cases/get-user-info.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserInfo: GetUserInfo,
    private readonly changeUserName: ChangeUserName,
  ) {}

  // 유저의 이름 변경
  @ApiOperation({ summary: '유저의 이름을 변경합니다.' })
  @ApiBody({ type: NameChangeInput })
  @ApiResponse({
    example: {
      message: '이름이 수정되었습니다.',
    },
  })
  @UseGuards(AuthGuard)
  @Patch()
  async nameChange(@Req() req: CustomRequest, @Body() body: NameChangeInput) {
    const user = req.user;
    await this.changeUserName.execute(user.id, body.name);
    return { message: '이름이 수정되었습니다.' };
  }

  // 로그인 한 유저의 정보 반환
  @ApiOperation({ summary: '유저의 정보 반환' })
  @ApiResponse({
    example: {
      message: '유저 정보를 반환합니다.',
      userInfo: {
        id: 1,
        name: '아무개',
        email: 'hello@hello.com',
        createDate: '2023-10-01T00:00:00.000Z',
      },
    },
  })
  @UseGuards(AuthGuard)
  @Get()
  async findUserInfo(@Req() req: CustomRequest) {
    const userId = req.user.id;
    const userInfo = await this.getUserInfo.execute(userId);
    return { message: '유저 정보를 반환합니다.', userInfo };
  }
}
