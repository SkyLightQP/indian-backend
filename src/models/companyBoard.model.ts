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

@Entity({ name: 'company_boards' })
export class CompanyBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  tags!: string;

  @JoinColumn()
  companyId!: string;

  @ManyToOne(() => Company, (company) => company.companyBoards)
  company!: Company;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
