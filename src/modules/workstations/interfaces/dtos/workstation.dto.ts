import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateWorkStationDto {
  @ApiProperty({ example: 'Station A', description: 'Station name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'STA-001', description: 'Unique station code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Main assembly line station',
    description: 'Optional description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the station is active',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class WorkStationResponseDto {
  @ApiProperty({ example: 1, description: 'Station ID' })
  id: number;

  @ApiProperty({ example: 'Station A', description: 'Station name' })
  name: string;

  @ApiProperty({ example: 'STA-001', description: 'Unique station code' })
  code: string;

  @ApiProperty({
    example: 'Main assembly line station',
    description: 'Station description',
  })
  description?: string;

  @ApiProperty({ example: true, description: 'Whether the station is active' })
  isActive: boolean;

  @ApiProperty({
    example: '2026-02-17T10:30:00Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-02-17T10:30:00Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}

export class WorkStationQueueDto {
  @ApiProperty({ example: 1, description: 'Station ID' })
  stationId: number;

  @ApiProperty({
    example: 'STA-001',
    description: 'Station code',
  })
  stationCode: string;

  @ApiProperty({
    example: 'Station A',
    description: 'Station name',
  })
  stationName: string;

  @ApiProperty({
    example: [
      {
        id: 1,
        productionCode: 'PO-001',
        orderId: 1,
        stepOrder: 1,
        quantity: 50,
      },
    ],
    description: 'Pending tasks/orders in queue',
  })
  pendingTasks: Array<{
    id: number;
    productionCode: string;
    orderId: number;
    stepOrder: number;
    quantity: number;
  }>;

  @ApiProperty({
    example: 2,
    description: 'Total number of pending tasks',
  })
  totalPendingTasks: number;
}
