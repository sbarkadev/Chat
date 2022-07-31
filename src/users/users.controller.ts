import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { response, Response } from 'express';


@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}

  @Post('/createUser')
  // or we can use it globally in main.ts
//   @UsePipes(ValidationPipe)
  //if we use request decorator  we can refer to the body 
  // async createUser(@Req() req : Request ) {req.body}
  // a dto : data transfer object : is like a schema , it defines how data is going to be sent by network (from client to the server) .

  async createUser(@Body() createUserDto : CreateUserDto )//, @Res() response : Response) // if we don't send the response directly , we don't need to use it 
  {
     const new_user = await this.usersService.createUser(createUserDto);
     if (new_user)
          /* without interacting with the Response object we can simply send  the object  created */ 
          return new_user ;
     else
          /* if we don't  want to interact with Response object directly , we can send an 
          exception , it will send a response back to the user without actually using the response 
          object itself */
          throw new HttpException('user already exist!!' ,HttpStatus.CONFLICT);



     // if(new_user)
     //      response.send(new_user)
     // else
     //      response.status(HttpStatus.CONFLICT).send({ 
     //           message :"user already exist with that name"});

  }

  @Get('/getUsers')
  async getUsers()
  {
     return this.usersService.getUsers();
  }

}



// ParseIntPipe allows us to validate that incoming parameter , if the number is not an int , the validation failed
// to use class-validator decorators , you use ValidationPipe to make use of class-validator package ==> we can validate our dto 
// security vulnaribilities
// we can use a transformer , so we can transform a request , we can convert a tring to a number before actually reaches the validation 

// validation makes a pplication more secure
/*
     @IsNotEmptyObject()
     @ValidateNested()
     @Type(() => createAddressDto)
     address : createAdrressDto
*/

/*
the nest way => instead of using the request and the response object , we can return an object directly to the user,
if the object not found we throw an error , and nest will handle it for us underneath the hood ,a nd will return the appropriate response
*/