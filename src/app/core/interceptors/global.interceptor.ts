import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request)
    const baseUrl = 'https://upskilling-egypt.com:3006/api/v1/';

    let x = request.clone({
      url: baseUrl + request.url
    })
    return next.handle(x);
  }
}
