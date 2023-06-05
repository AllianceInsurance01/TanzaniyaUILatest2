import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-endrosement-type-list',
  templateUrl: './endrosementfield-list.component.html',
  styleUrls: ['./endrosementfield-list.component.scss']
})
export class EndorsementListComponent {
  public EnoData:any[]=[];
  public columnHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;

  public insuranceId: any;productId: any;
  EmiId: any;
  userDetails: any;
  activeMenu:any='EndorsementField'

  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    //this.insuranceName = sessionStorage.getItem('insuranceName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
      this.getExistingEndo();
   }

  ngOnInit(): void {
    sessionStorage.removeItem('EmiId')
    this.columnHeader = [
      { key: 'DependantFieldName', display: 'DependantFieldName' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'CoreAppCode', display: 'Core AppCode' },
      { key: 'RegulatoryCode', display: 'Regulatory Code' },

      //{ key: 'EffectiveDateEnd', display: 'Effective Date End' },     
     { key: 'Status', display: 'Status' },
     { key: 'Remarks', display: 'Remarks' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
  }
  onAddSection(){
    sessionStorage.removeItem('DependantFieldId')
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield/newEndorsementTypeDetails']);
}
  onEditSection(rowdata){

    let entry = {
      "DependantFieldId":rowdata.DependantFieldId,
    "InsuranceId":rowdata.CompanyId,
    "ProductId":rowdata.ProductId

    }
    sessionStorage.setItem('DependantFieldId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield/newEndorsementTypeDetails']);
  }
  getExistingEndo(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
    }
    let urlLink = `${this.CommonApiUrl1}master/getalldependant`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.EnoData = data?.Result;
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
