
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) { }

  async signIn(name: string, password: string): Promise<any> {
    console.log(name, password);
    const user = await this.databaseService.users.findFirst({
      where: { name: name }
    });

    console.log("\n\n\n\n\n\n" + await this.databaseService.users.findMany());
   
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = user.password === password || await bcrypt.compare(password, user.password).catch(() => false);
    console.log(user.password, password, isPasswordValid);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {sub: user.id,username:user.name, role_id: user.role_id };
    return {
      access_token: await this.jwtService.signAsync(payload),

    user: { id: user.id, name: user.name, email: user.email, role_id: user.role_id }
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    
    return bcrypt.hash(password, saltRounds);
  }
}

