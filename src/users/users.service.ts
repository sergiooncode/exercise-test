import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { toUserDto } from './user_mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByPayload({ name }: any): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { name },
    });
    return toUserDto(user);
  }

  async findByLogin({ name, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { name } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { name, password } = userDto;

    const existingUser = await this.usersRepository.findOne({
      where: { name },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.usersRepository.create({ name, password });
    await this.usersRepository.save(user);

    return toUserDto(user);
  }
}
