import { AuthGuardService } from './auth-guard.service';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService) {
    // super(auth);
   }

  canActivate() {


        // console.log("hi");
        // var isAuthenticated = super.canActivate();

        // return isAuthenticated ? this.authService.isInRole("Admin") : false;

        if (this.authService.isAuthenticated()) {
          return this.authService.isInRole('Admin') ? true : false;
      } else {
          this.authService.login();
  }
    // const isAuthenticated = super.canActivate();

    // return isAuthenticated ? this.auth.isInRole('Admin') : false;
  }
}
