import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
@Component({
  selector: 'app-new-review-form',
  templateUrl: './new-review-form.component.html',
  styleUrls: ['./new-review-form.component.scss']
})
export class NewReviewFormComponent {
  success:boolean;
  constructor( private bookService: BookServiceService ) { }

  submit(review) {
    review.bibNum = localStorage.getItem('bib_no');
    this.bookService.postReviews(review).subscribe((response) => {
      if(response){
        this.success = true;
        alert("Message inserted");
      }
      else{
        this.success = false;
        alert("Error")
      }
    },
    (error) => {
      console.log(error);
    });
  }
}
