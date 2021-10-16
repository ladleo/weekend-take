import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review } from './review.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Book {
  @Prop()
  bookName: string;
  @Prop()
  author: string;
  @Prop()
  genre: string;
  @Prop()
  releaseDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Review' })
  review: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
