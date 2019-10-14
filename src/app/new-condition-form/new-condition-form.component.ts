import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-new-condition-form',
  templateUrl: './new-condition-form.component.html',
  styleUrls: ['./new-condition-form.component.scss']
})
export class NewConditionFormComponent {
  success:boolean;
  constructor( private bookservice: BookServiceService ) { }

  submit(condition) {
    this.bookservice.postConditions(condition).subscribe((response) => {
      console.log('Insert Successful!');
      if(response){
        this.success = true
      }
      else{
        this.success = false;
      }
    },
    (error) => {
      console.log('Insert not successful');
      this.success = false;
    });
  }
}
