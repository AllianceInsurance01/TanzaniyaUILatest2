import { Document } from './../../../default-configuration/new-document-details/document.Model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
import { NewReferralDetailsComponent } from '../../../default-configuration/new-referral-details/new-referral-details.component';
import { NewDocumentDetailsComponent } from '../../../default-configuration/new-document-details/new-document-details.component';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';


@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  public tableData: any[] = [];
   public filterValue: any;
  public activeMenu:any='Document';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public columnHeader: any[] = [];
  insuranceName: string;
  insuranceId: string;
  sectionList: any[]=[];
  sectionValue:any;
  coverList: any[]=[];
  coverValue:any;
  productId: string;
  DocumentData:any[]=[];
  userDetails:any;
  loginId:any;
  CoreAppCode: any;sectionYn:any="N";
  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    const user = this.userDetails?.Result;
    //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;
    this.coverValue = "99999"
  }

  ngOnInit(): void {
    this.columnHeader = [
      { key: 'DocumentDesc', display: 'Document Desc' },
      { key: 'DocApplicable', display: 'Document Applicable' },
      { key: 'MandatoryStatus', display: 'Mandatory Status' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    /*this.tableData = [
      {
        "DocumentDesc": "Accidental Image",
        "DocApplicable": "Yes",
        "MandatoryStatus": "Active",
        "CoreAppCode": "242",
        "EntryDate": "21/09/2022",
        "Status": "Y",
        "Remarks": "Ok"
       },
       {
        "DocumentDesc": "Aadhar Card",
        "DocApplicable": "Yes",
        "MandatoryStatus": "Active",
        "CoreAppCode": "141",
        "EntryDate": "21/09/2022",
        "Status": "Y",
        "Remarks": "Ok"
       },
       {
        "DocumentDesc": "Pan Card",
        "DocApplicable": "Yes",
        "MandatoryStatus": "Active",
        "CoreAppCode": "243",
        "EntryDate": "21/09/2022",
        "Status": "Y",
        "Remarks": "Ok"
       },

    ];*/
    this.getSectionList();
    console.log('SSSSSSSSSS',this.sectionValue);


  }


  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
  }
  onAddDocument(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails/addNewDocument']);
  }
   /*onEditDocument(){
    this.dialogService.open(NewDocumentDetailsComponent, {
      context: {
        title: 'Document Details'
      },
    });
  }*/
  onChangeSectionYn(){
    if(this.sectionYn!='Y'){
      this.sectionValue= '99999';
      this.getExistingDocument();
    }
    else{
      this.sectionValue = null;
      this.DocumentData = [];
    }
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
  getExistingDocument(){
    if(this.sectionValue=='99999'){
      this.sectionYn = 'N';
    }
    else{
      this.sectionYn = 'Y';
    }
    let ReqObj = {
        "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
        "SectionId":this.sectionValue
    }
    let urlLink = `${this.ApiUrl1}master/getactivecoverdocument`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.DocumentData = data?.Result;
            if(this.sectionValue!=undefined && this.sectionValue!=null){
              let docObj = {"Cover":"99999","Section":this.sectionValue};
              sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
            }
            //this.getExistingDocument();
        }
      },
      (err) => { },
    );
  }
  getCoverList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.sectionValue
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/sectioncover`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.coverList = obj.concat(data?.Result);
        //
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },

    (err) => { },
  );
  }
  getSectionList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
    "ProductId":this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    //let urlLink = `${this.CommonApiUrl}`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.sectionList = obj.concat(data?.Result);
        console.log(this.sectionList);
        let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
        if(docObj){ this.sectionValue = docObj?.Section; this.coverValue = docObj?.Cover;
          console.log('LLLLLLLLLL',this.sectionValue);
          this.getExistingDocument();}
        else{ this.sectionValue='99999'; this.getExistingDocument();}

      }
    },
    (err) => { },
  );
  }
  onEditDocument(rowdata){
    let entry = {
      "DocumentId": rowdata.DocumentId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId": this.sectionValue,
      "CoverId": this.coverValue

    }
    sessionStorage.setItem('editDocumentId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails/newDocumentDetails']);
  }
  EditStatus(event){
    let ReqObj = {
      "DocumentId":event.DocumentId,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.sectionValue,
      "CoverId":this.coverValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/coverdocument/changestatus`;
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
                  this.getExistingDocument()
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
}
