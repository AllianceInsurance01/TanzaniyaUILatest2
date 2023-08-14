import { Component, OnInit, ViewChild } from '@angular/core';
import * as Mydatas from '../../app-config.json';
import { SharedService } from '../../shared/shared.service';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "./variables/charts";
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public datasets: any;
  public data: any;
  public salesChart;tabSection:any='policy';
  public clicked: boolean = true;
  public clicked1: boolean = false;
  referralList:any[]=[];customerList:any[]=[];
  _chart: any;renewalQuoteList:any[]=[];
  userDetails: any;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  userType: any;
  insuranceId: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public Page: number = 1;CustomerPage: number = 1;
  quoteData: any[]=[];
  quoteHeader: any[];policyHeader:any[]=[];
  innerColumnHeader: any[];
  policyData: any[]=[];
  lapsedQuoteData: any[]=[];
  lapsedHeader: any[]=[];
  referralPendingList: any[]=[];
  referralHeader: any[];
  referralApprovedSection: boolean=false;quoteSection:boolean=false;policySection:boolean=false;
  chartSection: boolean=false;
  constructor(private router:Router,private sharedService: SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    this.getReferralApprovedList();
    this.getCustomerList();
    this.getQuotesList();
    this.getPolicyList();
    this.getLapsedList();
    this.getReferralPendingList();
  }
  ngOnInit() {
    
    // this._chart = {
    //   chart: {
    //     plotBackgroundColor: null,
    //     plotBorderWidth: null,
    //     plotShadow: true,
    //     type: 'pie',
    //     renderTo: 'PieChart',
    //     options3d: {
    //       enabled: true,
    //       alpha: 45,
    //       beta: 0,
    //     },
    //   },
    //   title: {
    //     text: ''
    //   },
    //   tooltip: {
    //     pointFormat: '{series.name}: {point.y} & {point.percentage:.1f}%'
    //   },
    //   accessibility: {
    //     point: {
    //       valueSuffix: '%'
    //     }
    //   },
    //   plotOptions: {
    //     pie: {
    //       allowPointSelect: true,
    //       cursor: 'pointer',
    //       depth: 45,
    //       size: 90,
    //       dataLabels: {
    //         enabled: true,
    //         format: '{point.name}: {point.y}({point.percentage:.1f} %)'
    //       }
    //     }
    //   },
    //   series: [{
    //     name: '',
    //     colorByPoint: true,
    //     data: [
    //       { "name": 'Referral Rejected', "y": Number(3), "id": 'RR' },
    //       { "name": 'Referral Pending', "y": Number(5), "id": 'RP' },
    //       { "name": 'Referral Approved', "y": Number(7), "id": 'RR' }
    //     ],
    //     point: {
    //       events: {
    //         click: function (event) {
             
    //         },
    //       }
    //     }
    //   }]
    // }
    // Highcharts.chart('PieChart', this._chart);
    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];
    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  }
  getReferralApprovedList(){
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
          "Offset":"1000"
   }
    let urlLink = `${this.CommonApiUrl}api/referralapproved`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.referralList = data?.Result;
            this.referralApprovedSection = true;
            if(this.referralApprovedSection && this.quoteSection && this.policySection) this.setChartValue();
        }
      },
      (err) => { },
    );
  }
  getCustomerList(){
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
          this.customerList = data?.Result;
          
      }

    },
    (err) => { },
  );
  }
  getQuotesList(){
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
          "Offset":"1000"
   }
    let urlLink = `${this.CommonApiUrl}api/existingquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5'){


            this.quoteHeader =  [
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Customer Name' },
              // { key: 'PolicyStartDate', display: 'Start Date' },
              // { key: 'PolicyEndDate', display: 'End Date' },
              { key: 'Premium', display: 'Premium' },
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
              //   display: 'Edit',
              //   config: {
              //     //isView:true,
              //     isEdit: true,
              //     // isReject: true,
              //   },
              // },
              {
                key: 'mail',
                display: 'Action',
                config: {
                  isNewConfig: true,
                },
              },
              // {
              //   key: 'mail',
              //   display: 'Mail / Followup / Sms',
              //   config: {
              //     isMail:true,
              //     isFollowup: true,
              //     isSms: true,
              //   },
              // },
    
            ];
    
    
            this.innerColumnHeader =  [
              { key: 'Vehicleid', display: 'VehicleID' },
              { key: 'Registrationnumber', display: 'Registration No' },
              { key: 'Chassisnumber', display: 'Chassis No' },
              { key: 'PolicyTypeDesc', display: 'Policy Type' },
              { key: 'Vehiclemake', display: 'Make' },
              { key: 'Vehcilemodel', display: 'Model' },
              { key: 'OverallPremiumFc', display: 'Premium' },
              // {
              //   key: 'actions',
              //   display: 'Action',
              //   config: {
              //     isEdit: true,
              //   },
              // },
    
            ];
        }
        else if(this.productId=='4'){
          this.quoteHeader =  [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'RequestReferenceNo', display: 'Reference No' },
            { key: 'ClientName', display: 'Customer Name' },
            // { key: 'PolicyStartDate', display: 'Start Date' },
            // { key: 'PolicyEndDate', display: 'End Date' },
            { key: 'Count', display: 'Passengers' },
            { key: 'Premium', display: 'Premium' },
            {
              key: 'actions',
              display: 'Edit',
              config: {
                //isView:true,
                isEdit: true,
                //isReject: true,
              },
            },
            {
              key: 'mail',
              display: 'Action',
              config: {
                ismailConfig: true,
              },
            },
            // {
            //   key: 'mail',
            //   display: 'Mail / Followup / Sms',
            //   config: {
            //     isMail:true,
            //     isFollowup: true,
            //     isSms: true,
            //   },
            //},
          ];
          this.innerColumnHeader =  [
            { key: 'Vehicleid', display: 'VehicleID' },
            { key: 'Registrationnumber', display: 'Registration No' },
            { key: 'Chassisnumber', display: 'Chassis No' },
            { key: 'PolicyTypeDesc', display: 'Policy Type' },
            { key: 'Vehiclemake', display: 'Make' },
            { key: 'Vehcilemodel', display: 'Model' },
            { key: 'OverallPremiumFc', display: 'Premium' },
    
            // {
            //   key: 'actions',
            //   display: 'Action',
            //   config: {
            //     isEdit: true,
            //   },
            // },
    
          ];
        }
        else if(this.productId=='3'){
          this.quoteHeader =  [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'RequestReferenceNo', display: 'Reference No' },
            { key: 'ClientName', display: 'Customer Name' },
            { key: 'PolicyStartDate', display: 'Policy Start Date' },
            { key: 'PolicyEndDate', display: 'Policy End Date' },
            /*{ key: 'Count', display: 'No.Of.Locations' },*/
            {
              key: 'actions',
              display: 'Edit',
              config: {
                //isView:true,
                isEdit: true,
                //isReject: true,
              },
            },
            {
              key: 'mail',
              display: 'Action',
              config: {
                ismailConfig: true,
              },
            },
            // {
            //   key: 'mail',
            //   display: 'Mail / Followup / Sms',
            //   config: {
            //     isMail:true,
            //     isFollowup: true,
            //     isSms: true,
            //   },
            // },
          ];
          this.innerColumnHeader =  [
            { key: 'Vehicleid', display: 'VehicleID' },
            { key: 'Registrationnumber', display: 'Registration No' },
            { key: 'Chassisnumber', display: 'Chassis No' },
            { key: 'PolicyTypeDesc', display: 'Policy Type' },
            { key: 'Vehiclemake', display: 'Make' },
            { key: 'Vehcilemodel', display: 'Model' },
            { key: 'OverallPremiumFc', display: 'Premium' },
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
            { key: 'Count', display: 'No.Of.Risk' },
            {
              key: 'actions',
              display: 'Edit',
              config: {
                //isView:true,
                isEdit: true,
                //isReject: true,
              },
            },
            {
              key: 'mail',
              display: 'Action',
              config: {
                ismailConfig: true,
              },
            },
            // {
            //   key: 'mail',
            //   display: 'Mail / Followup / Sms',
            //   config: {
            //     isMail:true,
            //     isFollowup: true,
            //     isSms: true,
            //   },
            // },
          ];
          this.innerColumnHeader =  [
            { key: 'Vehicleid', display: 'VehicleID' },
            { key: 'Registrationnumber', display: 'Registration No' },
            { key: 'Chassisnumber', display: 'Chassis No' },
            { key: 'PolicyTypeDesc', display: 'Policy Type' },
            { key: 'Vehiclemake', display: 'Make' },
            { key: 'Vehcilemodel', display: 'Model' },
            { key: 'OverallPremiumFc', display: 'Premium' },
            // {
            //   key: 'actions',
            //   display: 'Action',
            //   config: {
            //     isEdit: true,
            //   },
            // },
    
          ];
        }
            this.quoteData = data?.Result;
            this.quoteSection = true;
            if(this.referralApprovedSection && this.quoteSection && this.policySection) this.setChartValue();
        }
      },
      (err) => { },
    );
  }
  getPolicyList(){
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
          "Offset":"1000"
   }
    let urlLink = `${this.CommonApiUrl}api/portfolio/active`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5'){
            this.policyHeader =  [
              { key: 'OriginalPolicyNo', display: 'Policy No' },
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'ClientName', display: 'Customer Name' },
              // { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'Premium', display: 'Premium' },
              { key: 'PolicyStartDate', display: 'Start Date' },
              // { key: 'PolicyEndDate', display: 'End Date' },
              
              //{ key: 'ClientName', display: 'Customer Name' },
              // { key: 'CreditNo', display: 'Credit Note No' },
              // { key: 'DebitNoteNo', display: 'Debit Note No' },
              {
                key: 'actions',
                display: 'Action',
                config: {
                  isPolicyConfig: true,
                },
              },
              // {
              //   key: 'edit',
              //   display: 'Vehicle Details',
              //   sticky: false,
              //   config: {
              //     isCollapse: true,
              //     isCollapseName:'Vehicles'
              //   },
              // },
      
            ];
            this.innerColumnHeader =  [
              { key: 'Vehicleid', display: 'VehicleID' },
              { key: 'Registrationnumber', display: 'Registration No' },
              { key: 'Chassisnumber', display: 'Chassis No' },
              { key: 'Vehiclemake', display: 'Make' },
              { key: 'Vehcilemodel', display: 'Model' },
              { key: 'PolicyTypeDesc', display: 'Policy Type' },
              { key: 'OverallPremiumFc', display: 'Premium' },
      
              // {
              //   key: 'actions',
              //   display: 'Schedule',
              //   config: {
              //     isSchedule: true,
              //   },
              // },
      
            ];
          }
          else{
            this.policyHeader =  [
              { key: 'OriginalPolicyNo', display: 'Policy No' },
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Insured Name' },
              { key: 'PolicyStartDate', display: 'Policy Start Date' },
              { key: 'PolicyEndDate', display: 'Policy End Date' },
      
              // { key: 'CreditNo', display: 'Credit Note No' },
              // { key: 'DebitNoteNo', display: 'Debit Note No' },
              {
                key: 'actions',
                display: 'Action',
                config: {
                  isPolicyConfig: true,
                },
              },
              // {
              //   key: 'edit',
              //   display: 'Vehicle Details',
              //   sticky: false,
              //   config: {
              //     isCollapse: true,
              //     isCollapseName:'Vehicles'
              //   },
              // },
      
            ];
          }
            this.policyData = data?.Result;
            this.policySection = true;
            if(this.referralApprovedSection && this.quoteSection && this.policySection) this.setChartValue();
        }
      },
      (err) => { },
    );
  }
  getReferralPendingList(){
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
      "Offset":"1000"
    }
    let urlLink = `${this.CommonApiUrl}api/referralpending`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5'){
            this.referralHeader =  [
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
              {
                key: 'actions',
                display: 'Action',
                config: {
                  isEdit: true,
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
              { key: 'ReferalRemarks', display: 'ReferralRemarks' },
              { key: 'OverallPremiumFc', display: 'Premium' },
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
            this.referralHeader =  [
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Customer Name' },
              { key: 'PolicyStartDate', display: 'Policy Start Date' },
              { key: 'PolicyEndDate', display: 'Policy End Date' },
              { key: 'ReferalRemarks', display: 'ReferralRemarks' },
              {
                key: 'actions',
                display: 'Action',
                config: {
                  isEdit: true,
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
              { key: 'ReferalRemarks', display: 'ReferralRemarks' },
              { key: 'OverallPremiumFc', display: 'Premium' }
            ];
          }
            this.referralPendingList = data?.Result;
        }
      },
      (err) => { },
    );
  }
  getLapsedList(){
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
          "Offset":"1000"
   }
    let urlLink = `${this.CommonApiUrl}api/lapsedquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5'){
            this.lapsedHeader =  [
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Customer Name' },
              {
                key: 'edit',
                display: 'Vehicle Details',
                sticky: false,
                config: {
                  isCollapse: true,
                  isCollapseName:'Vehicles'
                },
              },
              {
                key: 'actions',
                display: 'Active',
                config: {
                  isActive: true,
                },
              },
            ];
            this.innerColumnHeader =  [
              { key: 'Vehicleid', display: 'VehicleID' },
              { key: 'Registrationnumber', display: 'Registration No' },
              { key: 'Chassisnumber', display: 'Chassis No' },
              { key: 'Vehiclemake', display: 'Make' },
              { key: 'Vehcilemodel', display: 'Model' },
              // {
              //   key: 'actions',
              //   display: 'Action',
              //   config: {
              //     isEdit: true,
              //   },
              // },
        
            ];
          }
          else if(this.productId=='4'){
            this.lapsedHeader =  [
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Customer Name' },
              { key: 'PolicyStartDate', display: 'Policy Start Date' },
              { key: 'PolicyEndDate', display: 'Policy End Date' },
              { key: 'Count', display: 'Passengers' },
              {
                key: 'actions',
                display: 'Active',
                config: {
                  isActive: true,
                },
              },
            ];
          }
          else{
            this.lapsedHeader =  [
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Customer Name' },
              { key: 'PolicyStartDate', display: 'Policy Start Date' },
              { key: 'PolicyEndDate', display: 'Policy End Date' },
              { key: 'Count', display: 'No.Of.Risk' },
              {
                key: 'actions',
                display: 'Active',
                config: {
                  isActive: true,
                },
              },
            ];
          }
            this.lapsedQuoteData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  setChartValue(){
    let seriesList = [],labelsList=[];
    if(this.quoteData.length!=0){
      seriesList.push(this.quoteData.length)
      labelsList.push("Quotes");
    }
    if(this.policyData.length!=0){
      seriesList.push(this.policyData.length)
      labelsList.push("Policies");
    }
    if(this.referralList.length!=0){
      seriesList.push(this.referralList.length)
      labelsList.push("Referral Approved");
    }
    this.chartOptions = {
      series: seriesList,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: labelsList,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartSection = true;
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
  onEditExistingQuote(rowData){
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('homeCommonDetails');
    if(this.productId){
      let date = rowData.PolicyStartDate;
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
      let date2 = null;
      if(date!='' && date !=null){
        if(date.split('/').length>1){
          let dates = date.split('/')
          date2 = dates[2]+'-'+dates[1]+'-'+dates[0]
        }
      } 
      if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('quoteNo',rowData.QuoteNo);
        sessionStorage.setItem('updatebar',rowData.QuoteNo);
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

      }
      else{
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
        sessionStorage.removeItem('quoteNo');
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails']);
      }
    }
    // if(this.productId=='4'){
    //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
    //   sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    //   this.router.navigate(['/Travel/customerDetails']);
    // }


  }
  setTabSection(name){this.tabSection=name;}
  onEditAproved(rowData){
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.setItem('QuoteStatus','RA');
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
