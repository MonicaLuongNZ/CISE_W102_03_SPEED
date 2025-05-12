import { Article } from './article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<Article>);
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article | null>;
    create(createarticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, Article, {}> & Article & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
