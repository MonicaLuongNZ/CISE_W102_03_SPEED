// src/api/article.controller.ts

import {
  Body,
  Controller,
  Get,
  //HttpException,
  //HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  //UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
//import { Roles } from '../roles/roles.decorator';
//import { RolesGuard } from '../roles/roles.guard';
import { Article } from './article.schema';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 1) Public: list all articles
  @Get()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // 2) Moderation: list pending (must come *before* the `:id` route!)
  @Get('pending')
  async findPending(): Promise<Article[]> {
    return this.articleService.findPending();
  }

  @Patch('approve/:id')
  async approveArticle(@Param('id') id: string): Promise<Article> {
    const updated = await this.articleService.approveArticle(id);
    if (!updated) throw new NotFoundException('Article not found');
    return updated;
  }

  @Patch('reject/:id')
  async rejectArticle(@Param('id') id: string): Promise<Article> {
    const updated = await this.articleService.rejectArticle(id);
    if (!updated) throw new NotFoundException('Article not found');
    return updated;
  }

  // 3) Public: fetch one by ID (generic catch-all)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    const art = await this.articleService.findOne(id);
    if (!art) throw new NotFoundException('Article not found');
    return art;
  }

  // 4) Public: create
  @Post()
  create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(dto);
  }
}
