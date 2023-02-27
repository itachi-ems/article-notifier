import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuccessDto } from './dto/test-database.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/ping')
  checkConnectivity(): Promise<SuccessDto> {
    return this.authService.checkConnection();
  }
}
