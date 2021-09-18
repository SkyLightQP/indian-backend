import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { GameBoard } from './gameBoard.model';
import { CompanyBoard } from './companyBoard.model';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  id!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @OneToMany(() => GameBoard, (gameBoard) => gameBoard.writer)
  gameBoards!: GameBoard[];

  @OneToMany(() => CompanyBoard, (companyBoard) => companyBoard.writer)
  companyBoards!: CompanyBoard[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
