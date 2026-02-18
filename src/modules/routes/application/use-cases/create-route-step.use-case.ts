import { Injectable, Inject } from '@nestjs/common';
import { IRouteStepRepository, ROUTE_STEP_REPOSITORY } from '../../domain/repositories/route-step.repository.interface';
import { RouteStep } from '../../domain/entities/route-step.entity';

@Injectable()
export class CreateRouteStepUseCase {
  constructor(
    @Inject(ROUTE_STEP_REPOSITORY)
    private readonly stepRepository: IRouteStepRepository,
  ) {}

  async execute(data: {
    routeId: number;
    stepOrder: number;
    name: string;
    requiredStationId: number;
  }): Promise<RouteStep> {
    return this.stepRepository.create(data);
  }
}
