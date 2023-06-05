import { CustomLoadingService } from './shared/custom-loading.service';
import { AuthService } from './Auth/auth.service';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared/Services/shared.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-app',
  template: `
  <router-outlet></router-outlet>
  <ng-container *ngIf="loading$ | async">
  <div class="overlay"></div>
  <div class='visionloading'>
    <div class="loader-box">
       <div class="spinner-loader-gif">
        <img  src='./assets/images/loader-1.gif'>
       </div>
       <div class="spinner-loader-img">
         <div class='img-tag'></div>
       </div>
    </div>
  </div>
</ng-container>
  `,
})
export class AppComponent implements OnInit, AfterContentChecked {
  public userdetails: any;
    public loading$!: Observable<any>;
  constructor(
    private authService: AuthService,
    public customLoder: CustomLoadingService,
    private cdr: ChangeDetectorRef,
    public _sharedService: SharedService,

  ) {
    this.userdetails = JSON.parse(sessionStorage.getItem('Userdetails') || '{}');
    this.authService.login(this.userdetails);
    console.log(this.userdetails);
  }

  ngOnInit(): void {
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }

  ngAfterContentChecked() {
    this.loading$ = this.customLoder.loader;
    this.cdr.detectChanges();
  }
}
