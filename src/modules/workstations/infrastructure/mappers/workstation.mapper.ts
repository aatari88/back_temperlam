import { Injectable } from '@nestjs/common';
import { WorkStation } from '../../domain/entities/workstation.entity';
import { WorkStationResponseDto } from '../../interfaces/dtos/workstation.dto';

@Injectable()
export class WorkStationMapper {
  toPersistence(entity: WorkStation) {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(raw: any): WorkStation {
    const workStation = new WorkStation({
      id: raw.id,
      name: raw.name,
      code: raw.code,
      description: raw.description,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
    return workStation;
  }

  toResponse(entity: WorkStation): WorkStationResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
