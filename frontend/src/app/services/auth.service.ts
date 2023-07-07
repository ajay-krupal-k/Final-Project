import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from "../auth"


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(password: string, confirmPassword:string, token: string): Observable<Auth> {
    const signUpURL = `http://localhost:5000/register?token=${token}`
    return this.http.post<Auth>(
      signUpURL,
      {
        password: password,
        cpassword: confirmPassword,
      }
    )
  }
}
