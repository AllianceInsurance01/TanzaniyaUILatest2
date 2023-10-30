import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { Section } from './sectionModal';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../shared/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-section-details',
  templateUrl: './new-section-details.component.html',
  styleUrls: ['./new-section-details.component.scss']
})
export class NewSectionDetailsComponent implements OnInit {

  @Input() title: any;@Input() SectionId:any;
  statusValue:any= "YES";cityList:any[]=[];
  sectionDetails:any={};public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;
  typeList:any[]=[];
  Motoryn: any;
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.SectionId = sessionStorage.getItem('SectionId');
    this.sectionDetails = new Section();
    this.getProductTypeList();
  }

  ngOnInit(): void {
    console.log("Section id",this.SectionId);
    if(this.SectionId!=null && this.SectionId!=undefined){
      this.getEditSectionDetails();
    }
    else{
      this.sectionDetails = new Section();
      if(this.sectionDetails?.Status==null)  this.sectionDetails.Status = 'N';
    }
  }
  dismiss() {
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
  }

  getProductTypeList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/productcategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.typeList = data.Result;
      },
      (err) => { },
    );
  }
  getEditSectionDetails(){
      let ReqObj =  {
        "SectionId":this.SectionId,
         "ProductId":this.productId,
        "InsuranceId": this.insuranceId
    }
      let urlLink = `${this.ApiUrl1}master/getbyproductsectionid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res:any = data;
        if(res.Result){
          this.sectionDetails = res.Result;
          this.Motoryn=res?.Result?.MotorYn;
          if(this.sectionDetails){
            if(this.sectionDetails.MinimumPremium!=null){
              this.CommaFormatted();
            }
            if(this.sectionDetails?.EffectiveDateStart!=null){
              this.sectionDetails.EffectiveDateStart = this.onDateFormatInEdit(this.sectionDetails?.EffectiveDateStart)
            }
            if(this.sectionDetails?.EffectiveDateEnd!=null){
              this.sectionDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.sectionDetails?.EffectiveDateEnd)
            }
          }
        }
      },
      (err) => { },
    );
  }
  onPremiumChange(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {
    // format number
    if (this.sectionDetails.MinimumPremium) {
      this.sectionDetails.MinimumPremium = this.sectionDetails.MinimumPremium.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  onSaveSection(){
    let premium=null;
    if(this.sectionDetails.MinimumPremium==undefined) premium = null;
    else if(this.sectionDetails.MinimumPremium.includes(',')){ premium = this.sectionDetails.MinimumPremium.replace(/,/g, '') }
    else premium = this.sectionDetails.MinimumPremium;
    let ReqObj = {
      "ProductId": this.productId,
     "SectionId": this.sectionDetails.SectionId,
    "SectionName": this.sectionDetails.SectionName,
    "RegulatoryCode": this.sectionDetails.RegulatoryCode,
    "Remarks": this.sectionDetails.Remarks,
    "Status": this.sectionDetails.Status,
    "CreatedBy": this.loginId,
    "CoreAppCode":this.sectionDetails.CoreAppCode,
    "InsuranceId":this.insuranceId,
    "MinimumPremium": premium,
    "BranchCode":"99999",
    "EffectiveDateStart": this.sectionDetails.EffectiveDateStart,
    "MotorYn": this.Motoryn,
    }
    let urlLink = `${this.ApiUrl1}master/updateproductsection`;
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
            this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails']);
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
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
}
