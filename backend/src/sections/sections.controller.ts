import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async generateSections(@Body('idea') idea: string) {
    return this.sectionsService.generateAndSaveSections(idea);
  }

  @Get(':id/ui-design')
  async generateUIDesign(
    @Param('id') id: string,
    @Query('idea') idea: string,
    @Query('sectionName') sectionName: string,
  ) {
    return this.sectionsService.generateUIDesign(id, idea, sectionName);
  }
}