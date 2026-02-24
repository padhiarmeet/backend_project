import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketCommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  createComment(ticketId: number, createCommentDto: CreateCommentDto, userId: number, role: string) {
    try {
      if (!['MANAGER', 'SUPPORT', 'USER'].includes(role)) {
        throw new UnauthorizedException("Invalid role");
      }

      return this.databaseService.ticket_comments.create({
        data: {
          ticket_id: ticketId,
          user_id: userId,
          comment: createCommentDto.comment
        } as Prisma.ticket_commentsUncheckedCreateInput
      });
    } catch (e) {
      throw new BadRequestException(e?.message || "Failed to create comment");
    }
  }

  getComments(ticketId: number, userId: number, role: string) {
    try {
      return this.databaseService.ticket_comments.findMany({
        where: { ticket_id: ticketId }
      });
    } catch (e) {
      throw new BadRequestException("Failed to fetch comments");
    }
  }

  updateComment(commentId: number, updateCommentDto: UpdateCommentDto, userId: number, role: string) {
    try {
      
      const comment = this.databaseService.ticket_comments.findUnique({
        where: { id: commentId }
      });

     
      if (role !== 'MANAGER' && !comment) {
        throw new UnauthorizedException("Unautherized");
      }

      return this.databaseService.ticket_comments.update({
        where: { id: commentId },
        data: { comment: updateCommentDto.comment }
      });
    } catch (e) {
      throw new BadRequestException("Failed to update comment");
    }
  }

  deleteComment(commentId: number, userId: number, role: string) {
    try {
     
      if (role !== 'MANAGER') {
        throw new UnauthorizedException("Unautherized");
      }

      return this.databaseService.ticket_comments.delete({
        where: { id: commentId }
      });
    } catch (e) {
      throw new BadRequestException("Unautherized");
    }
  }
}
