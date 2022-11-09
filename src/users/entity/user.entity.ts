import { hash } from 'bcryptjs';
import { Item } from 'src/items/entity/item.entity';
import { Party } from 'src/parties/entity/party.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToMany(()=> Party, (party) => party.users)
  @JoinTable({
    name: 'user_party',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'party_id' }
  })
  parties: Party[];

  @ManyToMany(()=> Item, (item) => item.users)
  @JoinTable({
    name: 'user_item',
    joinColumn: { name: 'user_id'},
    inverseJoinColumn: { name: 'item_id'},

  })
  items: Item[];
}
