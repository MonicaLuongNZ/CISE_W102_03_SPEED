import { HttpException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<import("./article.schema").Article[]>;
    findOne(id: string): Promise<import("./article.schema").Article | null>;
    addArticle(createArticleDto: CreateArticleDto): Promise<HttpException>;
    getPendingArticles(): Promise<import("./article.schema").Article[]>;
    approveArticle(id: string): Promise<import("./article.schema").Article | null>;
    rejectArticle(id: string): Promise<import("./article.schema").Article | null>;
}
