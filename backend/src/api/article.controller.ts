// src/api/article.controller.ts

import {
  Body,
  Controller,
  Get,
  //HttpException, // to be used later
  //HttpStatus,  // to be used later
  NotFoundException,
  Param,
  Patch,
  Post,
  //UseGuards, // to be used later
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
//import { Roles } from '../roles/roles.decorator';  // to be used later
//import { RolesGuard } from '../roles/roles.guard'; // to be used later
import { Article } from './article.schema';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Public: list all articles
  @Get()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // Moderation: article status (pending, approve, reject)
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

  // Public: list approved articles
  @Get('approved')
  findApproved(): Promise<Article[]> {
    return this.articleService.findApproved();
  }

  // Public: fetch one by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    const art = await this.articleService.findOne(id);
    if (!art) throw new NotFoundException('Article not found');
    return art;
  }

  // Public: create
  @Post()
  create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(dto);
  }
}
