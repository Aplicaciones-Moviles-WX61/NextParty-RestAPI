import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
}

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;
}
