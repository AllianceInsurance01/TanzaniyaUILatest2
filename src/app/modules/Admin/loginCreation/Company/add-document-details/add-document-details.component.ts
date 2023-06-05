import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';

import { DatePipe } from '@angular/common';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService }from '@nebular/theme';

@Component({
  selector: 'app-add-document-details',
  templateUrl: './add-document-details.component.html',
  styleUrls: ['./add-document-details.component.scss']
})
export class AddDocumentDetailsComponent implements OnInit {
 sectionList:any[]=[];coverList:any[]=[];coverValue:any="";
  sectionValue:any=""; public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceName: string;docTypeList:any[]=[];
  insuranceId: string;docTypeValue:any;
  productId: string;
  docType:any;
  loginId: any;
  minDate: Date;
  DocumentId: any;
  DocumentName: any;
  DocumentDesc: any;
  ProductId: string;
  InsuranceId: string;
  SectionId: string;
  Status: any;
  CoverId: any;
  DocApplicableId: any;
  MandatoryStatus: any;
  Remarks: any;
  EffectiveDateStart: any;
  RegulatoryCode: any;
  CreatedBy: any;
  CoreAppCode: any;
  DocDetails: any;
  DocData: any;
  DocList:any[]=[];
  constructor(private router:Router,private sharedService: SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');

    this.minDate = new Date();
    //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    //this.loginId = this.userDetails?.Result?.LoginId;
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }

    this.getSectionList();

  }

  ngOnInit(): void {
    let DocObj = JSON.parse(sessionStorage.getItem('editDocumentId'));
    //this.Id = CityObj?.CityId;
    //this.CountryId = CityObj.CountryId;
    //this.StateId = CityObj.StateId;
    this.DocumentId=DocObj?.DocumentId,
    this.DocumentName=DocObj.DocumentName,
    this.DocumentDesc=DocObj.DocumentDesc,
    this.ProductId=this.productId,
    this.InsuranceId=this.insuranceId,
    this.SectionId=DocObj.sectionValue,
    this.CoverId=this.coverValue,
    this.DocApplicableId=DocObj.DocApplicableId,
    this.MandatoryStatus=DocObj.MandatoryStatus,
    this.Remarks=DocObj.Remarks,
    this.EffectiveDateStart=DocObj.EffectiveDateStart,
    this.RegulatoryCode=DocObj.RegulatoryCode,
    this.CreatedBy=this.loginId,
    this.CoreAppCode=DocObj.CoreAppCode,
    this.Status=DocObj.Status

    if(this.productId!=null && this.productId!=undefined){
      this.getEditDocDetails();
    }
    else{
      this.DocDetails = new Document();
      this.DocumentId = DocObj.DocumentId;
      //this.CityDetails.CountryId = CityObj.CountryId;
      //if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }



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
        this.getDocTypeList();

      }
    },
    (err) => { },
  );
  }
  getDocTypeList(){
    let ReqObj = {"InsuranceId": this.InsuranceId,"BranchCode":"99999" }
    let urlLink = `${this.ApiUrl1}dropdown/doctype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.docTypeList = data.Result;
        let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
        if(docObj){ this.sectionValue = docObj?.Section; this.coverValue = "99999"; this.getExistingDoc();}
      },
      (err) => { },
    );
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
  }
  onProceed(){
    if(this.DocList.length!=0){
      if(this.docType==undefined) this.docType = "";
      let ReqObj = {
        "CoverId": "99999",
        "CreatedBy": this.loginId,
        "DocumentId": this.DocList,
        "DocumentType": this.docTypeValue,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "SectionId": this.sectionValue,
      };
    let urlLink = `${this.ApiUrl1}master/insertcoverdocument`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
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
            //         'Document Details Inserted Successfully',
            //         'Document Details',
            //         config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
          }

        },
        (err) => { },
      );
    }
    else{
      // let type: NbComponentStatus = 'danger';
      // const config = {
      //   status: type,
      //   destroyByClick: true,
      //   duration: 4000,
      //   hasIcon: true,
      //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
      //   preventDuplicates: false,
      // };
      // this.toastrService.show(
      //   "Please Select Minimum Two Cover to Include",
      //   "Add Cover",
      //   config);
    }
    //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
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
        //this.getExistingDocument();
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },

    (err) => { },
  );
  }
  getEditDocDetails(){
    let ReqObj =  {


  }
    let urlLink = `${this.CommonApiUrl}master/updatecoverdocument`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.DocDetails = res.Result;
        if(this.DocDetails){
          if(this.DocDetails?.EffectiveDateStart!=null){

           this.DocDetails.EffectiveDateStart = this.onDateFormatInEdit(this.DocDetails?.EffectiveDateStart)
          }
          if(this.DocDetails?.EffectiveDateEnd!=null){
            this.DocDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.DocDetails?.EffectiveDateEnd)
          }
          //this.getStateList();

        }
      }
      console.log("Final City Class",this.DocDetails);
    },
    (err) => { },
  );

  }

  onDateFormatInEdit(date) {
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
  getExistingDoc(){
    let ReqObj = {

       "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
        "SectionId":this.sectionValue,
        "CoverId":this.coverValue
    }
    let urlLink = `${this.ApiUrl1}master/getallnonselectedcoverdocuments`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.columnHeader = [
            {
              key: 'EntryDate',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'DocumentDesc', display: 'Document Desc' },
            { key: 'DocApplicable', display: 'Document Applicable' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'Status', display: 'Status' },

          ];
            this.tableData = data.Result.map(x=>({
              ...x,
              isChecked:false
            }));
            //this.getExistingDocument();
        }
      },
      (err) => { },
    );
  }
  onSelectDocument(rowData){
    console.log(rowData)
      if(rowData.isChecked){
           this.DocList.push(rowData.DocumentId);
      }
      else{
        this.DocList = this.DocList.filter(ele=>ele!=rowData.DocumentId);
      }
      console.log("Document List",this.DocList);
    }
  /*DocumentList(arg0: string, DocumentList: any) {
    throw new Error('Method not implemented.');
  }*/




}


