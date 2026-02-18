import { Injectable, Inject } from '@nestjs/common';
import { IProductionRouteRepository, PRODUCTION_ROUTE_REPOSITORY } from '../../domain/repositories/production-route.repository.interface';
import { ProductionRoute } from '../../domain/entities/production-route.entity';

@Injectable()
export class GetAllProductionRoutesUseCase {
  constructor(
    @Inject(PRODUCTION_ROUTE_REPOSITORY)
    private readonly routeRepository: IProductionRouteRepository,
  ) {}

  async execute(): Promise<ProductionRoute[]> {
    return this.routeRepository.findAll();
  }
}
