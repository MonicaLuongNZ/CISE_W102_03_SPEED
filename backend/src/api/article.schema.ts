import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) authors: string;
  @Prop({ required: true }) journal_name: string;
  @Prop({ required: true }) published_year: number;
  @Prop() volume: string;
  @Prop() number: string;
  @Prop() pages: string;
  @Prop({ required: true }) doi: string;
  @Prop({
    default: 'pending',
    enum: ['pending', 'approved', 'rejected', 'analyzed'],
  })
  status: 'pending' | 'approved' | 'rejected' | 'analyzed';
  @Prop() claim: string;
  @Prop() evidence: string;
  @Prop() analyzedBy?: string;
  @Prop({ type: Date }) analyzedAt?: Date;
  @Prop() evidenceType?: string;
  @Prop({ default: 'Internal' }) source?: string;
  @Prop() summary?: string;
  @Prop({ type: [String] }) tags?: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
