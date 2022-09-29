import { User } from "src/users/entity/user.entity";
import { Wishlist } from "src/wishlists/entity/whislist.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  party_id: number;

  @Column()
  category_id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 100})
  description: string;

  @Column()
  quantity: number;

  @Column({length: 100})
  image: string;

  // @JoinColumn( {name: "party_id"} )
  @ManyToOne(() => Wishlist, (wishlist) => wishlist.Items, { cascade: true })
  @JoinColumn({ name: 'party_id',referencedColumnName: 'id'})
  wishlist: Wishlist;

  @ManyToMany(() => User, (user) => user.items)
  @JoinTable({
    name: 'user_item',
    joinColumn: { name: 'item_id' },
    inverseJoinColumn: { name: 'user_id' }
  })
  users: User[];
}
