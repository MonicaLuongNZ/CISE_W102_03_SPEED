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
  status: string;
  
  @Prop()
  claim: string;

  @Prop()
  evidence: string;  
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
