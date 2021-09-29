import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { GameBoard } from './gameBoard.model';
import { User } from './user.model';

@Entity({ name: 'company_boards' })
export class CompanyBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', nullable: true })
  tags!: string | null;

  @Column({ nullable: false })
  link!: string;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @OneToMany(() => GameBoard, (gameBoard) => gameBoard.companyBoard)
  gameBoards!: GameBoard[];

  @JoinColumn()
  writerId!: string | null;

  @ManyToOne(() => User, (user) => user.companyBoards, { nullable: true })
  writerUuid!: User | null;

  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
