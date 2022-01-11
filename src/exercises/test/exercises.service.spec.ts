import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/entities/user.entity';
import { ExerciseDto } from '../dto/exercise.dto';
import { Exercise } from '../entities/exercise.entity';
import { ExercisesService } from '../exercises.service';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let repository: Repository<Exercise>;
  let user_id: string;
  let testUser: UserDto;
  let testExercise: ExerciseDto;
  let userEntity: User;
  let exerciseEntity: Exercise;

  beforeAll(async () => {
    user_id = 'a8b6cdc2-77d6-462f-9045-c440c5e48383';
    testUser = {
      name: 'Foo Bar',
      user_id,
    };
    testExercise = {
      id: 'a47ecdc2-77d6-462f-9045-c440c5e4616f',
      content: 'lorem ipsum',
      created_at: new Date(),
      user_id: 'a8b6cdc2-77d6-462f-9045-c440c5e48383',
      user: testUser,
    };
    const { name } = testUser;
    userEntity = new User();
    userEntity.name = name;
    userEntity.user_id = user_id;
    const { id, content, created_at } = testExercise;
    exerciseEntity = new Exercise();
    exerciseEntity.id = id;
    exerciseEntity.content = content;
    exerciseEntity.created_at = created_at;
    exerciseEntity.user_id = user_id;
    exerciseEntity.user = userEntity;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: getRepositoryToken(Exercise),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    repository = module.get<Repository<Exercise>>(getRepositoryToken(Exercise));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exercise', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(exerciseEntity);
    expect(await service.create(testExercise)).toEqual(testExercise);
  });

  it('should throw exception when trying to create exercise but max already created', async () => {
    jest
      .spyOn(repository, 'find')
      .mockResolvedValueOnce(Array(10).fill(exerciseEntity));
    try {
      await service.create(testExercise);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  it('should return exercises for findAll', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([exerciseEntity]);
    expect(await service.findAll()).toEqual([testExercise]);
  });
});
