import { Body, Controller, Param, Post } from '@nestjs/common';
import { BookService } from '../../services/BookService';
import { Book } from '../../schemas/book.schema';
import { BookDto } from '../../dto/BookDto';
import { ReviewService } from '../../services/ReviewService';
import moment from 'moment';
import { Review } from '../../schemas/review.schema';
import { async } from 'rxjs';
import { response } from 'express';

@Controller('books')
export class BooksController {
  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
  ) {}
  @Post()
  findAll(): Promise<Book[]> {
    return this.bookService
      .findAll()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  @Post('create')
  store(@Body() bookDto: BookDto): Promise<BookDto> {
    return this.reviewService.create(bookDto.review).then((response) => {
      bookDto.review = response;
      bookDto.releaseDate = new Date(bookDto.releaseDate);
      return this.bookService
        .create(bookDto)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    });
    // if (bookDto.review) {
    //   return this.reviewService.createMany(bookDto.review).then((response) => {
    //     bookDto.review = response;
    //   });
    // }
  }

  @Post(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post(':id/update')
  update(@Param('id') id: string, @Body() bookDto: BookDto): Promise<any> {
    return this.bookService.update(id, bookDto);
  }

  @Post(':id/delete')
  delete(@Param('id') id: string): Promise<any> {
    return this.bookService.delete(id);
  }
}
