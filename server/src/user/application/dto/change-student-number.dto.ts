import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeStudentNumberInput {
  @ApiProperty({
    name: 'studentNumber',
    description: '바꾸고 싶은 학번',
  })
  @IsNumber()
  studentNumber: number;
}
