import { Injectable, NotImplementedException } from '@nestjs/common';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return this.forwardToAuthService('/auth/register', registerDto);
  }

  login(loginDto: LoginDto) {
    return this.forwardToAuthService('/auth/login', loginDto);
  }

  refresh(refreshTokenDto: RefreshTokenDto) {
    return this.forwardToAuthService('/auth/refresh', refreshTokenDto);
  }

  logout() {
    return this.forwardToAuthService('/auth/logout');
  }

  private forwardToAuthService(path: string, payload?: unknown): never {
    throw new NotImplementedException(
      `Proxy to auth-service is not implemented yet (path: ${path}, hasPayload: ${payload !== undefined})`,
    );
  }
}
