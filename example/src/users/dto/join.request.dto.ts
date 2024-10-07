import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'been.bin@test.com',
    description: '이메일',
  })
  public email: string;

  @ApiProperty({
    example: '돼지',
    description: '닉네임',
  })
  public nickname: string;
}
