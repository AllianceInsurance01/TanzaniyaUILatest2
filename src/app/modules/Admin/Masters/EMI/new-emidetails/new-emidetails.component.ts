//import { Emi } from './../../../loginCreation/Company/EMI/new-emidetails/Emi';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { Emi } from './Emi';

@Component({
  selector: 'app-new-emidetails',
  templateUrl: './new-emidetails.component.html',
  styleUrls: ['./new-emidetails.component.scss']
})
export class NewEmidetailsComponent implements OnInit {
  public minDate:Date;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;EmiId:any
  loginId: any;emiDetails:any;
  policylList: any;
  Status:any="N";
  Startpremium: any;
  Endpremium: any;

  constructor(
    private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
      this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    console.log("pppppp",this.productId)
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.emiDetails = new Emi();
    this.EmiId = sessionStorage.getItem('EmiId');
    this.getPolicyList();

  }
  ngOnInit(): void {

    /*if(this.Sno!=null && this.Sno!=undefined){
      this.getEditEmiDetails();
    }
    else{
      this.emiDetails = new Emi();
      if(this.emiDetails.Status==null) this.emiDetails.Status = 'N';
      //if(this.emiDetails?.Status==null)  this.emiDetails.Status = 'Y';
      this.emiDetails.CreatedBy = this.loginId;
    }*/
    let EmiObj = JSON.parse(sessionStorage.getItem('EmiId'));
    this.EmiId = EmiObj?.EmiId;


    if(this.EmiId!=null && this.EmiId!=undefined){
      this.getEditEmiDetails();
    }
    else{
      if(this.emiDetails?.Status==null)  this.emiDetails.Status = 'N';
      this.emiDetails = new Emi();

    }
  }
  checkvalue(event)
  {
if(event.target.value < 0)
{
event.target.value=0;
}
  }
  getEditEmiDetails(){
    let ReqObj = {
    "EmiId":this.EmiId,
    "InsuranceId":this.insuranceId,
    "ProductId":this.productId,
    }
    let urlLink = `${this.ApiUrl1}master/getbyemiid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.emiDetails = res.Result;
          if(this.emiDetails){
            if(this.emiDetails?.Status==null)  this.emiDetails.Status = 'N';
            if(this.emiDetails?.EffectiveDateStart!=null){
              this.emiDetails.EffectiveDateStart = this.onDateFormatInEdit(this.emiDetails?.EffectiveDateStart)
            }
            if(this.emiDetails?.EffectiveDateEnd!=null){
              this.emiDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.emiDetails?.EffectiveDateEnd)
            }
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
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  ongetBack(){
    this.router.navigate(['/Admin/emiMaster'])
  }
  onProceed(){
    let createdBy="";
    let Startpremium="",Endpremium="";
    if(this.Startpremium==undefined) Startpremium = null;
    else if(this.Startpremium.includes(',')){ Startpremium = this.Startpremium.replace(/,/g, '') }
    else Startpremium = this.Startpremium;
    if(this.Endpremium==undefined) Endpremium = null;
    else if(this.Endpremium.includes(',')){ Endpremium = this.Startpremium.replace(/,/g, '') }
    else Endpremium = this.Startpremium;
    let ReqObj = {
    "EmiId":this.EmiId,
    "InsuranceId":this.insuranceId,
    "ProductId":this.productId,
    "EffectiveDateStart":this.emiDetails.EffectiveDateStart,
    "PolicyType":this.emiDetails.PolicyType,
    "InstallmentPeriod":this.emiDetails.InstallmentPeriod,
    "PremiumStart":this.emiDetails.PremiumStart,
    "PremiumEnd":this.emiDetails.PremiumEnd,
    "InterestPercent":this.emiDetails.InterestPercent,
    "AdvancePercent":this.emiDetails.AdvancePercent,
    "CreatedBy":this.loginId,
    "Status":this.emiDetails.Status,
    "Remarks":this.emiDetails.Remarks,
    }
    let urlLink = `${this.ApiUrl1}master/insertemi`;
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
            //         'EMI Details Inserted/Updated Successfully',
            //         'EMI Details',
            //         config);
                    this.router.navigate(['/Admin/emiMaster'])
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
                  // let type: NbComponentStatus = 'danger';
                  // const config = {
                  //   status: type,
                  //   destroyByClick: true,
                  //   duration: 4000,
                  //   hasIcon: true,
                  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //   preventDuplicates: false,
                  // };
                  // this.toastrService.show(
                  //   entry.Field,
                  //   entry.Message,
                  //   config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }
  getPolicyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.policylList,
      "BranchCode":"03"
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.policylList = data.Result;

        }
      },
      (err) => { },
    );
  }
  onemiChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.Startpremium) {
     this.Startpremium = this.Startpremium.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedEnd(){
    if (this.Endpremium) {
      this.Endpremium = this.Endpremium.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
  }
}

