import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { error } from 'console';
import { Patch, UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Get all articles
  @Get('/')
  async findAll() {
    try {
      return this.articleService.findAll();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Articles found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Get one article via id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.articleService.findOne(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Article found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Create/add an article
  @Post('/')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    try {
      await this.articleService.create(createArticleDto);
      return new HttpException('Created', HttpStatus.CREATED);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Get all pending articles (moderator only)
  @Get('/moderation/pending')
  @Roles('moderator')
  @UseGuards(RolesGuard)
  getPendingArticles() {
    try {
      return this.articleService.findPending();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving pending articles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  // Approve article by ID (moderator only)
  @Patch('/moderation/approve/:id')
  @Roles('moderator')
  @UseGuards(RolesGuard)
  approveArticle(@Param('id') id: string) {
    try {
      return this.articleService.approveArticle(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error approving article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Reject article by ID (moderator only)
  @Patch('/moderation/reject/:id')
  @Roles('moderator')
  @UseGuards(RolesGuard)
  rejectArticle(@Param('id') id: string) {
    try {
      return this.articleService.rejectArticle(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error rejecting article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
