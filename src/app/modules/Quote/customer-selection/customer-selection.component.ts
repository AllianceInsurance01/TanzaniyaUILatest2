import { Component, OnInit,Input } from '@angular/core';
import * as Mydatas from '../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-customer-selection',
  templateUrl: './customer-selection.component.html',
  styleUrls: ['./customer-selection.component.scss']
})
export class CustomerSelectionComponent implements OnInit {

  customerData:any[]=[];customerHeader:any[]=[];
  @Input() Reference:any;
  referenceNo:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  customerValue: any;userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;
  searchValue: any=[];brokerbranchCode:any;
  clearSearchSection: boolean = false;
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;
    this.customerHeader =  [
      {
        key: 'CustomerReferenceNo',
        display: 'Select',
        config: {
          select: true,
        },
      },
      { key: 'ClientName', display: 'Customer Name' },
      { key: 'VrTinNo', display: 'VrTinNo' },
      { key: 'MobileNo1', display: 'Mobile No' },
      { key: 'Email1', display: 'EmailID' },
      { key: 'CreatedBy', display: 'Created By' },
      { key: 'Status', display: 'Status' },


    ];

    this.getCustomersList();
   }

  ngOnInit(): void {
    /*this.menuService.onItemClick().subscribe((data) => {
      console.log("Url on Select",data.item.link)
      console.log("Router",data.item.link)
      if (data.item.title == `New Quote`) {
        sessionStorage.removeItem('customerReferenceNo');
        sessionStorage.removeItem('QuoteStatus');
        sessionStorage.removeItem('vehicleDetailsList');
        sessionStorage.removeItem('quoteReferenceNo');
        console.log("Router",data,JSON.parse(sessionStorage.getItem('vehicleDetailsList')));
      }
    });*/
    

  }
  onCustomerSearch(){
    if(this.searchValue){
      this.customerData = [];
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "SearchValue":this.searchValue,
        "CreatedBy": ""
      }
      let urlLink = `${this.CommonApiUrl}api/searchcustomerdata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customerData=data.Result;
              this.clearSearchSection = true;
          }
        },
        (err) => { },
      );
    }
  }
  getCustomersList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "CreatedBy":this.loginId,
      "BranchCode":this.branchCode,
      "UserType": this.userType,
      "Limit":"0",
      "Offset":"100"
    }
    let urlLink = `${this.CommonApiUrl}api/getactivecustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customerData = data?.Result;
            this.searchValue = "";
            if(this.clearSearchSection){
              this.customerValue=null;
              sessionStorage.removeItem('customerReferenceNo')
              this.clearSearchSection = false;
            }
            let refno = sessionStorage.getItem('customerReferenceNo')
            console.log("Ref No",refno);
            if (refno){
              this.customerValue=refno;
              this.referenceNo = refno;
            }
            else{this.referenceNo=null;this.customerValue=null}
            console.log(refno);
        }

      },
      (err) => { },
    );
  }
  onSelectCustomer(rowData){
    console.log("Select",rowData);
    this.customerValue = rowData.CustomerReferenceNo;
    sessionStorage.setItem('customerReferenceNo',this.customerValue)
  }
  onEditCustomer(rowData){
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details'])
  }
  onProceed(){
    if(this.customerValue!=undefined && this.customerValue!=null){
      sessionStorage.setItem('customerReferenceNo',this.customerValue);
      
      if(this.productId=='5' || this.productId=='4'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails']);
      }
      else if(this.productId=='3'){
        this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails'])
      }
      else if(this.productId=='19'){
        this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails'])
      }
      else{
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details'])
      }
      // else if(this.productId=='14'){
      //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details'])
      // }
      // else if(this.productId=='15'){
      //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details'])
      // }
    }
  }
  onAddCustomer(){
    sessionStorage.removeItem('customerReferenceNo');
    this.router.navigate(['/Home/customer/Client']);
  }

}
