import { Component } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BooksApp';
  constructor(private router: Router) { }

  redirect = (url: string) => {
    this.router.navigateByUrl(url);
  }
}
