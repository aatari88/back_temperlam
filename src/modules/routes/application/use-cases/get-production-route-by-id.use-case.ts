import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IProductionRouteRepository, PRODUCTION_ROUTE_REPOSITORY } from '../../domain/repositories/production-route.repository.interface';
import { ProductionRoute } from '../../domain/entities/production-route.entity';

@Injectable()
export class GetProductionRouteByIdUseCase {
  constructor(
    @Inject(PRODUCTION_ROUTE_REPOSITORY)
    private readonly routeRepository: IProductionRouteRepository,
  ) {}

  async execute(id: number): Promise<ProductionRoute> {
    const route = await this.routeRepository.findById(id);
    if (!route) {
      throw new NotFoundException(`ProductionRoute with id ${id} not found`);
    }
    return route;
  }
}
