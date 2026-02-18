import { Injectable, Inject } from '@nestjs/common';
import { IWorkStationRepository, WORKSTATION_REPOSITORY } from '../../domain/repositories/workstation.repository.interface';
import { WorkStation } from '../../domain/entities/workstation.entity';

@Injectable()
export class GetAllWorkStationsUseCase {
  constructor(
    @Inject(WORKSTATION_REPOSITORY)
    private readonly workStationRepository: IWorkStationRepository,
  ) {}

  async execute(): Promise<WorkStation[]> {
    return this.workStationRepository.findAll();
  }
}
