import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';

describe('ArticleService', () => {
  let service: ArticleService;
  let model: {
    find: jest.Mock;
    findById: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    create: jest.Mock;
  };

  const mockArticle = {
    _id: '507f1f77bcf86cd799439011', // must be a valid 24-hex ObjectId
    title: 'AI in Medicine',
    authors: 'John Doe, Jane Smith',
    journal_name: 'Medicine Today',
    published_year: 2023,
    volume: '12',
    number: '3',
    pages: '45-67',
    doi: '10.1234/medtoday.2023.123456',
    status: 'pending',
  };

  beforeEach(async () => {
    model = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        { provide: getModelToken(Article.name), useValue: model },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    jest.clearAllMocks();
  });

  it('should create and return a new article', async () => {
    const dto: CreateArticleDto = {
      title: mockArticle.title,
      authors: mockArticle.authors,
      journal_name: mockArticle.journal_name,
      published_year: mockArticle.published_year,
      volume: mockArticle.volume,
      number: mockArticle.number,
      pages: mockArticle.pages,
      doi: mockArticle.doi,
    };

    model.create.mockResolvedValue(mockArticle);
    const result = await service.create(dto);

    expect(model.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockArticle);
  });

  it('should return all articles', async () => {
    model.find.mockReturnValue({ exec: () => Promise.resolve([mockArticle]) });
    const result = await service.findAll();

    expect(model.find).toHaveBeenCalled();
    expect(result).toEqual([mockArticle]);
  });

  it('should return pending articles', async () => {
    model.find.mockReturnValue({ exec: () => Promise.resolve([mockArticle]) });
    const result = await service.findPending();

    expect(model.find).toHaveBeenCalledWith({ status: 'pending' });
    expect(result).toEqual([mockArticle]);
  });

  it('should find one article by id', async () => {
    model.findById.mockReturnValue({
      exec: () => Promise.resolve(mockArticle),
    });
    const result = await service.findOne(mockArticle._id);

    expect(model.findById).toHaveBeenCalledWith(mockArticle._id);
    expect(result).toEqual(mockArticle);
  });

  it('should throw BadRequestException for invalid id', async () => {
    await expect(service.findOne('invalid-id')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should approve an article', async () => {
    model.findByIdAndUpdate.mockReturnValue({
      exec: () => Promise.resolve(mockArticle),
    });
    const result = await service.approveArticle(mockArticle._id);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockArticle._id,
      { status: 'approved' },
      { new: true },
    );
    expect(result).toEqual(mockArticle);
  });

  it('should reject an article', async () => {
    model.findByIdAndUpdate.mockReturnValue({
      exec: () => Promise.resolve(mockArticle),
    });
    const result = await service.rejectArticle(mockArticle._id);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockArticle._id,
      { status: 'rejected' },
      { new: true },
    );
    expect(result).toEqual(mockArticle);
  });
});
