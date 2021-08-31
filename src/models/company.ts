import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { GameBoard } from './gameBoard';
import { CompanyBoard } from './companyBoard';

@Table({ timestamps: true })
export class Company extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, field: 'id' })
  companyId!: string;

  @Column
  name!: string;

  @Column
  link!: string;

  @HasMany(() => GameBoard)
  gameBoards!: GameBoard[];

  @HasMany(() => CompanyBoard)
  companyBoards!: CompanyBoard[];
}
