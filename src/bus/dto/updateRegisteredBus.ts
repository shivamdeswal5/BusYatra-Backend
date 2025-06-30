import { PartialType } from '@nestjs/mapped-types';
import { RegisterBusDto } from './registerBus.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegisteredBusDto extends PartialType(RegisterBusDto ) {

    @IsOptional()
    @IsString()
    busId: string
 
}