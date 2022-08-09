import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

  constructor(readonly prisma : PrismaService) {}

  //---------------------------------
  async createUser(createUserDto: CreateUserDto)  { // : Promise<User>
   
      const userCount = await this.prisma.user.count
      (
        {
          where : {
            username : createUserDto.username
          }
        }
      )
     if (userCount != 0)
        return null;
  
  
      const createUser = await this.prisma.user.create({
        data : createUserDto
      });
    
  return createUser;
  }

  //---------------------------------

  async getUsers()
  {
    const users = await this.prisma.user.findMany({
      select : {
        username : true
      }
    });
    return users
  }

  //

  async addUserToRoom(user_name : string, room_name )
  {
        const createUserInRoom = await this.prisma.userInRoom.create({
          data : {
            user : {
              connect : {
                username : user_name
              },
            },
            room : {
              connect : {
                name : room_name
              },
            },
            user_role : 'user', 
          }
        });
    return createUserInRoom;

  }
}

