import { Body, Controller, Param, Post } from '@nestjs/common';
import { SearchService } from '../../services/search.service';
import { Aggregate } from 'mongoose';
import { Book } from '../../schemas/book.schema';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post('books/general')
  searchTypeGeneral(@Body() body): Promise<Array<any>> {
    return this.searchService.searchTypeGeneral(body);
  }

  @Post('books/:genre')
  search(@Param('genre') genre: string): Promise<Book[]> {
    return this.searchService.searchByGenre(genre);
  }
}
