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

  @Column({ nullable: false })
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  content!: string | null;

  @Column({ type: 'varchar', nullable: true })
  tags!: string | null;

  @Column({ nullable: false })
  startLink!: string;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @JoinColumn()
  companyBoardId!: string | null;

  @ManyToOne(() => CompanyBoard, (company) => company.gameBoards, { nullable: true })
  companyBoard!: CompanyBoard | null;

  @JoinColumn()
  writerUuid!: string | null;

  @ManyToOne(() => User, (user) => user.gameBoards, { nullable: true })
  writer!: User | null;

  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
