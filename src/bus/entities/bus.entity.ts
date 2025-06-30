import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { BusType } from '../types/enums/BusType';
import { Ride } from './ride.entity';


@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=>User, user=> user.busOwner,{cascade:true})
  @JoinColumn()
  owner: User;

  @ManyToMany(()=>User,user=> user.busBooked)
  bookedBy: User[]

  @Column()
  color: string;

  @Column()
  registrationNumber: string;

  @Column({default:30})
  availableSeats: number;

  @Column({type:'enum', enum:BusType, default:BusType.AC})
  busType: BusType;

  @OneToMany(()=> Ride, ride=> ride.bus )
  rides: Ride[]

  @Column({default:true})
  isAvailable?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


}