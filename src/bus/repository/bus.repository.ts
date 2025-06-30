import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bus } from '../entities/bus.entity';

@Injectable()
export class BusRepository extends Repository<Bus> {
  constructor(private readonly dataSource: DataSource) {
    super(Bus, dataSource.createEntityManager());
  }
}