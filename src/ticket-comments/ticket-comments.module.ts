import { Module } from '@nestjs/common';
import { TicketCommentsService } from './ticket-comments.service';
import { TicketCommentsController, CommentsController } from './ticket-comments.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketCommentsController, CommentsController],
  providers: [TicketCommentsService],
})
export class TicketCommentsModule {}
