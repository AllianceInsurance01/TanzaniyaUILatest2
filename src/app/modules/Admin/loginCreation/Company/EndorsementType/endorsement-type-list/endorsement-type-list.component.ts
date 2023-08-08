import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';

@Component({
  selector: 'app-endorsement-type-list',
  templateUrl: './endorsement-type-list.component.html',
  styleUrls: ['./endorsement-type-list.component.css']
})
export class EndorsementTypeListComponent {
  public activeMenu:any='Endorsement';
  iconList:any[]=[];endorseData:any[]=[];
  statusValue:any= "YES";cityList:any[]=[];
  insuranceName: string;categoryList:any[]=[];
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any= this.AppConfig.CommonApiUrl;
  productDetails: any;
  loginId: any;
  minDate: Date;
  categoryId: any;
  columnHeader:any[]=[];
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {

      this.minDate = new Date();
    let reload =  sessionStorage.getItem('reload');
    if(reload){
      if(reload == 'false'){
        sessionStorage.removeItem('reload');
        window.location.reload();
      }
    }
    else{
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
     this.productId =  sessionStorage.getItem('companyProductId');
    }

   
   }

  ngOnInit(): void {

    this.categoryList = [
      {"Code":"1","CodeDesc":"Non-Financial"},
      {"Code":"2","CodeDesc":"Financial"}
    ]

    this.columnHeader = [
      //{ key: 'DependantFieldName', display: 'DependantFieldName' },
      //{ key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'EndtType', display: 'End tType' },
      { key: 'EndtTypeDesc', display: 'Endt TypeDesc' },
      { key: 'CoreAppCode', display: 'Core AppCode' },
      { key: 'RegulatoryCode', display: 'Regulatory Code' },

    { key: 'EffectiveDateStart', display: 'EffectiveDate Start' },     
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
     let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
    if(docObj){
      console.log('iiiiiiiii',this.categoryId)
      this.categoryId = docObj?.ItemType;
      this.getEndorsementList();

   }
    else{
     this.categoryId="1"     
      this.getEndorsementList();
    }
  }
  getEndorsementList(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "EndtTypeCategoryId": this.categoryId,
      "ProductId": this.productId,
      //"LoginId":this.loginId
    }
    let urlLink = `${this.CommonApiUrl}master/getallendorsement`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;

        console.log('rrrrrr',res)
       //console.log('dddddddddd',res?.Result.EndorsementMasterListRes)
        if(res?.Result[0].EndorsementMasterListRes){
            this.endorseData = res?.Result[0]?.EndorsementMasterListRes;
          if(this.categoryId!=undefined && this.categoryId!=null){
            let docObj = {"ItemType":this.categoryId};
            sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
          }
        }
      },
      (err) => { },
    );
  }
  createEndorsement(){
    let endorseObj = {
      "Category": this.categoryId,
      "EndorsementId":null
    }
    sessionStorage.setItem('endorseObj',JSON.stringify(endorseObj));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType/newEndorsementTypeDetails'])
  }


  onEditEndo(row:any){
    let endorseObj = {
      "Category": this.categoryId,
      "EndorsementId":row.EndtTypeId
    }
    sessionStorage.setItem('endorseObj',JSON.stringify(endorseObj));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType/newEndorsementTypeDetails'])
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
