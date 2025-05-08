import { Date, HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    title: string;
    authors: string;
    journal_name: string;
    published_year: Date;
    volume: string;
    number: string;
    pages: string;
    doi: string;
    status: string;
    claim: string;
    evidence: string;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article, any> & Article & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>, {}> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
