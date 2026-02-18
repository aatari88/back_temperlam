import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database';
import { IWorkStationRepository } from '../../domain/repositories/workstation.repository.interface';
import { WorkStation } from '../../domain/entities/workstation.entity';
import { WorkStationMapper } from '../mappers/workstation.mapper';

@Injectable()
export class WorkStationRepository implements IWorkStationRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: WorkStationMapper,
  ) {}

  async create(
    data: Omit<WorkStation, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<WorkStation> {
    const workStation = await this.prismaService.workStation.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        isActive: data.isActive ?? true,
      },
    });

    return this.mapper.toDomain(workStation);
  }

  async findAll(): Promise<WorkStation[]> {
    const workStations = await this.prismaService.workStation.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return workStations.map((ws) => this.mapper.toDomain(ws));
  }

  async findById(id: number): Promise<WorkStation | null> {
    const workStation = await this.prismaService.workStation.findUnique({
      where: { id },
    });

    return workStation ? this.mapper.toDomain(workStation) : null;
  }

  async findByCode(code: string): Promise<WorkStation | null> {
    const workStation = await this.prismaService.workStation.findUnique({
      where: { code },
    });

    return workStation ? this.mapper.toDomain(workStation) : null;
  }
}
