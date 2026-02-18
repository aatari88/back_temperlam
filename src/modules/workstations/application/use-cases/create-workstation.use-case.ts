import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IWorkStationRepository, WORKSTATION_REPOSITORY } from '../../domain/repositories/workstation.repository.interface';
import { WorkStation } from '../../domain/entities/workstation.entity';

@Injectable()
export class CreateWorkStationUseCase {
  constructor(
    @Inject(WORKSTATION_REPOSITORY)
    private readonly workStationRepository: IWorkStationRepository,
  ) {}

  async execute(data: {
    name: string;
    code: string;
    description?: string;
    isActive?: boolean;
  }): Promise<WorkStation> {
    const cleanData = {
      ...data,
      isActive: data.isActive ?? true,
    };
    // Check if code already exists
    const existingStation = await this.workStationRepository.findByCode(cleanData.code);
    if (existingStation) {
      throw new BadRequestException(`WorkStation with code ${cleanData.code} already exists`);
    }

    return this.workStationRepository.create(cleanData);
  }
}
