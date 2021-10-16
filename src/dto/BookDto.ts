import { Review } from '../schemas/review.schema';
import * as mongoose from 'mongoose';

export class BookDto {
  _id: mongoose.Schema.Types.ObjectId;
  bookName: string;
  author: string;
  genre: string;
  releaseDate: Date;
  review: Review;
}
