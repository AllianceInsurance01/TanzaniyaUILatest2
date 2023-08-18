import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-referral-approved',
  templateUrl: './referral-approved.component.html',
  styleUrls: ['./referral-approved.component.scss']
})
export class ReferralApprovedComponent implements OnInit {
  quoteHeader:any[]=[];
  quoteData:any[]=[];innerColumnHeader:any[]=[];
  innerTableData:any[]=[];userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  referralData: any;
  section: any=null;
  endorsementHeader: any;

  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    sessionStorage.removeItem('customerReferenceNo')
    if(this.productId=='5'){
      this.quoteHeader =  [
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        
        {
          key: 'edit',
          display: 'Vehicle Details',
          sticky: false,
          config: {
            isCollapse: true,
            isCollapseName:'Vehicles'
          },
        },
        
      ];
      this.innerColumnHeader =  [
        { key: 'Vehicleid', display: 'VehicleID' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        { key: 'OverallPremiumFc', display: 'Premium' },
        { key: 'ReferalRemarks', display: 'ReferralRemarks' },
        { key: 'AdminRemarks', display: 'AdminRemarks' },
        
      ];
      this.endorsementHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'EndorsementTypeDesc', display: 'Endt Type'},
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        
        {
          key: 'edit',
          display: 'Vehicle Details',
          sticky: false,
          config: {
            isCollapse: true,
            isCollapseName:'Vehicles'
          },
        },
        // {
        //   key: 'actions',
        //   display: 'Action',
        //   config: {
        //     isEdit: true,
        //   },
        // },
      ];
    }
    else{
      this.quoteHeader =  [
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        { key: 'AdminRemarks', display: 'AdminRemarks' },
      ];
      this.endorsementHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'EndorsementTypeDesc', display: 'Endt Type'},
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        // {
        //   key: 'actions',
        //   display: 'Action',
        //   config: {
        //     isEdit: true,
        //   },
        // },
      ];
    }
  }
  ngOnInit(): void {
    this.getExistingQuotes();
  }
  setSection(val){this.section = val;}
  getExistingQuotes(){
    let appId = "1",loginId="";
    if(this.userType=='Broker'){
      appId = "1"; loginId = this.loginId;
    }
    else{
      appId = this.loginId;
    }
    let ReqObj = {
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": this.agencyCode,
           "ProductId":this.productId,
          "Limit":"0",
          "Offset":"1000",
   }
    let urlLink = `${this.CommonApiUrl}api/adminreferralapproved`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.referralData = data.Result.filter(ele=>ele.EndorsementDate!=null);
          this.quoteData = data.Result.filter(ele=>ele.EndorsementDate==null);
          this.section = 'quote';
        }
        else this.section = 'quote';
      },
      (err) => { },
    );
  }
  onInnerData(rowData){
    let ReqObj = {
        "RequestReferenceNo": rowData.RequestReferenceNo
      }
      let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              rowData.MotorList = data.Result;
          }
        },
        (err) => { },
      );
  }
  onEditQuotes(rowData){
    sessionStorage.setItem('QuoteStatus','AdminRA');
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    sessionStorage.removeItem('vehicleDetailsList')
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }


}
