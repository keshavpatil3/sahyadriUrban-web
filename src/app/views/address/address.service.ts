import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, } from 'app/shared/services/auth/api.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public addStateMaster(data: any): Observable<any> {

    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/addStateMaster";
    return this.http.post(Url, data)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  public addDistrictMaster(data: any): Observable<any> {

    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/addDistrictMaster";
    return this.http.post(Url, data)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  public addCityMaster(data: any): Observable<any> {

    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/addCityMaster";
    return this.http.post(Url, data)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  public addTalukaMaster(data: any): Observable<any> {

    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/addTalukaMaster";
    return this.http.post(Url, data)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }


  public addLocationMaster(data: any): Observable<any> {

    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/addLocationMaster";
    return this.http.post(Url, data)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }
  public fetchStateMaster(): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      })
    };
    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/fetchStateMaster"

    return this.http.get(Url, headers)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }
  public fetchDistrictMaster(): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      })
    };
    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/fetchDistrictMaster";

    return this.http.get(Url, headers)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }


  public fetchStateWiseDistrict(state: any): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      })
    };
    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/fetchStateWiseDistrict?" + 'state=' + state;

    return this.http.get(Url, headers)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  public editStateMaster(stateId: number, data: any): Observable<any> {
    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = `${baseUrl}${controllerUrl}/address/editStateMaster/${stateId}`;
  
    console.log("Updating State with URL:", Url, "Payload:", data); // Debugging
  
    return this.http.put(Url, data).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error("Error in update API:", err);
        if (err.status === 404) {
          console.error("404 Not Found error. Check the URL and backend API.");
        } else {
          console.error("Error updating state:", err);
        }
        return throwError(err);
      })
    );
  }

  public fetchDistrictWiseTaluka(state: string, district: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      })
    };
    let baseUrl = this.apiService.getBaseUrl();
    let controllerUrl = this.apiService.getBaseControllerUrl();
    let Url = baseUrl + controllerUrl + "/address" + "/fetchDistrictWiseTaluka?" + 'state=' + state + '&district=' + district;

    return this.http.get(Url, headers)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }
  
}
