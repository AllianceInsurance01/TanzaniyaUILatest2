import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-tinyurl-list',
  templateUrl: './tinyurl-list.component.html',
  styleUrls: ['./tinyurl-list.component.scss']
})
export class TinyurlListComponent implements OnInit {

  public activeMenu:any='Tinyurl';
  public tinyUrlData:any[]=[];columnHeader:any[]=[];branchList:any[]=[];
  branchValue: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  minDate: Date;
  insuranceId: string;
  productId: string;
  constructor(private router:Router,private sharedService:SharedService,) {
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
   }

  ngOnInit(): void {
    this.getBranchList();
  }

  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let docObj = JSON.parse(sessionStorage.getItem('Sno'))
        if(docObj){
          this.branchValue = docObj?.BranchCode;
          this.getExistingTinyUrl();
        //this.getIndustryList()
      }
        else{
          this.branchValue="99999";
          this.getExistingTinyUrl();
          //this.getIndustryList()
        }
        //if(!this.branchValue){ this.branchValue = "99999"; this.getExistingTinyUrl()  }
      }
    },
    (err) => { },

  );
  }
  getExistingTinyUrl(){
    let ReqObj = {
      "BranchCode":"99999",
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/getalltinyurl`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.tinyUrlData = data?.Result;
        }
        this.columnHeader = [
          { key: 'AppUrl', display: 'AppUrl' },
          { key: 'Type', display: 'Type' },
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
      },
      (err) => { },
    );
  }
  onEditSection(event){
    let ReqObj = {
      "Sno": event.Sno,
      "BranchCode": "All",
      "ProductId":this.productId,
    }
    console.log('branch',this.branchValue,this.productId,event.Sno)
    sessionStorage.setItem('Sno', JSON.stringify(ReqObj));
   this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList/tinyurlDetails'])
  }
  onAddSection(){
    let ReqObj = {
      "Sno": null,
      "BranchCode": "All",
      "ProductId":this.productId,
    }
    console.log('branch',this.branchValue,this.productId)
    sessionStorage.setItem('Sno', JSON.stringify(ReqObj));
    //sessionStorage.removeItem('Sno')
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList/tinyurlDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "BranchCode": this.branchValue,
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/changestatustinyurl`;
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
                  this.getExistingTinyUrl()
                //window.location.reload()
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
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits'])
  }
}
