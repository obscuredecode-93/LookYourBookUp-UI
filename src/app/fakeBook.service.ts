import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let books =  [
    {
        "title": "title1",
        "subjects": "subjects of 1,all subjects1",
        "type": "book",
        "bib_num": "bibnum1"
    },
    {
        "title": "title2",
        "subjects": "subjects of 2 , all subjects2",
        "type": "cd",
        "bib_num": "bibnum2"
    },
    {
        "title": "title3",
        "subjects": "subjects of 3,all subjects3",
        "type": "cd",
        "bib_num": "bibnum3"
    }
]
let categories = [
    "microfilm",
    "book",
    "dvd",
    "cd-rom",
    "cd"
]
let condition = 
    [
        {
            "barcode": "barcode1",
            "bibNum": "bibnum1",
            "bookCondition":   4,
            "userId": "user1"
        },
        {
            "barcode": "barcode14",
            "bibNum": "bibnum1",
            "bookCondition": 2,
            "userId": "user4"
        },
        {
            "barcode": "barcode14",
            "bibNum": "bibnum2",
            "bookCondition": 3,
            "userId": "user4"
        },
        {
            "barcode": "barcode14",
            "bibNum": "bibnum3",
            "bookCondition": 3,
            "userId": "user4"
        }
    ]
    let reviews = [
        {
            "reviewId": 1,
            "userId": "user4",
            "bibNum": "bibnum3",
            "reviewHeading": "good book",
            "reviewRating": 4,
            "reviewDescription": "rev des 1",
            "recommend": "yes"
        },
        {
            "reviewId": 1,
            "userId": "user4",
            "bibNum": "bibnum3",
            "reviewHeading": "good book",
            "reviewRating": 4,
            "reviewDescription": "rev des 1",
            "recommend": "yes"
        },
        {
            "reviewId": 1,
            "userId": "user2",
            "bibNum": "bibnum2",
            "reviewHeading": "good book",
            "reviewRating": 4,
            "reviewDescription": "rev des 1",
            "recommend": "yes"
        },
        {
            "reviewId": 1,
            "userId": "user1",
            "bibNum": "bibnum1",
            "reviewHeading": "good book",
            "reviewRating": 4,
            "reviewDescription": "rev des 1",
            "recommend": "yes"
        },
        {
            "reviewId": 1,
            "userId": "user4",
            "bibNum": "bibnum3",
            "reviewHeading": "good book",
            "reviewRating": 4,
            "reviewDescription": "rev des 1",
            "recommend": "yes"
        }
    ]
    
@Injectable({
    providedIn: 'root'
})
export class FakeBookService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/books') && method === 'GET':
                    return getAllBooks();
                case url.endsWith('/api/books/getTypes') && method === 'GET':
                        return getAllBookTypes();
                case url.match(/\/api\/books\/getDetails\/.*$/) && method === 'GET':
                            return getBookByBibnum();
                case url.match(/api\/conditions\/get\/.*$/) && method === 'GET':
                            return getConditionByBibNum();
                case url.match(/api\/reviews\/get\/.*$/) && method === 'GET':
                                return getReviewsByBibNum();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getAllBooks() {
            return ok(books);
        }
        function getAllBookTypes(){
            return ok(categories);
        }
        function getBookByBibnum(){
        //console.log(books.filter(book => book.bib_num == getBibNumFromUrl().valueOf())[0]);
        return ok(books.filter(book => book.bib_num == getBibNumFromUrl().valueOf())[0]);
        }
        function getConditionByBibNum(){
            return ok(condition.filter(book => book.bibNum === getBibNumFromUrl()));
        }
        function getReviewsByBibNum(){
            return ok(reviews.filter(book => book.bibNum === getBibNumFromUrl()));
        }
        function get(){
            return ok(categories);
        }
        function getListOfCategories(){
            return ok()     
        }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
        function getBibNumFromUrl(){
            const urlParts = url.split('/');
            return urlParts[urlParts.length-1];
        }
    }
}

export const FakeBookProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBookService,
    multi: true
};