import {
    IsNumber,
    IsString
} from 'class-validator';

export class PublishRideDto {

  @IsString({ message: 'busId is Required ..' })
  busId: string;
  
  @IsString({ message: 'Please Provide Source Address' })
  source: string;

  @IsString({ message: 'Please Provide Destination Address' })
  destination: string;

  @IsString({ message: 'Please Provide Departure Time Address' })
  departureTime: string;
  
  @IsNumber()
  price: number; 

  @IsString()
  rideDate: string;

  @IsString()
  currentLocation: string;

} 