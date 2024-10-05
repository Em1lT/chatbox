import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AppLoggerMiddleware } from 'src/utils/middlewares/logger';
import { AuthMiddleware } from '../utils/middlewares/auth.middleware';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
