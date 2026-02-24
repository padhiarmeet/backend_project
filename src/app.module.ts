import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TicketsModule } from './tickets/tickets.module';
import { TicketCommentsModule } from './ticket-comments/ticket-comments.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, DatabaseModule, TicketsModule, TicketCommentsModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}   
