import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-excell-details',
  templateUrl: './excell-details.component.html',
  styleUrls: ['./excell-details.component.scss']
})
export class ExcellDetailsComponent implements OnInit {

  activeMenu:any="Excell";factorData:any;
  columnHeader:any[]=[];
  insuranceName: string;
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  factorTypeDetails: any;
  apimethod:any;
  apiname;any;
  filepath:any;
  safilename:any;
  productList:any[]=[];
  rowtableData:any[]=[];
  rowtable:any;
  Status:any;
    typeid: any;
    productdesc: any;
    rawtablename: any;
    typename: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');

    let Exclucsion:any = JSON.parse(sessionStorage.getItem('ExcellNewList'));
    if(Exclucsion){
      console.log("Sess BankCode Obj",Exclucsion)
      this.typeid=Exclucsion?.TypeId;
        this.insuranceId=Exclucsion?.InsuranceId;
        this.productId=Exclucsion?.ProductId;
    }
    else{
        this.typeid=null;
    }
   }

  ngOnInit(): void {
    if(this.productId!=null){
        this.getrawtable();
        this.getProductList();
    }

    if(this.typeid!=null && this.typeid!=undefined){
        this.getFactorTypeList();
    }
    else {
        if(this.Status==null)  this.Status = 'N';
        this.apimethod=null;
        this.apiname=null;
        this.filepath =null;
        this.rawtablename=null;
        this.productdesc=null;
    }
  }

  getrawtable(){
    let urlLink = `${this.CommonApiUrl}dropdown/eservicetable`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.rowtableData = data.Result;
          }
        },
        (err) => { },
      );
  }

  getFactorTypeList(){
    let ReqObj = {
        "CompanyId":this.insuranceId,
        "ProductId":this.productId,
        "TypeId":this.typeid,
        "SectionId":"0"
    }
    let urlLink = `${this.ApiUrl1}excel/config/get`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.factorData = data.Result;
           this.apimethod=this.factorData?.ApiMethod;
        this.apiname=this.factorData?.ApiName;
        this.typename = this.factorData?.TypeName;
        this.rawtablename= this.factorData?.RawTableId;
        this.productdesc= this.factorData?.ProductDescription;
        this.filepath =this.factorData?.FilePath;
        this.Status=this.factorData?.Status;
        this.typeid =this.factorData?.TypeId;
        this.productId = this.factorData?.ProductId;

        }

      },
      (err) => { },
    );
  }

  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
  }
  onSaveNotification(){
    let rawid:any;
   if(this.rawtablename!=null && this.rawtablename!=undefined){
    let code = this.rowtableData.filter(ele =>ele.Code == this.rawtablename)
    if(code){
        rawid=code[0]?.CodeDesc;
    }
    else{
        rawid=null;
    }
   }
    let ReqObj = {
        "ApiMethod": this.apimethod,
        "ApiName": this.apiname,
        "CompanyId": this.insuranceId,
        "FilePath": this.filepath,
        "IsMainStatus": this.Status,
        "ProductDesc": this.productdesc,
        "ProductId": this.productId,
        "RawTableId": this.rawtablename,
        "RawTableName":rawid,
        "SectionId": "0",
        "Status": this.Status,
        "TypeId": this.typeid,
        "TypeName": this.typename
  }
  let urlLink = `${this.ApiUrl1}excel/config/saveupload `;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
            this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist'])
        }
      
      },
      (err) => { },
    );
  }
 
  getProductList(){
    console.log('KKKKKKKKKKKK',this.insuranceId);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.productList = data.Result;
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
