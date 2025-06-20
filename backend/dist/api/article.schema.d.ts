import { HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    title: string;
    authors: string;
    journal_name: string;
    published_year: number;
    volume: string;
    number: string;
    pages: string;
    doi: string;
    status: 'pending' | 'approved' | 'rejected' | 'analyzed';
    se_practice: string;
    claim: string;
    result_of_evidence: string;
    analyzedBy?: string;
    analyzedAt?: Date;
    type_of_research?: string;
    type_of_participant?: string;
    source?: string;
    summary?: string;
    tags?: string[];
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
