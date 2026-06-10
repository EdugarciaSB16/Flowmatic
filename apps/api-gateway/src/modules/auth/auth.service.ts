import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { AuthProxyPath } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  register(registerDto: RegisterDto): Promise<unknown> {
    return this.forwardToAuthService('/auth/register', registerDto);
  }

  login(loginDto: LoginDto): Promise<unknown> {
    return this.forwardToAuthService('/auth/login', loginDto);
  }

  refresh(refreshTokenDto: RefreshTokenDto): Promise<unknown> {
    return this.forwardToAuthService('/auth/refresh', refreshTokenDto);
  }

  logout(): Promise<unknown> {
    return this.forwardToAuthService('/auth/logout');
  }

  private async forwardToAuthService(
    path: AuthProxyPath,
    payload?: unknown,
  ): Promise<unknown> {
    const authServiceUrl =
      this.configService.getOrThrow<string>('AUTH_SERVICE_URL');

    try {
      const response = await firstValueFrom(
        this.httpService.post<unknown>(`${authServiceUrl}${path}`, payload),
      );

      return response.data;
    } catch (error: unknown) {
      this.forwardAuthServiceError(error);
    }
  }

  private forwardAuthServiceError(error: unknown): never {
    if (!isAxiosError<unknown>(error)) {
      throw new ServiceUnavailableException('Auth service request failed');
    }

    if (error.response) {
      throw new HttpException(
        this.normalizeErrorResponse(error.response.data),
        error.response.status,
      );
    }

    if (error.code === 'ECONNABORTED') {
      throw new HttpException(
        { message: 'Auth service request timed out' },
        HttpStatus.GATEWAY_TIMEOUT,
      );
    }

    throw new HttpException(
      { message: 'Auth service is unavailable' },
      HttpStatus.BAD_GATEWAY,
    );
  }

  private normalizeErrorResponse(errorResponse: unknown): string | object {
    if (typeof errorResponse === 'string') {
      return errorResponse;
    }

    if (typeof errorResponse === 'object' && errorResponse !== null) {
      return errorResponse;
    }

    return { message: 'Auth service request failed' };
  }
}
