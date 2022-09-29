import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/users/entity/user.entity";
import { AuthService } from "../service/auth.service";

export class loginUserDto {
  email: string;
  password: string;
}

@ApiTags('Users',)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: loginUserDto) {
    return this.authService.login(user);
  }
}

