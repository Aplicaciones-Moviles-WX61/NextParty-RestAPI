import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/users/service/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService:JwtService) {}

  async register(user : any) {
    return this.userService.create(user);
  }

  async login(user : any) {
    const finduser = await this.userService.getByEmail(user.email);
    const checkpassword = await compare(user.password, finduser.password)
    if (!checkpassword) new Error('Password is incorrect');
    const payload ={ id: finduser.id, email: finduser.email};
    const token = this.jwtService.sign(payload);
    const data = {
      user: finduser,
      token: token
    }
    return data;
  }
}
