import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export class User extends Model {
  @Column({ primaryKey: true })
  uuid!: string;

  @Column({ type: DataType.STRING, field: 'id' })
  userId!: string;

  @Column
  password!: string;

  @Column
  email!: string;

  @Column
  nickname!: string;
}
