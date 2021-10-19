import { Controller, Param, Post } from '@nestjs/common';
import { SearchService } from '../../services/search.service';
import { Book } from '../../schemas/book.schema';
import { response } from 'express';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post('books/general')
  searchTypeGeneral(): Promise<Array<any>> {
    return this.searchService.searchTypeGeneral();
  }

  @Post('books/review/ratings')
  searchTypeReviewRatings(): Promise<any> {
    return this.searchService.searchTypeReviewRatings();
  }

  @Post('books/:genre')
  search(@Param('genre') genre: string): Promise<Book[]> {
    return this.searchService.searchByGenre(genre);
  }
}
