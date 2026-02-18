import { ProductionRoute } from '../entities/production-route.entity';

export interface IProductionRouteRepository {
  create(data: Omit<ProductionRoute, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductionRoute>;
  findAll(): Promise<ProductionRoute[]>;
  findById(id: number): Promise<ProductionRoute | null>;
}

export const PRODUCTION_ROUTE_REPOSITORY = 'PRODUCTION_ROUTE_REPOSITORY';
