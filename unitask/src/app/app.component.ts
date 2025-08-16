import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
import {Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor(
    private router: Router,
    private msalService: MsalService
  ) {
    //process microsoft redirect response 
   // this.msalService.instance.handleRedirectPromise();
    //check if user is already authenticated when app loads
    const accounts = this.msalService.instance.getAllAccounts();
    if(accounts.length > 0) {
      //if an accounts exists, navigate directly to the homepage
      this.router.navigateByUrl('/home');
    }
  }
}
