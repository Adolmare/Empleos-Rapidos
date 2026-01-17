import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Document } from './document.entity';
import type { Point } from 'geojson';

export enum UserVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // En un entorno real, el email debería estar cifrado a nivel de aplicación o base de datos
  // si contiene PII sensible, o usar un hash ciego para búsquedas.
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true, select: false })
  password: string; // Hashed password

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({
    type: 'varchar', // Changed from enum for SQLite compatibility
    default: UserVerificationStatus.PENDING,
  })
  verification_status: UserVerificationStatus;

  // @Index({ spatial: true }) // Spatial index not supported in SQLite
  @Column({
    type: 'simple-json', // Changed from geometry for SQLite compatibility
    nullable: true,
  })
  last_known_location: Point | null;

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
