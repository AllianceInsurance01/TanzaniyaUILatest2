import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';

import { DatePipe } from '@angular/common';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService }from '@nebular/theme';


@Component({
  selector: 'app-new-document-details',
  templateUrl: './new-document-details.component.html',
  styleUrls: ['./new-document-details.component.scss']
})
export class NewDocumentDetailsComponent implements OnInit {

  @Input() title: any;docValue:any="YES";
  sectionList:any[]=[];
  statusValue:any= "YES";cityList:any[]=[];docTypeList:any[]=[];
  coverList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any = this.AppConfig.CommonApiUrl;activeMenu:any;
  mandatoryValue:any = "YES";minDate:Date;insuranceId:any;productId:any;loginId:any;
  public DocumentDetails:any;DocumentId:any;
  DocumentName: any;
  SectionId: any;
  CoverId: any;
  coverValue: any;
  DocApplicableId: any;
  MandatoryStatus: any;
  Remarks: any;
  EffectiveDateStart: any;
  RegulatoryCode: any;
  CreatedBy: any;
  CoreAppCode: any;
  Status: any;
  DocDetails: Document;
  DocumentDesc: any;
  docTypeValue:any;
  sectionValue: any;
  DocumentTypeDesc: any;
  docType: any[]=[];
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.DocumentDetails= new Document();
    this.getSectionList();

