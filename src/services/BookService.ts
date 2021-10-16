import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDto } from '../dto/BookDto';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async create(bookDto: BookDto): Promise<any> {
    const book = new this.bookModel(bookDto);
    return book.save();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async update(id: string, bookDto: BookDto): Promise<any> {
    return this.bookModel.updateOne(
      { _id: id },
      {
        $set: {
          bookName: bookDto.bookName,
          author: bookDto.author,
          genre: bookDto.genre,
          releaseDate: bookDto.releaseDate,
          reviews: bookDto.review,
        },
      },
    );
  }

  async delete(id: string): Promise<any> {
    return this.bookModel.deleteOne({ _id: id });
  }
}
