import {
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { BusType } from '../types/enums/BusType';

export class RegisterBusDto {

  @IsString({ message: 'UserId is Required ..' })
  userId: string;
  
  @IsString({ message: 'Please Provide Color Of Bus' })
  color: string;
  
  @IsNumber()
  availableSeats: number; 

  @IsString({ message: 'Provide Registration Number' })
  registrationNumber: string; 

  @IsOptional()
  busType?: BusType;


} 