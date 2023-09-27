import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-excell-list',
  templateUrl: './excell-list.component.html',
  styleUrls: ['./excell-list.component.scss']
})
export class ExcellListComponent implements OnInit {

  activeMenu:any="Excell";factorData:any[]=[];
  columnHeader:any[]=[];
  insuranceName: string;
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  factorTypeDetails: any;
  ExcellData:any[]=[];
  constructor(private router:Router,private sharedService: SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
   }

  ngOnInit(): void {
    if(this.insuranceId!=null){
      this.getFactorTypeList();
    }
  }

  onAddNew(){
    let entry = {
        "TypeId":null,
        "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
      }
      sessionStorage.setItem('ExcellNewList',JSON.stringify(entry));
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist/excelldetails'])
  }
  getFactorTypeList(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
    }
    let urlLink = `${this.ApiUrl1}excel/config/getall`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.columnHeader = [
            { key: 'ApiMethod', display: 'Api Method' },
            { key: 'ProductDescription', display: 'Product Description' },
            { key: 'RawTableName', display: 'Raw TableName' },
            { key: 'TypeName', display: 'Type Name' },
            // { key: 'InputColumn', display: 'Input Column' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
            {
                key: 'edit',
                display: 'Add New',
                config: {
                  isAddNew: true,
                },
              },
              {
                key: 'remove',
                display: 'Delete',
                config: {
                  isDelete: true,
                },
              },
          ];
          this.ExcellData = data.Result;
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

  onEditNotification(rowdata){
    let entry = {
        "TypeId":rowdata.TypeId,
        "InsuranceId":rowdata.CompanyId,
        "ProductId":rowdata.ProductId,
      }
      sessionStorage.setItem('ExcellNewList',JSON.stringify(entry));
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist/excelldetails'])
  }

  onAddnews(rowdata){
    let entry = {
        "TypeId":rowdata.TypeId,
        "InsuranceId":rowdata.CompanyId,
        "ProductId":rowdata.ProductId,
        "RawId":rowdata.RawTableId
      }
      sessionStorage.setItem('ExcellNewList',JSON.stringify(entry));
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist/excelladdnew'])
  }

  onDeletes(rowdata){
let ReqObj ={
  "CompanyId":rowdata.CompanyId,
  "ProductId":rowdata.ProductId,
  "TypeId":rowdata.TypeId,
  "SectionId":"0"
}
let urlLink = `${this.ApiUrl1}excel/config/delete`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    let res:any =data;
    if(data.Result){
      this.getFactorTypeList();
    }
    },
    (err) => { },
  );
  }
}
