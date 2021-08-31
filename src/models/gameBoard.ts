import { BelongsTo, Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Company } from './company';

@Table
export class GameBoard extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  title!: string;

  @Column
  content!: string;

  @Column
  tags!: string;

  @Column
  startLink!: string;

  @Column
  companyId!: string;

  @BelongsTo(() => Company, { foreignKey: 'companyId' })
  company!: Company;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
