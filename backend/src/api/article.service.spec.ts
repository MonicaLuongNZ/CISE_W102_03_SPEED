import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ArticleService } from './article.service';
import { Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';

describe('ArticleService', () => {
  let service: ArticleService;
  let model: { create: jest.Mock };

  const mockArticle = {
    _id: '123',
    title: 'AI in Medicine',
    authors: 'John Doe, Jane Smith',
    journal_name: 'Medicine Today',
    published_year: 2023,
    volume: '12',
    number: '3',
    pages: '45-67',
    doi: '10.1234/medtoday.2023.123456',
    status: 'Waiting for moderator',
  };

  const mockArticleModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    model = module.get<{ create: jest.Mock }>(getModelToken(Article.name));
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a new article', async () => {
      const dto: CreateArticleDto = {
        title: 'AI in Medicine',
        authors: 'John Doe, Jane Smith',
        journal_name: 'Medicine Today',
        published_year: 2023,
        volume: '12',
        number: '3',
        pages: '45-67',
        doi: '10.1234/medtoday.2023.123456',
      };

      model.create.mockResolvedValue(mockArticle);

      const result = await service.create(dto);

      expect(model.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockArticle);
    });
  });
});
