import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { Product } from './Product';

@Component({
  selector: 'app-addproduct-details',
  templateUrl: './addproduct-details.component.html',
  styleUrls: ['./addproduct-details.component.scss']
})
export class AddproductDetailsComponent implements OnInit {
  activeMenu:any='product'
  productData:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  productId: string;brokerId:any;brokerLoginId:any;
  insuranceName: string;agencyCode:any;
  insuranceId: string;brokerCompanyYN:any;
  productDetails:any;
  minDate:Date;
  loginId: any;BrokerCode:any;
  vehicleSI:any;
  accessoriesSI:any;
  windShieldSI:any;tppdSI:any;
  userLoginId: any;
  userId: any;
  oaCode: any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe) {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let userObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    if(userObj){
      if(userObj.loginId) this.userLoginId = userObj.loginId;
      if(userObj.BrokerId) this.BrokerCode = userObj.BrokerId;
      console.log('Product loginid',this.userLoginId)
      if(userObj.InsuranceId) this.insuranceId = userObj.InsuranceId;
      console.log('Product insuranceId',this.insuranceId)
      if(userObj.userId) this.userId = userObj.userId;

      if(userObj.ProductId!=null)this.productId = userObj.ProductId;
      else this.productId = null;
      if(userObj.OaCode!=null)this.oaCode = userObj.OaCode;
      else this.oaCode = null;
      console.log('Oac.....',this.oaCode)
    }
    this.userId = this.userLoginId;
    this.productDetails = new Product();
      if(this.productId!=null && this.productId!=undefined)
      this.getProductDetails();

    }

  ngOnInit(): void {
    if(this.productDetails?.CheckerYn==null) this.productDetails.CheckerYn  = 'N';
    if(this.productDetails?.PaymentYn==null)  this.productDetails.PaymentYn = 'N';
    if(this.productDetails?.CommissionVatYn==null)  this.productDetails.CommissionVatYn = 'N';
    if(this.productDetails.Status==null) this.productDetails.Status ='Y';
    if(this.productDetails.BackDays==null) this.productDetails.BackDays = '0';
  }
  onPaymentChange(){
    if(this.productDetails.PaymentYn=='N'){
      this.productDetails.PaymentRedirUrl = null;
    }
  }
  getProductDetails(){

    let ReqObj = {
      "LoginId": this.userLoginId,
      "ProductId":this.productId,
      "InsuranceId":this.insuranceId,

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
    this.router.navigate(['/Admin/userList/UserproductList'])
  }
  onProceed(){
    let SumInsuredEnd="",SumInsuredStart="",windSI="",tppSI="" ;
    if(this.productDetails.SumInsuredEnd==undefined) SumInsuredEnd = null;
    else if(this.productDetails.SumInsuredEnd.includes(',')){SumInsuredEnd = this.productDetails.SumInsuredEnd.replace(/,/g, '') }
    else SumInsuredEnd = this.productDetails.SumInsuredEnd;
    if(this.productDetails.SumInsuredStart==undefined) SumInsuredStart = null;
    else if(this.productDetails.SumInsuredStart.includes(',')){ SumInsuredStart = this.productDetails.SumInsuredStart.replace(/,/g, '') }
    else SumInsuredStart = this.productDetails.SumInsuredStart;


    let ReqObj =  {
      "AppLoginUrl": this.productDetails.AppLoginUrl,
      "CheckerYn": this.productDetails.CheckerYn,
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "ProductName": this.productDetails.ProductName,
      "ProductDesc": this.productDetails.ProductDesc,
      "ProductIconId": this.productDetails.ProductIconId,
      "PaymentYn": this.productDetails.PaymentYn,
      "PaymentRedirUrl": this.productDetails.PaymentRedirUrl,
      "ProductCategory": this.productDetails.ProductCategory,
      "Remarks": this.productDetails.Remarks,
      "Status": this.productDetails.Status,
      "BackDays": this.productDetails.BackDays,
      "EffectiveDateStart": this.productDetails.EffectiveDateStart,
      "EffectiveDateEnd": this.productDetails.EffectiveDateEnd,
      "CommissionVatYn": this.productDetails.CommissionVatYn,
      "MakerYn": this.productDetails.CheckerYn,
      "CustConfirmYn": this.productDetails.CustConfirmYn,
      "SumInsuredStart": SumInsuredStart,
      "SumInsuredEnd": SumInsuredEnd,
      "RegulatoryCode": this.productDetails.RegulatoryCode,
      "CreatedBy": this.loginId,
      "CommissionPercent": this.productDetails.CommissionPercent,
      "LoginId": this.productDetails.LoginId,
      "CoreAppCode": this.productDetails.CoreAppCode
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
            this.router.navigate(['/Admin/userList/UserproductList']);

        }
        else if(data.ErrorMessage){
          if(data.ErrorMessage){
            for(let entry of data.ErrorMessage){
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
  onProductValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
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
    onRedirect(value){
      this.activeMenu = value;
      if(this.activeMenu=='Product') this.router.navigate(['/Admin/userList/userBranchDetails']);
      if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
      if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
    }
}
