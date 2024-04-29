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

    const token = localStorage.getItem('userToken');
    console.log('ISRAAAAAAAAA');
    console.log(token);

    let x = request.clone({
      url: baseUrl + request.url,
      setHeaders: {
        // 'Authorization':'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGVzIjpbIkFkbWluIiwiY2FuQWRkVXNlciIsImNhblVwZGF0ZVVzZXIiLCJjYW5EZWxldGVVc2VyIiwiY2FuR2V0VXNlckJ5SWQiLCJjYW5HZXRDdXJyZW50VXNlciIsImNhbkdldEFsbFVzZXJzIiwiY2FuQ2hhbmdlUGFzc3dvcmQiXSwidXNlck5hbWUiOiJzaGltYWExIiwidXNlckVtYWlsIjoic2hpbWFhc2FlZWQxNzNAeWFob28uY29tIiwidXNlckdyb3VwIjoiU3VwZXJBZG1pbiIsImlhdCI6MTcxNDI1NDEyNCwiZXhwIjoxNzE3ODU0MTI0fQ.jiJL1DhfjcKI8t_0BRuDtFKBm-DKnYfy2oJq89oYuqTDJkIbsWIn5QIcrHKb-4OibRx9uWf2kSM_-hN6F456mqOP01uRK5JgEBuRg1UZshtab7llMYxt410PB-1STxTBPQKQz1_qdeAuH2TPcCkV5dtvlsPVAekxAz7cbQbhQYNn4XftO1TMctJykP0rlVmN1tUpHHamLu7ZMqju6nDkKwqgeXgHqmaC4QHGHrOvJ23ggJWHAPySuH0ACUEPqFayRt23kTFQrh7nj6OUOqJ6BVQGxMbHObPPt5T0lR6cE9V9BqCw-TpKMYB1A1pBELkf2_p0v9ZKzAAoAP7AKoiMWw'
        // 'Authorization': '${token}'
        'Authorization': `Bearer ${token}`
        // 'Authorization': 'Bearer ${token}' //TODO: optional syntax currently but some API's need a 'Bearer' before the token
      }
    })
    return next.handle(x);
  }
}
