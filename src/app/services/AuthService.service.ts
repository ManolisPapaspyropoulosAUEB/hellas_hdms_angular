import { Injectable } from '@angular/core';
import { RemoteDataService } from './RemoteDataService.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  constructor(private remoteDataService:RemoteDataService, private http:HttpClient) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id');
    return token != null;
  }

  logIn(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "login", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  registration(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "register", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
