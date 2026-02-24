import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    
    super({ adapter, log: ['info', 'warn', 'error'] });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma connected');
  }
}