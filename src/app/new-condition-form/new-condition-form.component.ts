import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DataTableResource } from 'angular5-data-table';
import { Condition } from '../models/Condition';

@Component({
  selector: 'app-new-condition-form',
  templateUrl: './new-condition-form.component.html',
  styleUrls: ['./new-condition-form.component.scss']
})
export class NewConditionFormComponent {
  success:boolean;
  reportCondition: string;
  conditionTableResource: DataTableResource<Condition>;
  bookConditions:Condition[] = [];
  bookCount:number = 0;
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
  
  getReport(){
    if (this.reportCondition === '') {
      this.reportCondition = '0';
    }
    this.bookservice.getReport(this.reportCondition).subscribe((response) => {
      this.bookConditions = response.bookConditions;
      this.bookCount = response.bookCount;
      this.conditionTableResource = new DataTableResource(this.bookConditions); 
    });

  }
}
