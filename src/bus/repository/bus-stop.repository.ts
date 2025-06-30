import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BusStop } from '../entities/stop.entity';

@Injectable()
export class BusStopRepository extends Repository<BusStop> {
  constructor(private readonly dataSource: DataSource) {
    super(BusStop, dataSource.createEntityManager());
  }
}