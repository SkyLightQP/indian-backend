import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyBoard } from './companyBoard.model';
import { User } from './user.model';

@Entity({ name: 'game_boards' })
export class GameBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ default: '' })
  content!: string;

  @Column({ default: '' })
  tags!: string;

  @Column({ default: '' })
  startLink!: string;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @JoinColumn()
  companyId!: string;

  @ManyToOne(() => CompanyBoard, (company) => company.gameBoards)
  companyBoard!: CompanyBoard;

  @JoinColumn()
  writerId!: string | null;

  @ManyToOne(() => User, (user) => user.gameBoards, { nullable: true })
  writer!: User | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
