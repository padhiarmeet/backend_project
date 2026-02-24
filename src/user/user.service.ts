import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma/browser';
@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(createUserDto: Prisma.UsersCreateInput) {
    try {
      const data = this.databaseService.users.create({
        data: createUserDto as any
      });
      return {
        "message": "User created successfully",
        "error": false,
        "data": data
      }
    }
    catch (error) {
      return {
        "message": "Failed to create user",
        "error": true,
        "data": null
      }
    }
  }

  findAll() {
    return this.databaseService.users.findMany({
      
    });
    
  }

  findOne(id: number) {
    return this.databaseService.users.findUnique({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateUserDto: Prisma.UsersUpdateInput) {
    return this.databaseService.users.update({
      where:{
        id: id
      },
      data: updateUserDto as any
    });
  }

  remove(id: number) {
    return this.databaseService.users.delete({
      where: {
        id: id
      }
    });
  }
}
