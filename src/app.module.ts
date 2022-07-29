import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { MessagesModule } from './messages/messages.module';



@Module({
  imports: [RoomModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
