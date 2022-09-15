import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('type_of_user')
export class TypeOfUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}

@Entity('item_types')
export class ItemTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
