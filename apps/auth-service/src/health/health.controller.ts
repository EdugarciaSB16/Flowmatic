import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

export interface HealthCheckResponse {
  status: 'ok';
  service: string;
  uptime: number;
  timestamp: string;
}

@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  check(): HealthCheckResponse {
    return {
      status: 'ok',
      service: 'auth-service',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
