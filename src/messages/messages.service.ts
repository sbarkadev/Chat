import { Injectable } from '@nestjs/common';
import { ObjectUnsubscribedError } from 'rxjs';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';


@Injectable()
export class MessagesService {


  messages : Message[] =[{name : 'Safa' , text :'heyoo'}]
 
  clientToUser = {};

  identify(name : string, clientId :string) {
    this.clientToUser[clientId] = name;

  
    return Object.values(this.clientToUser);

  }

  getClinetName(clientId : string)
  {
    return this.clientToUser[clientId];
  }
  create(createMessageDto: CreateMessageDto , clientId : string) {

    const message = {

      name : this.clientToUser[clientId],
      text : createMessageDto.text,

    };
    this.messages.push(message);
    return message;
  }

  findAll() {
  
    return this.messages;
  }


}
