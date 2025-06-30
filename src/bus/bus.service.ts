import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AddStopDto } from './dto/addStop.dto';
import { PublishRideDto } from './dto/publishRide.dto';
import { RegisterBusDto } from './dto/registerBus.dto';
import { UpdateLocationDto } from './dto/updateCurrentLocation.dto';
import { BusStopRepository } from './repository/bus-stop.repository';
import { BusRepository } from './repository/bus.repository';
import { RideRepository } from './repository/ride.repository';
import { UpdateRegisteredBusDto } from './dto/updateRegisteredBus';
import { BookTicketDto } from './dto/book-ticket.dto';

@Injectable()
export class BusService {
    constructor(
        private readonly busRepository: BusRepository,
        private readonly userRepository: UserRepository,
        private readonly rideRepository: RideRepository,
        private readonly busStopRepository: BusStopRepository
    ) { }

    async registerBus(dto: RegisterBusDto) {
        console.log("Dto Data ..", dto);
        const { color, registrationNumber, availableSeats, busType, userId } = dto;

        const user = await this.userRepository.findOne({
            where: { id: userId }
        })

        if (!user) {
            console.log(`User with UserId: ${userId} not found ..`);
            throw new NotFoundException(`User with UserId: ${userId} not found ..`)
        }

        const registerBus = this.busRepository.create({
            color,
            registrationNumber,
            availableSeats,
            busType,
            isAvailable: true
        })

        registerBus.owner = user;

        await this.busRepository.save(registerBus);

        return {
            message: "New Bus Has Been Register ..",
            registeredBus: registerBus
        }

    }

    async publishRide(dto: PublishRideDto) {
        const { busId, source, destination, departureTime, price, rideDate, currentLocation } = dto;

        const bus = await this.busRepository.findOne({
            where: { id: busId },
            relations: ['owner']
        })

        if (!bus) {
            console.log(`Bus with id ${busId} not found ..`);
            throw new NotFoundException(`Bus with id ${busId} not found ..`);
        }

        const ride = this.rideRepository.create({
            source,
            destination,
            departureTime,
            price,
            rideDate,
            currentLocation
        })

        ride.bus = bus;
        await this.rideRepository.save(ride);

        return {
            message: 'Ride Has Been Published ..',
            ride
        }

    }

    async updateBusDetails(dto: UpdateRegisteredBusDto) {
        const bus = await this.busRepository.findOne({
            where: { id: dto.busId }
        })

        if (!bus) {
            console.log(`Bus with id: ${dto.busId} not found ..`);
            throw new NotFoundException(`Bus with id: ${dto.busId} not found ..`)
        }

        Object.assign(bus, dto);

        return {
            message: 'Bus Details Updated Successfully',
            bus
        }
    }

    async addStopsToRide(dto: AddStopDto) {
        const { rideId, stopName, price } = dto;
        const ride = await this.rideRepository.findOne({
            where: { id: rideId },
            relations: ['busStops']
        })

        if (!ride) {
            console.log(`Ride with ride id ${rideId} not found`);
            throw new NotFoundException(`Ride with ride id ${rideId} not found`);
        }

        const stop = this.busStopRepository.create({
            stopName,
            price
        })

        stop.stop = ride;

        await this.busStopRepository.save(stop);

        return {
            message: 'Stop has been added to ride ..',
            stop
        }

    }

    async getAllRides() {
        return await this.rideRepository.find({
            relations: ['bus', 'busStops']
        });

    }

    async getRideById(id) {
        console.log("Ride ID: ", id);
        return await this.rideRepository.findOne({
            where: { id },
            relations: ['bus', 'busStops']
        })
    }

    async getBusById(id: string) {

        return await this.busRepository.findOne({
            where: { id },
            relations: ['owner', 'rides', 'rides.busStops']
        })

    }

    async updateRideLocation(dto: UpdateLocationDto) {
        const { rideId, currentLocation } = dto;
        const ride = await this.rideRepository.findOne({
            where: { id: rideId },
            relations: ['bus', 'busStops']
        });

        if (!ride) {
            console.log(`Ride not found with Id: ${rideId}`);
            throw new NotFoundException(`Ride not found with Id: ${rideId}`);
        }

        console.log("Update current location of ride: ", ride);
        ride.currentLocation = currentLocation;
        await this.rideRepository.save(ride);

        return {
            message: 'Current Location Has Been Updated',
            ride
        }

    }

    async bookTicket(dto: BookTicketDto) {
        const { userId, busId } = dto;

        const user = await this.userRepository.findOne({
            where: { id: userId }
        })
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const bus = await this.busRepository.findOne({
            where: { id: busId },
            relations: ['owner', 'rides', 'rides.busStops']
        })

        if (!bus) {
            throw new NotFoundException(`Bus with id ${busId} not found`);
        }

        bus?.bookedBy.push(user);

        await this.busRepository.save(bus);

        return {
            message: `Bus has been booken by User`,
            bus
        }

    }

}
