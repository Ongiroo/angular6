import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(protected authService: AuthService) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.login();
      // window.location.href = 'https://amgalan.eu.auth0.com/login?client=RfRu3un13aOO73C7X2mH41qxfHRbUc33';
      return false;
    }
  }
}
