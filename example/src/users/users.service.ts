import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUser(userId: number): Promise<Users> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async postUser(email: string, nickname: string) {
    const userInfo = { email, nickname };
    await this.userRepository.save(userInfo);
  }
}
