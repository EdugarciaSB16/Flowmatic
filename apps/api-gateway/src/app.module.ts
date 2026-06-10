import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';

const validateEnvironment = (
  config: Record<string, unknown>,
): Record<string, unknown> => {
  const authServiceUrl = config.AUTH_SERVICE_URL;

  if (typeof authServiceUrl !== 'string' || authServiceUrl.length === 0) {
    throw new Error('AUTH_SERVICE_URL environment variable is required');
  }

  return config;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}
