import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { BookServiceService} from '../book-service.service';
import { Book } from '../models/Book';
import { Condition } from '../models/Condition';
import { Review } from '../models/Review';
import 'rxjs/add/operator/map';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent {
  bib_no: string;
  book: Book;
  book$;
  condition$;
  condition: Condition[];
  review: Review[];
  conditionTableResource: DataTableResource<Condition>;
  reviewTableResource: DataTableResource<Review>;
  items: any[] = [];
  reviewItems: any[] = [];
  itemCount: number;
  reviewItemCount: number;
   constructor(private route: ActivatedRoute, private booksService: BookServiceService) {
    const url =  route.snapshot.url;
    this.bib_no = url[2].path;
    localStorage.setItem('bib_no', this.bib_no);
    this.initializeValues();
   // console.log(this.bib_no);
  }

  private async initializeValues() {
    this.book$ = await this.booksService.getBookByBibnum(this.bib_no);
    this.condition$ = await this.booksService.getConditionByBibnum(this.bib_no);
    /* await this.booksService.getBookByBibnum(this.bib_no).subscribe(book => {
      this.book = book;
      console.log(book)
    }); */
    await this.booksService.getConditionByBibnum(this.bib_no).subscribe(condition => {this.condition = condition;
                                                                                       this.initializeConditionTable(condition); });
    await this.booksService.getReviewsByBibnum(this.bib_no)
      .subscribe(review => {this.review = review; this.initializeReviewsTable(review); });
  }
  private initializeConditionTable(condition: Condition[]) {
    this.conditionTableResource = new DataTableResource(condition);
    this.conditionTableResource.query({ offset: 0 })
    .then(items => this.items = items);
    this.conditionTableResource.count()
     .then(count => this.itemCount = count);
   }
   private initializeReviewsTable(review: Review[]) {
    this.reviewTableResource = new DataTableResource(review);
    this.reviewTableResource.query({ offset: 0 })
    .then(reviewItems => this.reviewItems = reviewItems);
    this.conditionTableResource.count()
     .then(count => this.reviewItemCount = count);
   }
}
