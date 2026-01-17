import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  document_hash: string; // Hash del documento para integridad (KYC)

  @Column({ type: 'varchar', length: 50 })
  document_type: string; // PASSPORT, ID_CARD, DRIVER_LICENSE

  @CreateDateColumn()
  uploaded_at: Date;

  @ManyToOne(() => User, (user) => user.documents)
  user: User;
}
