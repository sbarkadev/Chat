import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoomModel } from './dto/CreateRoomModel.dto';


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
                    password : fields.password,
                    owner :user_name
                  },
              },
              user_role : 'owner',
            }
            });
        return createUserInRoom;
      }

      // ----------------------------------------------------------------------

      async getAllRooms() {
        const allRooms = await this.prisma.room.findMany({
          select : {
            name : true,
            type : true,
            owner : true,
          }
        });
        return allRooms;
      }


      // ------------------------------------------------------------------------
      async getRooms(type : string){

        const rooms = await this.prisma.room.findMany({
          where : { type : type},
          select : {
            _count : {
              select : {
                users : true
              },  
            },
            name : true,
            type : false,
            owner : true,
            password : false,
  
        }});
        return rooms;
    }

    async getPrivateRooms(user_name : string) {

    const rooms = await this.prisma.room.findMany({
      where : {
       type :{
          equals : "private"
       },
       users : {
        some :
          {
            userName : user_name
          }
       }
    },
      select : {
        name : true,
        owner : true,
        _count : {
          select : {
            users : true
          },  
        },
        
      }

    });
      return rooms;
    }
}
