import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

describe('ExercisesService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let userEntity: User;
  let testUser: UserDto;
  let user_id: string;
  let name: string;

  beforeAll(async () => {
    name = 'Foo Bar';
    testUser = {
      name,
      user_id,
    };
    userEntity = new User();
    userEntity.name = name;
    userEntity.user_id = user_id;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
