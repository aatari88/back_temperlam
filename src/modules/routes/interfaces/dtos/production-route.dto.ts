import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductionRouteDto {
  @ApiProperty({ example: 'Assembly Line A', description: 'Route name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Main assembly route for product XYZ',
    description: 'Optional route description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class ProductionRouteResponseDto {
  @ApiProperty({ example: 1, description: 'Route ID' })
  id: number;

  @ApiProperty({ example: 'Assembly Line A', description: 'Route name' })
  name: string;

  @ApiProperty({
    example: 'Main assembly route for product XYZ',
    description: 'Route description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: '2026-02-18T10:30:00Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-02-18T10:30:00Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
