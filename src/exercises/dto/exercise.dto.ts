import { Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class ExerciseDto {
  id: string;

  content: string;

  user_id: string;

  created_at: Date;

  @Type(() => UserDto)
  user: UserDto;
}
