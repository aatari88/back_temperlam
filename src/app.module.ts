import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infrastructure/database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
