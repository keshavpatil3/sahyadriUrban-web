import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  private bearToken : string | null = null;
  
  private baseUrl = environment.baseurl

  getBaseUrl(): string {
    return this.baseUrl;
  }

  public getBaseControllerUrl(): string {
    let controller = "/app/api";
    return controller;
  }


  // getToken() {
  //   this.bearToken = this.JwtAuthService.getToken();
  //   return this.bearToken
   
  // }
}
