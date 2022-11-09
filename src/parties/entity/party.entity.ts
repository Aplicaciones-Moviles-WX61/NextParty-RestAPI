import { User } from "src/users/entity/user.entity";
import { Wishlist } from "src/wishlists/entity/whislist.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 200})
  description: string;

  @Column({length: 100})
  location: string;

  @Column({type: 'datetime'})
  date: Date;

  @Column({length: 100})
  image: string;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.party)
  wishlist: Wishlist;

  @ManyToMany(() => User, (user) => user.parties)
  @JoinTable({
    name: 'user_party',
    joinColumn: { name: 'party_id' },
    inverseJoinColumn: { name: 'user_id' }
  })
  users: User[];
}
