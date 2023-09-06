import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Insurance } from './insuranceModal';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-company-details',
  templateUrl: './new-company-details.component.html',
  styleUrls: ['./new-company-details.component.scss']
})
export class NewCompanyDetailsComponent implements OnInit {

   title: any;InsuranceId:any;
  statusValue:any= "YES";
  minDate: Date;insuranceDetails:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  currencyList: any[]=[];loginId:any;
  countryList:any[]=[];
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
    this.minDate = new Date();
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.InsuranceId = sessionStorage.getItem('InsuranceId');
    if(this.InsuranceId==undefined) this.InsuranceId = null;
    this.insuranceDetails = new Insurance();
    this.getCurrencyList();
    this.getCountryList();
  }

  ngOnInit(): void {
    if(this.InsuranceId!=null && this.InsuranceId!=undefined){
      this.getEditInsuranceDetails();
    }
    else{
      this.insuranceDetails = new Insurance();
      this.insuranceDetails.BrokerYn = "N";
      if(this.insuranceDetails?.Status==null)  this.insuranceDetails.Status = 'N';
    }
  }
  getCurrencyList(){
    let ReqObj = {
      "InsuranceId":this.InsuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/currency`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.currencyList = data.Result;
        }
      },
      (err) => { },
    );
  }
  dismiss() {
    this.router.navigate(['/Admin/companyList'])
  }
  getEditInsuranceDetails(){
    let ReqObj = {"InsuranceId": this.InsuranceId }
    let urlLink = `${this.ApiUrl1}master/getbycompanyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.insuranceDetails = data?.Result;
        if(this.insuranceDetails){
          if(this.insuranceDetails?.EffectiveDateStart!=null){
            this.insuranceDetails.EffectiveDateStart = this.onDateFormatInEdit(this.insuranceDetails?.EffectiveDateStart)
          }
        }
      },
      (err) => { },
    );
  }
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }
  onFormSubmit(){
    let ReqObj = {
      "InsuranceId":this.InsuranceId,
      "CompanyName": this.insuranceDetails?.CompanyName,
      "CompanyAddress":this.insuranceDetails?.CompanyAddress,
      "CompanyEmail":this.insuranceDetails?.CompanyEmail,
      "CompanyPhone": this.insuranceDetails?.CompanyPhone,
      "CompanyWebsite": this.insuranceDetails?.CompanyWebsite,
      "CompanyLogo": this.insuranceDetails?.CompanyLogo,
      "CoreAppCode": this.insuranceDetails?.CoreAppCode,
      "CurrencyId": this.insuranceDetails?.CurrencyId,
      "BrokerYn": this.insuranceDetails?.BrokerYn,
      "FooterImage": this.insuranceDetails?.FooterImage,
      "FooterDescription": this.insuranceDetails?.FooterDescription,
      "Regards": this.insuranceDetails?.Regards,
      "Remarks": this.insuranceDetails?.Remarks,
      "Status": this.insuranceDetails?.Status,
      "CountryId":this.insuranceDetails?.CountryId,
      "VrnNumber": this.insuranceDetails?.VrnNumber,
      "TinNumber": this.insuranceDetails?.TinNumber,
      "EffectiveDateStart": this.insuranceDetails?.EffectiveDateStart,
      "CreatedBy": this.loginId,
      "RegulatoryCode": this.insuranceDetails?.RegulatoryCode,
      "Signature": this.insuranceDetails?.Signature
    }
    let urlLink = `${this.ApiUrl1}master/savecompany`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
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
            //         'InsuranceCompany Details Inserted/Updated Successfully',
            //         'InsuranceCompany Details',
            //         config);
                    this.router.navigate(['/Admin/companyList'])
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                // for(let entry of res.ErrorMessage){
                //   let type: NbComponentStatus = 'danger';
                //   const config = {
                //     status: type,
                //     destroyByClick: true,
                //     duration: 4000,
                //     hasIcon: true,
                //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //     preventDuplicates: false,
                //   };
                //   this.toastrService.show(
                //     entry.Field,
                //     entry.Message,
                //     config);
                // }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }

  getCountryList(){
    let ReqObj = { "InsuranceId": this.InsuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.countryList = data?.Result;
      },
      (err) => { },
    );
  }
}
