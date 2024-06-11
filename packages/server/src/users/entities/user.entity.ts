import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  remember_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  google_id: string;

  @Column({ nullable: true })
  google_email: string;

  @Column({ nullable: true })
  telegram_id: string;

  @Column({ default: false })
  is_logged_in: boolean;
}
