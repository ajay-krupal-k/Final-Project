import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  token!: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const token: string = params['token']
      if (token) {
        try {
          jwt_decode(token);
          this.token = token
        } catch (error: any) {
          this.router.navigate(['/404'])
        }
      }
      else {
        this.router.navigate(['/404'])
      }
    })

  }



  onSubmit(form: NgForm) {
    console.log('here')
    const password = 'Welcome@123456';
    const confirmPassword = 'Welcome@123456';

    this.authService.signUp(password, confirmPassword, this.token)
      .subscribe(response => {
        console.log('Sign Up Data', response)
      }, error => {
        console.log('Sign Up Error', error)
      })

  }


}
