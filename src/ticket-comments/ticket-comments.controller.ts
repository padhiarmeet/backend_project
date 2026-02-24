import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TicketCommentsService } from './ticket-comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tickets/:ticketId/comments')
export class TicketCommentsController {
    constructor(private readonly ticketCommentsService: TicketCommentsService) { }

    @UseGuards(AuthGuard)
    @Post()
    createComment(
        @Param('ticketId') ticketId: string,
        @Body() createCommentDto: CreateCommentDto,
        @Query('userId') userId: string,
        @Query('userRole') userRole: string
    ) {
        return this.ticketCommentsService.createComment(+ticketId, createCommentDto, +userId, userRole);
    }

    @UseGuards(AuthGuard)
    @Get()
    getComments(
        @Param('ticketId') ticketId: string,
        @Query('userId') userId: string,
        @Query('userRole') userRole: string
    ) {
        return this.ticketCommentsService.getComments(+ticketId, +userId, userRole);
    }
}

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
    constructor(private readonly ticketCommentsService: TicketCommentsService) { }

    @Patch(':id')
    updateComment(
        @Param('id') commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Query('userId') userId: string,
        @Query('userRole') userRole: string
    ) {
        return this.ticketCommentsService.updateComment(+commentId, updateCommentDto, +userId, userRole);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteComment(
        @Param('id') commentId: string,
        @Query('userId') userId: string,
        @Query('userRole') userRole: string
    ) {
        return this.ticketCommentsService.deleteComment(+commentId, +userId, userRole);
    }
}
