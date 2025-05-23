import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    return this.articleModel.create(dto);
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article | null> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');
    return this.articleModel.findById(id).exec();
  }

  async findPending(): Promise<Article[]> {
    return this.articleModel.find({ status: 'pending' }).exec();
  }

  async findApproved(): Promise<Article[]> {
    return this.articleModel.find({ status: 'approved' }).exec();
  }

  async approveArticle(id: string): Promise<Article | null> {
    return this.articleModel
      .findByIdAndUpdate(id, { status: 'approved' }, { new: true })
      .exec();
  }

  async rejectArticle(id: string): Promise<Article | null> {
    return this.articleModel
      .findByIdAndUpdate(id, { status: 'rejected' }, { new: true })
      .exec();
  }

  async findArticlesForAnalyst(): Promise<Article[]> {
    return this.articleModel.find({ status: 'approved' }).exec();
  }

  async analyzeArticle(
    id: string,
    update: Partial<Article>,
  ): Promise<Article | null> {
    return this.articleModel
      .findByIdAndUpdate(
        id,
        { ...update, analyzedAt: new Date(), status: 'analyzed' },
        { new: true },
      )
      .exec();
  }
}
