import { ExerciseDto } from 'src/exercises/dto/exercise.dto';
import { Exercise } from 'src/exercises/entities/exercise.entity';

export const toExerciseDto = (data: Exercise): ExerciseDto => {
  const { id, content, user, user_id, created_at } = data;
  let exerciseDto: ExerciseDto = { id, content, user_id, created_at, user };
  return exerciseDto;
};
