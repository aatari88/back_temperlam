import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  CreateRouteStepUseCase,
  GetRouteStepsByRouteUseCase,
  GetRouteStepByOrderUseCase,
  UpdateRouteStepUseCase,
  DeleteRouteStepUseCase,
} from '../../../application/use-cases';
import {
  CreateRouteStepDto,
  UpdateRouteStepDto,
  RouteStepResponseDto,
} from '../../dtos/route-step.dto';

/**
 * RouteStepsController - Interfaces Layer
 * Responsible for:
 * - Receiving HTTP requests for route steps
 * - Validating input DTOs
 * - Routing to appropriate use cases
 * - Mapping domain entities to response DTOs
 * - Returning HTTP responses
 */
@ApiTags('Route Steps')
@Controller('routes/:routeId/steps')
export class RouteStepsController {
  constructor(
    private readonly createStepUseCase: CreateRouteStepUseCase,
    private readonly getStepsByRouteUseCase: GetRouteStepsByRouteUseCase,
    private readonly getStepByOrderUseCase: GetRouteStepByOrderUseCase,
    private readonly updateStepUseCase: UpdateRouteStepUseCase,
    private readonly deleteStepUseCase: DeleteRouteStepUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create route step',
    description: 'Create a new step in a production route',
  })
  @ApiParam({
    name: 'routeId',
    example: 1,
    description: 'The route ID',
  })
  @ApiResponse({
    status: 201,
    description: 'Route step successfully created',
    type: RouteStepResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 404, description: 'Route not found' })
  async create(
    @Param('routeId') routeId: string,
    @Body() data: CreateRouteStepDto,
  ): Promise<RouteStepResponseDto> {
    const step = await this.createStepUseCase.execute({
      routeId: parseInt(routeId, 10),
      stepOrder: data.stepOrder,
      name: data.name,
      requiredStationId: data.requiredStationId,
    });
    return {
      id: step.id,
      routeId: step.routeId,
      stepOrder: step.stepOrder,
      name: step.name,
      requiredStationId: step.requiredStationId,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'List all steps in route',
    description: 'Get all steps in a production route ordered by step number',
  })
  @ApiParam({
    name: 'routeId',
    example: 1,
    description: 'The route ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of route steps',
    type: [RouteStepResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Route not found' })
  async findAll(
    @Param('routeId') routeId: string,
  ): Promise<RouteStepResponseDto[]> {
    const steps = await this.getStepsByRouteUseCase.execute(
      parseInt(routeId, 10),
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return steps.map((step) => ({
      id: step.id,
      routeId: step.routeId,
      stepOrder: step.stepOrder,
      name: step.name,
      requiredStationId: step.requiredStationId,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
    }));
  }

  @Get(':stepOrder')
  @ApiOperation({
    summary: 'Get route step by order',
    description: 'Get a specific step in a route by its order number',
  })
  @ApiParam({
    name: 'routeId',
    example: 1,
    description: 'The route ID',
  })
  @ApiParam({
    name: 'stepOrder',
    example: 1,
    description: 'The step order number',
  })
  @ApiResponse({
    status: 200,
    description: 'Route step found',
    type: RouteStepResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Route or step not found' })
  async findByOrder(
    @Param('routeId') routeId: string,
    @Param('stepOrder') stepOrder: string,
  ): Promise<RouteStepResponseDto> {
    const step = await this.getStepByOrderUseCase.execute(
      parseInt(routeId, 10),
      parseInt(stepOrder, 10),
    );
    return {
      id: step.id,
      routeId: step.routeId,
      stepOrder: step.stepOrder,
      name: step.name,
      requiredStationId: step.requiredStationId,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
    };
  }

  @Put(':stepOrder')
  @ApiOperation({
    summary: 'Update route step',
    description: 'Update a specific step in a route',
  })
  @ApiParam({
    name: 'routeId',
    example: 1,
    description: 'The route ID',
  })
  @ApiParam({
    name: 'stepOrder',
    example: 1,
    description: 'The step order number',
  })
  @ApiResponse({
    status: 200,
    description: 'Route step successfully updated',
    type: RouteStepResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 404, description: 'Route or step not found' })
  async update(
    @Param('routeId') routeId: string,
    @Param('stepOrder') stepOrder: string,
    @Body() data: UpdateRouteStepDto,
  ): Promise<RouteStepResponseDto> {
    // First get the step to find its ID
    const step = await this.getStepByOrderUseCase.execute(
      parseInt(routeId, 10),
      parseInt(stepOrder, 10),
    );

    const updatedStep = await this.updateStepUseCase.execute(step.id, data);
    return {
      id: updatedStep.id,
      routeId: updatedStep.routeId,
      stepOrder: updatedStep.stepOrder,
      name: updatedStep.name,
      requiredStationId: updatedStep.requiredStationId,
      createdAt: updatedStep.createdAt,
      updatedAt: updatedStep.updatedAt,
    };
  }

  @Delete(':stepOrder')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete route step',
    description: 'Delete a specific step from a route',
  })
  @ApiParam({
    name: 'routeId',
    example: 1,
    description: 'The route ID',
  })
  @ApiParam({
    name: 'stepOrder',
    example: 1,
    description: 'The step order number',
  })
  @ApiResponse({
    status: 204,
    description: 'Route step successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Route or step not found' })
  async delete(
    @Param('routeId') routeId: string,
    @Param('stepOrder') stepOrder: string,
  ): Promise<void> {
    // First get the step to find its ID
    const step = await this.getStepByOrderUseCase.execute(
      parseInt(routeId, 10),
      parseInt(stepOrder, 10),
    );

    await this.deleteStepUseCase.execute(step.id);
  }
}
