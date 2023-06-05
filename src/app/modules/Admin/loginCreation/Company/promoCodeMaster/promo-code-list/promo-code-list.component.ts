import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-promo-code-list',
  templateUrl: './promo-code-list.component.html',
  styleUrls: ['./promo-code-list.component.scss']
})
export class PromoCodeListComponent implements OnInit {

  countryData:any[]=[];countryHeader:any[]=[];
  public activeMenu:any='Promo';
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceName: string;
  insuranceId: string;
  productId: string;
  sectionList: any;
  loginId: any;
  sectionValue: string;
  Branch: string;
  agency: string;
  add: boolean;
  constructor(private router:Router,private sharedService: SharedService) {
    this.Branch =  sessionStorage.getItem('BranchCode')
    this.agency =   sessionStorage.getItem('AgencyCode')
    this.countryHeader = [
      { key: 'Promocode', display: 'Promo code' },
      { key: 'PromocodeTypeDesc', display: 'Promocode TypeDesc' },
      { key: 'PeriodFrom', display: 'Period From' },
      { key: 'PeriodTo', display: 'Period To' },
       { key: 'PromoRateOrAmt', display: 'PromoRateOrAmt' },
      //{ key: 'PromoType', display: 'Promo Type' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];

    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.countryData = [
      /*{
        "PromoCode": "DIS10213",
        "ProductName": "Health Insurance",
        "Status": "Y",
        "CoreAppCode": "131",
        "PromoType": "Discount",
        "Remarks": "Ok"
       },
       {
        "PromoCode": "SCH10121",
        "ProductName": "Motor Insurance",
        "Status": "Y",
        "CoreAppCode": "242",
        "PromoType": "Schema",
        "Remarks": "Ok"
       },
       {
        "PromoCode": "DIS15247",
        "ProductName": "Life Insurance",
        "Status": "Y",
        "CoreAppCode": "342",
        "PromoType": "Discount",
        "Remarks": "Ok"
       },*/
    ];

    this.getSectionList()
  }


  getSectionList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        /*if(data.Result){
          this.sectionList = data.Result;
          let sectionValue = sessionStorage.getItem('companySectionId');
          if(sectionValue){
            this.sectionValue = sectionValue;
            this.getExistingpromo();
          }
          else if(this.sectionList.length!=0){
            this.sectionValue = this.sectionList[0].Code;
            this.getExistingpromo();
          }
        }*/
        if(data.Result){
          let obj = [];
          this.sectionList = obj.concat(data?.Result);
          console.log(this.sectionList);
          let docObj = JSON.parse(sessionStorage.getItem('addDetailsObj'))
          if(docObj){ this.sectionValue = docObj?.Section;
            console.log('LLLLLLLLLL',this.sectionValue);
            this.getExistingpromo()}
          else{ this.sectionValue=null; this.getExistingpromo();}

        }

        },
        (err) => { },
      );
  }

  ngOnInit(): void {


  }
  adds(){
    if(this.sectionValue){
      this.add=true;
    }
    else{
        this.add=false
    }
  }
  onAddNew(){


   /* if(this.sectionValue==undefined || this.sectionValue==null || this.sectionValue==''){
  this.Toaster.open({
        text:'Please Enter Section Field',
        caption: 'Section Field',
        type: 'success',
      });
    }
    else{
      console.log('sssssssss',this.sectionValue)
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster/newPromoCodeDetails']);
      sessionStorage.removeItem('PromoCode');
      sessionStorage.setItem('sectionId',this.sectionValue);
    }*/

    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster/newPromoCodeDetails']);
    sessionStorage.removeItem('PromoCode');
    sessionStorage.setItem('sectionId',this.sectionValue);

  }
  EditStatus(event){
    let ReqObj={
      "PromocodeId":event.PromocodeId,
      "SectionId": this.sectionValue,
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    sessionStorage.setItem('PromoCode',JSON.stringify(ReqObj));

    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster/newPromoCodeDetails'])

  }


getExistingpromo(){
  let ReqObj = {
   /*"ProductId" : this.productId ,
   "InsuranceId" : this.insuranceId,
    "SectionId":this.sectionValue,
    "AgencyCode":"99999",
    "BranchCode":"99999"*/
    "ProductId" :this.productId,
   "InsuranceId" :this.insuranceId,
    "SectionId":this.sectionValue,
    "AgencyCode":"99999",
    "BranchCode":"99999"

 }
 let urlLink = `${this.ApiUrl1}master/getallcompanypromocodedetails`;

   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.countryData = data?.Result;
            // if(this.sectionValue){
            //   this.add=true;
            // }
            // else{
            //     this.add=false
            // }
            console.log('tttttttt',this.countryData);
            if(this.sectionValue!=undefined && this.sectionValue!=null){
              let docObj = {"Section":this.sectionValue};
              sessionStorage.setItem('addDetailsObj',JSON.stringify(docObj));
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
  if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
}


}
