import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateRouteStepDto {
  @ApiProperty({
    example: 1,
    description: 'Step order in the route (sequential)',
  })
  @IsInt()
  @IsNotEmpty()
  stepOrder: number;

  @ApiProperty({
    example: 'Assembly',
    description: 'Step name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Required work station ID for this step',
  })
  @IsInt()
  @IsNotEmpty()
  requiredStationId: number;
}

export class UpdateRouteStepDto {
  @ApiProperty({
    example: 'Assembly',
    description: 'Step name',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    example: 1,
    description: 'Required work station ID for this step',
    required: false,
  })
  @IsInt()
  requiredStationId?: number;
}

export class RouteStepResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Step ID',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Route ID',
  })
  routeId: number;

  @ApiProperty({
    example: 1,
    description: 'Step order in the route',
  })
  stepOrder: number;

  @ApiProperty({
    example: 'Assembly',
    description: 'Step name',
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Required work station ID',
  })
  requiredStationId: number;

  @ApiProperty({
    example: '2026-02-18T10:30:00Z',
    description: 'Creation timestamp',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2026-02-18T10:30:00Z',
    description: 'Last update timestamp',
    required: false,
  })
  updatedAt?: Date;
}
