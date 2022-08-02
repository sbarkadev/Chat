import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { createRoomModel } from './dto/CreateRoomModel.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {


  constructor(private readonly roomService: RoomService) {}

     @ApiBody({type : [createRoomModel] , description : "create a Room"})
     @Post('/createRoom/:user_name')
     create(@Body() createRoomModel : createRoomModel ,@Param('user_name') username : string)
     {
          const room = this.roomService.createRoom(username, createRoomModel);

          if (room)
               return room ;
          else
               throw new HttpException('room with that name already exist!!', HttpStatus.CONFLICT );
     }
}
