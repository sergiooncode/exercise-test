import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity('exercises_user')
export class User {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
