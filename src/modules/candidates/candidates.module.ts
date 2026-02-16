import { Module } from '@nestjs/common';

/**
 * Candidates Module
 *
 * Responsible for candidate management operations:
 * - Managing candidate profiles
 * - Tracking candidate status and progress
 * - Matching candidates with positions
 * - Candidate assessments and evaluations
 *
 * Structure:
 * - application/ - Use cases for candidate operations
 * - domain/ - Candidate entities and repositories
 * - infrastructure/ - Data persistence and external services
 * - interfaces/ - HTTP controllers and DTOs
 */
@Module({
  providers: [],
  controllers: [],
})
export class CandidatesModule {}
