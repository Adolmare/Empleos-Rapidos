import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import type { Point } from 'geojson';
import { User } from '../../users/entities/user.entity';

export enum JobStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  // @Index({ spatial: true }) // Spatial index not supported in SQLite
  @Column({
    type: 'simple-json', // Changed from geometry for SQLite simple storage
  })
  location: Point;

  @Column({
    type: 'varchar', // Enum as varchar for SQLite
    default: JobStatus.PENDING,
  })
  status: JobStatus;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, eager: true })
  employer: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: true, eager: true })
  worker: User;

  @CreateDateColumn()
  created_at: Date;
}
