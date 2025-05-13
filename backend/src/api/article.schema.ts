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

  @Prop({ required: true })
  published_year: number;

  @Prop()
  volume: string;

  @Prop()
  number: string;

  @Prop()
  pages: string;

  @Prop({ required: true })
  doi: string;

  @Prop({ default: 'Waiting for moderator' })
  status: string;

  @Prop({ default: '' })
  se_practice: string
  
  @Prop({ default: '' })
  claim: string;

  @Prop({ default: '' })
  evidence: string;
  
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
