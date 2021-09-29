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

  @Column({ nullable: false })
  id!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  nickname!: string;

  @OneToMany(() => GameBoard, (gameBoard) => gameBoard.writer)
  gameBoards!: GameBoard[];

  @OneToMany(() => CompanyBoard, (companyBoard) => companyBoard.writer)
  companyBoards!: CompanyBoard[];

  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;
}
