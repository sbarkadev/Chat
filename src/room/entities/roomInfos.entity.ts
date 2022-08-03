import { Injectable } from "@nestjs/common";

@Injectable()
export class RoomInfos {

    owner : string;
    room_name : string;
    nbr_users : number;

    constructor()
    {
        this.owner = "";
        this.room_name = "";
        this.nbr_users = 0;

    }
    
}
