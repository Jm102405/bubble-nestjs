import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Controller('api/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // POST /api/clients - Create new client
  @Post()
  async create(@Body() clientData: Partial<Client>) {
    return await this.clientsService.create(clientData);
  }

  // GET /api/clients - Get all clients
  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  // GET /api/clients/:id - Get one client
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  // PUT /api/clients/:id - Update client
  @Put(':id')
  async update(@Param('id') id: string, @Body() clientData: Partial<Client>) {
    return await this.clientsService.update(id, clientData);
  }

  // DELETE /api/clients/:id - Delete client
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(id);
  }
}
