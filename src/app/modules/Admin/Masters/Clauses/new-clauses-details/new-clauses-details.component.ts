import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { Clauses } from './clauses.Model';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumnetDetailsComponent } from '../../../../../shared/view-documnet-details/view-documnet-details.component';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-new-clauses-details',
  templateUrl: './new-clauses-details.component.html',
  styleUrls: ['./new-clauses-details.component.scss']
})
export class NewClausesDetailsComponent implements OnInit {

  public minDate:Date;BranchCodeList:any;
  public activeMenu:any ='Clauses';
  public insuranceName:any;
  public productId:string;
  public loginId:any;
  public insuranceId:any;
  public ClausesId:any;sectionValue:any;
  public ClausesDetails:any;
  public AppConfig:any = (Mydatas as any).default;
  public CommonApiUrl:any = this.AppConfig.CommonApiUrl
  public ApiUrl1:any = this.AppConfig.ApiUrl1

  public branchList:any []=[];branchValue:any;insuranceList:any []=[];
  BranchCode: any;userDetails: any;productList: any;productValue: any;
  sectionList: any[];
  uploadDocList: any[]=[];
  imageUrl: any;
  uploadedDocList: any[]=[];
  TypeId: any;
  TypeList:any[]=[];
  constructor(private datePipe:DatePipe,private router:Router
    ,private sharedService:SharedService,public dialogService: MatDialog,) {
    this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');


    this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;
    this.ClausesDetails = new Clauses();
    let docObj = JSON.parse(sessionStorage.getItem('ClausesId'))
    if (docObj) {
      this.productValue = docObj?.ProductId,
        this.branchValue = docObj?.BranchCode,
        this.sectionValue = docObj?.SectionId;
    };
    this.getTypeId();
   }

  ngOnInit(): void {
    console.log("Clauses Id",this.ClausesId);
    if(this.ClausesId!=null && this.ClausesId!=undefined){
      this.getEditClausesDetails();
    }
    else{
      this.ClausesId = null;
      this.ClausesDetails = new Clauses();
      if(this.ClausesDetails?.Status==null)  this.ClausesDetails.Status = 'N';
    }
    this.getCompanyProductList();
    this.getBranchList();
    this.getSectionList();

  }

  ongetBack(){
    this.router.navigate(['/Admin/clausesMaster'])

  }

  onProceed(UniqueId){

    /*let section
    if(this.ClausesId){
      section=this.sectionValue;
    }
    else{
      section='99999';
    }*/

    let ReqObj = {

      "ClausesDescription":this.ClausesDetails.ClausesDescription,
      //"CoverId":this.ClausesDetails.CoverId,
      //"ExtraCoverId":this.ClausesDetails.ExtraCoverId,
      //"DisplayOrder":this.ClausesDetails.DisplayOrder,
      //"PdfLocation":this.ClausesDetails.PdfLocation,
      //"OptionalType":this.ClausesDetails.OptionalType,
      //"IntCode":this.ClausesDetails.IntCode,
      "Status":this.ClausesDetails.Status,
      "EffectiveDateStart":this.ClausesDetails.EffectiveDateStart,
      "Remarks":this.ClausesDetails.Remarks,
      "CreatedBy":this.loginId,
      "ProductId":this.productValue,
      "InsuranceId":this.insuranceId,
      "ClausesId":this.ClausesId,
      "BranchCode":this.branchValue,
      "CoreAppCode":this.ClausesDetails.CoreAppCode,
      "RegulatoryCode":this.ClausesDetails.RegulatoryCode,
      "SectionId":this.sectionValue,
      "TypeId":this.TypeId,
      "DocRefNo": UniqueId

    }
    let urlLink = `${this.CommonApiUrl}master/insertclauses`;
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
          //         'Clauses Details Inserted/Updated Successfully',
          //         'Clauses Details',
          //         config);
                //this.getUploadedDocList(data.Result.SuccessId);
                  this.router.navigate(['/Admin/clausesMaster'])

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
  getBranchList() {

    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.branchList = obj.concat(data?.Result);
          let warranty: any = JSON.parse(sessionStorage.getItem('ClausesId'));
          if (warranty) {
            this.ClausesId = warranty?.ClausesId;
            this.branchValue = warranty?.BranchCode;
            if (this.ClausesId) this.getEditClausesDetails();
            else this.ClausesId = null;
          }
          else this.ClausesId = null;
        }
      },
      (err) => { },
    );
  }
  getCompanyProductList(){
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "Limit":"0",
      "Offset":"100000"
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj =[]
        this.productList = obj.concat(data?.Result)
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
          console.log(this.sectionList);
          let secObj = JSON.parse(sessionStorage.getItem('ClausesId'))
          if (secObj) {
            this.sectionValue = secObj?.SectionId;
          }
          else { this.sectionValue = '99999'; }

        }
      },
      (err) => { },
    );
  }
  getEditClausesDetails(){
    let ReqObj =  {
      "ClausesId":this.ClausesId,
      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchValue,
      "ProductId":this.productValue,
      "SectionId":this.sectionValue
  }
    let urlLink = `${this.CommonApiUrl}master/getbyclausesid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.ClausesDetails = res.Result;
        this.getTypeId();
        this.TypeId=this.ClausesDetails.TypeId
        if(this.ClausesDetails){
          if(this.ClausesDetails?.EffectiveDateStart!=null){
            this.ClausesDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ClausesDetails?.EffectiveDateStart)
          }
          if(this.ClausesDetails?.EffectiveDateEnd!=null){
            this.ClausesDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ClausesDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.ClausesDetails);
      if(this.ClausesDetails?.DocRefNo!=null) this.getUploadedDocList(this.ClausesDetails?.DocRefNo)
    },
    (err) => { },
  );

  }

  getTypeId(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
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
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  onUploadDocuments(target:any,fileType:any,type:any){
    console.log("Event ",target);
    let event:any = target.target.files;

    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });

        }

    }
    console.log("Final File List",this.uploadDocList)
  }
  onDragDocument(target:any,fileType:any,type:any){
    let fileList = target;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': this.imageUrl,'DocTypeId':'','filename':element.name, 'JsonString': {} });

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
             "TermsAndCondtionId": "18",
             "TermsAndCondtionDesc": "Clauses" ,
             "Type": "C"
        }
        let urlLink = `${this.CommonApiUrl}document/termsdocupload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
            if(data.ErrorMessage){
              /*for(let entry of data.ErrorMessage){
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
              }*/
            }
            else if(data?.Result){
                i+=1;
                if(i==docList.length){
                  this.onProceed(data?.Result?.SuccessId);
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
    else{ this.onProceed(null)}
  }

  onDeleteDocument(index:any) {
    this.uploadDocList.splice(index,1);
}
getUploadedDocList(uniqueId:any){
  /*let docType="",i=0;
  if(index>=0){ docType="2"}
  else{  docType = "1" }*/

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
