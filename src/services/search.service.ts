import { Injectable } from '@nestjs/common';
import { Book } from '../schemas/book.schema';
import { Aggregate, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import any = jasmine.any;

@Injectable()
export class SearchService {
  constructor(@InjectModel(Book.name) private bookModle: Model<Book>) {}
  searchByGenre(genre): Promise<Book[]> {
    return this.bookModle
      .find({
        genre: { $regex: '.*' + genre + '*.' },
      })
      .populate('reviews')
      .exec();
  }

  searchTypeGeneral(): Promise<Array<any>> {
    return this.bookModle
      .aggregate([
        {
          $group: {
            _id: {
              genre: '$genre',
              year: { $year: '$releaseDate' },
            },
            results: { $push: '$$ROOT' },
          },
        },
        {
          $group: {
            _id: '$_id.genre',
            results: { $push: '$$ROOT' },
          },
        },
        {
          $sort: {
            '_id.year': -1,
          },
        },
      ])
      .exec();
  }

  searchTypeReviewRatings(): Promise<Array<any>> {
    return this.bookModle
      .aggregate([
        {
          $lookup: {
            from: 'reviews',
            localField: 'reviews',
            foreignField: '_id',
            as: 'reviews',
          },
        },
        {
          $group: {
            _id: {
              author: '$author',
              ratings: '$reviews.rating',
            },
          },
        },
        {
          $group: {
            _id: '$_id.author',
            // ratings: { $push: '$_id.ratings' },
            totalRatings: { $sum: { $sum: '$_id.ratings' } },
          },
        },
      ])
      .exec();
  }
}
