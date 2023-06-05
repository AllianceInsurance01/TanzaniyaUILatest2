import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { SubCoverModal } from './subCoverModal';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-new-sub-cover-details',
  templateUrl: './new-sub-cover-details.component.html',
  styleUrls: ['./new-sub-cover-details.component.scss']
})
export class NewSubCoverDetailsComponent implements OnInit {

  @Input() title: any;@Input() SubCoverId:any;
  subCoverDetails:any;
  statusValue:any= "YES";cityList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(/*protected ref: NbDialogRef<NewSubCoverDetailsComponent>,*/
    private sharedService: SharedService,private datePipe:DatePipe) {
    this.subCoverDetails = new SubCoverModal();
  }

  ngOnInit(): void {
    if(this.SubCoverId!=null && this.SubCoverId!=undefined){
      this.getEditSubCoverDetails();
    }
    else{
      this.subCoverDetails = new SubCoverModal();
      if(this.subCoverDetails?.Status==null)  this.subCoverDetails.Status = 'N';
    }
  }
  dismiss() {
    //this.ref.close();
  }
  getEditSubCoverDetails(){
    let ReqObj = { "SubCoverId": this.SubCoverId }
    let urlLink = `${this.ApiUrl1}master/getbysubcover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.subCoverDetails = res.Result;
          if(this.subCoverDetails){
            if(this.subCoverDetails?.EffectiveDateStart!=null){
              this.subCoverDetails.EffectiveDateStart = this.onDateFormatInEdit(this.subCoverDetails?.EffectiveDateStart)
            }
            if(this.subCoverDetails?.EffectiveDateEnd!=null){
              this.subCoverDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.subCoverDetails?.EffectiveDateEnd)
            }
          }
        }
      },
      (err) => { },
    );
  }
  onSaveSubCover(){
    let ReqObj = {
    "SubCoverId":this.subCoverDetails.SubCoverId,
    "SubCoverName":this.subCoverDetails.SubCoverName,
    "SubCoverDesc":this.subCoverDetails.SubCoverDesc,
    "CoreAppCode":this.subCoverDetails.CoreAppCode,
    "Remarks":this.subCoverDetails.Remarks,
    "Status":this.subCoverDetails.Status,
    "EffectiveDateStart":this.subCoverDetails.EffectiveDateStart,
    "EffectiveDateEnd":this.subCoverDetails.EffectiveDateEnd,
    "CreatedBy":this.subCoverDetails.CreatedBy,
    "TiraCode":this.subCoverDetails.TiraCode,
    }
    let urlLink = `${this.ApiUrl1}master/insertsubcover`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
      ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateEnd'] = "";
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
            //         'SubCover Details Inserted/Updated Successfully',
            //         'SubCover Details',
            //         config);
            //      this.ref.close();
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
}
