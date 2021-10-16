import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Review {
  @Prop()
  _id: ObjectId;

  @Prop()
  review: string;

  @Prop()
  rating: number;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
