import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseDto } from './dto/exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { toExerciseDto } from './exercise_mapper';

const MAX_NUMBER_EXERCISES = 10;

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  public async create(
    createExerciseDto: CreateExerciseDto,
  ): Promise<ExerciseDto> {
    const exercises: Exercise[] = await this.exercisesRepository.find({
      user_id: createExerciseDto.user_id,
    });
    if (exercises.length == MAX_NUMBER_EXERCISES) {
      throw new HttpException(
        'Cannot create more exercises',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { content, user_id } = createExerciseDto;
    const exercise: Exercise = new Exercise();
    exercise.content = content;
    exercise.user_id = user_id;
    const exerciseEntity: Exercise = await this.exercisesRepository.save(
      exercise,
    );

    return toExerciseDto(exerciseEntity);
  }

  public async findAll(): Promise<ExerciseDto[]> {
    const exercises: Exercise[] = await this.exercisesRepository.find({});
    const exerciseDtos: ExerciseDto[] = exercises.map((exercise) =>
      toExerciseDto(exercise),
    );
    return exerciseDtos;
  }
}
