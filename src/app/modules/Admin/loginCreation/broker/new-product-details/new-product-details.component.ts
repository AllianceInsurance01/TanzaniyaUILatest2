import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { Product } from './Product';
//import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-new-product-details',
  templateUrl: './new-product-details.component.html',
  styleUrls: ['./new-product-details.component.scss']
})
export class NewProductDetailsComponent implements OnInit {
  activeMenu:any;
  productData:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  productId: string;brokerId:any;brokerLoginId:any;
  insuranceName: string;agencyCode:any;
  insuranceId: string;brokerCompanyYN:any;
  productDetails:any;
  minDate:Date;
  loginId: any;
  vehicleSI:any;
  accessoriesSI:any;
  windShieldSI:any;tppdSI:any;
  EndList:any[]=[];

  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      this.minDate = new Date();
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
      if(brokerObj){
        if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
        if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
        if(brokerObj.brokerId) this.agencyCode = brokerObj.brokerId;
        if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
        if(brokerObj.ProductId!=null) this.productId = brokerObj.ProductId;
        else this.productId = null;
      }
      this.brokerId = this.brokerLoginId;
      this.productDetails = new Product();
      this.productDetails.BrokerCommssionDetails = [];
      if(this.productId!=null && this.productId!=undefined)

      this.getProductDetails();

