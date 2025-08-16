import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  //injecting custom loginservice
  constructor(private loginService: LoginService) { }

  //triggered when user taps the button in the html 
  loginWithMicrosoft(){
    //this calls service which performs the msal login redirect 
   // this.loginService.login(); 
   this.router.navigateByUrl('/onboarding');
  }

  ngOnInit() {
  }

}
