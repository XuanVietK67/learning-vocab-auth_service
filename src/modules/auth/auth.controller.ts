import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateAuthDto, User } from './dto/create-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_login')
  create(@Payload() user: User) {
    return this.authService.login(user);
  }

  @MessagePattern('validateUser')
  vaidate(@Payload() dataValidate: CreateAuthDto){
    return this.authService.validateUser(dataValidate.email, dataValidate.password)
  }

}
