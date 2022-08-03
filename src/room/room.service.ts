import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoomModel } from './dto/CreateRoomModel.dto';
import { RoomInfos } from './entities/roomInfos.entity';

@Injectable()
export class RoomService {

    constructor(private prisma :PrismaService) {}

    async createRoom(user_name : string , fields : createRoomModel) {

        const roomCount = await this.prisma.room.count
        (
          {
            where : {
              name : fields.name
            }
          }
        )
        if (roomCount != 0)
        {
          console.log("room already exist\n");
          return null;
        }
      
      
        const createUserInRoom = await this.prisma.userInRoom.create
        ({
            data : {
              user : {
                connect : {
                  username : user_name
                },
              },
              room : {
                create : 
                  {
                    name : fields.name,
                    type : fields.type,
                    password : fields.password
                  },
              },
              user_role : 'owner',
            }
            });
        return createUserInRoom;
      }
      async getPublic(){
        /* ----------------------first------------------------*/
        const publicRooms = await this.prisma.room.findMany({
          where : { type : "public"},
          select : {
            _count : {
              select : {
                users : true
              },  
            },
            users : {
              where : {user_role : "owner"},
              select : {
                userName : true ,
              }
            },
            name : true,
            type : false,
            password : false,
  
        }});

        
        return publicRooms;


        /* ----------------------second------------------------*/
 

}


}

