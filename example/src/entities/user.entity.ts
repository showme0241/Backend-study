import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @ApiProperty({
    example: '고유번호',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'been.bin@test.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '돼지',
  })
  @Column()
  nickname: string;
}
