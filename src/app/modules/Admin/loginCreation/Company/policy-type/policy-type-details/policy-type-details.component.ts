import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { Policy } from './policy.Model';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-policy-type-details',
  templateUrl: './policy-type-details.component.html',
  styleUrls: ['./policy-type-details.component.css']
})
export class PolicyTypeDetailsComponent implements OnInit {

  insuranceName: any;activeMenu="Policy";
  minDate:Date;
  insuranceId: any;
  public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

    policyTypeNmae:any;
    productId:any;
 policyType:any;
  loginId: any;


  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      this.minDate=new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.productId =  sessionStorage.getItem('companyProductId');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.policyType = new Policy();
     }

  ngOnInit(): void {
    let policyObj = JSON.parse(sessionStorage.getItem('PolicyDetails'));
    this.policyTypeNmae= policyObj?.PolicyTypeId;
    //this.insuranceId = policyObj.InsuranceId;
    //this.productId= policyObj.ProductId;

    if(this.policyType?.Status==null)  this.policyType.Status = 'Y';

   if(this.policyTypeNmae!=null && this.policyTypeNmae!=undefined){
      //this.getEditCityDetails();
      this.getEditPolicyDetails()
    }
    else{
      this.policyType= new Policy();
      if(this.policyType?.Status==null)  this.policyType.Status = 'Y';

      //this.policyTypeNmae= policyObj?.PolicyTypeId;
      //this.insuranceId = policyObj.InsuranceId;
      //this.productId= policyObj.ProductId;

    }

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
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
  }
  onProceed(){

  }
  getEditPolicyDetails(){

    let ReqObj =  {
      "PolicyTypeId": this.policyTypeNmae,
      "InsuranceId":this.insuranceId,
       "ProductId":this.productId
  }
    let urlLink = `${this.CommonApiUrl}master/getpolicytype`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.policyType = res.Result;
        //this.policyTypeNmae=res.Result.PolicyTypeId
        if(this.policyType){
          if(this.policyType?.EffectiveDateStart!=null){

           this.policyType.EffectiveDateStart = this.onDateFormatInEdit(this.policyType?.EffectiveDateStart)
          }
          if(this.policyType?.EffectiveDateEnd!=null){
            this.policyType.EffectiveDateEnd = this.onDateFormatInEdit(this.policyType?.EffectiveDateEnd)
          }
          //this.getStateList();

        }
      }
      console.log("Final policy Class",this.policyType);
    },
    (err) => { },
  );
}
onSavepolicy() {
  let ReqObj = {

    "PolicyTypeId":this.policyType.PolicyTypeId,
    "PolicyTypeName":this.policyType.PolicyTypeName,
    "EffectiveDateStart":this.policyType.EffectiveDateStart,
    "Remarks":this.policyType.Remarks,
       "InsuranceId":"100002",
        "ProductId":this.productId,
        "CreatedBy":this.loginId,
            "Status":this.policyType.Status
  }
  let urlLink = `${this.ApiUrl1}master/insertpolicytype`;

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
          //         'policy Details Inserted/Updated Successfully',
          //         'policy Details',
          //         config);
                  this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])

        }
        /*else if(data.ErrorMessage){
            if(res.ErrorMessage){
              for(let entry of res.ErrorMessage){
                let type: NbComponentStatus = 'danger';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  entry.Field,
                  entry.Message,
                  config);
              }
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }*/
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

}
