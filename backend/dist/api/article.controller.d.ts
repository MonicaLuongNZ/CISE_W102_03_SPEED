import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<Article[]>;
    findPending(): Promise<Article[]>;
    approveArticle(id: string): Promise<Article>;
    rejectArticle(id: string): Promise<Article>;
    findApproved(): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    create(dto: CreateArticleDto): Promise<Article>;
}
