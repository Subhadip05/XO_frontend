import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{


    constructor(private login : LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token which is stored in local storage , request and can access api
        let authRe = req;
        const token = this.login.getToken();
        console.log("Inside interseptor");
        if(token != null){
            authRe = authRe.clone({
                setHeaders : {Authorization:`Bearer ${token}`},
            });
        }
        return next.handle(authRe);
    }   
}


export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true,
    },
];