import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { isISO8601 } from 'class-validator';
import { createRoomModel } from './dto/CreateRoomModel.dto';
import { RoomInfos } from './entities/roomInfos.entity';
import { RoomService } from './room.service';

@Controller('room')
@Injectable()
export class RoomController {


  constructor(private readonly roomService: RoomService) {}

     @ApiBody({type : [createRoomModel] , description : "create a Room"})
     @Post('/createRoom/:user_name')
     async create(@Body() createRoomModel : createRoomModel ,@Param('user_name') username : string)
     {
          const room = await this.roomService.createRoom(username, createRoomModel);

          if (room)
               return room ;
          else
               throw new HttpException('room with that name already exist!!', HttpStatus.CONFLICT );
     }

     //@ApiBody({type : [createRoomModel] , description : "get Public rooms"})
     @Get('/getPublicRooms')
     async getPublic()
     {
          var result = [];
          var roominfos  =  [];
          const j = await  this.roomService.getPublic().then((publicRooms) => {
               var keys = Object.keys(publicRooms);
               keys.forEach(function(key){
                    result.push(publicRooms[key]);
               });
               return result;
          }).then((result) => {
               roominfos = new RoomInfos[result.length];
               for(let i = 0 ; i < result.length; i++)
               {
                    let room= new RoomInfos;
                    room.nbr_users = result[i]._count.users;
                    roominfos.push(room);

               }

               // for(let i = 0 ; i < result.length ; i++ )
               // {
               //      let room = new  RoomInfos();
               //      typeof(room.owner)
               // }

          })
        

         return roominfos;
     }
}

// https://tkssharma.com/nestjs-dependency-injection-and-custom-providers/