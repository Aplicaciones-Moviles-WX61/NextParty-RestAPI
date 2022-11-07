import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { loginUserDto, registerUserDto } from "../dtos/index";
import { AuthService } from "../service/auth.service";
@ApiTags('Users',)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: registerUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: loginUserDto) {
    return this.authService.login(user);
  }
}

