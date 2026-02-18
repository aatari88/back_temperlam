import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IRouteStepRepository, ROUTE_STEP_REPOSITORY } from '../../domain/repositories/route-step.repository.interface';

@Injectable()
export class DeleteRouteStepUseCase {
  constructor(
    @Inject(ROUTE_STEP_REPOSITORY)
    private readonly stepRepository: IRouteStepRepository,
  ) {}

  async execute(stepId: number): Promise<void> {
    // Verify step exists
    const existingStep = await this.stepRepository.findById(stepId);
    if (!existingStep) {
      throw new NotFoundException(`RouteStep with id ${stepId} not found`);
    }

    await this.stepRepository.delete(stepId);
  }
}
