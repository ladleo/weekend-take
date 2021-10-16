import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Review } from './review.schema';

@Schema()
export class Book {
  @Prop()
  _id: ObjectId;
  @Prop()
  bookName: string;
  @Prop()
  author: string;
  @Prop()
  releaseDate: Date;
  @Prop()
  reviews: Array<Review>;
}

export const BookSchema = SchemaFactory.createForClass(Book);
