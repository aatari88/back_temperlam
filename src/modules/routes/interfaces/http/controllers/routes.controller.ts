import { Controller, Post, Get, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  CreateProductionRouteUseCase,
  GetAllProductionRoutesUseCase,
  GetProductionRouteByIdUseCase,
} from '../../../application/use-cases';
import {
  CreateProductionRouteDto,
  ProductionRouteResponseDto,
} from '../../dtos/production-route.dto';

/**
 * RoutesController - Interfaces Layer
 * Responsible for:
 * - Receiving HTTP requests
 * - Validating input DTOs
 * - Routing to appropriate use cases
 * - Mapping domain entities to response DTOs
 * - Returning HTTP responses
 */
@ApiTags('Production Routes')
@Controller('routes')
export class RoutesController {
  constructor(
    private readonly createRouteUseCase: CreateProductionRouteUseCase,
    private readonly getAllRoutesUseCase: GetAllProductionRoutesUseCase,
    private readonly getRouteByIdUseCase: GetProductionRouteByIdUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create production route',
    description: 'Create a new production route',
  })
  @ApiResponse({
    status: 201,
    description: 'Production route successfully created',
    type: ProductionRouteResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(
    @Body() data: CreateProductionRouteDto,
  ): Promise<ProductionRouteResponseDto> {
    const route = await this.createRouteUseCase.execute(data);
    return {
      id: route.id,
      name: route.name,
      description: route.description,
      createdAt: route.createdAt,
      updatedAt: route.updatedAt,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'List all production routes',
    description: 'Get all production routes',
  })
  @ApiResponse({
    status: 200,
    description: 'List of production routes',
    type: [ProductionRouteResponseDto],
  })
  async findAll(): Promise<ProductionRouteResponseDto[]> {
    const routes = await this.getAllRoutesUseCase.execute();
    return routes.map((route) => ({
      id: route.id,
      name: route.name,
      description: route.description,
      createdAt: route.createdAt,
      updatedAt: route.updatedAt,
    }));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get production route by ID',
    description: 'Retrieve a specific production route by its ID',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'The route ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Production route found',
    type: ProductionRouteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Production route not found' })
  async findById(@Param('id') id: string): Promise<ProductionRouteResponseDto> {
    const route = await this.getRouteByIdUseCase.execute(parseInt(id, 10));
    return {
      id: route.id,
      name: route.name,
      description: route.description,
      createdAt: route.createdAt,
      updatedAt: route.updatedAt,
    };
  }
}
