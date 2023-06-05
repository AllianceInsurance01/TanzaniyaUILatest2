import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { Product } from './Product';
//import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public activeMenu:any='Product';
  iconList:any[]=[];
  statusValue:any= "YES";cityList:any[]=[];
  insuranceName: string;
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any= this.AppConfig.CommonApiUrl;
  productDetails: any;
  loginId: any;
  minDate: Date;
  CurrencyIds:any[]=[];
  CurrencyList:any[]=[];
  Currency: any;
  Branch: string;
  agency: string;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {

      this.minDate = new Date();
    let reload =  sessionStorage.getItem('reload');
    if(reload){
      if(reload == 'false'){
        sessionStorage.removeItem('reload');
        window.location.reload();
      }
    }
    else{
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
     this.productId =  sessionStorage.getItem('companyProductId');
      this.productDetails = new Product();
      this.getProductDetails();
    }
   }

  ngOnInit(): void {

    this.getProductIconList();
  }
  onCurrencyChange(Currency){
    if(this.insuranceId!='' && this.insuranceId!= undefined){
      let urlLink = `${this.CommonApiUrl}master/dropdown/currency`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.CurrencyList = data.Result;
             this.CurrencyIds = Currency;
              //this.getBranchList(type,branches);
          }
        },
        (err) => { },
      );
    }
  }
  getProductIconList(){
    let ReqObj = {
      "InsuranceId": this.productId,
      "BranchCode": "99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/producticons`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.iconList = data.Result;
        }

      },
      (err) => { },
    );
  }
  getProductDetails(){
    let ReqObj = {
      "ProductId":this.productId, "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/getbycompanyproductid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
         this.productDetails = data.Result;
         console.log('TTTTTTT',this.productDetails);
         console.log('CCCCCCCC',this.productDetails.CurrencyIds);
         this.onCurrencyChange('direct');
         if(this.productDetails?.PackageYn==null)  this.productDetails.PackageYn = 'N';
         if(this.productDetails){
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
  onPaymentChange(){
    if(this.productDetails.PaymentYn=='N'){
      this.productDetails.PaymentRedirUrl = null;
    }
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
  onProceed(){
    let SumInsuredEnd="",SumInsuredStart="";
    if(this.productDetails.SumInsuredEnd==undefined) SumInsuredEnd = null;
    else if(this.productDetails.SumInsuredEnd.includes(',')){SumInsuredEnd = this.productDetails.SumInsuredEnd.replace(/,/g, '') }
    else SumInsuredEnd = this.productDetails.SumInsuredEnd;
    if(this.productDetails.SumInsuredStart==undefined) SumInsuredStart = null;
    else if(this.productDetails.SumInsuredStart.includes(',')){ SumInsuredStart = this.productDetails.SumInsuredStart.replace(/,/g, '') }
    else SumInsuredStart = this.productDetails.SumInsuredStart;
    let ReqObj =  {
    "ProductId": this.productDetails.ProductId,
    "InsuranceId":this.insuranceId,
    "ProductName":this.productDetails.ProductName,
    "ProductDesc": this.productDetails.ProductDesc,
    "ProductIconId":this.productDetails.ProductIconId,
    "PaymentYn":this.productDetails.PaymentYn,
    "PaymentRedirUrl":this.productDetails.PaymentRedirUrl,
    "AppLoginUrl":this.productDetails.AppLoginUrl,
    "ProductCategory":this.productDetails.ProductCategory,
    "Remarks":this.productDetails.Remarks,
    "Status":this.productDetails.Status,
    "EffectiveDateStart":this.productDetails.EffectiveDateStart,
    "EffectiveDateEnd":this.productDetails.EffectiveDateEnd,
    "CommissionVatYn":this.productDetails.CommissionVatYn,
    "CheckerYn":this.productDetails.CheckerYn,
    "PackageYn":this.productDetails.PackageYn,
    "MakerYn":this.productDetails.CheckerYn,
    "CustConfirmYn":this.productDetails.CustConfirmYn,
    "SumInsuredStart":SumInsuredStart,
    "SumInsuredEnd":SumInsuredEnd,
    "CoreAppCode":this.productDetails.CoreAppCode,
    "RegulatoryCode":this.productDetails.RegulatoryCode,
    "CreatedBy": this.loginId,
    "CurrencyIds":this.productDetails.CurrencyIds
    }
    let urlLink = `${this.ApiUrl1}master/updatecompanyproducts`;
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

          //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
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
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure'])
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
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
  }
}
