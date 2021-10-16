import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReviewService } from '../../services/ReviewService';
import { ReviewDto } from '../../dto/ReviewDto';
import { Review } from '../../schemas/review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewService) {}
  @Post()
  findAll(): Promise<Review[]> {
    return this.reviewService
      .findAll()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  @Post('create')
  store(@Body() createUserDto: ReviewDto): Promise<ReviewDto> {
    return this.reviewService
      .create(createUserDto)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  @Post(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Post(':id/update')
  update(
    @Param('id') id: string,
    @Body() createUserDto: ReviewDto,
  ): Promise<any> {
    return this.reviewService.update(id, createUserDto);
  }

  @Post(':id/delete')
  delete(@Param('id') id: string): Promise<any> {
    return this.reviewService.delete(id);
  }
}
