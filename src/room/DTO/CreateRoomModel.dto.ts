import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { doesNotMatch } from "assert";
import { Transform } from "class-transformer";
import { isEnum, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

// enum RoomType {
//     Protected = "Protected",
//     Private = "Private",
//     Publice = "Public"
// }
//@isEnum(RoomType)

export class createRoomModel {
    @ApiProperty({description : "The Name of Room"})
    @IsNotEmpty()
    @IsString()
    name : string

    @ApiProperty({description : ' the type should be protected / private or public  '})
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    @IsIn(["protected", "public" ,"private"])
    type: string;

    @ApiProperty({ minimum: 6, maximum: 20, description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
    @MaxLength(20)
    @MinLength(6)
    /* https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a */
    /*Minimum 6 and maximum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character: */
    @Matches( /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
    { message: 'Password is too weak'})
    @IsOptional()
    @IsNotEmpty()
    password : string
}