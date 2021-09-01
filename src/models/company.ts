import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyBoard } from './companyBoard';
import { GameBoard } from './gameBoard';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  link!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => CompanyBoard, (companyBoard) => companyBoard.company)
  companyBoards!: CompanyBoard[];

  @OneToMany(() => GameBoard, (gameBoard) => gameBoard.company)
  gameBoards!: GameBoard[];
}
