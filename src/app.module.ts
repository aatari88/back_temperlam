import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infrastructure/database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AiModule } from './modules/ai/ai.module';
import { WorkStationsModule } from './modules/workstations/workstations.module';
import { RoutesModule } from './modules/routes/routes.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    AiModule,
    WorkStationsModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
