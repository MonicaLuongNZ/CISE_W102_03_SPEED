import { Article } from './article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    findPending(): Promise<Article[]>;
    approveArticle(id: string): Promise<Article | null>;
    rejectArticle(id: string): Promise<Article | null>;
    constructor(articleModel: Model<Article>);
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article | null>;
    create(createarticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, Article, {}> & Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findByMethodName(sePractice: string): Promise<Article | null>;
}
