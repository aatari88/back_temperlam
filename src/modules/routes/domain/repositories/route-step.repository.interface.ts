import { RouteStep } from '../entities/route-step.entity';

export interface IRouteStepRepository {
  create(data: Omit<RouteStep, 'id' | 'createdAt' | 'updatedAt'>): Promise<RouteStep>;
  findAllByRouteId(routeId: number): Promise<RouteStep[]>;
  findByRouteIdAndStepOrder(routeId: number, stepOrder: number): Promise<RouteStep | null>;
  findById(id: number): Promise<RouteStep | null>;
  update(id: number, data: Partial<Omit<RouteStep, 'id' | 'routeId' | 'createdAt' | 'updatedAt'>>): Promise<RouteStep>;
  delete(id: number): Promise<void>;
}

export const ROUTE_STEP_REPOSITORY = 'ROUTE_STEP_REPOSITORY';
