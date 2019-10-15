import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DataTableResource } from 'angular5-data-table';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  books: Book[];
  tableResource: DataTableResource<Book>;
  categories = [];
  items: Book[] = [];
  booksCount: number;
  pageNumber = 1;
  offset = 0;

  constructor(private booksService: BookServiceService) {
    this.displayBooks();
    this.populateCategoryDropDown();
  }

  async displayBooks() {
    this.booksService.getItemCount().subscribe((response) => {
      this.booksCount = response;
    });
    await this.booksService.getAll(this.pageNumber).subscribe(response => {
      this.books = response;
      this.initializeTable(this.books);
    },
    error => console.log(error));
  }

  populateCategoryDropDown() {
    this.booksService.getAllCategories().subscribe(response => {
      response.forEach(category => this.categories.push(category));
    });
  }

  filterBooks({bookTitle, bookType, bookCondition}) {
    if (bookCondition === '') {
      bookCondition = '0';
    }
    if (bookTitle === '' && bookType === '' && bookCondition === '0') {
      this.booksService.getItemCount().subscribe((response) => {
        this.booksCount = response;
      });
    } else {
      this.booksService.getFilteredCount(bookTitle, bookType, bookCondition).subscribe((response) => {
        this.booksCount = response;
      });
    }
    this.booksService.searchBooks(bookTitle, bookType, bookCondition, this.pageNumber).subscribe((books) => {
      this.books = books;
      this.initializeTable(this.books);
    });
  }

  private initializeTable(books: Book[]) {
    this.tableResource = new DataTableResource(books);
    this.items = this.books;
    console.log(this.books);
    console.log(this.items);
   }

   reloadItems(params) {
    if (!this.tableResource) { return; }
    console.log(this.pageNumber);
    if (this.offset > params.offset) {
      this.pageNumber--;
    } else if (this.offset < params.offset) {
      this.pageNumber++;
    }
    this.offset = params.offset;
    console.log(this.pageNumber);
    this.displayBooks();
   // this.pageNumber = this.tableResource
    this.tableResource.query(params)
    .then(items => this.items = items);
  }
}
