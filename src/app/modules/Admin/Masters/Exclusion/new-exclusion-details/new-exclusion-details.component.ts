import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import { Exclusion } from './exclusion.Model';
import * as Mydatas from '../../../../../app-config.json';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumnetDetailsComponent } from '../../../../../shared/view-documnet-details/view-documnet-details.component';

@Component({
  selector: 'app-new-exclusion-details',
  templateUrl: './new-exclusion-details.component.html',
  styleUrls: ['./new-exclusion-details.component.scss']
})
export class NewExclusionDetailsComponent implements OnInit {

  public minDate:Date;BranchCodeList:any;
  public activeMenu:any ='Exclucsion';
  public insuranceName:any;
  public productId:string;
  public loginId:any;
  public insuranceId:any;
  public ExclusionId:any;
  public ExclusionDetails:any;
  public AppConfig:any = (Mydatas as any).default;
  public CommonApiUrl:any = this.AppConfig.CommonApiUrl
  public ApiUrl1:any = this.AppConfig.ApiUrl1

  public branchList:any []=[];branchValue:any;insuranceList:any []=[];
  userDetails: any;
  sectionList: any[]=[];
  TypeList:any[]=[];
  sectionValue: any;
  productValue: any;
  productList: any[]=[];
  uploadDocList: any[]=[];
  imageUrl: any;sectionYn:any;
  uploadedDocList: any[]=[];
  TypeId: any;
  constructor(private datePipe:DatePipe,private router:Router,public dialogService: MatDialog
    ,private sharedService:SharedService) {
    this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');


    this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    const user = this.userDetails?.Result;
    //this.insuranceId = user?.Result?.LoginBranchDetails[0].InsuranceId;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;
    this.ExclusionDetails = new Exclusion();
    this.getCompanyProductList();
    if(this.ExclusionDetails?.Status==null)  this.ExclusionDetails.Status = 'N';
    let docObj = JSON.parse(sessionStorage.getItem('ExclusionId'))
    if (docObj) {
      this.productValue = docObj?.ProductId,
        this.branchValue = docObj?.BranchCode,
        this.sectionValue = docObj?.SectionId;
    };
    this.getTypeId()
   }

  ngOnInit(): void {

    sessionStorage.removeItem('WarrantyId')
    console.log("BodyType Id",this.ExclusionId);
    if(this.ExclusionId!=null && this.ExclusionId!=undefined){

    }
    else{
      this.ExclusionId = null;
      this.ExclusionDetails = new Exclusion();
      if(this.ExclusionDetails?.Status==null)  this.ExclusionDetails.Status = 'N';
    }
    this.getBranchList();
    this.getSectionList();


  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let Exclucsion:any = JSON.parse(sessionStorage.getItem('ExclusionId'));
        if(Exclucsion){
          console.log("Sess Obj",Exclucsion)
          this.ExclusionId = Exclucsion?.ExclusionId;
          this.branchValue = Exclucsion?.BranchCode;
          this.productValue = Exclucsion?.ProductId;
          //this.sectionValue =Exclucsion?.SectionId;
          if(this.ExclusionId)  this.getEditExclusionDetails();
          else this.ExclusionId = null;
        }
        else this.ExclusionId = null;
      }
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
  ongetBack(){
    this.router.navigate(['/Admin/exclusionMaster'])

  }
  onProceed(Id){

    /*let section
    if(this.ExclusionId){
      section=this.sectionValue;
    }
    else{
      section='99999';
    }*/

    let ReqObj = {
        "ExclusionId":this.ExclusionId,
        "ExclusionDescription":this.ExclusionDetails.ExclusionDescription,
        "Status":this.ExclusionDetails.Status,
        "EffectiveDateStart":this.ExclusionDetails.EffectiveDateStart,
        "Remarks":this.ExclusionDetails.Remarks,
        "InsuranceId":this.insuranceId,
        "CreatedBy":this.loginId,
        "BranchCode":this.branchValue,
        "CoreAppCode":this.ExclusionDetails.CoreAppCode,
        "RegulatoryCode":this.ExclusionDetails.RegulatoryCode,
        "DocRefNo": Id,
        "ProductId": this.productValue,
        "SectionId":this.sectionValue,
        "TypeId":this.TypeId
    }
    let urlLink = `${this.CommonApiUrl}master/insertexclusion`;
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
          //         'Exclusion Details Inserted/Updated Successfully',
          //         'Exclusion Details',
          //         config);
                  this.uploadDocList = [];  
                  this.router.navigate(['/Admin/exclusionMaster'])
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
  getEditExclusionDetails(){
    let ReqObj =  {
      "ExclusionId":this.ExclusionId,
      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchValue,
      "ProductId":this.productValue,
      "SectionId":this.sectionValue,

  }
    let urlLink = `${this.CommonApiUrl}master/getbyexclusionid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.ExclusionDetails = res.Result;
        this.getTypeId();
        this.TypeId=this.ExclusionDetails.TypeId
        if(this.ExclusionDetails){
          if(this.ExclusionDetails?.EffectiveDateStart!=null){
            this.ExclusionDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ExclusionDetails?.EffectiveDateStart)
          }
          if(this.ExclusionDetails?.EffectiveDateEnd!=null){
            this.ExclusionDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ExclusionDetails?.EffectiveDateEnd)
          }
          if(this.ExclusionDetails.DocRefNo!=null) this.getUploadedDocList(this.ExclusionDetails.DocRefNo)
        }
      }
      console.log("Final Modal Class",this.ExclusionDetails);
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
          let secObj = JSON.parse(sessionStorage.getItem('ExclusionId'))
          if (secObj) {
            this.sectionValue = secObj?.SectionId;
          }
          else{ this.sectionValue = '99999'; }

        }
      },
      (err) => { },
    );
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

  onDeleteDocument(index:any) {
    this.uploadDocList.splice(index,1);
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
