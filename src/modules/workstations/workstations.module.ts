import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/database';
import {
  CreateWorkStationUseCase,
  GetAllWorkStationsUseCase,
  GetWorkStationByCodeUseCase,
  GetWorkStationQueueUseCase,
} from './application/use-cases';
import { WorkStationsController } from './interfaces/http/controllers/workstations.controller';
import { WorkStationRepository } from './infrastructure/persistence/workstation.repository';
import { WorkStationMapper } from './infrastructure/mappers/workstation.mapper';
import { WORKSTATION_REPOSITORY } from './domain/repositories/workstation.repository.interface';

@Module({
  imports: [DatabaseModule],
  providers: [
    // Use Cases (Application Layer)
    CreateWorkStationUseCase,
    GetAllWorkStationsUseCase,
    GetWorkStationByCodeUseCase,
    GetWorkStationQueueUseCase,
    // Infrastructure
    WorkStationMapper,
    {
      provide: WORKSTATION_REPOSITORY,
      useClass: WorkStationRepository,
    },
  ],
  controllers: [WorkStationsController],
  exports: [
    CreateWorkStationUseCase,
    GetAllWorkStationsUseCase,
    GetWorkStationByCodeUseCase,
    GetWorkStationQueueUseCase,
  ],
})
export class WorkStationsModule {}
