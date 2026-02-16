import { Module } from '@nestjs/common';

/**
 * AI Module
 *
 * Responsible for AI-powered features:
 * - Resume analysis and parsing
 * - Candidate ranking and matching
 * - Automated screening
 * - AI recommendations
 * - Natural language processing
 *
 * Structure:
 * - application/ - Use cases for AI operations
 * - domain/ - AI entities and repositories
 * - infrastructure/ - External AI services, LLM integrations
 * - interfaces/ - HTTP controllers and DTOs
 */
@Module({
  providers: [],
  controllers: [],
})
export class AiModule {}
