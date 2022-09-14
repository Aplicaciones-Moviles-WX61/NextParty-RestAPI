import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Whislist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  image: string;
}
