import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReturnComponentComponent } from './return-component/return-component.component';
import { HomeComponent } from './home/home.component';
import { FakeBookProvider } from './fakeBook.service';
import { BookServiceService } from './book-service.service';
import { DataTableModule } from 'angular5-data-table';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BookDisplayComponent } from './book-display/book-display.component';
import { NewConditionFormComponent } from './new-condition-form/new-condition-form.component';
import { NewReviewFormComponent } from './new-review-form/new-review-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    ReturnComponentComponent,
    HomeComponent,
    BookDisplayComponent,
    NewConditionFormComponent,
    NewReviewFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    DataTableModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'books', component: BookListComponent},
      {path:'condition',component: ReturnComponentComponent},
      {path:'books/getDetails/:id',component:BookDisplayComponent}
    ])
  ],
  providers: [FakeBookProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
