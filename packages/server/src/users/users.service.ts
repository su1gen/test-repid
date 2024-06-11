import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserSpecificFieldsByEmail(email: string, selectFields: object): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email }, select: selectFields });
  }

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { google_id: googleId } });
  }

  async findByTelegramId(telegramId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { telegram_id: telegramId } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
