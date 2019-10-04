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
  getAll(){
  	return this.http.get<Book[]>('/api/books')
  }
  getAllCategories(){
    return this.http.get<string[]>('/api/books/getTypes')
  }
  getBookByBibnum(bibnum){
    return this.http.get<Book>('/api/books/getDetails/'+ bibnum);
  }
  getConditionByBibnum(bibnum){
    return this.http.get<Condition[]>('api/conditions/get/'+ bibnum);
  }
  getReviewsByBibnum(bibnum){
    return this.http.get<Review[]>('api/reviews/get/'+ bibnum);
  }
  postConditions(condition){
    return this.http.post('api/conditions/insert',condition);
  }
  postReviews(review){
    return this.http.post('api/reviews/insert',review);
  }
}
