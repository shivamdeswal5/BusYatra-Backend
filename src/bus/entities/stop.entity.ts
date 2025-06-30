import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Ride } from './ride.entity';

@Entity('stops')
export class BusStop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stopName: string;

  @Column({type:'numeric'})
  price: number;

  @ManyToOne(()=>Ride, ride=> ride.busStops)
  stop: Ride

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


}