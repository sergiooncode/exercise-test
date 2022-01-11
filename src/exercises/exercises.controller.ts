import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExerciseDto } from './dto/exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  public async create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Request() req,
  ): Promise<ExerciseDto> {
    createExerciseDto.user_id = req.user.user_id;
    return await this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<ExerciseDto[]> {
    return await this.exercisesService.findAll();
  }
}
