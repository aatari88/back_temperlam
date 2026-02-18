import { WorkStation } from '../entities/workstation.entity';

export interface IWorkStationRepository {
  create(data: Omit<WorkStation, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkStation>;
  findAll(): Promise<WorkStation[]>;
  findById(id: number): Promise<WorkStation | null>;
  findByCode(code: string): Promise<WorkStation | null>;
}

export const WORKSTATION_REPOSITORY = 'WORKSTATION_REPOSITORY';
