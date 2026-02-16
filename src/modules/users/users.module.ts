import { Module } from '@nestjs/common';

/**
 * Users Module
 *
 * Responsible for user management operations:
 * - Fetching user profiles
 * - Updating user information
 * - Managing user preferences
 * - User account management
 *
 * Structure:
 * - application/ - Use cases for user operations
 * - domain/ - User entities and repositories
 * - infrastructure/ - Data persistence and external services
 * - interfaces/ - HTTP controllers and DTOs
 */
@Module({
  providers: [],
  controllers: [],
})
export class UsersModule {}
