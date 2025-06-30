import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { BusRepository } from './repository/bus.repository';
import { UserModule } from 'src/user/user.module';
import { Ride } from './entities/ride.entity';
import { RideRepository } from './repository/ride.repository';
import { BusStop } from './entities/stop.entity';
import { BusStopRepository } from './repository/bus-stop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Bus,Ride,BusStop]),UserModule],
  providers: [BusService,BusRepository,RideRepository,BusStopRepository],
  controllers: [BusController],
  exports: [BusRepository, BusService, RideRepository, BusStopRepository]
})
export class BusModule {} 
