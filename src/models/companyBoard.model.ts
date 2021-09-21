import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { GameBoard } from './gameBoard.model';
import { User } from './user.model';

@Entity({ name: 'company_boards' })
export class CompanyBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  description!: string;

  @Column({ default: '' })
  tags!: string;

  @Column({ default: '' })
  link!: string;

  @OneToMany(() => GameBoard, (gameBoard) => gameBoard.companyBoard)
  gameBoards!: GameBoard[];

  @JoinColumn()
  writerId!: string | null;

  @ManyToOne(() => User, (user) => user.companyBoards, { nullable: true })
  writer!: User | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
