import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../app-config.json';

@Component({
  selector: 'app-MotorCustomerInfo',
  templateUrl: './MotorCustomerInfo.component.html',
  styleUrls: ['./MotorCustomerInfo.component.scss']
})

export class MotorCustomerInfoComponent implements OnInit {

  clientName:any="Hisham";
  idNumber:any="912345";
  policyDesc:any="99876543";
  MobileNo1:any='Admin@01';
  Nationality:any="Tanzania";
  Division:any="Direct Corporate";
  CustomerCode:any="99999";
  CashCustomer:any="CashCustomer";
  So:any="1-Direct";
  Ho:any="HOCorporate";
  userDetails: any;
  loginId: any;
  agencyCode: any;
  branchCode: any;
  brokerbranchCode: any;
  productId: any;
  userType: any;
  insuranceId: any;
  search: any;
  searchValue: any;
  //customerData:any[]=[];
  customerInfo:any[]=[];

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;selectedData:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;

  constructor(public router:Router,private sharedService: SharedService,private datePipe:DatePipe){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
  }

    ngOnInit(): void {

      let CustomerObj = JSON.parse(sessionStorage.getItem('editCustomer'));
            

      this.search=CustomerObj?.Search;
      this.searchValue=CustomerObj.searchValue;

      if(this.searchValue){
        this.onCustomerSearch()
      }

        
    }



    onCustomerSearch(){
      let app
         if(this.userType == 'Issuer'){
           app=this.loginId
         }
         else{
           app="1"
         }
         /*if(this.search=='EntryDate'){
     
           let dob:any = this.datePipe.transform(this.dob, "dd/MM/yyyy");
           this.searchValue=dob;
           //this.onDateFormatInEdit(this.searchValue);
         }*/
         if(this.searchValue){
           //this.customerData = [];
           let ReqObj = {
         "SearchKey":this.search,
         "SearchValue": this.searchValue,
         "LoginId": this.loginId,
         "InsuranceId":this.insuranceId,
         "BranchCode": this.branchCode,
         "ProductId":this.productId,
         "UserType": this.userType,
         "ApplicationId": app
     
           }
           let urlLink = `${this.CommonApiUrl}api/adminviewcustomerdetails`;
           this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
             (data: any) => {
               console.log(data);
               if(data.Result){
                   this.customerInfo=data?.Result;

                   console.log('kkkkkkkkk',this.customerInfo)
                   //this.quoteno=data.Result.QuoteNo
     
     
               }
     
             },
             (err) => { },
           );
         }
       }
     
}
