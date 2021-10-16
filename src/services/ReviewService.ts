import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from '../schemas/review.schema';
import { ReviewDto } from '../dto/ReviewDto';
import { response } from 'express';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}
  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async create(reviewDto: ReviewDto): Promise<ReviewDto> {
    const review = new this.reviewModel(reviewDto);
    return review.save();
  }

  async createMany(reviewDtos: ReviewDto[]): Promise<ReviewDto[]> {
    const reviewArray = [];
    reviewDtos.map((item) => {
      return this.create(item).then((response) => {
        return reviewArray.push(response);
      });
    });
    return reviewArray;
  }

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
