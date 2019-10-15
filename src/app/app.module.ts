/* App Module is where all the dependancies are declared */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { BookDisplayComponent } from './book-display/book-display.component';
import { NewConditionFormComponent } from './new-condition-form/new-condition-form.component';
import { NewReviewFormComponent } from './new-review-form/new-review-form.component';
import { BookServiceService } from './book-service.service';
import { ConditionReportComponent } from './condition-report/condition-report.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HomeComponent,
    BookDisplayComponent,
    NewConditionFormComponent,
    NewReviewFormComponent,
    ConditionReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'books', component: BookListComponent},
      {path: 'books/getDetails/:id', component: BookDisplayComponent},
      {path: 'books/newConditionForm', component: NewConditionFormComponent},
      {path: 'books/newReviewForm', component: NewReviewFormComponent},
      {path: 'books/conditionReport', component: ConditionReportComponent}
    ])
  ],
  providers: [BookServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