     //this.getEditDocumentDetails()

}


  ngOnInit(): void {
    //let docDetails  = JSON.parse(sessionStorage.getItem('editDocumentId'));
    let DocObj = JSON.parse(sessionStorage.getItem('editDocumentId'));
    //this.Id = CityObj?.CityId;
    //this.CountryId = CityObj.CountryId;
    //this.StateId = CityObj.StateId;
    this.DocumentId=DocObj?.DocumentId,
    this.DocumentName=DocObj.DocumentName,
    this.DocumentDesc=DocObj.DocumentDesc,
    this.productId=this.productId,
    this.insuranceId=this.insuranceId,
    this.SectionId=DocObj.SectionId,
    this.CoverId=this.CoverId,
    this.DocApplicableId=DocObj.DocApplicableId,
    this.MandatoryStatus=DocObj.MandatoryStatus,
    this.Remarks=DocObj.Remarks,
    this.EffectiveDateStart=DocObj.EffectiveDateStart,
    this.RegulatoryCode=DocObj.RegulatoryCode,
    this.CreatedBy=this.loginId,
    this.CoreAppCode=DocObj.CoreAppCode,
    this.Status=DocObj.Status,
    this.DocumentDesc=DocObj.DocumentDesc
    //this.DocumentTypeDesc=DocObj.DocumentTypeDesc


    if(this.productId!=null && this.productId!=undefined){
      this.getEditDocumentDetails();
    }
    else{
      this.DocumentDetails = new Document();
      this.DocumentId = DocObj.DocumentId;
      //this.CityDetails.CountryId = CityObj.CountryId;
      //if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }


    /*if(docDetails?.DocumentId){
      console.log('Document IdDd',docDetails);
      this.DocumentId = docDetails?.DocumentId;
      this.getEditDocumentDetails();
    }
    else{
      this.DocumentDetails = new Document();
      this.DocumentId = null;
      if(this.DocumentDetails?.Status==null) this.DocumentDetails.Status = 'N';
      if(this.DocumentDetails?.MandatoryStatus==null) this.DocumentDetails.MandatoryStatus = 'N';
    }*/
  }
  dismiss() {
   this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
  }
  getEditDocDetails(){
    let ReqObj = {
      "InsuranceId": "",
      "BranchCode": "99999"
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/document`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
            this.docTypeList = res.Result;
        }
        console.log("Final Modal Class",this.DocumentDetails);
      },
      (err) => { },
    );
  }
  getDocTypeList(){
    let ReqObj = {"InsuranceId": this.insuranceId,"BranchCode":"99999" }
    let urlLink = `${this.ApiUrl1}dropdown/doctype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.docType = data.Result;
        let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
        if(docObj){ this.sectionValue = docObj?.Section; this.coverValue = "99999";}
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
        this.sectionList = data.Result;
        let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
        if(docObj){ this.sectionValue = docObj?.Section; this.coverValue = docObj?.Cover;
          console.log('LLLLLLLLLL',this.sectionValue);
          this.getEditDocDetails();
          this.getDocTypeList();
          }
        else{ this.sectionValue='99999'; }
       }
    },
    (err) => { },
  );
  }
  /*getEditDocumentDetails(){
    let ReqObj =  {
      "DocumentId":this.DocumentId,
      "DocumentName":this.DocumentName,
      "DocumentDesc":this.DocumentDesc,
      "ProductId":this.productId,
      "InsuranceId":this.insuranceId,
      "SectionId":this.SectionId,
      "CoverId":this.CoverId,
      "DocApplicableId":this.DocApplicableId,
      "MandatoryStatus":this.MandatoryStatus,
      "Remarks":this.Remarks,
      "EffectiveDateStart":this.EffectiveDateStart,
      "RegulatoryCode":this.RegulatoryCode,
      "CreatedBy":this.CreatedBy,
      "CoreAppCode":this.CoreAppCode,
      "Status":this.Status
  }
      let urlLink = `${this.ApiUrl1}master/updatecoverdocument`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.DocumentDetails = res.Result;
          if(this.DocumentDetails){
            if(this.DocumentDetails?.EffectiveDateStart!=null){
              this.DocumentDetails.EffectiveDateStart = this.onDateFormatInEdit(this.DocumentDetails?.EffectiveDateStart)
            }
            if(this.DocumentDetails?.EffectiveDateEnd!=null){
              this.DocumentDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.DocumentDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.DocumentDetails);
      },
      (err) => { },
    );
  }*/

  getEditDocumentDetails(){
    let ReqObj =  {
      "DocumentId":this.DocumentId,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.SectionId,
      "CoverId": this.CoverId
  }
      let urlLink = `${this.ApiUrl1}master/getbycoverdocument`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.DocumentDetails = res.Result;
          if(this.DocumentDetails){
            if(this.DocumentDetails?.EffectiveDateStart!=null){
              this.DocumentDetails.EffectiveDateStart = this.onDateFormatInEdit(this.DocumentDetails?.EffectiveDateStart)
            }
            if(this.DocumentDetails?.EffectiveDateEnd!=null){
              this.DocumentDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.DocumentDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.DocumentDetails);
      },
      (err) => { },
    );
  }
  onDateFormatInEdit(date): any {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }
  getCoverList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.SectionId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/sectioncover`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.coverList = obj.concat(data?.Result);
        //this.getExistingDocument();
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },

    (err) => { },
  );
  }
  onSaveDocument(){
    let ReqObj = {
      /*"DocumentId":this.DocumentId,
      "DocumentName":this.DocumentDetails.DocumentName,
      "DocumentDesc":this.DocumentDetails.DocumentDesc,
      "DocApplicableId":this.DocumentDetails.DocApplicableId,
      "MandatoryStatus":this.DocumentDetails.MandatoryStatus,
      "Remarks":this.DocumentDetails.Remarks,
      "EffectiveDateStart":this.DocumentDetails.EffectiveDateStart,
      "RegulatoryCode":this.DocumentDetails.RegulatoryCode,
      "CreatedBy":this.loginId,
      "CoreAppCode":this.DocumentDetails.CoreAppCode,
      "Status":this.DocumentDetails.Status,*/
      "DocumentId":this.DocumentId,
"DocumentName":this.DocumentDetails.DocumentName,
"DocumentDesc":this.DocumentDetails.DocumentDesc,
"ProductId":this.productId,
"InsuranceId":this.insuranceId,
"SectionId":this.SectionId,
"CoverId":this.DocumentDetails.CoverId,
"DocApplicableId":this.DocumentDetails.DocApplicableId,
"MandatoryStatus":this.DocumentDetails.MandatoryStatus,
"Remarks":this.DocumentDetails.Remarks,
"EffectiveDateStart":this.DocumentDetails.EffectiveDateStart,
"RegulatoryCode":this.DocumentDetails.RegulatoryCode,
"CreatedBy":this.DocumentDetails.CreatedBy,
"CoreAppCode":this.DocumentDetails.CoreAppCode,
"Status":this.DocumentDetails.Status,
"DocumentType":this.DocumentDetails.DocumentType

    }
    let urlLink = `${this.ApiUrl1}master/updatecoverdocument`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
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
            //         'Document Details Inserted/Updated Successfully',
            //         'Document Details',
            //         config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                // for(let entry of res.ErrorMessage){
                //   let type: NbComponentStatus = 'danger';
                //   const config = {
                //     status: type,
                //     destroyByClick: true,
                //     duration: 4000,
                //     hasIcon: true,
                //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //     preventDuplicates: false,
                //   };
                //   this.toastrService.show(
                //     entry.Field,
                //     entry.Message,
                //     config);
                // }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }
  /*onSaveDocument(){
    let ReqObj = {
      "CoverId": "99999",
      "CreatedBy": this.loginId,
      "DocumentId": this.DocList,
      "DocumentType": this.docTypeValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId": this.sectionValue,
    }
    let urlLink = `${this.ApiUrl1}master/insertcoverdocument`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log(data);
          let res:any=data;
          if(data.Result){
            let type: NbComponentStatus = 'success';
                  const config = {
                    status: type,
                    destroyByClick: true,
                    duration: 4000,
                    hasIcon: true,
                    position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    preventDuplicates: false,
                  };
                  this.toastrService.show(
                    'Document Details Inserted/Updated Successfully',
                    'Document Details',
                    config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
                  let type: NbComponentStatus = 'danger';
                  const config = {
                    status: type,
                    destroyByClick: true,
                    duration: 4000,
                    hasIcon: true,
                    position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    preventDuplicates: false,
                  };
                  this.toastrService.show(
                    entry.Field,
                    entry.Message,
                    config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }*/
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
