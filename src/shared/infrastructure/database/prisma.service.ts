import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * PrismaService - Global Database Service
 *
 * Responsabilidad:
 * - Gestionar la conexión única a la base de datos
 * - Proporcionar el cliente de Prisma a toda la aplicación
 * - Manejar el ciclo de vida de la conexión
 *
 * Ubicación: src/shared/infrastructure/database/
 * Patrón: Singleton (una sola instancia por aplicación)
 *
 * Uso:
 * @Injectable()
 * export class SomeRepository {
 *   constructor(private prisma: PrismaService) {}
 *
 *   async findUser(id: string) {
 *     return this.prisma.user.findUnique({ where: { id } });
 *   }
 * }
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
    });
  }

  /**
   * Conexión a la base de datos cuando el módulo se inicializa
   */
  async onModuleInit() {
    this.logger.log('Conectando a la base de datos...');
    try {
      await this.$connect();
      this.logger.log('✅ Conexión a base de datos establecida');
    } catch (error) {
      this.logger.error('❌ Error conectando a la base de datos', error);
      throw error;
    }
  }

  /**
   * Desconexión de la base de datos cuando el módulo se destruye
   */
  async onModuleDestroy() {
    this.logger.log('Desconectando de la base de datos...');
    try {
      await this.$disconnect();
      this.logger.log('✅ Desconexión completada');
    } catch (error) {
      this.logger.error('❌ Error desconectando', error);
      throw error;
    }
  }
}
