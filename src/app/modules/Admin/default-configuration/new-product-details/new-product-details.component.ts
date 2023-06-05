import { Component, OnInit, Input } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { Product } from './productModal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-product-details',
  templateUrl: './new-product-details.component.html',
  styleUrls: ['./new-product-details.component.scss']
})
export class NewProductDetailsComponent implements OnInit {

  @Input() title: any;@Input() ProductId:any;
  statusValue:any= "Y";cityList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  productDetails: any;iconList:any[]=[];
  loginId: any;
  userType: any;
  constructor(/*protected ref: NbDialogRef<NewProductDetailsComponent>,*/
    private sharedService: SharedService,private datePipe:DatePipe) {
      this.productDetails = new Product();
      this.getIconList();
   }

  ngOnInit(): void {
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
      if(this.productDetails){
        if(this.productDetails?.MakerYn==null)  this.productDetails.MakerYn = 'N';
        if(this.productDetails?.PaymentYn==null){
          this.productDetails.PaymentYn = 'N';
          this.productDetails.PaymentRedirUrl = null;
        }
        if(this.productDetails?.CustConfirmYn==null)  this.productDetails.CustConfirmYn = 'N';
        if(this.productDetails?.CommissionVatYn==null)  this.productDetails.CommissionVatYn = 'N';
        if(this.productDetails?.CheckerYn==null)  this.productDetails.CheckerYn = 'N';
        if(this.productDetails?.Status==null)  this.productDetails.Status = 'N';
        this.productDetails.CreatedBy = this.loginId
      }
    }
  }
  getEditProductDetails(){
    let ReqObj = { "ProductId": this.ProductId }
    let urlLink = `${this.ApiUrl1}master/getbyproductid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.productDetails = data.Result;
          if(this.productDetails){
            if(this.productDetails?.MakerYn==null)  this.productDetails.MakerYn = 'N';
            if(this.productDetails?.PaymentYn==null){
              this.productDetails.PaymentYn = 'N';
              this.productDetails.PaymentRedirUrl = null;
            }

            if(this.productDetails?.CustConfirmYn==null)  this.productDetails.CustConfirmYn = 'N';
            if(this.productDetails?.CommissionVatYn==null)  this.productDetails.CommissionVatYn = 'N';
            if(this.productDetails?.CheckerYn==null)  this.productDetails.CheckerYn = 'N';
            if(this.productDetails?.Status==null)  this.productDetails.Status = 'N';
            if(this.productDetails?.EffectiveDateStart!=null){
              this.productDetails.EffectiveDateStart = this.onDateFormatInEdit(this.productDetails?.EffectiveDateStart)
            }
            if(this.productDetails?.EffectiveDateEnd!=null){
              this.productDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.productDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.productDetails);
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
  getIconList(){
    let urlLink = `${this.ApiUrl1}dropdown/producticons`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        this.iconList = data.Result;
      },
      (err) => { },
    );
  }
  dismiss() {
    //this.ref.close();
  }
  onSaveProduct(){
    let ReqObj = {
    "ProductId": this.productDetails.ProductId,
    "ProductName":this.productDetails.ProductName,
    "ProductIconId":this.productDetails.ProductIconId,
    "PaymentYn":this.productDetails.PaymentYn,
    "PaymentRedirUrl":this.productDetails.PaymentRedirUrl,
    "AppLoginUrl":this.productDetails.AppLoginUrl,
    "ProductDesc":this.productDetails.ProductDesc,
    "Remarks":this.productDetails.Remarks,
    "Status":this.productDetails.Status,
    "EffectiveDateStart":this.productDetails.EffectiveDateStart,
    "EffectiveDateEnd":this.productDetails.EffectiveDateEnd,
    "CommissionVatYn":this.productDetails.CommissionVatYn,
    "CheckerYn":this.productDetails.CheckerYn,
    "MakerYn":this.productDetails.MakerYn,
    "CustConfirmYn":this.productDetails.CustConfirmYn,
    "SumInsuredStart":this.productDetails.SumInsuredStart,
    "SumInsuredEnd":this.productDetails.SumInsuredEnd,
    "CreatedBy":this.loginId,
    "TiraCode":this.productDetails.TiraCode,
    "CoreAppCode":this.productDetails.CoreAppCode
    }
    let urlLink = `${this.ApiUrl1}master/insertproduct`;
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
            //         'Product Details Inserted/Updated Successfully',
            //         'Product Details',
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

}
