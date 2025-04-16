import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];
  private idCounter = 1;

  constructor(private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: this.idCounter++, email, password: hashedPassword };
    this.users.push(user);
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
