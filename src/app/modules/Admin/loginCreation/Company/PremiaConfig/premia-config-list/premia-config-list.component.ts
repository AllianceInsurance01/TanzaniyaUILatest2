import { Premia } from './../premia-config-details/premia';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-premia-config-list',
  templateUrl: './premia-config-list.component.html',
  styleUrls: ['./premia-config-list.component.scss']
})
export class PremiaConfigListComponent implements OnInit {

  public premiaListData:any[]=[];columnHeader:any[]=[];
  public branchList:any;
  public activeMenu:any="Premia";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;
  sectionList: any;
  sectionValue: string;
  premiaId: any;
  loginId: any;
  constructor(private router:Router,private sharedService:SharedService,) {

    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');

    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }


   }

  ngOnInit(): void {
    this.columnHeader = [
      { key: 'PremiaTableName', display: 'Premia Table Name' },
      //{ key: 'SourceTableName', display: 'Source Table Name' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'Status', display: 'Status' },

      {
        key: 'configure',
        display: 'Configure',
        config: {
          isConfigure: true,
        },
      },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.premiaListData = [
      /*{
        "PremiaTableName":"PT_Motor_Details",
        "SourceTableName":"MOTOR_DATA_DETAILS",
        "EffectiveDateStart":"21-01-2023",
        "Status":"Y",
      }*/
    ]
    //this.getSectionList();
    this.getallPremia()
  }
  onAddSection(){
    let entry = {
      "PremiaId":null,
      "SectionId":"99999",
    }
    sessionStorage.setItem('editPremiaId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfigDetails'])
  }
  onConfigure(rowdata){
    let entry = {
      "PremiaId":rowdata.PremiaId,
      "SectionId": "99999",
      "QueryKey":rowdata.QueryKey,
      "PremiaTableName":rowdata.EntityName
    }
    sessionStorage.setItem('editPremiaId',JSON.stringify(entry));
    console.log('rrrrrrrr',rowdata.EntityName)
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfig'])
  }
  onRedirect(value){
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
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
            //this.getExistingpromo();
            this.getallPremia()
          }
          else if(this.sectionList.length!=0){
            this.sectionValue = this.sectionList[0].Code;
            this.getallPremia()
            //this.getExistingpromo();
          }
        }*/
        if(data.Result){
          let obj = [];
          this.sectionList = obj.concat(data?.Result);
          console.log(this.sectionList);
          let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
          if(docObj){ this.sectionValue = docObj?.Section;
            console.log('LLLLLLLLLL',this.sectionValue);
            this.getallPremia()}
          else{ this.sectionValue='10'; this.getallPremia();}

        }

        },
        (err) => { },
      );
  }

  getallPremia(){
    let ReqObj={
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
let urlLink = `${this.CommonApiUrl}master/getallpremiaconfig`;

   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.premiaListData = data?.Result;
            console.log('tttttttt',this.premiaListData);
            //this.premiaId=this.premiaListData.PremiaId;
            if(this.sectionValue!=undefined && this.sectionValue!=null){
              let docObj = {"Section":this.sectionValue};
              sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
            }
        }
      },
(err) => { },
);
  }

  EditStatus(event){
    let ReqObj = {
      //"BranchCode": this.branchValue,
      "InsuranceId":this.insuranceId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate,
       "BranchCode":"99999",
       "PremiaId": event.PremiaId,
       "ProductId": this.productId,
      "SectionId":"99999",
        "CreatedBy":this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/changestatuspremiaconfig`;
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
                  this.getallPremia()
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }

  onEditSection(rowdata){
    let entry = {
      "PremiaId":rowdata.PremiaId,
      "SectionId":"99999",
    }
    sessionStorage.setItem('editPremiaId',JSON.stringify(entry));
    //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/'])
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfigDetails'])
  }
}
