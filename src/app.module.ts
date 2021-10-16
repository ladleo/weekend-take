import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import { BooksController } from './controllers/books/books.controller';
import { ReviewsController } from './controllers/reviews/reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/UserService';
import { User, UserSchema } from './schemas/user.schema';
import { Book, BookSchema } from './schemas/book.schema';
import { Review, ReviewSchema } from './schemas/review.schema';
import { BookService } from './services/BookService';
import { ReviewService } from './services/ReviewService';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ramani_books_db'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  controllers: [
    AppController,
    UsersController,
    BooksController,
    ReviewsController,
  ],
  providers: [AppService, UserService, BookService, ReviewService],
})
export class AppModule {}
