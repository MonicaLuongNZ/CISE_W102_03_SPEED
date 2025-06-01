import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    create(createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    findPending(): Promise<Article[]>;
    findApproved(): Promise<Article[]>;
    findAnalysed(): Promise<Article[]>;
    approveArticle(id: string): Promise<Article>;
    rejectArticle(id: string): Promise<Article>;
    analyze(id: string, body: Partial<Article>): Promise<Article>;
}
