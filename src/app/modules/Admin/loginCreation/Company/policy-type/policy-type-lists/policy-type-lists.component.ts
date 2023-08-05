import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-policy-type-lists',
  templateUrl: './policy-type-lists.component.html',
  styleUrls: ['./policy-type-lists.component.css']
})
export class PolicyTypeListComponent implements OnInit {

  insuranceName: any;activeMenu="Policy";
  public tableData: any[] = [];insuranceId:any;productId:any;
  public columnHeader: any[] = [];public filterValue: any;loginId:any;
  public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,private sharedService: SharedService,

    private datePipe:DatePipe,) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.getPolicyTypeList();
     }

     ngOnInit(): void {
      this.columnHeader = [
        { key: 'PolicyTypeName', display: 'PolicyTypeName' },
        { key: 'EffectiveDateStart', display: 'Start Date' },
        { key: 'Remarks', display: 'Remarks' },
        //{ key: 'Remarks ', display: 'Remarks' },
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: true,
          },
        }
      ];

  }
  getPolicyTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/getallpolicytype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.tableData = data?.Result;
        }

        },
        (err) => { },
      );
  }
  onEditSection(rowData){
    let ReqObj = {
      "PolicyTypeId":rowData.PolicyTypeId,
      "InsuranceId":this.insuranceId,
       "ProductId":rowData.ProductId

    }
    sessionStorage.setItem('PolicyDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList/PolicyTypeDetails'])

  }
  EditStatus(event){
    let ReqObj = {
      "PolicyTypeId":event.PolicyTyeId,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
       "EffectiveDateStart":event.ChangeEffectiveDate,
       "CreatedBy":"issuer3493",
        "Status":event.ChangedStatus,
    }
    let urlLink = `${this.ApiUrl1}master/policytype/changestatus`;
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
                  this. getPolicyTypeList();
                  //this.getExistingTinyUrl()
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
  onAddSection(){
    sessionStorage.removeItem('PolicyDetails');
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList/PolicyTypeDetails'])

    //this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails/newPolicyTypeDetails'])
  }
  ongetBack(){

  }
}
