import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  journal_name: string;

  @Prop({ type: Date })
  published_year: Date;

  @Prop()
  volume: string;

  @Prop()
  number: string;

  @Prop()
  pages: string;

  @Prop()
  doi: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'analyzed';

  @Prop()
  claim: string;

  @Prop()
  evidence: string;

  // Created moderator fields - Brad
  @Prop()
  moderatedBy?: string; 

  @Prop()
  moderationReason?: string; 

  @Prop({ type: Date })
  moderatedAt?: Date;

  // Analyst fields
  @Prop()
  analyzedBy?: string; 
  
  @Prop({ type: Date })
  analyzedAt?: Date;

  @Prop()
  evidenceType?: string;

  @Prop()
  source?: string;

  @Prop()
  summary?: string;

  @Prop({ type: [String] })
  tags?: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
