import { hash } from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 60})
  name: string;

  @Column({length: 60})
  lastname: string;

  @Column({length: 50, unique: true})
  email: string;

  @Column({length: 100})
  password: string;

  @Column({length: 9})
  phone: string;

  @CreateDateColumn({type: 'date'})
  birthday: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
