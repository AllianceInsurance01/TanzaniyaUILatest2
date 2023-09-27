import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-excell-addnew',
  templateUrl: './excell-addnew.component.html',
  styleUrls: ['./excell-addnew.component.scss']
})
export class ExcellAddNewComponent implements OnInit {

  activeMenu:any="Excell";factorData:any[]=[];
  columnHeader:any[]=[];
  insuranceName: string;
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  NewList:any[]=[];
  dataType:any[]=[];
  factorTypeDetails: any;
    typeid: any;
    rowtableData:any[]=[];
    taxType:any[]=[];
    branchcode: any;
    rawid: any;
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
        this.rawid=Exclucsion?.RawId;
    }
    else{
        this.typeid=null;
    }
   }

  ngOnInit(): void {

    this.getDatatype();
    this.getProductdatattype()
    if(this.typeid!=null && this.typeid!=undefined){
        this.getFactorTypeList();
    }
  }

  getProductdatattype(){
    let urlLink = `${this.ApiUrl1}xlconfig/getdatatype`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.dataType = data.Result;
          }
        },
        (err) => { },
      );
  }

  getDatatype(){
    let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": "99999",
        "TableName": this.rawid
    }
    let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.taxType = data.Result;
        }

      },
      (err) => { },
    );
  }

  onAddNewEntry(){
    console.log("Final Tax List ",this.NewList);
    let number = String(this.NewList.length+1);
    this.NewList.push(
      {
        "CompanyId": this.insuranceId,
        "ProductId":this.productId,
        "SectionId": "0",
        "TypeId": this.typeid,
        "FieldId":null,
        "ExcelHeaderName": null,
        "Status": "N",
        "MandatoryYn": "N",
        "DataType":null,
        "FieldNameRaw":null,
        "FieldLength":null,
        "DataRange":null,
        "IsMainDefauVal": "N",
        "ApiJsonKey":null,
        "SelColName":null,
        "IsObject": "N",
        "IsArray": "N",
        "ObjApijsonKey":null,
        "ObjSelcolKey":null,
        "ObjDefaulVal": "N"
      }
    );
    this.NewList.push()
  }

  getFactorTypeList(){
    let ReqObj = {
        "CompanyId":this.insuranceId,
        "ProductId":this.productId,
        "TypeId":this.typeid
    }
    let urlLink = `${this.ApiUrl1}xlconfig/getall`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.NewList = data.Result;
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
  deleteRow(row,rowid,i){
    if(row!=null){
      let ReqObj = {
        "CompanyId":this.insuranceId,
        "ProductId":this.productId,
        "TypeId":this.typeid,
        "FieldId":row
      }
      let urlLink = `${this.ApiUrl1}xlconfig/delete`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res:any =data;
          if(data.Result){
            this.getFactorTypeList();
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                console.log("Error Iterate",data.ErrorMessage);
              }
          }
          },
          (err) => { },
        );
    }
    else{
      var delBtn = confirm("Do you want to delete ?");
      if ( delBtn == true ) {
        this.NewList.splice(i, 1 );
      }
    }  
  }
  onSaveNotification(){
  if(this.NewList.length!=0){
  let urlLink = `${this.ApiUrl1}xlconfig/save`;
  this.sharedService.onPostMethodSync(urlLink, this.NewList).subscribe(
    (data: any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
           this.getFactorTypeList();
        }  
      },
      (err) => { },
    );
  }
  }

  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
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
