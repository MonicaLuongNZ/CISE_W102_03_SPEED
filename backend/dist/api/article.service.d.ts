import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    create(dto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article | null>;
    findByMethodName(sePractice: string): Promise<Article | null>;
    findPending(): Promise<Article[]>;
    approveArticle(id: string): Promise<Article | null>;
    rejectArticle(id: string): Promise<Article | null>;
    findApproved(): Promise<Article[]>;
}
