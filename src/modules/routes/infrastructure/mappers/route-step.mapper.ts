import { Injectable } from '@nestjs/common';
import { RouteStep } from '../../domain/entities/route-step.entity';
import { RouteStepResponseDto } from '../../interfaces/dtos/route-step.dto';

@Injectable()
export class RouteStepMapper {
  toPersistence(entity: RouteStep) {
    return {
      id: entity.id,
      routeId: entity.routeId,
      stepOrder: entity.stepOrder,
      name: entity.name,
      requiredStationId: entity.requiredStationId,
    };
  }

  toDomain(raw: any): RouteStep {
    const step = new RouteStep({
      id: raw.id,
      routeId: raw.routeId,
      stepOrder: raw.stepOrder,
      name: raw.name,
      requiredStationId: raw.requiredStationId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
    return step;
  }

  toResponse(entity: RouteStep): RouteStepResponseDto {
    return {
      id: entity.id,
      routeId: entity.routeId,
      stepOrder: entity.stepOrder,
      name: entity.name,
      requiredStationId: entity.requiredStationId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
