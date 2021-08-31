import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Company } from './company';

@Table({ timestamps: true })
export class CompanyBoard extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, field: 'id' })
  boardId!: string;

  @Column
  title!: string;

  @Column
  content!: string;

  @Column
  tags!: string;

  @ForeignKey(() => Company)
  @Column
  companyId!: string;

  @BelongsTo(() => Company)
  company!: Company;
}
