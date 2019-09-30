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
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    ReturnComponentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'books', component: BookListComponent},
      {path:'condition',component: ReturnComponentComponent}
    ])
  ],
  providers: [FakeBookProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
