import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-existing-occupations',
  templateUrl: './existing-occupations.component.html',
  styleUrls: ['./existing-occupations.component.scss']
})
export class ExistingOccupationsComponent implements OnInit {

  public activeMenu:any='Occupation';filterValue:any;productId:any;
  insuranceName: string;regionValue:any="";insuranceId:any;
  occupationData:any[]=[];occupationHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchList: any[]=[];branchValue:any;userDetails:any;
  constructor(private router:Router,private sharedService: SharedService) {
    this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
   }

  ngOnInit(): void {
    this.occupationHeader = [
      { key: 'OccupationName', display: 'Occupation Name' },
      { key: 'CoreAppCode', display: 'CoreAppCode' },
      { key: 'RegulatoryCode', display: 'Regulatory Code' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getBranchList();
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getExistingOccupations() }
      }
    },
    (err) => { },
  );
  }
  getExistingOccupations(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchValue
    }
    let urlLink = `${this.CommonApiUrl}master/getalloccupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.occupationData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  
  onAddOccupations(){
    sessionStorage.removeItem('editOccupationId');
    this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations/updateOccupationDetails'])
  }
  onEditOccupation(event){
    let entry = {
      "OccupationId" : event.OccupationId,
      "BranchCode" : event.BranchCode
    }
    sessionStorage.setItem('editOccupationId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations/updateOccupationDetails'])
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
  }
}
