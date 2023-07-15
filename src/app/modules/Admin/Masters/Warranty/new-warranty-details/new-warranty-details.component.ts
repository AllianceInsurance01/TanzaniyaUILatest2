import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumnetDetailsComponent } from '../../../../../shared/view-documnet-details/view-documnet-details.component';

import { Warranty } from './warranty.Model';
@Component({
  selector: 'app-new-warranty-details',
  templateUrl: './new-warranty-details.component.html',
  styleUrls: ['./new-warranty-details.component.scss']
})
export class NewWarrantyDetailsComponent implements OnInit {

  public minDate: Date; BranchCodeList: any;
  public WarrantyId: any; DocumentReferernceNo: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any; public activeMenu: any = 'Warranty';
  insuranceId: string; insuranceName: any;
  productId: any; stateList: any[] = [];
  BranchDetails: any = {}; WarrantyDetails: any;
  public branchList: any; branchValue: any;
  productList: any[] = [];
  userDetails: any;
  productValue: any; sectionValue: any;
  sectionList: any[];
  DocRefNo: any; DocumentType = '0'
  imageUrl: any; uploadDocList: any[] = [];
  uploadedDocList: any[] = [];
  TypeId: any;
  TypeList:any[]=[];

  constructor(
    private sharedService: SharedService, private datePipe: DatePipe, private router: Router,public dialogService: MatDialog) {
    this.minDate = new Date();
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');

    // this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {

      // this.insuranceId = userDetails?.Result?.InsuranceId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.WarrantyDetails = new Warranty();
   
    let docObj = JSON.parse(sessionStorage.getItem('WarrantyId'))
    if (docObj) {
      // this.productValue = docObj?.ProductId,
        this.branchValue = docObj?.BranchCode,
        this.sectionValue = docObj?.SectionId;
        this.insuranceId=docObj?.InsuranceId;
    };
    this.getTypeId()
  }
  ngOnInit(): void {
    console.log("Warranty Id", this.WarrantyId);
    if (this.WarrantyId != null && this.WarrantyId != undefined) {

    }
    else {
      this.WarrantyId = null;
      this.WarrantyDetails = new Warranty();
      if (this.WarrantyDetails?.Status == null) this.WarrantyDetails.Status = 'N';
    }
    this.getBranchList();
    this.getSectionList();
  }
  getBranchList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);
          let warranty: any = JSON.parse(sessionStorage.getItem('WarrantyId'));
          if (warranty) {
            this.WarrantyId = warranty?.WarrantyId;
            this.branchValue = warranty?.BranchCode;
            this.productValue = warranty?.ProductId;
            console.log('IIIIIIIII',this.productValue);
            this.getCompanyProductList();
            if (this.WarrantyId) this.getEditWarrantyDetails();
            else this.WarrantyId = null;
          }
          else this.WarrantyId = null;
        }
      },
      (err) => { },
    );
  }
  getSectionList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.sectionList = obj.concat(data?.Result);
          let secObj = JSON.parse(sessionStorage.getItem('WarrantyId'))
          if (secObj) {
            this.sectionValue = secObj?.SectionId;
          }
          else { this.sectionValue = '99999'; }
        }
      },
      (err) => { },
    );
  }
  getCompanyProductList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "Limit": "0",
      "Offset": "100000"
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let obj = []
          this.productList = obj.concat(data?.Result)
        }

      },
      (err) => { },
    );
  }
  getTypeId(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
    let urlLink = `${this.CommonApiUrl}dropdown/termstype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.TypeList = data.Result;

        }
      },
      (err) => { },
    );
  }
  getEditWarrantyDetails() {
    let ReqObj = {
      "WarrantyId": this.WarrantyId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
    }
    let urlLink = `${this.CommonApiUrl}master/getbywarrantyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (res.Result) {
          this.WarrantyDetails = res.Result;
          this.getTypeId();
          this.TypeId=this.WarrantyDetails.TypeId
          if (this.WarrantyDetails) {
            if (this.WarrantyDetails?.EffectiveDateStart != null) {
              this.WarrantyDetails.EffectiveDateStart = this.onDateFormatInEdit(this.WarrantyDetails?.EffectiveDateStart)
            }
            if (this.WarrantyDetails?.EffectiveDateEnd != null) {
              this.WarrantyDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.WarrantyDetails?.EffectiveDateEnd)
            }
            if(this.WarrantyDetails.DocRefNo!=null) this.getUploadedDocList(this.WarrantyDetails.DocRefNo)
          }
        }
        console.log("Final Modal Class", this.WarrantyDetails);
      },
      (err) => { },
    );
    
  }

  ongetBack() {
    this.router.navigate(['/Admin/warrantyMaster'])
  }
  onProceed(Id) {
    // let section
    // if(this.WarrantyId){
    //   section=this.sectionValue;
    // }
    // else{
    //   section='99999';
    // }
    let ReqObj = {
      "WarrantyId": this.WarrantyId,
      "WarrantyDescription": this.WarrantyDetails.WarrantyDescription,
      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": this.WarrantyDetails.EffectiveDateStart,
      "Remarks": this.WarrantyDetails.Remarks,
      "Status": this.WarrantyDetails.Status,
      "CreatedBy": this.loginId,
      "CoreAppCode": this.WarrantyDetails.CoreAppCode,
      "RegulatoryCode": this.WarrantyDetails.RegulatoryCode,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      "DocRefNo": Id,
      "TypeId":this.TypeId

    }
    let urlLink = `${this.CommonApiUrl}master/insertwarranty`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] = this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj['EffectiveDateStart'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.Result) {
          // let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'Warranty Details Inserted/Updated Successfully',
          //   'Warranty Details',
          //   config);
          this.router.navigate(['/Admin/warrantyMaster'])
        }
      },
      (err) => { },
    );


  }
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
         NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  onUploadDocuments(target: any, fileType: any, type: any) {
    console.log("Event ", target);
    let event: any = target.target.files;

    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      var reader: any = new FileReader();
      reader.readAsDataURL(element);
      var filename = element.name;

      let imageUrl: any;
      reader.onload = (res: { target: { result: any; }; }) => {
        imageUrl = res.target.result;
        this.imageUrl = imageUrl;
        this.uploadDocList.push({ 'url': element, 'DocTypeId': '', 'filename': element.name, 'JsonString': {} });

      }

    }
    console.log("Final File List", this.uploadDocList)
  }
  onDragDocument(target: any, fileType: any, type: any) {
    let fileList = target;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader: any = new FileReader();
      reader.readAsDataURL(element);
      var filename = element.name;

      let imageUrl: any;
      reader.onload = (res: { target: { result: any; }; }) => {
        imageUrl = res.target.result;
        this.imageUrl = imageUrl;
        this.uploadDocList.push({ 'url': this.imageUrl, 'DocTypeId': '', 'filename': element.name, 'JsonString': {} });

      }
    }
  }
  onFileUploadCommonList(){

    let docList = this.uploadDocList;
    if(docList.length!=0){
      let i=0;
      for(let doc of docList){
        let ReqObj={
            "FileName":doc.filename,
            "OriginalFileName":doc.filename,
             "UploadedBy":this.loginId,
             "TermsAndCondtionId": "19",
             "TermsAndCondtionDesc": "Exclustion" ,
             "Type": "E"
        }
        let urlLink = `${this.CommonApiUrl}document/termsdocupload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
            if(data.ErrorMessage){
              // for(let entry of data.ErrorMessage){
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
            }
            else if(data?.Result){
                i+=1;
                if(i==docList.length){
                 
                  this.onProceed(data.Result?.SuccessId)
                }
              }
            },
            (err) => { },
          );
      }
    }
    else if(this.uploadedDocList.length!=0){
      this.onProceed(this.uploadedDocList[0].UniqueId)
    }
    else this.onProceed(null);
  }

  onDeleteDocument(index: any) {
    this.uploadDocList.splice(index, 1);
  }
  getUploadedDocList(uniqueId:any){

    let ReqObj = {
      "UniqueId": uniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/gettermsdoc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
              this.uploadedDocList = [data.Result];
  
            }
            else this.uploadDocList=[]
        },
        (err) => { },
      );
  }

  onViewCommonDocument(index)
  {
    let entry = this.uploadedDocList[index];
        const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
          data: {
            title:entry?.OrginalFileName,
            imageUrl: entry?.ImgUrl
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
  }
  onDeleteCommonDocument(index){
    this.uploadedDocList.splice(index,1);
  }
  onCommonDocumentDownload(index){
    let entry = this.uploadedDocList[index];
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', entry?.ImgUrl);
    link.setAttribute('download', entry?.OriginalFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
