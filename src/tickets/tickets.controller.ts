import { Controller, Get, Post, Body, Patch, Param, Delete, Query,  UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tickets')
export class TicketsController{


  constructor(private readonly ticketsService: TicketsService){}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Query('userId') userId: string) {
    return this.ticketsService.create(createTicketDto, +userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(){
    return this.ticketsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string){
     return this.ticketsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/assign')
  assignTicket(@Param('id') id: string, @Body() assignTicketDto: AssignTicketDto, @Query('userId') userId: string, @Query('userRole') userRole: string) {
      return this.ticketsService.assignTicket(+id, assignTicketDto, +userId, userRole);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() statusDto: UpdateStatusDto, @Query('userId') userId: string, @Query('userRole') userRole: string) {
    return this.ticketsService.updateStatus(+id, statusDto, +userId, userRole);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Query('userRole') userRole: string) {
    return this.ticketsService.remove(+id, userRole);
  }


}
