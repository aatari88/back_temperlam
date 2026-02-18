export class ProductionRoute {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<ProductionRoute>) {
    Object.assign(this, data);
  }
}
