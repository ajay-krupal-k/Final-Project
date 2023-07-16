import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.authService.currentUser().subscribe(response => {
        this.isLoggedIn = true
      }, error => {
        this.isLoggedIn = false
      })

      if(!this.isLoggedIn){
        this.router.navigate(["/login"])
        return false
      }

      return true
  }

}
