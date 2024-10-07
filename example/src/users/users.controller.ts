import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/user.entity';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiResponse({
    status: 200,
    description: 'get your profile',
    type: Users,
  })
  @Get()
  async getProfile(@User() user: Users) {
    if (!user) return false;

    const userProfile = await this.usersService.getUser(user.id);
    return userProfile || false;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'Success Join',
  })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    const { email, nickname } = data;
    await this.usersService.postUser(email, nickname);

    return {
      status: 200,
      message: '회원가입이 완료되었습니다.',
    };
  }
}
