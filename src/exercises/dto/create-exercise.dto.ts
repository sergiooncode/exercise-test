import { IsNotEmpty, Length } from 'class-validator';

export class CreateExerciseDto {
  @Length(0, 100)
  @IsNotEmpty()
  content: string;

  user_id: string;
}
