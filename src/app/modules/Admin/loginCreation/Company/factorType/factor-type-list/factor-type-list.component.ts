import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-factor-type-list',
  templateUrl: './factor-type-list.component.html',
  styleUrls: ['./factor-type-list.component.scss']
})
export class FactorTypeListComponent implements OnInit {

  activeMenu:any="FactorType";factorData:any[]=[];
  columnHeader:any[]=[];
  insuranceName: string;
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  factorTypeDetails: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
   }

  ngOnInit(): void {
    this.getFactorTypeList();
    // this.columnHeader = [
    //   { key: 'FactorTypeName', display: 'FactorType Name' },
    //   { key: 'FactorName', display: 'Factor Name' },
    //   { key: 'Product', display: 'Product Name' },
    //   { key: 'RangeYN', display: 'RangeYN' },
    //  // { key: 'InputTable', display: 'Input Table' },
    //   // { key: 'InputColumn', display: 'Input Column' },
    //   { key: 'Status', display: 'Status' },
    //   {
    //     key: 'actions',
    //     display: 'Action',
    //     config: {
    //       isEdit: true,
    //     },
    //   },
    //   // {
    //   //   key: 'actions',
    //   //   display: 'FactorTypeDetails',
    //   //   config: {
    //   //     isAdd: true,
    //   //   },
    //   // }
    // ];
    // this.factorData = [
    //   {
    //     "FactorTypeName":"Vehicle Age Calculator",
    //     "FactorTypeid":"01",
    //     "FactorName":"Vechicle Age",
    //     "FactorDesc":"Calculate age on vehicle based on Manufacture Year",
    //     "Product":"Motor",
    //     "RangeYN":"Yes",
    //     "Status":"Y"
    //   },
    //   {
    //     "FactorTypeName":"body type calculator",
    //     "FactorTypeid":"02",
    //     "FactorName":"Body Type",
    //     "FactorDesc":"Calculate age on vehicle based on Manufacture Year",
    //     "Product":"Motor",
    //     "RangeYN":"Yes",
    //     "Status":"Y"
    //   },
    //   {
    //     "FactorTypeName":"BASE RATE CALCULATOR",
    //     "FactorTypeid":"03",
    //     "FactorName":"Vechicle Age",
    //     "FactorDesc":"Calculate age on vehicle based on Manufacture Year",
    //     "Product":"Motor",
    //     "RangeYN":"Yes",
    //     "Status":"Y"
    //   },
    //   {
    //     "FactorTypeName":"BASE RATE CALCULATOR",
    //     "FactorTypeid":"04",
    //     "FactorName":"Body Type",
    //     "FactorDesc":"Calculate age on vehicle based on Manufacture Year",
    //     "Product":"Motor",
    //     "RangeYN":"Yes",
    //     "Status":"Y"
    //   },
    // ]
  }

  getFactorTypeList(){
    let ReqObj = {
      "Limit":"",
      "Offset":"100000",
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/getallfactortypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.columnHeader = [
            { key: 'FactorTypeName', display: 'FactorType Name' },
            { key: 'FactorTypeDesc', display: 'Factor Type Desc' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
           // { key: 'InputTable', display: 'Input Table' },
            // { key: 'InputColumn', display: 'Input Column' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
            // {
            //   key: 'actions',
            //   display: 'FactorTypeDetails',
            //   config: {
            //     isAdd: true,
            //   },
            // }
          ];
          this.factorData = data.Result;
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
  onAddNewFactorType(){
    sessionStorage.removeItem('companyFactorTypeId');
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList/newFactorTypeDetails'])
  }
  onEditFactor(rowData){
    sessionStorage.setItem('companyFactorTypeId',rowData.FactorTypeId);
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList/newFactorTypeDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "FactorTypeId":event.FactorTypeId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/factortype/changestatus`;
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
                  this.getFactorTypeList()
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
}
