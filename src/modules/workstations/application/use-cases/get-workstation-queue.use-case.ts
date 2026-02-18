import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database';
import {
  IWorkStationRepository,
  WORKSTATION_REPOSITORY,
} from '../../domain/repositories/workstation.repository.interface';
import { WorkStationQueueDto } from '../../interfaces/dtos/workstation.dto';

@Injectable()
export class GetWorkStationQueueUseCase {
  constructor(
    @Inject(WORKSTATION_REPOSITORY)
    private readonly workStationRepository: IWorkStationRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(stationId: number): Promise<WorkStationQueueDto> {
    // Verify the station exists
    const workStation = await this.workStationRepository.findById(stationId);
    if (!workStation) {
      throw new NotFoundException(`WorkStation with id ${stationId} not found`);
    }

    // Fetch pending tasks (order locations) for this station
    const pendingTasks = await this.prismaService.orderLocation.findMany({
      where: {
        stationId: stationId,
      },
      include: {
        order: true,
      },
      orderBy: {
        order: {
          priority: 'desc',
        },
      },
    });

    // Map to response format
    const mappedTasks = pendingTasks.map((task) => ({
      id: task.id,
      productionCode: task.order.productionCode,
      orderId: task.orderId,
      stepOrder: task.stepOrder,
      quantity: task.quantity,
    }));

    return {
      stationId: workStation.id,
      stationCode: workStation.code,
      stationName: workStation.name,
      pendingTasks: mappedTasks,
      totalPendingTasks: mappedTasks.length,
    };
  }
}
