import { Injectable } from '@nestjs/common';
import { ProductionRoute } from '../../domain/entities/production-route.entity';
import { ProductionRouteResponseDto } from '../../interfaces/dtos/production-route.dto';

@Injectable()
export class ProductionRouteMapper {
  toPersistence(entity: ProductionRoute) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(raw: any): ProductionRoute {
    const route = new ProductionRoute({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
    return route;
  }

  toResponse(entity: ProductionRoute): ProductionRouteResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
