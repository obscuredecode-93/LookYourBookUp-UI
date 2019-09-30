import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DataTableModule } from 'angular5-data-table';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  books = []
  constructor(private booksService: BookServiceService) {
    this.displayBooks(); 
    this.populateCategoryDropDown();
  }
  displayBooks(){
    this.booksService.getAll().subscribe(response => {
      response.forEach((data) => {
        console.log(data)
      });
    },
    error => console.log(error));
  }

  populateCategoryDropDown(){
    this.booksService.getAllCategories().subscribe(response => {
      response.forEach((data) => console.log(data))
    })
  }


}
