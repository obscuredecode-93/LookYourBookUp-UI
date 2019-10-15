import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DataTableResource } from 'angular5-data-table';
import { Condition } from '../models/Condition';


@Component({
  selector: 'app-condition-report',
  templateUrl: './condition-report.component.html',
  styleUrls: ['./condition-report.component.scss']
})
export class ConditionReportComponent{
  reportCondition: string;
  conditionTableResource: DataTableResource<Condition>;
  bookConditions:Condition[] = [];
  bookCount:number = 0;

  constructor( private bookservice: BookServiceService ) { }

  getReport(){
    if (this.reportCondition === '' || this.reportCondition == undefined) {
      this.reportCondition = '0';
    }
    this.bookservice.getReport(this.reportCondition).subscribe((response) => {
      this.bookConditions = response.bookConditions;
      this.bookCount = response.bookCount;
      this.conditionTableResource = new DataTableResource(this.bookConditions); 
    },
    (error) => {
      alert("You got error! Please try again");
    });

  }
}
