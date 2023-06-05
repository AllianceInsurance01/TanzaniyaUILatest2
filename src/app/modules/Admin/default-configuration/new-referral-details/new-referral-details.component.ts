import { Component, OnInit, Input } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { DatePipe } from '@angular/common';
import { Referral } from './ReferralModel';
import { threadId } from 'worker_threads';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-referral-details',
  templateUrl: './new-referral-details.component.html',
  styleUrls: ['./new-referral-details.component.scss']
})
export class NewReferralDetailsComponent implements OnInit {

  @Input() title: any;@Input() ReferralId:any;
  statusValue:any= "YES";cityList:any[]=[];
  referralDetails:any;typeList:any[]=[];
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;activeMenu:any;
  ReferralDetails:any={};
  ReferralCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,
    private sharedService: SharedService,private datePipe:DatePipe) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.ReferralCode = sessionStorage.getItem('ReferalId');
  this.ReferralDetails= new Referral();
     }

  ngOnInit(): void {
    this.ReferralCode = sessionStorage.getItem('ReferalId');
    console.log("Referralll id",this.ReferralCode);
    if(this. ReferralCode!=null && this.ReferralCode!=undefined){
      this.getEditReferralDetails();
    }
    else{
  this.ReferralDetails = new Referral();
      if(this.ReferralDetails?.Status==null)  this.ReferralDetails.Status = 'N';
    }
    this.getTypeList();
  }
  dismiss() {
    this.router.navigate(['Admin/companyList/companyConfigure/productDetails'])
  }
  getEditReferralDetails(){
    let ReqObj =  {
      "ReferalId":this.ReferralCode,
  }
      let urlLink = `${this.ApiUrl1}master/getbyreferalid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.ReferralDetails = res.Result;
          if(this.ReferralDetails){
            if(this.ReferralDetails?.EffectiveDateStart!=null){
              this.ReferralDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ReferralDetails?.EffectiveDateStart)
            }
            if(this.ReferralDetails?.EffectiveDateEnd!=null){
              this.ReferralDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ReferralDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.ReferralDetails);
      },
      (err) => { },
    );
  }
  onSaveReferral() {
    let ReqObj = {
      "ReferalId":this.ReferralCode,
      "ReferalName":this.ReferralDetails.ReferalName,
      "ReferalType":this.ReferralDetails.ReferalType,
      "RegulatoryCode":this.ReferralDetails.RegulatoryCode,
      "Remarks":this.ReferralDetails.Remarks,
      "Status":this.ReferralDetails.Status,
      "CreatedBy":this.loginId,
      "EffectiveDateStart":this.ReferralDetails.EffectiveDateStart,
//"AmendId": this.ReferralDetails.AmendId,
     // "EffectiveDateEnd": this.ReferralDetails.EffectiveDateEnd,
      "MotorYn": "M",
      "ReferalDesc": this.ReferralDetails.ReferalDesc
    }
    let urlLink = `${this.ApiUrl1}master/insertreferal`;
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
            //         'Section Details Inserted/Updated Successfully',
            //         'Section Details',
            //         config);
                    this.router.navigate(['/Admin/globalConfigure/existingReferral'])
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

  onDateFormatInEdit(date): any {
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
  getTypeList(){
    let ReqObj = {
      "InsuranceId": "",
      "BranchCode": "99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/referraltype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
            this.typeList = res.Result;
        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    console.log("Val",value);
    this.activeMenu = value;
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
}
