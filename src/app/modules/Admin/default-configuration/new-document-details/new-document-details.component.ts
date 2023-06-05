import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-document-details',
  templateUrl: './new-document-details.component.html',
  styleUrls: ['./new-document-details.component.scss']
})
export class NewDocumentDetailsComponent implements OnInit {

  @Input() title: any;docValue:any="YES";
  statusValue:any= "YES";cityList:any[]=[];docTypeList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;activeMenu:any;
  mandatoryValue:any = "YES";minDate:Date;insuranceId:any;productId:any;loginId:any;
  public DocumentDetails:any;DocumentId:any;
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
  this.getDocTypeList()

}


  ngOnInit(): void {
    let docDetails  = JSON.parse(sessionStorage.getItem('DocumentId'));

    if(docDetails?.DocumentId){
      console.log('Document IdDd',docDetails);
      this.DocumentId = docDetails?.DocumentId;
      this.getEditDocumentDetails();
    }
    else{
      this.DocumentDetails = new Document();
      this.DocumentId = null;
      if(this.DocumentDetails?.Status==null) this.DocumentDetails.Status = 'Y';
      if(this.DocumentDetails?.MandatoryStatus==null) this.DocumentDetails.MandatoryStatus = 'N';
    }
  }
  dismiss() {
   this.router.navigate(['/Admin/globalConfigure/existingDocument'])
  }
  getDocTypeList(){
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
  getEditDocumentDetails(){
    let ReqObj =  {
      "DocumentId":this.DocumentId,
  }
      let urlLink = `${this.ApiUrl1}master/getbydocument`;
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
  onSaveDocument(){
    let ReqObj = {
      "DocumentId":this.DocumentId,
      "DocumentName":this.DocumentDetails.DocumentName,
      "DocumentDesc":this.DocumentDetails.DocumentDesc,
      "DocApplicableId":this.DocumentDetails.DocApplicableId,
      "MandatoryStatus":this.DocumentDetails.MandatoryStatus,
      "Remarks":this.DocumentDetails.Remarks,
      "EffectiveDateStart":this.DocumentDetails.EffectiveDateStart,
      "RegulatoryCode":this.DocumentDetails.RegulatoryCode,
      "CreatedBy":this.loginId,
      "CoreAppCode":this.DocumentDetails.CoreAppCode,
      "Status":this.DocumentDetails.Status,
    }
    let urlLink = `${this.ApiUrl1}master/insertdocument`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = null;
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
                    this.router.navigate(['/Admin/globalConfigure/existingDocument'])
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
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
                  //   entry.Field,
                  //   entry.Message,
                  //   config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }
  onRedirect(value){
    this.activeMenu = value;
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
}
