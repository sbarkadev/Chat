import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { response, Response } from 'express';


@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}

  @Post('/createUser')
  async create(@Body() createUserDto : CreateUserDto , @Res() response : Response)
  {
     const result = await this.usersService.createUser(createUserDto);
     if (result)
          response.send(result);
     else
          response.status(HttpStatus.CONFLICT).send({ 
               statusCode : 409,
               message :"user already exist with that name"});

  }

}



