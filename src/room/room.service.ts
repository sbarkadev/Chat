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

      /* select all public rooms (name ,  nbrofusers , owner ) */

    
      /*
        {
          name : "room1",
          nbr_ofUsers : 2,
          owner "safa"

        }
      */
      // async getPublic() {
      //   const publicRooms = await this.prisma.room.findMany({
      //     where : {type : "public"},
      //     select : {
      //       name : true,
      //       type : false,
      //       users : {
      //         where : {user_role : "owner"},
      //         select :{
      //           userName : true,
      //         }
      //       },
      //       messages : false ,
      //       password : false
      //     }
      //   });
      //   return publicRooms;
      // }


      async getPublic() {
        const publicRooms = await this.prisma.userInRoom.findMany({
          where : {user_role : "owner"},
          select : {
           
            userName : true ,
            room : {
              select : {
                name : true,
                type : true,
                password : false,
              }
            }
          
          }
          
        });

        const count = await this.prisma.room.findMany({
          include : {
            _count : {
              select : {
                users : true,
              }
            }
          }
        })
        return count;
      }

      // async getPublic() {
      //   const publicRooms = await this.prisma.userInRoom.findMany({
      //     where : {user_role : "owner", room.type : "public"},
      //     include :{
      //       room : {
              
      //       }
      //     }
      //   });

      //   return publicRooms;
      // }



}
