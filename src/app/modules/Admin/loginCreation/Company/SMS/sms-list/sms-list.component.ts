import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.scss']
})
export class SmsListComponent implements OnInit {
  public activeMenu:any='Sms';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    // if(value=='Mail') this.router.navigate(['/Admin/companyList/companyConfigure/mailList']);
    // if(value=='Sms') this.router.navigate(['/Admin/companyList/companyConfigure/SmsList']);
    if(value=='Mail') this.router.navigate(['/Admin/mailMaster']);
    if(value=='Sms') this.router.navigate(['/Admin/smsMaster/newSmsDetails']);
    //if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
    //if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
    //if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);

  }
}
