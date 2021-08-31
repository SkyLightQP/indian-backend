import { Column, CreatedAt, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { GameBoard } from './gameBoard';
import { CompanyBoard } from './companyBoard';

@Table
export class Company extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  name!: string;

  @Column
  link!: string;

  @HasMany(() => GameBoard)
  gameBoards!: GameBoard[];

  @HasMany(() => CompanyBoard)
  companyBoards!: CompanyBoard[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
