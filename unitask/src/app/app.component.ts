import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
import {Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LocalNotifications } from '@capacitor/local-notifications'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor(
    private router: Router,
    private msalService: MsalService, 
  ) {
    //Ask for Local Notifications permission once at app start
    void this.ensureNotifPermission();
    //process microsoft redirect response 
   // this.msalService.instance.handleRedirectPromise();
    //check if user is already authenticated when app loads
    const accounts = this.msalService.instance.getAllAccounts();
    if(accounts.length > 0) {
      //if an accounts exists, navigate directly to the homepage
      this.router.navigateByUrl('/home');
    }
  }
  //helper: request permission if not already granted
  private async ensureNotifPermission(): Promise<void> {
    try {
      const { display } = await LocalNotifications.checkPermissions();
      if (display !== 'granted') {
        await LocalNotifications.requestPermissions();
      }
    } catch (err) {
      // Don’t crash in web/emulator; LocalNotifications may be unavailable there
      console.warn('LocalNotifications permission request skipped/failed:', err);
    }
  }
}
