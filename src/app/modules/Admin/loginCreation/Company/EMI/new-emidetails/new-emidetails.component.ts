import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { Emi } from './Emi';

@Component({
  selector: 'app-new-emidetails',
  templateUrl: './new-emidetails.component.html',
  styleUrls: ['./new-emidetails.component.scss']
})
export class NewEmidetailsComponent implements OnInit {
  public minDate:Date;activeMenu:any='Emi';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;Status:'N';
  productId: string;EmiId:any
  loginId: any;emiDetails:any;
  policylList: any;
  PolicyType: any;
  Startpremium: any;
  Endpremium: any;
  MotoYn: string;

  constructor(
    private router: Router, private sharedService: SharedService, private datePipe: DatePipe) {
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
    this.MotoYn=sessionStorage.getItem('productType');
    console.log("pppppp", this.productId)
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.emiDetails = new Emi();
    this.EmiId = sessionStorage.getItem('EmiId');
    this.getPolicyList();
  }
  ngOnInit(): void {
    if(this.EmiId!=null && this.EmiId!=undefined){
      this.getEditEmiDetails();
    }
    else{
      this.emiDetails = new Emi();
      if(this.emiDetails?.Status==null) this.emiDetails.Status = 'N';

      this.emiDetails.CreatedBy = this.loginId;
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
        let entry = this.emiDetails[0];
        if(res.Result){
          this.emiDetails = res.Result;
          if(this.emiDetails){

            if(this.emiDetails?.EffectiveDateStart!=null){
              this.emiDetails.EffectiveDateStart = this.onDateFormatInEdit(this.emiDetails?.EffectiveDateStart)
            }
            if(this.emiDetails?.EffectiveDateEnd!=null){
              this.emiDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.emiDetails?.EffectiveDateEnd)
            }
            this.PolicyType= entry?.PolicyType;
          }
            this.CommaFormatted();
            this.CommaFormattedEnd();

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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
  }
  onProceed(){
  let Startpremium="",Endpremium="";
    if(this.emiDetails.PremiumStart==undefined) Startpremium = null;
    else if(this.emiDetails.PremiumStart.includes(',')){ Startpremium = this.emiDetails.PremiumStart.replace(/,/g, '') }
    else Startpremium = this.emiDetails.PremiumStart;
    if(this.emiDetails.PremiumEnd==undefined) Endpremium = null;
    else if(this.emiDetails.PremiumEnd.includes(',')){ Endpremium = this.emiDetails.PremiumEnd.replace(/,/g, '') }
    else Endpremium = this.emiDetails.PremiumEnd;
    let ReqObj = {
    "EmiId":this.EmiId,
    "InsuranceId":this.insuranceId,
    "ProductId":this.productId,
    "EffectiveDateStart":this.emiDetails.EffectiveDateStart,
    "PolicyType":this.emiDetails.PolicyType,
    "InstallmentPeriod":this.emiDetails.InstallmentPeriod,
    "PremiumStart":Startpremium,
    "PremiumEnd":Endpremium,
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
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
          }

        },
        (err) => { },
      );
  }
  getPolicyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,"ProductId":this.productId,"BranchCode":"03","LoginId":this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(this.productId=='5'){
            let datas=[{"Code":'99999',"CodeDesc":"ALL"}];
            this.policylList=datas.concat(data.Result);
          }
          else{
            this.policylList = data.Result;
          }
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
    if (this.emiDetails.PremiumStart) {
     this.emiDetails.PremiumStart = this.emiDetails.PremiumStart.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedEnd(){
    if (this.emiDetails.PremiumEnd) {
      this.emiDetails.PremiumEnd = this.emiDetails.PremiumEnd.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
  }
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails']);
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails']);
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails']);
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList']);
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails']);
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails']);
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails']);
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata']);
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails']);
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList']);
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification']);
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList']);
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList']);
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList']);
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList']);
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield']);
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType']);
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
    if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
    if(value=='SURVIVAL')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/survival']);
    if(value=='Surrender')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/surrender']);
    if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
  }
}
