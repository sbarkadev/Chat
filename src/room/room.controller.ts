import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { createRoomModel } from './dto/CreateRoomModel.dto';

@Controller('room')
export class RoomController {
  @ApiBody({type : [createRoomModel] , description : "create a Room"})
   @Post('/room')
   create(@Body() createRoomModel : createRoomModel )
   {
        console.log("New Room is  is Created");
        console.log(createRoomModel.type);
        console.log(createRoomModel.name);
   }
}
