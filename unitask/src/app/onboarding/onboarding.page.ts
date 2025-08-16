import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router } from '@angular/router';




@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false
})
export class OnboardingPage implements OnInit {
  //gets ref to the slide ionslides element in the html 
@ViewChild('SwipeRef', {static:false}) swiperRef!: ElementRef<any>;

  constructor(private router: Router) { }

  //Move to the next slide
  next(){
    const swiper = this.swiperRef.nativeElement.swiper;
    swiper.slideNext
  }

  //finish onboarding and go to home, i also stored a flag so it only shows once 
  finish(){
    localStorage.setItem('onboardingShown', 'true');
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
  }

}
