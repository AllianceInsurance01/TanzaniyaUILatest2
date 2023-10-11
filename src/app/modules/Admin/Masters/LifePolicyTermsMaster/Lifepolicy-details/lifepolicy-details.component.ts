import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { LifePolicyTerms } from './lifePolicy';


@Component({
  selector: 'app-lifepolicy-details',
  templateUrl: './lifepolicy-details.component.html',
  styleUrls: ['./lifepolicy-details.component.scss']
})
export class LifePolicyDetailsComponent implements OnInit {

    activeMenu:any="policyterm";
    @Input() title: any;@Input() ExchangeId:any;
    public minDate:Date;BranchCodeList:any;currencyList:any[]=[];
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    insuranceId: string;productId:any;loginId:any;exchangeDetails:any;
    insuranceName: string;
    policytermId: any;typeId:any;
    constructor(
      private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
        this.minDate = new Date();
      //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.exchangeDetails = new LifePolicyTerms();
      }
  
    ngOnInit(): void {
      let obj = JSON.parse(sessionStorage.getItem('PolicyTermId'))
      if(obj){
        this.policytermId = obj.PolicyTerm;
        this.insuranceId = obj.InsuranceId;
      }
    //   this.getCurrencyList();
      if(this.policytermId!=null && this.policytermId!=undefined){
        this.getEditpolicyDetails();
        this.typeId='E';
      }
      else{
        this.exchangeDetails = new LifePolicyTerms();
        this.ExchangeId=null;
        if(this.exchangeDetails?.Status==null)  this.exchangeDetails.Status = 'Y';
        this.exchangeDetails.CreatedBy = this.loginId;
        this.typeId='N';
      }
    }
    getEditpolicyDetails(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "SectionId": "99999",
        "PolicyTerm":this.policytermId
      }
        let urlLink = `${this.CommonApiUrl}master/getpolicyterm`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res:any = data;
          if(res.Result){
            this.exchangeDetails = res.Result;
            if(this.exchangeDetails){
              if(this.exchangeDetails?.EffectiveDateStart!=null){
                this.exchangeDetails.EffectiveDateStart = this.onDateFormatInEdit(this.exchangeDetails?.EffectiveDateStart)
              }
              this.policytermId = this.exchangeDetails?.PolicyTerm;
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
        this.router.navigate(['/Admin/lifepolicyterms']);
    }
    onProceed(){
      let ReqObj = {
  "CoreAppCode":this.exchangeDetails.CoreAppCode,
  "CreatedBy": this.loginId,
  "EffectiveDateStart": this.exchangeDetails.EffectiveDateStart,
  "InsuranceId": this.insuranceId,
  "PolicyTerm": this.policytermId,
  "PolicyTermDesc": this.exchangeDetails.PolicyTermDesc,
  "ProductId": this.productId,
  "RegulatoryCode":this.exchangeDetails.RegulatoryCode,
  "Remarks":this.exchangeDetails.Remarks,
  "SectionId": "99999",
  "Status":this.exchangeDetails.Status,
  "Type":this.typeId
      }
      let urlLink = `${this.CommonApiUrl}master/insertpolicyterms`;
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
                this.router.navigate(['/Admin/lifepolicyterms']);
            }
            else if(data.ErrorMessage){
                if(res.ErrorMessage){
                  console.log("Error Iterate",data.ErrorMessage)
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
        if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
        if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
        if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
        if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
        if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
        if(value=='SURVIVAL')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/survival']);
        if(value=='Surrender')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/surrender']);
        if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
      }
  }
  