import { Controller, Post, Get, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  CreateWorkStationUseCase,
  GetAllWorkStationsUseCase,
  GetWorkStationByCodeUseCase,
  GetWorkStationQueueUseCase,
} from '../../../application/use-cases';
import {
  CreateWorkStationDto,
  WorkStationResponseDto,
  WorkStationQueueDto,
} from '../../dtos/workstation.dto';

/**
 * WorkStationsController - Interfaces Layer
 * Responsible for:
 * - Receiving HTTP requests
 * - Validating input DTOs
 * - Routing to appropriate use cases
 * - Mapping domain entities to response DTOs
 * - Returning HTTP responses
 */
@ApiTags('Work Stations')
@Controller('stations')
export class WorkStationsController {
  constructor(
    private readonly createWorkStationUseCase: CreateWorkStationUseCase,
    private readonly getAllWorkStationsUseCase: GetAllWorkStationsUseCase,
    private readonly getWorkStationByCodeUseCase: GetWorkStationByCodeUseCase,
    private readonly getWorkStationQueueUseCase: GetWorkStationQueueUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create new work station',
    description: 'Create a new work station with name and code',
  })
  @ApiResponse({
    status: 201,
    description: 'Work station successfully created',
    type: WorkStationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or code already exists',
  })
  async create(
    @Body() data: CreateWorkStationDto,
  ): Promise<WorkStationResponseDto> {
    const workStation = await this.createWorkStationUseCase.execute(data);
    return {
      id: workStation.id,
      name: workStation.name,
      code: workStation.code,
      description: workStation.description,
      isActive: workStation.isActive,
      createdAt: workStation.createdAt,
      updatedAt: workStation.updatedAt,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'List all work stations',
    description: 'Get all active work stations',
  })
  @ApiResponse({
    status: 200,
    description: 'List of work stations',
    type: [WorkStationResponseDto],
  })
  async findAll(): Promise<WorkStationResponseDto[]> {
    const workStations = await this.getAllWorkStationsUseCase.execute();
    return workStations.map((ws) => ({
      id: ws.id,
      name: ws.name,
      code: ws.code,
      description: ws.description,
      isActive: ws.isActive,
      createdAt: ws.createdAt,
      updatedAt: ws.updatedAt,
    }));
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get work station by code',
    description: 'Retrieve a specific work station by its unique code',
  })
  @ApiParam({
    name: 'code',
    example: 'STA-001',
    description: 'The station code',
  })
  @ApiResponse({
    status: 200,
    description: 'Work station found',
    type: WorkStationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Work station not found' })
  async findByCode(
    @Param('code') code: string,
  ): Promise<WorkStationResponseDto> {
    const workStation = await this.getWorkStationByCodeUseCase.execute(code);
    return {
      id: workStation.id,
      name: workStation.name,
      code: workStation.code,
      description: workStation.description,
      isActive: workStation.isActive,
      createdAt: workStation.createdAt,
      updatedAt: workStation.updatedAt,
    };
  }

  @Get(':id/queue')
  @ApiOperation({
    summary: 'Get pending tasks in work station',
    description:
      'Retrieve all pending tasks/orders queued at a specific work station',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'The station ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Pending tasks for the station',
    type: WorkStationQueueDto,
  })
  @ApiResponse({ status: 404, description: 'Work station not found' })
  async getQueue(@Param('id') id: string): Promise<WorkStationQueueDto> {
    return this.getWorkStationQueueUseCase.execute(parseInt(id, 10));
  }
}
