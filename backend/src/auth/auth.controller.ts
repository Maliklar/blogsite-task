import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from './auth.model';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() data: LoginUserDTO) {
    return this.authService.authenticate(data);
  }

  @Post('register')
  register(@Body() data: RegisterUserDTO) {
    return this.authService.register(data);
  }
}
