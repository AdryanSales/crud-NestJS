import { Role } from 'src/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt: Date;

  @Column({
    default: Role.User,
  })
  role: number;

  @Column({
    length: 255,
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
