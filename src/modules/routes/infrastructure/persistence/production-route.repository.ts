import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database';
import { IProductionRouteRepository } from '../../domain/repositories/production-route.repository.interface';
import { ProductionRoute } from '../../domain/entities/production-route.entity';
import { ProductionRouteMapper } from '../mappers/production-route.mapper';

@Injectable()
export class ProductionRouteRepository implements IProductionRouteRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: ProductionRouteMapper,
  ) {}

  async create(data: Omit<ProductionRoute, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductionRoute> {
    const route = await this.prismaService.productionRoute.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return this.mapper.toDomain(route);
  }

  async findAll(): Promise<ProductionRoute[]> {
    const routes = await this.prismaService.productionRoute.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return routes.map((route) => this.mapper.toDomain(route));
  }

  async findById(id: number): Promise<ProductionRoute | null> {
    const route = await this.prismaService.productionRoute.findUnique({
      where: { id },
    });

    return route ? this.mapper.toDomain(route) : null;
  }
}
