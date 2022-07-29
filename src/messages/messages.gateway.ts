import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server , Socket } from 'socket.io'


/* chat server that allows clients to join and identify who they are  
- be able to type a message , inform other client  when they're typing .
- create message when they send it 
- allow other users to get able to get other messages as they join the room 
*/
@WebSocketGateway({
  /**need to configure cors  , when we make our ui later
   * if you try to create a request from your browser ,
   * and it tries to make that request to something in a different origin ,
   * by default it's gonna be blocked by the browser , without the proper headers coming back from the serevr 
    so unless our nestjs server was serving up the client  itself , we need to make sure to provide cors configuration

  */
  cors: {
    origin: '*',
  },
})




/** 
 * messagesGateway is like controllers 
 * except that instead of working with urls(https api)
 * you works with events
 * events that has specific names like createMessage / findAllMessage / findOneMessage / updateMessage / removeMessage
 * if there is  aclient that is connected to this server , if the client sends a createMessage event 
 * the method create will be involved
 */

/**
 * our chat application could have one-to-many users ; 
 * it could be one-to-one communication between two people ,
 * it could be a group chat .
 * 
 * so we want to create someway for our clients to identify themselves .
 * who is it that's joining or chat room 
 */
export class MessagesGateway {

    /*
  that's how chat application works in realtime , because  when it gets a new message it broadcasts
    to the rest of the clients 
    - so how we can do something like that .
    - under the hood we're using socket.io , and that's something that socket.io can already do itself ,
    it has methods to emit messages to all clients .
    -so if we able to get reference to our underlying socket.io , we can actually use that 
    to achieve what we want .

    - a way to do that is whithin our messages gateway we can get a reference to that using  @WebsocketServer() decorator
  */
  @WebSocketServer()
  // you can think of that server object as areference to the socket.io server under the hood , so we can actually use it directly 
  server :Server;



  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await  this.messagesService.create(createMessageDto);
    /* using the method that coming from sokcet.io  that 
    allows us to emit events to all connected clients 
    and we provide it with an event name */
    this.server.emit('message',message); // payload is the message itself
    return message;
  }


  /* when you join a chat room you must be able to see 
  the old messages that was already  in that room 
  */
  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }

  /** add a method called joinRoom that is listening for  event join  */
  /* allowing client to join a room */
  /* in our application there is just one room , so it will be very simple */
  /* socket.io has supports to create multiple rooms , so you can have it join different rooms  */
  @SubscribeMessage('join')
  /* with events with websockets , you can access the payload that comes in via the message body decorator
  it gives you a reference to that payload , you can specify a key to extract out of the payload
  and also we want to identify the client itself , use ConenctedSocket decorator
  */ 
  joinRoom(@MessageBody('name') name : string , @ConnectedSocket() client : Socket) {
    // when a client join ouur room we want him specified his name
    // each of the connected clients has a unique id 
    return this.messagesService.identify(name, client.id)

  }

  /** implementing a way fo the client to say where they're typing */
  // we need a way to signal that the client is typing 
  // and be able to signal when they're done typing 
  // the way that we can represent that is just by sending an event from the client that represents 
  // whether or not that they are typing , we can use a boolean 
  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping : boolean , @ConnectedSocket() client :Socket) {
    const name = await this.messagesService.getClinetName(client.id);

    // now inform the client that that person is typing 
    // we can't use serevr.emit , because it will inform every possible client that is connected ,
    // but we need to inform the clients except for the sender .
    // the sender doesn't need to know that they're typing 

    // send to the clients except myself
    client.broadcast.emit('typing' , { name, isTyping})

  }  
}
