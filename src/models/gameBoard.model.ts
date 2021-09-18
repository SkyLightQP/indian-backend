import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Company } from './company.model';

@Entity({ name: 'game_boards' })
export class GameBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  tags!: string;

  @Column()
  startLink!: string;

  @JoinColumn()
  companyId!: string;

  @ManyToOne(() => Company, (company) => company.gameBoards)
  company!: Company;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
