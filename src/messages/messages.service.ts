import { Injectable } from '@nestjs/common';
import { ObjectUnsubscribedError } from 'rxjs';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';


@Injectable()
export class MessagesService {

  // create a messages array (in-memory storage)
  messages : Message[] =[{name : 'Safa' , text :'heyoo'}]
  /*CreateMessageDto : it's the object that we expect  to come in from the client '*/
  /* we want to be a ble to inform all the clients not just the sender that there is a new message*/
  

  /* wen need a basic dictionary :(simulate with a in-memory object )   or database */
  clientToUser = {};

  identify(name : string, clientId :string) {
    this.clientToUser[clientId] = name;

    // return the values of the object (probably we can use it )
    // we can use it to find out who is currently online 
    return Object.values(this.clientToUser);

  }

  getClinetName(clientId : string)
  {
    return this.clientToUser[clientId];
  }
  create(createMessageDto: CreateMessageDto , clientId : string) {
    /* copy what is in the DTO */
    const message = {

      name : this.clientToUser[clientId],
      text : createMessageDto.text,

    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    /* when use databse you add query to select all messages */
    return this.messages;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
