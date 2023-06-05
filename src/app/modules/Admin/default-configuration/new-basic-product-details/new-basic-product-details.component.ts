import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { DatePipe } from '@angular/common';
import { Product } from './productModal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-basic-product-details',
  templateUrl: './new-basic-product-details.component.html',
  styleUrls: ['./new-basic-product-details.component.scss']
})
export class NewBasicProductDetailsComponent implements OnInit {

  @Input() title: any;@Input() ProductId:any;
  CurrencyIds:any[]=[];
  productList:any[]=[];
  iconList:any[]=[];
  statusValue:any= "YES";cityList:any[]=[];
  loginId: any;userType: any;productDetails:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any= this.AppConfig.CommonApiUrl;typeList:any[]=[];
  minDate: Date;activeMenu:any;
  insuranceId: string;
  Currency: any;
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.activeMenu = "Product";
      this.insuranceId = "99999";
      this.productDetails = new Product();
      // this.typeList = [
      //   {"Code":"Y","CodeDesc":"MOTOR"},
      //   {"Code":"N","CodeDesc":"NON-MOTOR"},
      // ]
      this.minDate = new Date();
      this.getIconList();
      this.ProductId = sessionStorage.getItem('ProductId');
    }

  ngOnInit(): void {
    if(this.productDetails?.PackageYn==null)  this.productDetails.PackageYn = 'N';
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.userType = userDetails?.Result?.UserType;
    }
    console.log("Received Id",this.ProductId);
    if(this.ProductId!=null && this.ProductId!=undefined){
        this.getEditProductDetails();
    }
    else{
      if(this.productDetails?.Status==null)  this.productDetails.Status = 'N';
        this.productDetails.CreatedBy = this.loginId;
        this.onCurrencyChange(null,'nonEdit');
      }
  }

  onCurrencyChange(Currency,type){
    if(this.insuranceId!='' && this.insuranceId!= undefined){
      let urlLink = `${this.CommonApiUrl}master/dropdown/currency`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.productList = data.Result;
              if(type=='direct'){
                this.CurrencyIds = Currency;
              }
              //this.getBranchList(type,branches);
          }
        },
        (err) => { },
      );
    }
  }
  dismiss() {
    this.router.navigate(['/Admin/globalConfigure/companyConfigure'])
  }
  getIconList(){
    let ReqObj = {
      "InsuranceId":"",
      "BranchCode":""
    }
    let urlLink = `${this.ApiUrl1}dropdown/producticons`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.iconList = data.Result;
        this.getProductTypeList();
      },
      (err) => { },
    );
  }
  getProductTypeList(){
    let ReqObj = {
      "InsuranceId":"",
      "BranchCode":""
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
  getEditProductDetails(){
    let ReqObj = { "ProductId": this.ProductId }
    let urlLink = `${this.ApiUrl1}master/getbyproductid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.productDetails = data.Result;
          if(this.productDetails){
            if(this.productDetails?.Status==null)  this.productDetails.Status = 'Y';
            if(this.productDetails?.PackageYn==null)  this.productDetails.PackageYn = 'N';
            this.onCurrencyChange(this.productDetails.CurrencyIds,'direct')
            if(this.productDetails?.EffectiveDateStart!=null){
              this.productDetails.EffectiveDateStart = this.onDateFormatInEdit(this.productDetails?.EffectiveDateStart)
            }
            if(this.productDetails?.EffectiveDateEnd!=null){
              this.productDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.productDetails?.EffectiveDateEnd)
            }
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
  onSaveProduct(){
    let ReqObj = {
       "ProductId": this.productDetails.ProductId,
        "ProductName":this.productDetails.ProductName,
        "ProductIconId":this.productDetails.ProductIconId,
        "ProductIconName": this.productDetails.ProductIconName,
        "ProductDesc":this.productDetails.ProductDesc,
        "Remarks":this.productDetails.Remarks,
        "Status":this.productDetails.Status,
        "PackageYn":this.productDetails.PackageYn,
        //"MotorYn": this.productDetails.MotorYn,
        "EffectiveDateStart":this.productDetails.EffectiveDateStart,
        "CreatedBy":this.loginId,
        "RegulatoryCode":this.productDetails.RegulatoryCode,
        "CurrencyIds":this.CurrencyIds
    }
    let urlLink = `${this.ApiUrl1}master/insertproduct`;
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
            //         'Product Details Inserted/Updated Successfully',
            //         'Product Details',
            //         config);
                    this.router.navigate(['/Admin/globalConfigure/companyConfigure'])

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
  onStartDateChange(){
    console.log("Start Date",this.productDetails.EffectiveDateStart)
    var d = this.productDetails.EffectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.productDetails.EffectiveDateEnd = new Date(year + 28, month, day);
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
