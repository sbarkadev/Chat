import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [RoomModule, MessagesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
