import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article | null> {
    return await this.articleModel.findById(id).exec();
  }

  // Create an article
  async create(createarticleDto: CreateArticleDto) {
    return await this.articleModel.create(createarticleDto);
  }

  async findByMethodName(sePractice: string): Promise<Article | null> {
  return await this.articleModel.findOne({ "se-practice": sePractice }).exec();
}

}
