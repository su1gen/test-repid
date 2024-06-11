import { Entity, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class PasswordResets {
  @Column({ primary: true })
  email: string;

  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  created_at: Date;
}
