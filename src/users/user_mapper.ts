import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

export const toUserDto = (data: User): UserDto => {
  const { name, user_id } = data;
  let userDto: UserDto = { name, user_id };
  return userDto;
};
