import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../types/enums/UserRole';
import { Bus } from 'src/bus/entities/bus.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default:'unverified'})
  accountStatus: 'verified' | 'unverified';

  @Column({ type: 'varchar',  nullable: true })
  profileImg: string;

  @Column({ type: 'varchar',  nullable: true })
  refreshToken: string;

  @Column({type:'enum', enum:UserRole, default:UserRole.PASSENGER})
  role: UserRole

  @OneToMany(()=>Bus, bus=> bus.owner)
  busOwner: Bus[]

  @ManyToMany(()=>Bus,bus=> bus.bookedBy)
  busBooked : Bus[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

}