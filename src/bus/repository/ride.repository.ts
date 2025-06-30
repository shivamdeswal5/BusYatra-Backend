import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ride } from '../entities/ride.entity';

@Injectable()
export class RideRepository extends Repository<Ride> {
  constructor(private readonly dataSource: DataSource) {
    super(Ride, dataSource.createEntityManager());
  }
}