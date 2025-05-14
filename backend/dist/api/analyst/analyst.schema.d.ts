import { Document } from 'mongoose';
export type AnalystSchemaDocument = AnalystQueue & Document;
export declare class AnalystQueue {
    title: string;
    authors: string[];
    year: number;
    submittedByUser: string;
    status: 'pending' | 'analyzed';
    submittedAtTime: Date;
    evidentType?: string;
    soruce?: string;
    tags?: string[];
    summary?: string;
    analyzedBy?: string;
    analyzedAtTime?: Date;
}
export declare const AnalystSchemaDocument: import("mongoose").Schema<AnalystQueue, import("mongoose").Model<AnalystQueue, any, any, any, Document<unknown, any, AnalystQueue, any> & AnalystQueue & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AnalystQueue, Document<unknown, {}, import("mongoose").FlatRecord<AnalystQueue>, {}> & import("mongoose").FlatRecord<AnalystQueue> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
