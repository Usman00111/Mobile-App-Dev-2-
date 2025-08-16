import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private msalService: MsalService) {}

  login() {
    const loginRequest: RedirectRequest = {
      scopes: ['user.read'] //ms grapgh scope to read profilee
    };
    this.msalService.loginRedirect(loginRequest);
  }
  
}