      /*this.EndList=[{"Code":'F',"CodeDesc":'Financial'},
      {"Code":'N',"CodeDesc":'Non Financial'},
      {"Code":'B',"CodeDesc":'Both'},
      {"Code":'None',"CodeDesc":'None',  multiple: false},
    ]*/

   }

  ngOnInit(): void {
      if(this.productDetails?.CheckerYn==null) this.productDetails.CheckerYn  = 'N';
      if(this.productDetails?.PaymentYn==null)  this.productDetails.PaymentYn = 'N';
      if(this.productDetails?.CommissionVatYn==null)  this.productDetails.CommissionVatYn = 'N';
      if(this.productDetails.Status==null) this.productDetails.Status ='Y';
      if(this.productDetails.BackDays==null) this.productDetails.BackDays = '0';

  }
  Endrosement(value){

    if(this.productDetails.EndrosementType){
      let entry = this.productDetails.EndrosementType.some(ele=>ele=='None');
      if(entry){
        this.productDetails.EndrosementType = ['None']
      }
    }
    console.log(value);

  }
  onAddNewProduct()
  {

  }
  onPaymentChange(){
    if(this.productDetails.PaymentYn=='N'){
      this.productDetails.PaymentRedirUrl = null;
    }
  }

  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
  }
  getProductDetails(){

    let ReqObj = {
      "EffectiveDateStart": null,
      "InsuranceId": this.insuranceId,
     "LoginId": this.brokerLoginId,
     "ProductId":this.productId

    }
    let urlLink = `${this.CommonApiUrl1}admin/getbrokerproductbyid`;
    console.log(this.EffectiveDateStart,this.insuranceId,this.productId,this.loginId)
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
         this.productDetails = data.Result;
         if(this.productDetails){
          if(this.productDetails.BackDays==null) this.productDetails.BackDays = '0';
           if(this.productDetails.PaymentYn==null) this.productDetails.PaymentYn = 'N';
          if(this.productDetails?.EffectiveDateStart!=null){
            this.productDetails.EffectiveDateStart = this.onDateFormatInEdit(this.productDetails?.EffectiveDateStart)
          }
          if(this.productDetails?.EffectiveDateEnd!=null){
            this.productDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.productDetails?.EffectiveDateEnd)
          }
          if(this.productDetails?.BrokerCommssionDetails)
          console.log("Commission Details",this.productDetails?.BrokerCommssionDetails)
          if(this.productDetails?.BrokerCommssionDetails.length!=0){
            if(this.productDetails?.BrokerCommssionDetails.length==1){
              this.productDetails.CommissionPercent = this.productDetails?.BrokerCommssionDetails[0].CommissionPercent;
              if(this.productDetails?.BrokerCommssionDetails[0].CommissionVatYn!=null){
                this.productDetails.CommissionVatPercent = this.productDetails?.BrokerCommssionDetails[0].CommissionVatPercent;
                this.productDetails.CommissionVatYn = this.productDetails?.BrokerCommssionDetails[0].CommissionVatYn;
              }
              else{
                this.productDetails.CommissionVatPercent = null;
                this.productDetails.CommissionVatYn = 'N';
              }
              this.productDetails.SumInsuredEnd = this.productDetails?.BrokerCommssionDetails[0].SumInsuredEnd;
              this.productDetails.SumInsuredStart = this.productDetails?.BrokerCommssionDetails[0].SumInsuredStart;
              this.productDetails.BackDays = this.productDetails?.BrokerCommssionDetails[0].BackDays;
              this.productDetails.CoreAppCode = this.productDetails?.BrokerCommssionDetails[0].CoreAppCode;
              this.productDetails.RegulatoryCode = this.productDetails?.BrokerCommssionDetails[0].RegulatoryCode;
            }
            else{
              let i = 0;
              for(let row of this.productDetails?.BrokerCommssionDetails){
                    this.SIStartListCommaFormatted(i);
                    this.SIEndListCommaFormatted(i);
                    i+=1;
              }
            }
          }
        }
        }
     this.SIEndCommaFormatted();
     this.SIStartCommaFormatted();

      },
      (err) => { },
    );
  }
  EffectiveDateStart(EffectiveDateStart: any) {
    throw new Error('Method not implemented.');
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
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList'])
  }
  onFormSubmit(){
    let finalList = [];
    if(this.productDetails.BrokerCommssionDetails.length==1){
      let details = this.productDetails.BrokerCommssionDetails[0];
      let SumInsuredEnd="",SumInsuredStart="",windSI="",tppSI="" ;
      if(this.productDetails.SumInsuredEnd==undefined) details.SumInsuredEnd = null;
      else if(this.productDetails.SumInsuredEnd.includes(',')){details.SumInsuredEnd = this.productDetails.SumInsuredEnd.replace(/,/g, '') }
      else details.SumInsuredEnd = this.productDetails.SumInsuredEnd;
      if(this.productDetails.SumInsuredStart==undefined) details.SumInsuredStart = null;
      else if(this.productDetails.SumInsuredStart.includes(',')){ details.SumInsuredStart = this.productDetails.SumInsuredStart.replace(/,/g, '') }
      else details.SumInsuredStart = this.productDetails.SumInsuredStart;
      details.RegulatoryCode = this.productDetails.RegulatoryCode;
      details.CoreAppCode = this.productDetails.CoreAppCode;
      details.CommissionPercent = this.productDetails.CommissionPercent;
      details.BackDays = this.productDetails.BackDays;
      details.CommissionVatPercent = this.productDetails.CommissionVatPercent;
      details.CommissionVatYn = this.productDetails.CommissionVatYn;
      finalList.push(details);
      this.onProceed(finalList)
    }
    else{
      let i=0;
      for(let row of this.productDetails.BrokerCommssionDetails){
        if(row.SelectedYn=='Y'){
          if(row.SumInsuredEnd==undefined) row.SumInsuredEnd = null;
          else if(row.SumInsuredEnd.includes(',')){row.SumInsuredEnd = row.SumInsuredEnd.replace(/,/g, '') }
          else row.SumInsuredEnd = row.SumInsuredEnd;
          if(row.SumInsuredStart==undefined) row.SumInsuredStart = null;
          else if(row.SumInsuredStart.includes(',')){ row.SumInsuredStart = row.SumInsuredStart.replace(/,/g, '') }
          else row.SumInsuredStart = row.SumInsuredStart;
          if(row.CommissionVatPercent!=null && row.CommissionVatPercent!=undefined) row.CommissionVatYn = "Y";
          else row.CommissionVatYn = "N";
          finalList.push(row);
        }
        i+=1;
        if(i==this.productDetails.BrokerCommssionDetails.length) this.onProceed(finalList)
      }
    }
  }
  onProceed(finalList){
    // let SumInsuredEnd="",SumInsuredStart="",windSI="",tppSI="" ;
    // if(this.productDetails.SumInsuredEnd==undefined) SumInsuredEnd = null;
    // else if(this.productDetails.SumInsuredEnd.includes(',')){SumInsuredEnd = this.productDetails.SumInsuredEnd.replace(/,/g, '') }
    // else SumInsuredEnd = this.productDetails.SumInsuredEnd;
    // if(this.productDetails.SumInsuredStart==undefined) SumInsuredStart = null;
    // else if(this.productDetails.SumInsuredStart.includes(',')){ SumInsuredStart = this.productDetails.SumInsuredStart.replace(/,/g, '') }
    // else SumInsuredStart = this.productDetails.SumInsuredStart;


    let ReqObj =  {
      "AppLoginUrl":this.productDetails.AppLoginUrl,
      "CheckerYn":this.productDetails.CheckerYn,
    "ProductId": this.productId,
    "InsuranceId":this.insuranceId,
    "ProductName":this.productDetails.ProductName,
    "ProductDesc": this.productDetails.ProductDesc,
    "ProductIconId":this.productDetails.ProductIconId,
    "PaymentYn":this.productDetails.PaymentYn,
    "PaymentRedirUrl":this.productDetails.PaymentRedirUrl,
   "ProductCategory":this.productDetails.ProductCategory,
    "Remarks":this.productDetails.Remarks,
    "Status":this.productDetails.Status,
    "BackDays":this.productDetails.BackDays,
    "EffectiveDateStart":this.productDetails.EffectiveDateStart,
    "EffectiveDateEnd":this.productDetails.EffectiveDateEnd,
     "MakerYn":this.productDetails.CheckerYn,
    "CustConfirmYn":this.productDetails.CustConfirmYn,
      
    "RegulatoryCode":this.productDetails.RegulatoryCode,
    "CreatedBy": this.loginId,
    "LoginId": this.productDetails.LoginId,
    "CoreAppCode":this.productDetails.CoreAppCode,
    "FinanceIds": [
        
    ],
    "NonFinanceIds": [
        
    ],
   "PolicyTypeId":"",
   "PolicyTypeDesc":"",
    "BrokerCommissionDetails": finalList

    }
    let urlLink = `${this.CommonApiUrl1}admin/updatebrokercompanyproducts`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
      ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateEnd'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
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
          //   'Product Details Inserted/Updated Successfully',
          //   'Product Details',
          //   config);

          this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
        }
        else if(data.ErrorMessage){
          if(data.ErrorMessage){
            // for(let entry of data.ErrorMessage){
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
  onProductValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  onSelectPolicyTypeRow(event,index){
    let entry = this.productDetails.BrokerCommssionDetails[index];
    if(event) entry.SelectedYn = 'Y';
    else entry.SelectedYn = 'N';
  }
  SIStartListCommaFormatted(index){
        let entry = this.productDetails.BrokerCommssionDetails[index];
        if (entry.SumInsuredStart) {
          entry.SumInsuredStart = entry.SumInsuredStart.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         }
  }
  SIEndListCommaFormatted(index){
    let entry = this.productDetails.BrokerCommssionDetails[index];
    if (entry.SumInsuredEnd) {
      entry.SumInsuredEnd = entry.SumInsuredEnd.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
}
  SIEndCommaFormatted() {

    // format number
    if (this.productDetails.SumInsuredEnd) {
     this.productDetails.SumInsuredEnd = this.productDetails.SumInsuredEnd.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }}
    SIStartCommaFormatted() {

      // format number
      if (this.productDetails.SumInsuredStart) {
       this.productDetails.SumInsuredStart = this.productDetails.SumInsuredStart.replace(/\D/g, "")
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }}
    accessoriesCommaFormatted() {

      // format number
      if (this.accessoriesSI) {
       this.accessoriesSI = this.accessoriesSI.replace(/\D/g, "")
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    WindSICommaFormatted() {
      // format number
      if (this.windShieldSI) {
       this.windShieldSI = this.windShieldSI.replace(/\D/g, "")
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    onChangeClassType(){
      this.vehicleSI ="0";this.accessoriesSI="0",this.windShieldSI="0";this.tppdSI = "0";
    }
}
