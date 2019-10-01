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
    }
}

export const FakeBookProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBookService,
    multi: true
};