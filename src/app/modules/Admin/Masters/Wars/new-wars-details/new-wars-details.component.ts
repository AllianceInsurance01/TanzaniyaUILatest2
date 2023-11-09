import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { Wars } from './wars.Model';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumnetDetailsComponent } from '../../../../../shared/view-documnet-details/view-documnet-details.component';

@Component({
  selector: 'app-new-wars-details',
  templateUrl: './new-wars-details.component.html',
  styleUrls: ['./new-wars-details.component.scss']
})
export class NewWarsDetailsComponent implements OnInit {

  public minDate: Date; BranchCodeList: any;
  public activeMenu: any = 'Wars';
  public insuranceName: any;
  public productId: string;
  public loginId: any;
  public insuranceId: any;
  public WarsRateId: any;
  public WarsDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl
  public ApiUrl1: any = this.AppConfig.ApiUrl1

  public branchList: any; branchValue: any; insuranceList: any[] = [];
  productList: any;
  productValue: any;
  userDetails: any;
  uploadDocList: any[] = []; uploadedDocList: any[] = [];
  imageUrl: any;
  sectionList: any[] = []; DocumentType
  sectionValue: any; Warsnew: boolean = false
  DocumentReferenceNo: any;
  constructor(private datePipe: DatePipe, private router: Router, private dialogService: MatDialog
    , private sharedService: SharedService) {
    this.minDate = new Date();
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');


    this.productId = sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
      this.insuranceId = userDetails?.Result?.InsuranceId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      if(user.AttachedCompanies){
        if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
      }
    }
    this.WarsDetails = new Wars();
    let docObj = JSON.parse(sessionStorage.getItem('WarRateId'))
    if (docObj) {
      this.productValue = docObj?.ProductId,
        this.branchValue = docObj?.BranchCode,
        this.sectionValue = docObj?.SectionId;
    };
  }

  ngOnInit(): void {
    console.log("WarsRateId", this.WarsRateId);
    if (this.WarsRateId != null && this.WarsRateId != undefined) {
      this.getEditWarsDetails();
    }
    else {
      this.WarsRateId = null;
      this.WarsDetails = new Wars();
      if (this.WarsDetails?.Status == null) this.WarsDetails.Status = 'N';
    }
    this.getBranchList();
    this.getCompanyProductList();
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
          let warranty: any = JSON.parse(sessionStorage.getItem('WarRateId'));
          if (warranty) {
            this.WarsRateId = warranty?.WarRateId;
            this.branchValue = warranty?.BranchCode;
            this.productValue = warranty?.ProductId;
            if (this.WarsRateId) this.getEditWarsDetails();
            else this.WarsRateId = null;
          }
          else this.WarsRateId = null;
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
  getEditWarsDetails() {
    let ReqObj = {
      "WarRateId": this.WarsRateId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,


    }
    let urlLink = `${this.CommonApiUrl}master/getbywarrateid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (res.Result) {
          this.WarsDetails = res.Result;
          if (this.WarsDetails) {
            if (this.WarsDetails?.EffectiveDateStart != null) {
              this.WarsDetails.EffectiveDateStart = this.onDateFormatInEdit(this.WarsDetails?.EffectiveDateStart)
            }
            if (this.WarsDetails?.EffectiveDateEnd != null) {
              this.WarsDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.WarsDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class", this.WarsDetails);
      },
      (err) => { },
    );
    this.getUploadedDocList(null);
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
          let secObj = JSON.parse(sessionStorage.getItem('WarRateId'))
          if (secObj) {
            this.sectionValue = secObj?.SectionId;
          }
          else { this.sectionValue = '0'; }

        }
      },
      (err) => { },
    );
  }
  ongetBack() {
    this.router.navigate(['/Admin/warsMaster'])

  }
  onProceed() {

    let ReqObj = {
      "WarRateId": this.WarsRateId,
      "WarRateDesc": this.WarsDetails.WarRateDesc,
      "WarRate": this.WarsDetails.WarRate,
      "Status": this.WarsDetails.Status,
      "EffectiveDateStart": this.WarsDetails.EffectiveDateStart,
      "Remarks": this.WarsDetails.Remarks,
      "ModeTransportId": this.WarsDetails.ModeTransportId,
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "CoreAppCode": this.WarsDetails.CoreAppCode,
      "RegulatoryCode": this.WarsDetails.RegulatoryCode,
      "ProductId": this.productValue,
      "DocRefNo": "",
      "SectionId": this.sectionValue,


    }
    let urlLink = `${this.CommonApiUrl}master/insertwarrate`;
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
          //   'War Rate Details Inserted/Updated Successfully',
          //   'War Rate Details',
          //   config);
          this.router.navigate(['/Admin/warsMaster'])
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
  onFileUploadCommonList() {

    let docList = this.uploadDocList;
    if (docList.length != 0) {
      let i = 0;
      for (let doc of docList) {
        let ReqObj = {
          "RequestReferenceNo": "REF-345345345",
          "InsuranceId": this.insuranceId,
          "DocumentId": "17",
          "ProductId": this.productValue,
          "SectionId": this.sectionValue,
          "DocumentReferenceNo": "",
          "FileName": doc.filename,
          "OriginalFileName": doc.filename,
          "CreatedBy": this.loginId,
          "QuoteNo": this.WarsRateId,
          "Id": "0"
        }
        let urlLink = `${this.ApiUrl1}document/upload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj, doc.url).subscribe(
          (data: any) => {
            if (data.ErrorMessage) {
              // for (let entry of data.ErrorMessage) {
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
            else if (data?.Result) {
              i += 1;
              if (i == docList.length) {
                this.uploadDocList = [];
                this.getUploadedDocList(null);

              }
            }
          },
          (err) => { },
        );
      }
    }
  }

  onDeleteDocument(index: any) {
    this.uploadDocList.splice(index, 1);
  }
  getUploadedDocList(index: any) {
    let docType = "", i = 0;
    if (index >= 0) { docType = "2" }
    else { docType = "1" }

    let ReqObj = {
      "DocumentType": '5',
      "Id": '0',
      "InsCompanyId": this.insuranceId,
      "QuoteNo": this.WarsRateId
    }
    let urlLink = `${this.ApiUrl1}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          if (data?.Result.length != 0) {
            this.uploadedDocList = data.Result;

          }
          else this.uploadDocList = []
        }
      },
      (err) => { },
    );
  }

  onViewCommonDocument(index) {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "DocumentId": entry.DocumentId,
      "DocumentReferenceNo": entry.DocumentReferenceNo,
      "Id": '0',
      "QuoteNo": this.WarsRateId
    }
    let urlLink = `${this.ApiUrl1}document/getcompressedimage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        /*this.dialogService.open(ViewDocumnetDetailsComponent, {
          context: {
            title: data.Result.OrginalFileName,
            imageUrl: data.Result.ImgUrl
          },
        });*/
        const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
          data: {
            title: data.Result.OrginalFileName,
                 imageUrl: data.Result.ImgUrl
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });

      },

      (err) => { },
    );

  }
  onDeleteCommonDocument(index) {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "DocumentId": entry.DocumentId,
      "DocumentReferenceNo": entry.DocumentReferenceNo,
      "Id": '0',
      "QuoteNo": this.WarsRateId
    }
    let urlLink = `${this.ApiUrl1}document/delete`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.ErrorMessage.length != 0) {
          // for (let entry of data.ErrorMessage) {
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
        else if (data?.Result) {
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
          //   "Delete",
          //   "Document Deleted Successfully",
          //   config);
          this.getUploadedDocList(null);

        }
        window.location.reload()
      },
      (err) => { },
    );
  }
  onCommonDocumentDownload(index) {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "DocumentId": entry.DocumentId,
      "DocumentReferenceNo": entry.DocumentReferenceNo,
      "Id": '0',
      "QuoteNo": this.WarsRateId
    }
    let urlLink = `${this.ApiUrl1}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OrginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => { },
    );
  }
}
