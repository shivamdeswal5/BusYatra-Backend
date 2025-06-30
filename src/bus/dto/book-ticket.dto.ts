import {
    IsNumber,
    IsString
} from 'class-validator';

export class BookTicketDto {

  @IsString({ message: 'userId is Required ..' })
  userId: string;
  
  @IsString({ message: 'BusId is Required' })
  busId: string;
} 