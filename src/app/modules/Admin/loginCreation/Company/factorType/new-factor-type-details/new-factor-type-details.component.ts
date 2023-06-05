import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { FactorType } from './FactorType';
//import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-new-factor-type-details',
  templateUrl: './new-factor-type-details.component.html',
  styleUrls: ['./new-factor-type-details.component.scss']
})
export class NewFactorTypeDetailsComponent implements OnInit {

  activeMenu:any="FactorType";typeList:any[]=[];productList:any[]=[]
  statusValue:any="Y";rangeValue:any="N";productValue:any="";factorValue:any;
  factorTypeList:any[]=[];tableList:any[]=[];fieldList:any[]=[];
  param1List:any[]=[];param2List:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  factorTypeDetails: any;
  insuranceName: string;
  insuranceId: string;
  productId: string;
  loginId: any;
  minDate: Date;
  p: Number = 1;
  count: Number = 20;
  constructor(private router:Router,private sharedService: SharedService,
   private datePipe:DatePipe) {
    this.minDate = new Date();
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }

  }

  ngOnInit(): void {
    this.getRatingFieldList();
    this.tableList = [
      {"Code":"","CodeDesc":"- Select -"},

    ];
    this.productList = [
      {"Code":"","CodeDescription":"- - -Select- - -"},
      {"Code":"01","CodeDescription":"Motor"},
      {"Code":"02","CodeDescription":"Travel"},
    ];
    this.typeList=[
      {"value": "","text": "- - -Select- - -"},
      {"value": "VehicleAge","text": "Vehicle Age Calculator"},
      {"value": "BodyType","text": "Body type calculator"},
      {"value": "Base","text": "BASE RATE CALCULATOR"},
    ];
    this.factorTypeList = [
      {
        "RatingFiledId":null,
        "RangeYn":"N",
        "ColumnsId": null,
        "Status": "Y",
        "FromColumnName":"",
        "ToColumnName":"",
        "FromDisplayName": null,
        "ToDisplayName": null,
        "DiscreteDisplayName":"",
        "MasterYn":"N",
        "ApiUrl":null
      }
    ]
  }
  getRatingFieldList(){
    let ReqObj = {
      "ProductId": this.productId,
      "Limit":"0",
      "Offset":"100"
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/ratingfields`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.fieldList = data.Result;
            this.getParam1List();
        }
      },
      (err) => { },
    );
  }
  getParam1List(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/rangeparams`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.param1List = data.Result;
           this.getParam2List();
          }
        },
        (err) => { },
      );
  }
  getParam2List(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/discreteparams`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.param2List = data.Result;
          let factorTypeId = sessionStorage.getItem('companyFactorTypeId');
          this.factorTypeDetails = new FactorType();
          if(factorTypeId){
            this.getEditFactorType(factorTypeId);
          }
          else{
            this.factorTypeDetails.ProductId = this.productId;
            this.factorTypeDetails.InsuranceId = this.insuranceId;
            this.factorTypeDetails.Status = "Y";
          }
          }
        },
        (err) => { },
      );
  }
 

  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList'])
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
  }
  onRatingFieldChange(index){
    let ratingId = this.factorTypeList[index].RatingFiledId;
    let entry = this.fieldList.find(ele=>ele.Code==ratingId);
    console.log("Entrry",entry);
    if(entry){
     this.factorTypeList[index]['MasterYn'] = entry?.MasterYn;
     this.factorTypeList[index]['ApiUrl'] = entry?.ApiUrl;
    }
    console.log("Entrry Final",entry,this.factorTypeList);
  }
  getEditFactorType(factorTypeId){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "FactorTypeId": factorTypeId
      }
      let urlLink = `${this.ApiUrl1}master/getbyfactortypeid`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.factorTypeDetails = data.Result;
            this.factorTypeList = this.factorTypeDetails.RatingFieldDetails;
            if(this.factorTypeDetails){
              if(this.factorTypeDetails?.Status==null)  this.factorTypeDetails.Status = 'N';
              if(this.factorTypeDetails?.EffectiveDateStart!=null){
                this.factorTypeDetails.EffectiveDateStart = this.onDateFormatInEdit(this.factorTypeDetails?.EffectiveDateStart)
              }
              if(this.factorTypeDetails?.EffectiveDateEnd!=null){
                this.factorTypeDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.factorTypeDetails?.EffectiveDateEnd);
                console.log("End Date",this.factorTypeDetails.EffectiveDateEnd)
              }
            }
            if(this.factorTypeList.length!=0){
              let i=0;
              for(let factor of this.factorTypeList){this.onRatingFieldChange(i); i+=1;}
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
  onStartDateChange(){
    console.log("Start Date",this.factorTypeDetails.EffectiveDateStart)
    var d = this.factorTypeDetails.EffectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.factorTypeDetails.EffectiveDateEnd = new Date(year + 28, month, day);
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList']);
  }
  onAddRow(){
    let entry = [{
      "factorId":"",
      "RatingFiledId":null,
      "RangeYn":"N",
      "ColumnsId": null,
      "Status": "Y",
      "FromColumnName":"",
      "ToColumnName":"",
      "FromDisplayName":"",
      "DiscreteDisplayName":"",
      "MasterYn":"N",
        "ApiUrl":null
    }]
    this.factorTypeList = entry.concat(this.factorTypeList);
  }
  onDeleteRow(index:any){
      this.factorTypeList.splice(index,1);
  }

  onProceed(){
    let ReqObj={
        "FactorTypeName":this.factorTypeDetails.FactorTypeName,
        "FactorTypeId":this.factorTypeDetails.FactorTypeId,
        "ProductId": this.factorTypeDetails.ProductId,
        "InsuranceId": this.factorTypeDetails.InsuranceId,
        "EntryDate": this.factorTypeDetails.EntryDate,
        "EffectiveDateStart": this.factorTypeDetails.EffectiveDateStart,
        "FactorTypeDesc": this.factorTypeDetails.FactorTypeDesc,
        "AmendId": this.factorTypeDetails.AmendId,
        "CreatedBy": this.loginId,
        "Status": this.factorTypeDetails.Status,
        "Remarks": this.factorTypeDetails.Remarks,
        "RatingFieldDetails": this.factorTypeList
    }
    let urlLink = `${this.ApiUrl1}master/insertfactortypes`;
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
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   'FactorType Details Inserted/Updated Successfully',
                //   'FactorType Details',
                //   config);
                  sessionStorage.removeItem('companyFactorTypeId');
                  this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])

                 //this.ref.close();
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
}
