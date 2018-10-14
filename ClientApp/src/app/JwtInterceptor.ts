import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available


        const token = localStorage.getItem('id_token');

        if (token) {

            // const cloned = req.clone({
            //    headers: req.headers.set("Authorization",
            //        "Bearer " + token)
            // });
            request = request.clone({
                headers: request.headers.set('Authorization',
                    'Bearer ' + token)
                // setHeaders: {
                //    "Authorization": `Bearer ${token}`

                // }
            });
           // console.log(request);
        }
        return next.handle(request);
    }
}
