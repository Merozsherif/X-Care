import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


// import { AuthenticationService } from '../components/auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( private toastr: ToastrService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
console.log(
  err.error
);


            switch (err.status) {
                case 401:
                        this.toastr.error(err.error.detail);
                    break;
                    case 400:
// if(err.error.non_field_errors){
//   this.toastr.error('Like or Dislike had Added to the Post');
//   return
// }

                        this.toastr.error(err.error.email[0]? err.error.email[0] :'Faild to do this action please try again later!');
                        console.log(err.error)
                    break;

                    case 403:
                      this.toastr.error(err.error.detail?err.error.detail:err.error.message);
                  break;
                    case 404:
                        this.toastr.error(err.error.detail?err.error.detail:err.error.message);
                    break;
                case 500:
                    this.toastr.error(
                      err.error.detail);
                    break;

                default:
                    try {
                      err.error.details.forEach((error:any) => {
                        this.toastr.error(error.error.detail);
                    });
                    } catch (error) {

                    }

                    break
            }
            const error = err?.error?.detail || err?.statusText;
            return throwError(error);
        }))
    }
}
