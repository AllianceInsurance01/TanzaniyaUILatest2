import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-emi-list',
  templateUrl: './emi-list.component.html',
  styleUrls: ['./emi-list.component.scss']
})
export class EmiListComponent implements OnInit {

  public EmiData:any[]=[];activeMenu:any='Emi';
  public columnHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public insuranceId: any;productId: any;
  EmiId: any;
  insuranceName: string;
  MotoYn: string;

  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    this.MotoYn=sessionStorage.getItem('productType');
      this.getExistingEmi();
      this.EmiId = sessionStorage.getItem('EmiId');
   }

  ngOnInit(): void {
    sessionStorage.removeItem('EmiId')
    this.columnHeader = [
      { key: 'PremiumStart', display: 'Premium Start' },
      { key: 'PremiumEnd', display: 'Premium End' },
      { key: 'PolicyTypeDesc', display: '"PolicyType Desc' },
      { key: 'InterestPercent', display: 'Interest Percent' },
      { key: 'AdvancePercent', display: 'Advance Percent' },
      { key: 'InstallmentPeriod', display: 'Installment Period' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },

      { key: 'Status', display: 'Status' },
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
    sessionStorage.removeItem('EmiId')

    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails/newEmiDetails'])
  }
  onEditSection(event){
    sessionStorage.setItem('EmiId', event.EmiId);
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails/newEmiDetails'])

  }
  EditStatus(event){
    let ReqObj = {
      "EmiId":event.EmiId,
      "InsuranceId":this.insuranceId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/emi/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
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
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getExistingEmi()
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }

  getExistingEmi(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId
    }
    let urlLink = `${this.ApiUrl1}master/getallemidetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.EmiData = data?.Result;
        }
      },
      (err) => { },
    );
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
