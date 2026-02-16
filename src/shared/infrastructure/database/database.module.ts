import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * DatabaseModule - Módulo Global de Base de Datos
 *
 * Propósito:
 * - Centralizar la gestión de la conexión a base de datos
 * - Proporcionar PrismaService como singleton a toda la aplicación
 * - Evitar múltiples instancias de PrismaClient (antipatrón)
 *
 * Decorador @Global():
 * - Hace que este módulo sea global
 * - PrismaService se puede inyectar en cualquier módulo sin importar DatabaseModule
 * - Responsabilidad: Importar DatabaseModule SOLO en AppModule
 *
 * Arquitectura:
 * - SINGLETON: Una sola instancia de PrismaService por aplicación
 * - Inyectable: Se inyecta donde se necesita
 * - Ciclo de vida: Controlado por NestJS
 *
 * Uso:
 * // En AppModule
 * @Module({
 *   imports: [DatabaseModule, ...otrosModulos],
 * })
 * export class AppModule {}
 *
 * // En cualquier servicio
 * constructor(private prisma: PrismaService) {}
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
