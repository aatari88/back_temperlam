export class WorkStation {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<WorkStation>) {
    Object.assign(this, data);
  }
}
