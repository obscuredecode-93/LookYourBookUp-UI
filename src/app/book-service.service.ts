import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Book } from './models/Book';


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
  
}
