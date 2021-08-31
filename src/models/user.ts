import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  uuid!: string;

  @Column
  id!: string;

  @Column
  password!: string;

  @Column
  email!: string;

  @Column
  nickname!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt?: Date;
}
