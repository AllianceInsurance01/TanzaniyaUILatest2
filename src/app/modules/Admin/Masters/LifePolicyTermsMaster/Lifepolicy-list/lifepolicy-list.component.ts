import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService, NbDialogService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lifepolicy-list',
  templateUrl: './lifepolicy-list.component.html',
  styleUrls: ['./lifepolicy-list.component.scss']
})
export class LifePolicyListComponent implements OnInit {

activeMenu:any="policyterm"; tableData:any []=[];
  insuranceName: any;
  public columnHeader: any[] = [];countryList:any[]=[];
  public insuranceId:any;ExchangeId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public ExchangeData:any []=[];countryValue:any;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  insuranceList: any[]=[];
    productId: string;
  constructor(public dialogService: MatDialog,private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      // this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
    //   this.ExchangeId = sessionStorage.getItem('ExchangeId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
     
     }

  ngOnInit(): void {
    let exchangeObj:any = JSON.parse(sessionStorage.getItem('ExchangeId'));
    if(exchangeObj){
      this.insuranceId = exchangeObj?.InsuranceId
    }
    this.columnHeader = [
      { key: 'PolicyTerm', display: 'PolicyTerm' },
      { key: 'PolicyTermDesc', display: 'Policy TermDesc' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getCompanyList();

}
getCompanyList(){
  let ReqObj = {
    "BrokerCompanyYn":"",
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/company`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
        this.insuranceList = defaultObj.concat(data.Result);
        if(this.insuranceId){this.getExistingTerms();}
      }

    },
    (err) => { },
  );
}
EditStatus(event){
  let ReqObj = {
    "ExchangeId":event.ExchangeId,
    "Status":event.ChangedStatus,
    "InsuranceId":this.insuranceId,
    "EffectiveDateStart":event.ChangedEffectiveDate
  }
  let urlLink = `${this.CommonApiUrl1}master/exchange/changestatus`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      let res:any=data;
      if(data.Result){
              window.location.reload()
      }
    },
    (err) => { },
  );
}
onAddTerms(){
  let obj = {"PolicyTerm":null,"InsuranceId":this.insuranceId}
  sessionStorage.setItem('PolicyTermId', JSON.stringify(obj));
  this.router.navigate(['/Admin/lifepolicyterms/lifepolicydetails']);
}
onEdit(event){
  let obj = {"PolicyTerm":event.PolicyTerm,"InsuranceId":this.insuranceId}
  sessionStorage.setItem('PolicyTermId', JSON.stringify(obj));
  this.router.navigate(['/Admin/lifepolicyterms/lifepolicydetails']);
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
  getExistingTerms(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": "45",
      "SectionId": "99999"
    }
    let urlLink = `${this.CommonApiUrl1}master/getallpolicyterms`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ExchangeData = data?.Result;
        }
      },
      (err) => { },
    );

  }
}
