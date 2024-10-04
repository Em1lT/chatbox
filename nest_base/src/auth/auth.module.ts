import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from '../utils/strategy/apikey.strategy';

@Module({
  controllers: [],
  imports: [PassportModule],
  providers: [Logger, AuthService, ApiKeyStrategy],
  exports: [],
})
export class AuthModule {}
