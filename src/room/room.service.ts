import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoomModel } from './dto/CreateRoomModel.dto';

@Injectable()
export class RoomService {

    constructor(private prisma :PrismaService) {}

    async createRoom(user_name : string , fields : createRoomModel) {

        let userCount = await this.prisma.room.count
        (
          {
            where : {
              name : fields.name
            }
          }
        )
        if (userCount != 0)
          return null;
      
      
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
}
