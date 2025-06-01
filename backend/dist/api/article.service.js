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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("./article.schema");
let ArticleService = class ArticleService {
    articleModel;
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async create(dto) {
        return this.articleModel.create(dto);
    }
    async findAll() {
        return this.articleModel.find().exec();
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException('Invalid ID');
        return this.articleModel.findById(id).exec();
    }
    async findPending() {
        return this.articleModel.find({ status: 'pending' }).exec();
    }
    async findApproved() {
        return this.articleModel.find({ status: 'approved' }).exec();
    }
    async approveArticle(id) {
        return this.articleModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true }).exec();
    }
    async rejectArticle(id) {
        return this.articleModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true }).exec();
    }
    async findArticlesForAnalyst() {
        return this.articleModel.find({ status: 'approved' }).exec();
    }
    async findAnalysedArticles() {
        return this.articleModel.find({ status: 'analyzed' }).exec();
    }
    async analyzeArticle(id, update) {
        return this.articleModel.findByIdAndUpdate(id, { ...update, analyzedAt: new Date(), status: 'analyzed' }, { new: true }).exec();
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArticleService);
//# sourceMappingURL=article.service.js.map