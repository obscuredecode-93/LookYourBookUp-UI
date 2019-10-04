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

  constructor(private http:HttpClient) { }
  getAll(pageNumber: number){
  	return this.http.get<Book[]>('http://localhost:8080/api/books/' + pageNumber)
  }
  getAllCategories(){
    return this.http.get<string[]>('http://localhost:8080/api/books/getTypes')
  }
  getBookByBibnum(bibnum){
    return this.http.get<Book>('http://localhost:8080/api/books/getDetails/'+ bibnum);
  }
  getConditionByBibnum(bibnum){
    return this.http.get<Condition[]>('http://localhost:8080/api/conditions/get/'+ bibnum);
  }
  getReviewsByBibnum(bibnum){
    return this.http.get<Review[]>('http://localhost:8080/api/reviews/get/'+ bibnum);
  }
  searchBooks(bookTitle,bookType,bookCondition, pageNumber){
    return this.http.get<Book[]>('http://localhost:8080/api/books/filterBooks',{
      params:{
        bookTitle: bookTitle,
        bookType:bookType,
        bookCondition: bookCondition,
        pageNumber: pageNumber
      }
    });
  }
  postConditions(condition){
    return this.http.post('http://localhost:8080/api/conditions/insert', condition);
  }
  postReviews(review){
    return this.http.post('api/reviews/insert', review);
  }
}
