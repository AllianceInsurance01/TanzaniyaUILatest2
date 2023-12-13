import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { AuthService } from '../../Auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public CryKey: any = 'MaaN';
  public Token: any;
  public menuList:any[]=[];
  constructor(

    private http: HttpClient,
    private authService : AuthService
  ) { }

  getToken() {
    this.authService.isloggedToken.subscribe((event: any) => {
      if (event != undefined && event != '' && event != null) {
        this.Token = event;
      } else {
        this.Token = sessionStorage.getItem("UserToken");
      }
    });
    return this.Token;
  }







  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  onPostMethodBearerSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  onPostMethodBasicSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    return this.http
      .post<any>(UrlLink, ReqObj)
      .pipe(retry(1), catchError(this.handleError));
  }
  public getIPAddress(){  
    return this.http.get("http://api.ipify.org/?format=json");  
  } 
  onGetMethodSync(UrlLink: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  errorService(dataList){
    for(let data of dataList){
    //   let type: NbComponentStatus = 'danger';
    //   const config = {
    //     status: type,
    //     destroyByClick: true,
    //     duration: 2000,
    //     hasIcon: true,
    //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //     preventDuplicates: false,
    //   };
    //   this.toastrService.show(
    //     data.Field,
    //     data.Message,
    //     config);
     }
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
