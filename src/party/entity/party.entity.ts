import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  date: Date;
}
