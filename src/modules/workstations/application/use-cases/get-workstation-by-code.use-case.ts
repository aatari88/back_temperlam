import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IWorkStationRepository, WORKSTATION_REPOSITORY } from '../../domain/repositories/workstation.repository.interface';
import { WorkStation } from '../../domain/entities/workstation.entity';

@Injectable()
export class GetWorkStationByCodeUseCase {
  constructor(
    @Inject(WORKSTATION_REPOSITORY)
    private readonly workStationRepository: IWorkStationRepository,
  ) {}

  async execute(code: string): Promise<WorkStation> {
    const workStation = await this.workStationRepository.findByCode(code);
    if (!workStation) {
      throw new NotFoundException(`WorkStation with code ${code} not found`);
    }
    return workStation;
  }
}
