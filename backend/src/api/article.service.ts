import { BadRequestException, Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  /** Public submissions **/
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

  /** Moderator actions **/
  async findPending(): Promise<Article[]> {
    return this.articleModel.find({ status: 'pending' }).exec();
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

  async findByMethodName(sePractice: string): Promise<Article | null> {
    return await this.articleModel
      .findOne({ 'se-practice': sePractice })
      .exec();
  }
}
