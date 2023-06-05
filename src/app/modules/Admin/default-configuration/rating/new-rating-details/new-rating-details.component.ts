import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { RatingDetails } from './RatingDetails';
import { DatePipe } from '@angular/common';
//import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';
@Component({
  selector: 'app-new-rating-details',
  templateUrl: './new-rating-details.component.html',
  styleUrls: ['./new-rating-details.component.scss']
})
export class NewRatingDetailsComponent implements OnInit {

  activeMenu:any="Rating";typeList:any[]=[];
  statusValue:any="Y";productList:any[]=[];
  tableList:any[]=[];columnList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  productValue: string;
  ratingDetails: any;
  loginId: any;minDate: Date;
  constructor(private router:Router,
    private sharedService: SharedService,private datePipe:DatePipe) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.minDate = new Date();
    this.ratingDetails = new RatingDetails();
    this.ratingDetails.Status="Y";
    this.getTableList();
    // this.tableList = [
    //   {
    //     Code : "1",
    //     CodeDesc : "PERSONAL_INFO"
    //     }
    // ];
    // this.columnList = [
    //   {
    //     Code : "1",
    //     CodeDesc : "DATE_OF_BIRTH"
    //     } ,
    //     {
    //     Code : "2",
    //     CodeDesc : "NATIONALITY"
    //     }
    // ]
    this.getProductList();
  }

  ngOnInit(): void {

  }
  getTableList(){
    let urlLink = `${this.ApiUrl1}dropdown/tablename`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.tableList = data.Result;
        }
      },
      (err) => { },
    );

  }
  onTableChange(){
    if(this.ratingDetails.InputTable!= null && this.ratingDetails.InputTable!= ''){
      let ReqObj = {"TableName": this.ratingDetails.InputTable}
      let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.columnList = data.Result;
          }
        },
        (err) => { },
      );
    }
  }
  onRedirect(value){
    if(this.activeMenu=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
  ongetBack(){
    this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
  getProductList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/product`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.productList = data.Result;
          let ratingId = sessionStorage.getItem('ratingFactorId');
          let productValue =  sessionStorage.getItem('ratingProductId');
          if(productValue){
            this.productValue = productValue;
          }
          console.log("Rating Id",ratingId)
          if(ratingId){
            this.getEditRatingList(ratingId);
          }
          else{
            this.ratingDetails = new RatingDetails();
            this.ratingDetails.Status = "Y";
            this.ratingDetails.MasterYn = "N";
          }
        }

      },
      (err) => { },
    );
  }
  getEditRatingList(ratingId){
    let ReqObj = {
    "ProductId": this.productValue,
    "RatingId": ratingId
    }
    let urlLink = `${this.ApiUrl1}master/getbyratingfieldid`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ratingDetails = data.Result;
            if(this.ratingDetails){
              if(this.ratingDetails?.Status==null)  this.ratingDetails.Status = 'N';
              if(this.ratingDetails?.EffectiveDateStart!=null){
                this.ratingDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ratingDetails?.EffectiveDateStart)
              }
              if(this.ratingDetails?.EffectiveDateEnd!=null){
                this.ratingDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ratingDetails?.EffectiveDateEnd);
                console.log("End Date",this.ratingDetails.EffectiveDateEnd)
              }
              if(this.ratingDetails?.MasterYn==null) this.ratingDetails.MasterYn = "N";
              if(this.ratingDetails.InputTable!= null && this.ratingDetails.InputTable!= ''){
                  this.onTableChange();
              }
            }
        }
      },
      (err) => { },
    );
  }
  onProceed(){
    if(this.ratingDetails.MasterYn=='N') this.ratingDetails.ApiUrl = null;
    let ReqObj = {
        "ApiUrl": this.ratingDetails.ApiUrl,
        "RatingId": this.ratingDetails?.RatingId,
        "RatingField": this.ratingDetails?.RatingField,
        "RatingDesc":this.ratingDetails?.RatingDesc,
        "InputTable":this.ratingDetails?.InputTable,
        "InputColumn":this.ratingDetails?.InputColumn,
        "MasterYn": this.ratingDetails?.MasterYn,
        "ProductId":this.productValue,
        "EffectiveDateStart":this.ratingDetails?.EffectiveDateStart,
        "Remarks":this.ratingDetails?.Remarks,
        "CreatedBy":this.loginId,
        "Status":this.ratingDetails?.Status,
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.ApiUrl1}master/insertratingfield`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
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
          //   'Rating Field Details Inserted/Updated Successfully',
          //   'Rating Field Details',
          //   config);
            sessionStorage.removeItem('ratingFactorId')
          this.router.navigate(['/Admin/globalConfigure/existingRating']);
        }
        else if(data.ErrorMessage){
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
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
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
  onStartDateChange(){
    console.log("Start Date",this.ratingDetails.EffectiveDateStart)
    var d = this.ratingDetails.EffectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.ratingDetails.EffectiveDateEnd = new Date(year + 28, month, day);
  }
}
