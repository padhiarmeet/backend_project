import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class TicketsService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(createTicketDto: CreateTicketDto, userId: number) {
    try {
      if(!userId || isNaN(userId)){
        throw new BadRequestException("userId is required and must be a valid number !!");
      }
      return this.databaseService.tickets.create({
          data: {
          ...createTicketDto,
          created_by: userId
        } as Prisma.ticketsUncheckedCreateInput
      }
    
    );
    }
    catch(e){
      throw new BadRequestException(e?.message || "Bad request");
    }
  }


  findAll() {
    try{
      return this.databaseService.tickets.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          created_by: true,
          assigned_to: true,
          created_at: true
        },
        take: 50
      });
    }
    catch(e){
      console.error(e);
      throw new UnauthorizedException("Failed to fetch tickets: " + e?.message);
    }
  }

  findOne(id: number){
    try{
      return this.databaseService.tickets.findUnique({
        where: { id }
      }
    );
    }
    catch(e){
      throw new NotFoundException("Ticket not found");
    }


  }

  update(id: number, updateTicketDto: UpdateTicketDto){
    try{
      return this.databaseService.tickets.update({
        where: { id },
        data: updateTicketDto as any
      }
    );
    }
    catch(e){
      throw new BadRequestException("Failed to update ticket");
    }
  }

  assignTicket(id: number, assignTicketDto: AssignTicketDto, userId: number, userRole: string){
    try{
      if(!['MANAGER', 'SUPPORT'].includes(userRole)){
        throw new UnauthorizedException("Only MANAGER and SUPPORT can asign");
      }
      return this.databaseService.tickets.update({
        where: { id },
        data: { assigned_to: assignTicketDto.assigned_to }
      }
    );
    }
    catch(e){
      throw new BadRequestException(e?.message || "Fail to asign ticket");
    }
  }

  updateStatus(id: number, statusDto: UpdateStatusDto, userId: number, userRole: string) {
    try{
      if(!['MANAGER', 'SUPPORT'].includes(userRole)) {
        throw new UnauthorizedException("Only MANAGER and SUPPORT can update");
      }
      return this.databaseService.tickets.update({
        where: { id },
        data: { status: statusDto.status as any }
      });
    }
    catch(e){
      throw new BadRequestException(e?.message|| "Failed to update status");
    }
  }

  remove(id: number, userRole: string){
    try {
      if (userRole !== 'MANAGER') {
        throw new UnauthorizedException("Only manager can delete tickets");
      }
      return this.databaseService.tickets.delete({
        where: { id }
      });
    }
    catch(e){
      throw new BadRequestException(e?.message ||"Failed to delete ticket");
    }
  }
}
