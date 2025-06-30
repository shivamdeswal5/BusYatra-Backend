import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { BusModule } from 'src/bus/bus.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),CloudinaryModule],
  controllers: [UserController],
  providers: [ UserService,UserRepository ],
  exports: [UserRepository,UserService]
})
export class UserModule { }
