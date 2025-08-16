import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false
})
export class OnboardingPage  {

  // Will hold the Swiper instance after initialisation
  private swiperInstance: any;

  constructor(private router: Router) {}

  // Event handler called when Swiper is fully initialised
  onSwiperInit(event: any) {
    this.swiperInstance = event.target.swiper;
  }

  // Move to next slide
  next() {
    this.swiperInstance?.slideNext();
  }

  // Finish and go to home (only shown first time)
  finish() {
    localStorage.setItem('onboardingShown', 'true');
    this.router.navigateByUrl('/home');
  }
}
