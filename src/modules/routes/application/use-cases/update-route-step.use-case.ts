import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IRouteStepRepository, ROUTE_STEP_REPOSITORY } from '../../domain/repositories/route-step.repository.interface';
import { RouteStep } from '../../domain/entities/route-step.entity';

@Injectable()
export class UpdateRouteStepUseCase {
  constructor(
    @Inject(ROUTE_STEP_REPOSITORY)
    private readonly stepRepository: IRouteStepRepository,
  ) {}

  async execute(
    stepId: number,
    data: {
      name?: string;
      requiredStationId?: number;
    },
  ): Promise<RouteStep> {
    // Verify step exists
    const existingStep = await this.stepRepository.findById(stepId);
    if (!existingStep) {
      throw new NotFoundException(`RouteStep with id ${stepId} not found`);
    }

    return this.stepRepository.update(stepId, data);
  }
}
