import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Book } from './models/Book';
import {Condition } from './models/Condition';
import {Review } from './models/Review';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }
  getAll(pageNumber: number) {
    // tslint:disable-next-line:indent
  	return this.http.get<Book[]>('http://localhost:8080/api/books/' + pageNumber);
  }
  getItemCount() {
    return this.http.get<number>('http://localhost:8080/api/books/getTotalBookCount');
  }
  getAllCategories() {
    return this.http.get<string[]>('http://localhost:8080/api/books/getTypes');
  }
  getReport(condition) {
    return this.http.get<any>('http://localhost:8080/api/books/getReport' + condition);
  }
  getBookByBibnum(bibnum) {
    return this.http.get<Book>('http://localhost:8080/api/books/getDetails/' + bibnum);
  }
  getConditionByBibnum(bibnum) {
    return this.http.get<Condition[]>('http://localhost:8080/api/conditions/get/' + bibnum);
  }
  getReviewsByBibnum(bibnum) {
    return this.http.get<Review[]>('http://localhost:8080/api/reviews/get/' + bibnum);
  }
  searchBooks(bookTitle, bookType, bookCondition, pageNumber) {
    return this.http.get<Book[]>('http://localhost:8080/api/books/filterBooks', {
      params: {
        bookTitle,
        bookType,
        bookCondition,
        pageNumber
      }
    });
  }
  getFilteredCount(bookTitle, bookType, bookCondition) {
    return this.http.get<number>('http://localhost:8080/api/books/filterBooksCount', {
      params: {
        bookTitle,
        bookType,
        bookCondition
      }
    });
  }
  postConditions(condition) {
    return this.http.post('http://localhost:8080/api/conditions/insert', condition);
  }
  postReviews(review) {
    return this.http.post('http://localhost:8080/api/reviews/insert', review);
  }
}
