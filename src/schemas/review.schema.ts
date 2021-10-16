import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Review {
  @Prop()
  review: string;

  @Prop()
  rating: number;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
