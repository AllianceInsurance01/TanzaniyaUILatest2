import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  countryData:any[]=[];countryHeader:any[]=[];
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public InsuranceId:any;companyYn:any="N";insuranceList:any[]=[];
  userDetails: any;
  constructor(private router:Router,private sharedService:SharedService,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.InsuranceId = user.LoginBranchDetails[0].InsuranceId;

    this.countryHeader = [
      { key: 'CountryName', display: 'Country Name' },
      { key: 'CountryId', display: 'Country Code' },
      { key: 'EffectiveDateStart', display: 'Effective Date Start' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];

  }

  ngOnInit(): void {
    this.getCompanyList();

  }
  onAddNew(){
    sessionStorage.removeItem('CountryData');
    this.router.navigate(['/Admin/countryMaster/newCountryDetails']);
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"N",
      "Limit":"0",
      "Offset":""
    }
    let urlLink = `${this.ApiUrl1}master/getallinscompanydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"InsuranceId":"99999","CompanyName":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          let insurance = sessionStorage.getItem('countryInsurance');
          if(insurance){
            this.InsuranceId = insurance;
            if(insurance == '99999'){
              this.companyYn="N";
              this.getExistingCountry();
            }
            else{
              this.companyYn="Y";
              this.getExistingCountry();
            }
          }
          else{
            this.companyYn = "N";
            this.InsuranceId = "99999";
            this.getExistingCountry();
          }
        }

      },
      (err) => { },
    );
  }
  EditStatus(event){
    let ReqObj = {
      "CountryId":event.CountryId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl}master/country/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          //       const config = {
          //         status: type,
          //         destroyByClick: true,
          //         duration: 4000,
          //         hasIcon: true,
          //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //         preventDuplicates: false,
          //       };
          //       this.toastrService.show(
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                window.location.reload()
        }
      },
      (err) => { },
    );
  }
  getExistingCountry(){

   let ReqObj = {
    InsuranceId: this.InsuranceId
   }
    let urlLink =`${this.CommonApiUrl}master/getallcountrydetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.countryData = data?.Result;
            sessionStorage.setItem('countryInsurance',this.InsuranceId);
        }
      },
      (err) => { },
    );

  }
  onChangeYN(){
    if(this.companyYn=='Y'){
      if(this.InsuranceId!="99999"){
        this.getExistingCountry();
      }
      else{
        this.InsuranceId=null;
        this.countryData=[];
      }
    }
    else{
      this.InsuranceId = "99999";
      this.getExistingCountry();
    }
  }
  public onEdit(event) {
    sessionStorage.setItem('CountryData', event.CountryId);
    this.router.navigateByUrl('/Admin/countryMaster/newCountryDetails');
  }
}
