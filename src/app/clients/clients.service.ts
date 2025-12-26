import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENTS_MODEL') private readonly clientModel: Model<Client>,
  ) {}

  // CREATE - Add new client
  async create(clientData: Partial<Client>): Promise<Client> {
    const newClient = new this.clientModel(clientData);
    return await newClient.save();
  }

  // READ - Get all clients
  async findAll(): Promise<Client[]> {
    return await this.clientModel.find().exec();
  }

  // READ - Get one client by ID
  async findOne(id: string): Promise<Client | null> {
    return await this.clientModel.findById(id).exec();
  }

  // UPDATE - Update client by ID
  async update(id: string, clientData: Partial<Client>): Promise<Client | null> {
    return await this.clientModel
      .findByIdAndUpdate(id, clientData, { new: true })
      .exec();
  }

  // DELETE - Delete client by ID
  async remove(id: string): Promise<Client | null> {
    return await this.clientModel.findByIdAndDelete(id).exec();
  }
}
