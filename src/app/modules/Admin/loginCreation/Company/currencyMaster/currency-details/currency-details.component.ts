import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { currency} from './currencyModel';
import { SharedService } from '../../../../../../shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';



@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {


  statusValue:any="YES";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;minDate:Date;public activeMenu:any='Currency';
  insuranceId: string;insuranceName:any;
  productId: string;stateList:any[]=[];
  BranchDetails:any={};CurrencyId:any;
  countryList: any[]=[];
  CurrencyDetails:any={};

  constructor(
    private sharedService: SharedService,private datePipe:DatePipe, private router: Router) {
      this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.CurrencyDetails = new currency();
    this.CurrencyId = sessionStorage.getItem('editCurrencyId');
    console.log(this.CurrencyId);
    this.insuranceId=sessionStorage.getItem('insuranceid');
  }


  ngOnInit(): void {
    console.log("Currency Id",this.CurrencyId);
    if(this.CurrencyId!=null && this.CurrencyId!=undefined){
      this.getEditCurrencyDetails();
    }
    else{
      this.CurrencyDetails = new currency();
      if(this.CurrencyDetails?.Status==null)  this.CurrencyDetails.Status = 'N';
    }

  }
  ongetBack(){
    this.router.navigate(['Admin/companyList/companyConfigure/currencyList'])
  }
  onProceed(){
    this.router.navigate(['Admin/companyList/companyConfigure/currencyList'])
  }
  backtoMainGrid(){
    this.router.navigate(['Admin/companyList/companyConfigure/currencyList']);
  }

  getEditCurrencyDetails(){
    let ReqObj =  {
      "CurrencyId":this.CurrencyId,
      "InsuranceId": this.insuranceId
  }
    let urlLink = `${this.CommonApiUrl}master/getbycurrencyid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.CurrencyDetails = res.Result;
        if(this.CurrencyDetails){
          if(this.CurrencyDetails?.EffectiveDateStart!=null){
            this.CurrencyDetails.EffectiveDateStart = this.onDateFormatInEdit(this.CurrencyDetails?.EffectiveDateStart)
          }
          if(this.CurrencyDetails?.EffectiveDateEnd!=null){
            this.CurrencyDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.CurrencyDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.CurrencyDetails);
    },
    (err) => { },
  );
}
onSaveCurrency(){
  let ReqObj = {
    "CurrencyId":this.CurrencyId,
  "CurrencyName": this.CurrencyDetails.CurrencyName,
  "CurrencyShortCode": this.CurrencyDetails.CurrencyShortCode,
  "ShortName":this.CurrencyDetails.ShortName,
  "Rfactor": this.CurrencyDetails.Rfactor,
  "Remarks": this.CurrencyDetails.Remarks,
  "SubCurrency":this.CurrencyDetails.SubCurrency,
  "RegulatoryCode":this.CurrencyDetails.RegulatoryCode,
  "ExMinlmt": this.CurrencyDetails.ExMinlmt,
    "ExMaxlmt": this.CurrencyDetails.ExMaxlmt,
    "MinDiscount": this.CurrencyDetails.MinDiscount,
  "MaxLoading": this.CurrencyDetails.MaxLoading,
   "Status": this.CurrencyDetails.Status,
   "InsuranceId": this.insuranceId,
   "DecimalDigit":this.CurrencyDetails.DecimalDigit,
  //"CreatedBy": this.loginId,
  "CoreAppCode":this.CurrencyDetails.CoreAppCode,
  "EffectiveDateStart": this.CurrencyDetails.EffectiveDateStart,


  }
  let urlLink = `${this.CommonApiUrl}master/insertcurrency`;
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
          //         'Country Details Inserted/Updated Successfully',
          //         'Country Details',
          //         config);
                  this.router.navigate(['/Admin/companyList/companyConfigure/currencyList'])

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
  if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
  if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
  if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);
  if(value=='Mail') this.router.navigate(['/Admin/companyList/companyConfigure/mailList']);
  if(value=='Sms') this.router.navigate(['/Admin/companyList/companyConfigure/SmsList']);
}

}
