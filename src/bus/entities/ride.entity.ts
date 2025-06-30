import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Bus } from './bus.entity';
import { BusStop } from './stop.entity';

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column()
  departureTime: string;

  @Column({type:'numeric'})
  price: number;

  @ManyToOne(()=>Bus, bus=> bus.rides)
  bus: Bus

  @OneToMany(()=>BusStop, s=> s.stop)
  busStops: BusStop[];

  @Column({nullable:true})
  currentLocation:string;

  @Column()
  rideDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}