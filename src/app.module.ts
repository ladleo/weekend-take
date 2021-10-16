import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BooksController } from './books/books.controller';
import { ReviewsController } from './reviews/reviews.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, BooksController, ReviewsController],
  providers: [AppService],
})
export class AppModule {}
