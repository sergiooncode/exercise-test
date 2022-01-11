import { Test, TestingModule } from '@nestjs/testing';
import { CreateExerciseDto } from '../../../dist/exercises/dto/create-exercise.dto';
import { UserDto } from '../../users/dto/user.dto';
import { ExerciseDto } from '../dto/exercise.dto';
import { ExercisesController } from '../exercises.controller';
import { ExercisesService } from '../exercises.service';

describe('ExercisesController', () => {
  let exercisesController: ExercisesController;
  let spyService: ExercisesService;
  let testUser: UserDto;
  let testExercise: ExerciseDto;
  let user_id: string;

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
  });

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ExercisesService,
      useFactory: () => ({
        findAll: jest.fn(() => [testExercise]),
        create: jest.fn(() => [testExercise]),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [ApiServiceProvider],
    }).compile();

    exercisesController = app.get<ExercisesController>(ExercisesController);
    spyService = app.get<ExercisesService>(ExercisesService);
  });

  describe('findAll', () => {
    it('should call findAll in the service', async () => {
      exercisesController.findAll();
      expect(spyService.findAll).toHaveBeenCalled();
    });

    it('should retrieve all exercises', async () => {
      expect(spyService.findAll()).toEqual([testExercise]);
    });
  });

  describe('create', () => {
    it('should call create in the service', async () => {
      const createExerciseDto: CreateExerciseDto = {
        content: 'lorem ipsum',
        user_id,
      };
      const mockRequest = {
        user: { user_id },
      };

      exercisesController.create(createExerciseDto, mockRequest);
      expect(spyService.create).toHaveBeenCalled();
    });
  });
});
