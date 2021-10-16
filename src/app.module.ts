import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BooksController } from './books/books.controller';
import { ReviewsController } from './reviews/reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/ramani_books_db')],
  controllers: [
    AppController,
    UsersController,
    BooksController,
    ReviewsController,
  ],
  providers: [AppService],
})
export class AppModule {}
