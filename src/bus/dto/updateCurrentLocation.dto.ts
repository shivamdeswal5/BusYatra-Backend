import {
    IsString
} from 'class-validator';

export class UpdateLocationDto {

  @IsString({ message: 'rideId is Required ..' })
  rideId: string;
  
  @IsString({ message: 'Please Enter Current Location' })
  currentLocation: string; 

} 