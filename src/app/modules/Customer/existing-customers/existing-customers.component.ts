import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import * as Mydatas from '../../../app-config.json';
@Component({
  selector: 'app-existing-customers',
  templateUrl: './existing-customers.component.html',
  styleUrls: ['./existing-customers.component.scss']
})
export class ExistingCustomersComponent implements OnInit {

  customerData:any[]=[];customerHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  brokerbranchCode:any;customerData2:any[]=[];
  productId:any;insuranceId:any;searchValue:any=[];userType:any;
  Status:any="Active"
  clearSearchSection: boolean=false;

  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    this.customerHeader =  [
      { key: 'ClientName', display: 'Customer Name' },
      { key: 'VrTinNo', display: 'VrTinNo' },
      { key: 'MobileNo1', display: 'Mobile No' },
      { key: 'Email1', display: 'EmailID' },
      { key: 'CreatedBy', display: 'Created By' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },

    ];
    this.getCustomersList();
   }

  ngOnInit(): void {
  }
  onCustomerSearch(){
    if(this.searchValue.length){
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
    let urlLink = `${this.CommonApiUrl}api/getallcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customerData = data?.Result;
            this.searchValue = "";
            if(this.clearSearchSection){
              this.clearSearchSection = false;
            }
        }

      },
      (err) => { },
    );
  }
  onEditCovers(rowData){
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    //this.router.navigate(['Home/customer/Client/client-details']);
    //this.router.navigate(['Home/customer/Client']);
    this.router.navigate(['/Home/customer/ClientDetails']);
  }
  onAddAltCustomer(){
    sessionStorage.removeItem('customerReferenceNo');
    //this.router.navigate(['/Home/customer/Client/client-details']);
    this.router.navigate(['/Home/customer/ClientDetails']);
  }
  onAddCustomer(){
    sessionStorage.removeItem('customerReferenceNo');
    //this.router.navigate(['/Home/customer/Client/client-details']);
    //this.router.navigate(['/Home/customer/Client']);
    this.router.navigate(['/Home/customer/ClientDetails']);
  }
}
