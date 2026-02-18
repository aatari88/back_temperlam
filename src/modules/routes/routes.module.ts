import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/database';
import {
  CreateProductionRouteUseCase,
  GetAllProductionRoutesUseCase,
  GetProductionRouteByIdUseCase,
  CreateRouteStepUseCase,
  GetRouteStepsByRouteUseCase,
  GetRouteStepByOrderUseCase,
  UpdateRouteStepUseCase,
  DeleteRouteStepUseCase,
} from './application/use-cases';
import { RoutesController } from './interfaces/http/controllers/routes.controller';
import { RouteStepsController } from './interfaces/http/controllers/route-steps.controller';
import { ProductionRouteRepository } from './infrastructure/persistence/production-route.repository';
import { RouteStepRepository } from './infrastructure/persistence/route-step.repository';
import { ProductionRouteMapper } from './infrastructure/mappers/production-route.mapper';
import { RouteStepMapper } from './infrastructure/mappers/route-step.mapper';
import {
  PRODUCTION_ROUTE_REPOSITORY,
} from './domain/repositories/production-route.repository.interface';
import { ROUTE_STEP_REPOSITORY } from './domain/repositories/route-step.repository.interface';

@Module({
  imports: [DatabaseModule],
  providers: [
    // Use Cases (Application Layer) - Production Routes
    CreateProductionRouteUseCase,
    GetAllProductionRoutesUseCase,
    GetProductionRouteByIdUseCase,
    // Use Cases (Application Layer) - Route Steps
    CreateRouteStepUseCase,
    GetRouteStepsByRouteUseCase,
    GetRouteStepByOrderUseCase,
    UpdateRouteStepUseCase,
    DeleteRouteStepUseCase,
    // Infrastructure - Mappers
    ProductionRouteMapper,
    RouteStepMapper,
    // Infrastructure - Repositories
    {
      provide: PRODUCTION_ROUTE_REPOSITORY,
      useClass: ProductionRouteRepository,
    },
    {
      provide: ROUTE_STEP_REPOSITORY,
      useClass: RouteStepRepository,
    },
  ],
  controllers: [RoutesController, RouteStepsController],
  exports: [
    // Route Use Cases
    CreateProductionRouteUseCase,
    GetAllProductionRoutesUseCase,
    GetProductionRouteByIdUseCase,
    // Step Use Cases
    CreateRouteStepUseCase,
    GetRouteStepsByRouteUseCase,
    GetRouteStepByOrderUseCase,
    UpdateRouteStepUseCase,
    DeleteRouteStepUseCase,
  ],
})
export class RoutesModule {}
