import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    try {
      return await this.articleService.findAll();
    } catch {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'No articles found' }, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    const article = await this.articleService.findOne(id);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      await this.articleService.create(createArticleDto);
      return { message: 'Article added successfully' };
    } catch {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Unable to add this article' }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('status/pending')
  async findPending(): Promise<Article[]> {
    return this.articleService.findPending();
  }

  @Get('status/approved')
  async findApproved(): Promise<Article[]> {
    return this.articleService.findApproved();
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

  @Post(':id/analyze')
  async analyze(@Param('id') id: string, @Body() body: Partial<Article>): Promise<Article> {
    const updated = await this.articleService.analyzeArticle(id, body);
    if (!updated) throw new NotFoundException('Article not found');
    return updated;
  }
}

