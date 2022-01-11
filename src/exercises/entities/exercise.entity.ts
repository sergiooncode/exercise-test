import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  created_at: Date;

  @Column({
    type: 'string',
    nullable: false,
  })
  user_id: string;

  @ManyToOne(() => User, (user) => user.exercises, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;
}
