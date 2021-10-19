import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from '../schemas/review.schema';
import { ReviewDto } from '../dto/ReviewDto';
import { Book } from '../schemas/book.schema';

@Injectable()
export class ReviewService {
  reviewArray = [];
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}
  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async create(reviewDto: ReviewDto): Promise<Review> {
    const review = new this.reviewModel(reviewDto);
    await review.save();
    this.bookModel.findByIdAndUpdate(
      reviewDto.bookId,
      {
        $push: { reviews: review._id },
      },
      { new: true, upsert: true },
      function (err, managerparent) {
        if (err) throw err;
        console.log(managerparent);
      },
    );
    return review;
  }

  async createMany(reviewDtos: ReviewDto[]): Promise<any> {
    this.reviewArray = [];
    const reviewSync = reviewDtos.map((item) => {
      return this.create(item).then((response) => {
        return this.reviewArray.push(response);
      });
    });
    await Promise.all(reviewSync);
    return this.reviewArray;
  }

  // async updateMany(reviewDtos: ReviewDto[]): Promise<any> {
  //   this.reviewArray = [];
  //   const reviewSync = await reviewDtos.map((item) => {
  //     if (item._id) {
  //       this.reviewModel.updateOne(
  //         { _id: item._id },
  //         {
  //           $set: {
  //             review: item.review,
  //             rating: item.rating,
  //           },
  //         },
  //       );
  //       this.reviewArray.push(item);
  //     } else {
  //       const review = new this.reviewModel(item);
  //       review.save();
  //       this.reviewArray.push(review);
  //     }
  //   });
  //   await Promise.all(reviewSync);
  //   return this.reviewArray;
  // }

  async findOne(id: string): Promise<Review> {
    return this.reviewModel.findById(id);
  }

  async update(id: string, reviewDto: ReviewDto): Promise<any> {
    return this.reviewModel.updateOne(
      { _id: id },
      {
        $set: {
          review: reviewDto.review,
          rating: reviewDto.rating,
        },
      },
    );
  }

  async delete(id: string): Promise<any> {
    return this.reviewModel.deleteOne({ _id: id });
  }
}
