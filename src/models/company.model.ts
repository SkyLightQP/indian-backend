import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyBoard } from './companyBoard.model';
import { GameBoard } from './gameBoard.model';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
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
