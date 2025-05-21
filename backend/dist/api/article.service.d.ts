import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    create(dto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article | null>;
    findPending(): Promise<Article[]>;
    findApproved(): Promise<Article[]>;
    approveArticle(id: string): Promise<Article | null>;
    rejectArticle(id: string): Promise<Article | null>;
    findArticlesForAnalyst(): Promise<Article[]>;
    analyzeArticle(id: string, update: Partial<Article>): Promise<Article | null>;
}
