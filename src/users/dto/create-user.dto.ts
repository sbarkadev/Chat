import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description : "name o the user "})
    @IsNotEmpty()
    @IsString()
    username : string

    @ApiProperty({description : "token genrated by 42 api "})
    @IsNotEmpty()
    @IsString()
    token42_api : string

    @ApiProperty({description : "email of the user"})
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email :string

    @ApiProperty({description : "phone number of the user"})
    @IsNumberString()
    @IsOptional()
    @IsNotEmpty()
    phone_number :string

    @ApiProperty({description : "token genrated by google api "})
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tokenGoogle_api : string

    @ApiProperty({description : "token genrated by sms api "})
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tokenSms_api : string

    @ApiProperty({description : "losses"})
    @IsNotEmpty()
    @IsNumber()
    losses : number
    
    @ApiProperty({description : "wins"})
    @IsNotEmpty()
    @IsNumber()
    wins : number


    @ApiProperty({description : "ladder level"})
    @IsNotEmpty()
    @IsNumber()
    ladder_level : number




}
