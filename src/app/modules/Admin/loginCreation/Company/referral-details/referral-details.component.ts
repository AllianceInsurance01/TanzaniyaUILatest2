import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
import { NewReferralDetailsComponent } from '../../../default-configuration/new-referral-details/new-referral-details.component';
import { SharedService } from '../../../../../shared/shared.service';


@Component({
  selector: 'app-referral-details',
  templateUrl: './referral-details.component.html',
  styleUrls: ['./referral-details.component.scss']
})
export class ReferralDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any='Referral'
  insuranceName: string;insuranceId: string;
  loginId: any; productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public branchList:any;BranchCode:any;
  constructor(private router:Router,private sharedService:SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    //this.referralList();
    //this.getBranchList();
    this.getExistingDropdown()
  }

  ngOnInit(): void {
    //sessionStorage.removeItem("ItemId")
    this.columnHeader = [
      { key: 'ApiName', display: 'Api Name' },
      { key: 'KeyName', display: 'Field Name' },
      { key: 'TableType', display: 'Table Type' },
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


  /*getBranchList(){
    let ReqObj = {
      "InsuranceId":'100002',
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.BranchCode){ this.BranchCode = "99999"; this.getExistingDropdown() }
      }
    },
    (err) => { },
  );
  }*/

  getExistingDropdown(){
    let ReqObj = {
      //"ItemId":'1',
    "InsuranceId":this.insuranceId,
    "BranchCode":this.BranchCode,
    "ProductId":this.productId
    }
    let urlLink = `${this.ApiUrl1}api/getallconstanttabledetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log('TTTTTTTTT',data);
        if(data.Result){
            this.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }
/*referralList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
   "ProductId": this.productId
  }
  let urlLink = `${this.ApiUrl1}master/getallproductreferaldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any)=>{
        console.log(data);
          if(data.Result){
            this.columnHeader = [
              { key: 'ReferalName', display: 'Referal Name' },
              { key: 'CoreAppCode', display: 'Core App Code' },
              { key: 'EffectiveDateStart', display: 'Date Start' },
              { key: 'Status', display: 'Status' },
              {
                key: 'actions',
                display: 'Action',
                config: {
                  isEdit: true,
                },
              },
            ];
            this.tableData = data.Result;
          }
        },
        (err) => {},

    );
}*/
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
  }
  onAddReferral(){
    sessionStorage.removeItem('ItemId');
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails/addNewReferral']);
    //this.router.navigate(['/Admin/dropdownMaster/newDropdownDetails'])
  }
   onEditSection(event){
    sessionStorage.setItem('ItemId',event.ItemId);
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails/addNewReferral']);
    //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails/newReferral'])
  }
  EditStatus(event){
    let ReqObj = {
      "ItemId":event.ItemId,
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999",
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}api/constanttabledetails/changestatus`;
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
                //window.location.reload()
                this.getExistingDropdown()
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
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
  }
}
