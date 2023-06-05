import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import { Payment } from '../payment-list/Payment';
import * as Mydatas from '../../../../../../app-config.json';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  activeMenu:any='Payment';
  minDate: Date;
  insuranceId: string;
  productId: string;
  loginId: any;
  paymentdetalis: any;
  PaymentMasterId:any;
  branchList: { Code: string; CodeDesc: string; }[];
  branchValue: any;
  constructor(
    private router: Router, private sharedService: SharedService, private datePipe: DatePipe) {
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
    console.log("pppppp", this.productId)
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.paymentdetalis = new Payment();
    //this.PaymentMasterId = sessionStorage.getItem('PaymentMasterId');
   // this.getEditPaymentDetails();
  }

  ngOnInit(): void {
    if(this.PaymentMasterId!=null && this.PaymentMasterId!=undefined){
      this.getEditPaymentDetails();
    }
    else{

      this.paymentdetalis = new Payment();
      if(this.paymentdetalis?.Status==null) this.paymentdetalis.Status = 'N';
      if(this.paymentdetalis?.CashYn==null) this.paymentdetalis.CashYn = 'N';
      if(this.paymentdetalis?.ChequeYn==null) this.paymentdetalis.ChequeYn = 'N';
      if(this.paymentdetalis?.CreditYn==null) this.paymentdetalis.CreditYn = 'N';

      this.paymentdetalis.CreatedBy = this.loginId;
    }
    this.getBranchList();
  }
  getEditPaymentDetails() {
    let ReqObj = {

      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "PaymentMasterId": this.PaymentMasterId
    }
    let urlLink = `${this.CommonApiUrl}master/getbypaymentid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        let entry = this.paymentdetalis[0];
        if (res.Result) {
          this.paymentdetalis = res.Result;
          if (this.paymentdetalis) {

            if (this.paymentdetalis?.EffectiveDateStart != null) {
              this.paymentdetalis.EffectiveDateStart = this.onDateFormatInEdit(this.paymentdetalis?.EffectiveDateStart)
            }
            if (this.paymentdetalis?.EffectiveDateEnd != null) {
              this.paymentdetalis.EffectiveDateEnd = this.onDateFormatInEdit(this.paymentdetalis?.EffectiveDateEnd)
            }
          }
        }
      },
      (err) => { },
    );
  }
  /*onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }*/

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;


      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }
  getBranchList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);
          let Payment: any = JSON.parse(sessionStorage.getItem('PaymentMasterId'));
          if (Payment) {
            console.log("PaymentMasterId Obj", Payment)
            this.PaymentMasterId = Payment?.PaymentMasterId;
            this.branchValue = Payment?.BranchCode;
            if (this.PaymentMasterId) this.getEditPaymentDetails();
            else this.PaymentMasterId = null;
          }
          else this.PaymentMasterId = null;
        }
      },
      (err) => { },
    );
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
  }
  onProceed(){
    let ReqObj = {
      "BranchCode":this.branchValue,
      "CashYn":this.paymentdetalis.CashYn,
      "ChequeYn":this.paymentdetalis.ChequeYn,
      "CreatedBy":this.loginId,
      "CreditYn":this.paymentdetalis.CreditYn,
      "EffectiveDateStart": this.paymentdetalis.EffectiveDateStart,
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "PaymentMasterId":this.PaymentMasterId,
      "Status":this.paymentdetalis.Status,
      "SubUserType": "b2b",
      "UserType": "broker"
    }
    let urlLink = `${this.CommonApiUrl}master/insertpayment`;
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
            //         'Payment Details Inserted/Updated Successfully',
            //         'Payment Details',
            //         config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
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
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
  }
}
