import { Injectable } from '@nestjs/common';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { AuthResponse, AuthTokens, MessageResponse } from './interfaces';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto): AuthResponse {
    return {
      user: {
        id: 'mock-user-id',
        name: registerDto.name,
        email: registerDto.email,
      },
      tokens: this.buildMockTokens(),
    };
  }

  login(loginDto: LoginDto): AuthResponse {
    return {
      user: {
        id: 'mock-user-id',
        name: 'Mock User',
        email: loginDto.email,
      },
      tokens: this.buildMockTokens(),
    };
  }

  refresh(refreshTokenDto: RefreshTokenDto): AuthTokens {
    return {
      accessToken: 'mock-access-token',
      refreshToken: refreshTokenDto.refreshToken,
    };
  }

  logout(): MessageResponse {
    return { message: 'Logged out successfully' };
  }

  private buildMockTokens(): AuthTokens {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }
}
