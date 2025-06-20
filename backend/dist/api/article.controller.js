"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./create-article.dto");
let ArticleController = class ArticleController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    async findAll() {
        try {
            return await this.articleService.findAll();
        }
        catch {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, error: 'No articles found' }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findOne(id) {
        const article = await this.articleService.findOne(id);
        if (!article)
            throw new common_1.NotFoundException('Article not found');
        return article;
    }
    async create(createArticleDto) {
        try {
            await this.articleService.create(createArticleDto);
            return { message: 'Article added successfully' };
        }
        catch {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, error: 'Unable to add this article' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findPending() {
        return this.articleService.findPending();
    }
    async findApproved() {
        return this.articleService.findApproved();
    }
    async findAnalysed() {
        return this.articleService.findAnalysedArticles();
    }
    async approveArticle(id) {
        const updated = await this.articleService.approveArticle(id);
        if (!updated)
            throw new common_1.NotFoundException('Article not found');
        return updated;
    }
    async rejectArticle(id) {
        const updated = await this.articleService.rejectArticle(id);
        if (!updated)
            throw new common_1.NotFoundException('Article not found');
        return updated;
    }
    async analyze(id, body) {
        const updated = await this.articleService.analyzeArticle(id, body);
        if (!updated)
            throw new common_1.NotFoundException('Article not found');
        return updated;
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('status/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)('status/approved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findApproved", null);
__decorate([
    (0, common_1.Get)('status/analysed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAnalysed", null);
__decorate([
    (0, common_1.Patch)('approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "approveArticle", null);
__decorate([
    (0, common_1.Patch)('reject/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "rejectArticle", null);
__decorate([
    (0, common_1.Post)(':id/analyze'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "analyze", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('api/articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map