import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IRouteStepRepository, ROUTE_STEP_REPOSITORY } from '../../domain/repositories/route-step.repository.interface';
import { IProductionRouteRepository, PRODUCTION_ROUTE_REPOSITORY } from '../../domain/repositories/production-route.repository.interface';
import { RouteStep } from '../../domain/entities/route-step.entity';

@Injectable()
export class GetRouteStepsByRouteUseCase {
  constructor(
    @Inject(ROUTE_STEP_REPOSITORY)
    private readonly stepRepository: IRouteStepRepository,
    @Inject(PRODUCTION_ROUTE_REPOSITORY)
    private readonly routeRepository: IProductionRouteRepository,
  ) {}

  async execute(routeId: number): Promise<RouteStep[]> {
    // Verify route exists
    const route = await this.routeRepository.findById(routeId);
    if (!route) {
      throw new NotFoundException(`ProductionRoute with id ${routeId} not found`);
    }

    return this.stepRepository.findAllByRouteId(routeId);
  }
}
