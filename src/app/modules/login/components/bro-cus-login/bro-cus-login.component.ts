import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import * as Mydatas from '../../../../app-config.json';
import { AuthService } from '../../../../Auth/auth.service';

@Component({
  selector: 'app-bro-cus-login',
  templateUrl: './bro-cus-login.component.html',
  styleUrls: ['./bro-cus-login.component.scss'],
})
export class BroCusLoginComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public loginForm!: FormGroup;
  public submitted = false;
  public regionList: any[] = [];
  public branchList: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
  ) {
    sessionStorage.clear();
   }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onGetRegionList();
  }

  onCreateFormControl() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      region: ['', Validators.required],
      branch: ['', Validators.required],
    });


  }
  get f() {
    return this.loginForm.controls;
  }

  onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    this.loginService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.regionList = data?.Result;
    });
  }
  onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.f.region.value,
    };
    this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      this.branchList = data;
    });
  }


  onLogin() {
    this.submitted = true;
    // const urlLink = `${this.ApiUrl1}login/Logincheck`;
    // const formData = this.loginForm.value;

    // const reqData = {
    //   UserId: formData.username,
    //   Password: formData.password,
    //   LoginType: 'Admin',
    //   RegionCode: formData.region,
    //   BranchCode: formData.branch,
    // };

    // this.loginService.onPostMethodSync(urlLink, reqData).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     if (data.LoginResponse) {
    //       const Token = data?.LoginResponse?.Token;
    //       this.authService.login(data);
    //       this.authService.UserToken(Token);
    //       sessionStorage.setItem('Userdetails', JSON.stringify(data));
    //       sessionStorage.setItem('UserToken', Token);
    //       sessionStorage.setItem('menuSection', 'navMenu');
    //       this.router.navigate(['/product']);
    //     }
    //   },

    //   (err: any) => { console.log(err); },
    // );
    this.router.navigate(['/Admin']);
  }
}
