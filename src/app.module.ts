import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BooksController } from './books/books.controller';
import { ReviewsController } from './reviews/reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/UserService';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ramani_books_db'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    AppController,
    UsersController,
    BooksController,
    ReviewsController,
  ],
  providers: [AppService, UserService],
})
export class AppModule {}
