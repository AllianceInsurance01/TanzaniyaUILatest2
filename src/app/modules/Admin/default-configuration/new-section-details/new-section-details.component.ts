import { Component, OnInit, Input } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { Section } from './sectionModal';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-section-details',
  templateUrl: './new-section-details.component.html',
  styleUrls: ['./new-section-details.component.scss']
})
export class NewSectionDetailsComponent implements OnInit {
  statusValue:any= "YES";cityList:any[]=[];SectionId:any;title:any;
  sectionDetails:any={};public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  loginId: any;minDate: Date;activeMenu:any;typeList:any[]=[];
  insuranceId: string;
  Motoryn:any;
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe ,private router:Router) {
      this.minDate = new Date();
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      console.log('HHHHHHHHHHHHHH',this.insuranceId);
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.SectionId = sessionStorage.getItem('SectionId');
    this.sectionDetails = new Section();
    this.getProductTypeList();
  }

  ngOnInit(): void {
    console.log("Section id",this.SectionId);
    if(this.SectionId){
      this.getEditSectionDetails();
    }
    else{
      this.SectionId = null;
      this.sectionDetails = new Section();
      if(this.sectionDetails?.Status==null)  this.sectionDetails.Status = 'N';
      this.sectionDetails.CreatedBy = this.loginId;
    }
  }
  dismiss() {
    this.router.navigate(['/Admin/globalConfigure/existingSections'])
  }
  getEditSectionDetails(){
      let ReqObj = {"SectionId": this.SectionId}
      let urlLink = `${this.ApiUrl1}master/getbysectionid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.sectionDetails = res.Result;
          this.Motoryn=res?.Result?.MotorYn;

          if(this.sectionDetails){
            if(this.sectionDetails?.EffectiveDateStart!=null){
              this.sectionDetails.EffectiveDateStart = this.onDateFormatInEdit(this.sectionDetails?.EffectiveDateStart)
            }
            if(this.sectionDetails?.EffectiveDateEnd!=null){
              this.sectionDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.sectionDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.sectionDetails);
      },
      (err) => { },
    );
  }
  onSaveSection(){
    let ReqObj = {
      "SectionId":this.sectionDetails.SectionId,
      "SectionName":this.sectionDetails.SectionName,
      "RegulatoryCode":this.sectionDetails.RegulatoryCode,
      "Remarks":this.sectionDetails.Remarks,
      "Status":this.sectionDetails.Status,
      "CreatedBy":this.loginId,
      "EffectiveDateStart":this.sectionDetails.EffectiveDateStart,
      "MotorYn": this.Motoryn,
    }
    let urlLink = `${this.ApiUrl1}master/insertsection`;
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
            //         'Section Details Inserted/Updated Successfully',
            //         'Section Details',
            //         config);
                 this.router.navigate(['/Admin/globalConfigure/existingSections'])
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

  getProductTypeList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/productcategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.typeList = data.Result;
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
  onStartDateChange(){
    console.log("Start Date",this.sectionDetails.EffectiveDateStart)
    var d = this.sectionDetails.EffectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.sectionDetails.EffectiveDateEnd = new Date(year + 28, month, day);
  }
  onRedirect(value){
    console.log("Val",value);
    this.activeMenu = value;
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
}
