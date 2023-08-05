
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';

import * as Mydatas from '../../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  stateValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any='Notification';regionList:any[]=[];
  regionValue:any;
  cityData:any[]=[];cityHeader:any[]=[];
  insuranceName: string;
  CountryList: any[]=[];CountryValue:any;
  StateList: any[]=[];StateValue:any;
  MakeId: any;
  BranchCode:any; branchList:any;
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  NotificationData:any[]=[];NotificationHeader:any[]=[];
  insuranceId: string;
  productId: string;
  loginId: any;
  constructor(private router:Router,private sharedService:SharedService,) {
    this.activeMenu = "City";
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
     // let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  }

  ngOnInit(): void {
    this.NotificationHeader = [
      { key: 'NotifTemplatename', display: 'Notification Template Name' },
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

this.getExistingNotification();
  }
  EditStatus(event){

    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "FactorTypeId":event.FactorTypeId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate,
      "NotifTemplateCode":event.NotifTemplateCode,
    "CreatedBy":this.loginId,

    }
    let urlLink = `${this.ApiUrl1}master/notitemplete/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
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
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getExistingNotification()
                //window.location.reload()
        }
      },
      (err) => { },
    );
    //console.log("Status Changed",event)
}
  getExistingNotification()
  {
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId
    }

     let urlLink = `${this.ApiUrl1}master/getallnotitemplete`;
       this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
         (data: any) => {
           console.log(data);
           if(data.Result){
               this.NotificationData = data?.Result;
           }
         },
       (err) => { },
     );
  }
  onEditNotification(event){
    let entry = {
      "NotifTemplateCode":event.NotifTemplateCode,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
    }
    sessionStorage.setItem('NotifTemplateCode',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification/newNotificationDetails'])
  }


  onAddNew() {
    sessionStorage.removeItem('NotifTemplateCode')
    // let entry = {
    //   "NotifTemplateCode":null,
    //   "InsuranceId":this.insuranceId,
    //   "ProductId":this.productId,
    // }
    // sessionStorage.setItem('NotifTemplateCode',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification/newNotificationDetails']);

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
