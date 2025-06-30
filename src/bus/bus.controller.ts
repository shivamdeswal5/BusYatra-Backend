import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BusService } from './bus.service';
import { RegisterBusDto } from './dto/registerBus.dto';
import { PublishRideDto } from './dto/publishRide.dto';
import { AddStopDto } from './dto/addStop.dto';
import { UpdateLocationDto } from './dto/updateCurrentLocation.dto';
import { UpdateRegisteredBusDto } from './dto/updateRegisteredBus';
import { BookTicketDto } from './dto/book-ticket.dto';

@Controller('bus')
export class BusController {
    constructor(
        private readonly busService: BusService
    ) { }

    @Post('register-bus')
    registerBus(@Body() dto: RegisterBusDto) {
        return this.busService.registerBus(dto);
    }

    @Post('publish-ride')
    publishRide(@Body() dto: PublishRideDto) {
        return this.busService.publishRide(dto);
    }

    @Post('add-stop')
    addStops(@Body() dto: AddStopDto) {
        return this.busService.addStopsToRide(dto);
    }

    @Patch('ride/update-location')
    updateRideLocation(@Body() dto: UpdateLocationDto) {
        return this.busService.updateRideLocation(dto);
    }

    @Patch('update-bus')
    updateBus(@Body() dto: UpdateRegisteredBusDto) {
        return this.busService.updateBusDetails(dto)
    }

    @Get('rides')
    getRides() {
        return this.busService.getAllRides();
    }

    @Get('ride/:id')
    getRideById(@Param('id') id: string) {
        return this.busService.getRideById(id);
    }

    @Get(':id')
    getBusById(@Param('id') id: string) {
        return this.busService.getBusById(id);
    }

    @Post('book-ticket')
    bookTicket(@Body() dto: BookTicketDto) {
        this.busService.bookTicket(dto);

    }

}
