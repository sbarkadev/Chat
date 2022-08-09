import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { isISO8601 } from 'class-validator';
import { createRoomModel } from './dto/CreateRoomModel.dto';
import { RoomService } from './room.service';

@Controller('room')
@Injectable()
export class RoomController {


  constructor(private readonly roomService: RoomService) {}

     @ApiBody({type : createRoomModel , description : "create a Room"})
     @Post('/createRoom/:user_name')
     async create(@Body() createRoomModel : createRoomModel ,@Param('user_name') username : string)
     {
          const room = await this.roomService.createRoom(username, createRoomModel);

          if (room)
               return room ;
          else
               throw new HttpException('room with that name already exist!!', HttpStatus.CONFLICT );
     }

     @Get('/allRooms')
     async getAllRooms()
     {
          return await this.roomService.getAllRooms();
     }

     // @ApiBody({type : [createRoomModel] , description : "get Public rooms"})
     @Get('/getPublicRooms')
     async getPublicRooms()
     {
         return await  this.roomService.getRooms("public");
     }

     @Get('/getProtectedRooms')
     async getProtectedRooms()
     {
         return await  this.roomService.getRooms("protected");
     }

     //https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
     @Get('/getPrivateRooms/:user_name')
     async getPrivateRooms(@Param('user_name') username : string)
     {
        
         return await  this.roomService.getPrivateRooms(username);
     }

}
// https://tkssharma.com/nestjs-dependency-injection-and-custom-providers/