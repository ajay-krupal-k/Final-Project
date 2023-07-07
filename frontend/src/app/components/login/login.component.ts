import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!: string;

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const email = form.value.email
    const password = form.value.password

    this.authService.signIn(email, password)
      .subscribe(response => {
        this.errorMessage = ''
        console.log('Logged In', response)
      }, error => {
        this.errorMessage = 'Check your Email ID and Password'
        console.log('Error Logging In', error)
      })
  }
}
