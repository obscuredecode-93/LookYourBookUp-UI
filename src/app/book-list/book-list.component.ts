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

  books : Book[];
  tableResource: DataTableResource<Book>;
  categories = [];
  items: Book[] = [];
  itemCount: number;
  constructor(private booksService: BookServiceService) {
    this.displayBooks(); 
    this.populateCategoryDropDown();
  }
  async displayBooks(){
    await this.booksService.getAll().subscribe(response => {
      this.books = response;
      this.initializeTable(this.books);
    },
    error => console.log(error));
  }

  populateCategoryDropDown(){
    this.booksService.getAllCategories().subscribe(response => {
      response.forEach(category => this.categories.push(category));
      console.log(this.categories);
    })
  }

  private initializeTable(books: Book[]){
    this.tableResource = new DataTableResource(books);
    console.log(books);
    this.tableResource.query({ offset: 0 })
    .then(items => this.items = items);
    this.tableResource.count()
     .then(count => this.itemCount = count);
   }


}
