import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database';
import { IRouteStepRepository } from '../../domain/repositories/route-step.repository.interface';
import { RouteStep } from '../../domain/entities/route-step.entity';
import { RouteStepMapper } from '../mappers/route-step.mapper';

@Injectable()
export class RouteStepRepository implements IRouteStepRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: RouteStepMapper,
  ) {}

  async create(
    data: Omit<RouteStep, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RouteStep> {
    const step = await this.prismaService.routeStep.create({
      data: {
        routeId: data.routeId,
        stepOrder: data.stepOrder,
        name: data.name,
        requiredStationId: data.requiredStationId,
      },
    });

    return this.mapper.toDomain(step);
  }

  async findAllByRouteId(routeId: number): Promise<RouteStep[]> {
    const steps = await this.prismaService.routeStep.findMany({
      where: { routeId },
      orderBy: { stepOrder: 'asc' },
    });

    return steps.map((step) => this.mapper.toDomain(step));
  }

  async findByRouteIdAndStepOrder(
    routeId: number,
    stepOrder: number,
  ): Promise<RouteStep | null> {
    const step = await this.prismaService.routeStep.findFirst({
      where: { routeId, stepOrder },
    });

    return step ? this.mapper.toDomain(step) : null;
  }

  async findById(id: number): Promise<RouteStep | null> {
    const step = await this.prismaService.routeStep.findUnique({
      where: { id },
    });

    return step ? this.mapper.toDomain(step) : null;
  }

  async update(
    id: number,
    data: Partial<
      Omit<RouteStep, 'id' | 'routeId' | 'createdAt' | 'updatedAt'>
    >,
  ): Promise<RouteStep> {
    const step = await this.prismaService.routeStep.update({
      where: { id },
      data: {
        name: data.name,
        requiredStationId: data.requiredStationId,
      },
    });

    return this.mapper.toDomain(step);
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.routeStep.delete({
      where: { id },
    });
  }
}
