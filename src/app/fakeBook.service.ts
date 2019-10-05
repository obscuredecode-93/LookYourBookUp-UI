
// Taken from - https://jasonwatmore.com/post/2019/05/02/angular-7-mock-backend-example-for-backendless-development


import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// array in local storage for registered users
const bookspageOne =  [
    {
        title: 'title1',
        subjects: 'subjects of 1,all subjects1',
        type: 'book',
        bib_num: 'bibnum1'
    },
    {
        title: 'title2',
        subjects: 'subjects of 2 , all subjects2',
        type: 'cd',
        bib_num: 'bibnum2'
    },
    {
        title: 'title3',
        subjects: 'subjects of 3,all subjects3',
        type: 'cd',
        bib_num: 'bibnum3'
    }
];
const bookspageTwo =  [
    {
        title: 'title4',
        subjects: 'subjects of 1,all subjects1',
        type: 'book',
        bib_num: 'bibnum4'
    },
    {
        title: 'title5',
        subjects: 'subjects of 2 , all subjects2',
        type: 'cd',
        bib_num: 'bibnum5'
    },
    {
        title: 'title6',
        subjects: 'subjects of 3,all subjects3',
        type: 'cd',
        bib_num: 'bibnum6'
    }
];
const categories = [
    'microfilm',
    'book',
    'dvd',
    'cd-rom',
    'cd'
];
const condition =
    [
        {
            barcode: 'barcode1',
            bibNum: 'bibnum1',
            bookCondition:   4,
            userId: 'user1'
        },
        {
            barcode: 'barcode14',
            bibNum: 'bibnum1',
            bookCondition: 2,
            userId: 'user4'
        },
        {
            barcode: 'barcode14',
            bibNum: 'bibnum2',
            bookCondition: 3,
            userId: 'user4'
        },
        {
            barcode: 'barcode14',
            bibNum: 'bibnum3',
            bookCondition: 3,
            userId: 'user4'
        }
    ];
const reviews = [
        {
            reviewId: 1,
            userId: 'user4',
            bibNum: 'bibnum3',
            reviewHeading: 'good book',
            reviewRating: 4,
            reviewDescription: 'rev des 1',
            recommend: 'yes'
        },
        {
            reviewId: 1,
            userId: 'user4',
            bibNum: 'bibnum3',
            reviewHeading: 'good book',
            reviewRating: 4,
            reviewDescription: 'rev des 1',
            recommend: 'yes'
        },
        {
            reviewId: 1,
            userId: 'user2',
            bibNum: 'bibnum2',
            reviewHeading: 'good book',
            reviewRating: 4,
            reviewDescription: 'rev des 1',
            recommend: 'yes'
        },
        {
            reviewId: 1,
            userId: 'user1',
            bibNum: 'bibnum1',
            reviewHeading: 'good book',
            reviewRating: 4,
            reviewDescription: 'rev des 1',
            recommend: 'yes'
        },
        {
            reviewId: 1,
            userId: 'user4',
            bibNum: 'bibnum3',
            reviewHeading: 'good book',
            reviewRating: 4,
            reviewDescription: 'rev des 1',
            recommend: 'yes'
        }
    ];

@Injectable({
    providedIn: 'root'
})
export class FakeBookService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body, params } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.match(/\/api\/books\/\d+$/) && method === 'GET':
                    return getAllBooks();
                case url.endsWith('/api/books/getTypes') && method === 'GET':
                        return getAllBookTypes();
                case url.match(/\/api\/books\/getDetails\/.*$/) && method === 'GET':
                            return getBookByBibnum();
                case url.match(/api\/conditions\/get\/.*$/) && method === 'GET':
                            return getConditionByBibNum();
                case url.match(/api\/reviews\/get\/.*$/) && method === 'GET':
                            return getReviewsByBibNum();
                case url.endsWith('api/conditions/insert') && method === 'POST':
                            return insertCondition();
                case url.endsWith('api/reviews/insert') && method === 'POST':
                            return insertReview();
                case url.match(/filterBooks/) && method === 'GET':
                            return filterBooks();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        function getAllBooks() {
            const pageNumber = getPageNumberFromUrl();
            switch (pageNumber) {
                case 1: return ok(bookspageOne);
                case 2: return ok(bookspageTwo);
            }
        }
        function getAllBookTypes() {
            return ok(categories);
        }
        function getBookByBibnum() {
            return ok(bookspageOne.filter(book => book.bib_num == getBibNumFromUrl().valueOf())[0]);
        }
        function getConditionByBibNum() {
            return ok(condition.filter(book => book.bibNum === getBibNumFromUrl()));
        }
        function getReviewsByBibNum() {
            return ok(reviews.filter(book => book.bibNum === getBibNumFromUrl()));
        }
        function insertReview() {
            const newReview = body;
            reviews.push(newReview);
            return ok(true);
        }
        function insertCondition() {
            const newCondition = body;
            condition.push(newCondition);
            return ok(true);
        }
        function filterBooks() {
            const filteredBooks = getFilterValueFromUrl();
            return ok(filteredBooks);
        }

        // helper functions
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }
        function getBibNumFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }
        function getPageNumberFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function getFilterValueFromUrl() {
            // const urlParts = url.split('/');
            console.log(params);
            switch (parseInt(params.get('pageNumber'))) {
                case 1: return bookspageOne;
                case 2: return bookspageTwo;
            }
        }
    }
}

export const FakeBookProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBookService,
    multi: true
};
