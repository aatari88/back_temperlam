export class RouteStep {
  id: number;
  routeId: number;
  stepOrder: number;
  name: string;
  requiredStationId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<RouteStep>) {
    Object.assign(this, data);
  }
}
