import { Component } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BooksApp';
    constructor() {
    }
}
