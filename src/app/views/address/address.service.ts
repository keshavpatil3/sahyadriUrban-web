import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor( private http: HttpClient) { }

  public addNewState(data:any): Observable<any> {

    // let baseUrl = this.ApiService.getBaseUrl();
    // let controllerUrl = this.ApiService.getBaseControllerUrl();
    // let Url = baseUrl + controllerUrl + "/master" + "/vehicle" + "/fetchAllVehicles";
    let Url=''
    return this.http.get(Url)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }
}
