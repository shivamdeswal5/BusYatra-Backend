import {
    IsNumber,
    IsString
} from 'class-validator';

export class AddStopDto {

  @IsString({ message: 'rideId is Required ..' })
  rideId: string;
  
  @IsString({ message: 'Please Enter Stop Name' })
  stopName: string;

  @IsNumber()
  price: number; 

} 