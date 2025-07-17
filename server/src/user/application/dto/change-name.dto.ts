import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeNameInput {
  @ApiProperty({
    name: 'name',
    description: '바꾸고 싶은 이름',
  })
  @IsString()
  name: string;
}
