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
  customerheader: any[]=[];
  referralHeaders: any[]=[];
  raTotalRecords: any;
  raSection: any='quote';
  referralAppData: any[]=[];
  startRAIndex: any=0;
  endRAIndex: any=0;
  quoteRAData: any[]=[];
  raPageCount: any=10;
  quoteRAPageNo: number;
  endtRApageNo: number;
  offset: any=60;
  raLimit: any='0';
  totalQuoteRecords: any;
  quotePageCount: number;
  quotePageNo: number;
  startQuoteIndex: number;
  endQuoteIndex: number;
  quoteLimit: any='0';
  totalPolicyRecords: any;
  policyPageCount: any=10;
  startPolicyIndex: number;
  endPolicyIndex: number;
  policyLimit: any='0';
  policyPageNo: number;
  rpLimit: any;
  rpSection: any='quote';
  totalRPRecords: any;
  rpPageCount: number;
  rpQuotePageNo: number;
  rpEndtpageNo: number;
  rpQuoteData: any[]=[];
  startRPIndex: number;
  endRPIndex: number;
  brokerCode:any='';
  brokerCode1:any='';
  brokerList:any[]=[];
  brokerListpolicy:any[]=[];
  brokerCode2:any='';
  brokerListReferral:any[]=[];
  brokerListapproved:any[]=[];
  brokerCode3:any='';
  constructor(private router:Router,private sharedService: SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    if(this.userType!='Issuer')this.brokerCode1 = this.loginId;
    if(this.userType!='Issuer')this.brokerCode2 = this.loginId;
    if(this.userType!='Issuer')this.brokerCode3 = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    this.getReferralApprovedList(null,'change');
    this.getCustomerList();
    
    //this.getQuotesList(null,'change');
    // this.getPolicyList(null,'change');
    this.getLapsedList();
    //this.getReferralPendingList(null,'change');
  }
  ngOnInit() {
    this.getBrokerList();
    this.getPolicyBrokerList();
    this.getBrokerListrp();
    this.getBrokerListapproved();
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
  getReferralApprovedList(element,entryType){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; 
      //loginId = this.loginId;
      loginId = this.brokerCode3;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId = this.brokerCode3;
      brokerbranchCode = null;
    }
    let type=null;
    if(this.raSection=='quote'){type='Q'}
    else type='E';
    let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "Type":type,
          "BdmCode": this.agencyCode,
           "ProductId":this.productId,
           "Limit":this.raLimit,
           "Offset": this.offset
   }
    let urlLink = `${this.CommonApiUrl}api/referralapproved`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.referralHeaders =  [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'ClientName', display: 'Customer Name' },
            { key: 'AdminRemarks', display: 'Remarks' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
          ];
          sessionStorage.removeItem('loadingType');
          if(data.Result?.CustomerDetailsRes){
            if(data.Result?.CustomerDetailsRes.length!=0){
              this.raTotalRecords = data.Result?.TotalCount;
              this.raTotalRecords = data.Result?.TotalCount;
              this.raPageCount = 10;
              if(entryType=='change'){
                this.quoteRAPageNo = 1;
                this.endtRApageNo = 1;
                let startCount = 1, endCount = this.raPageCount;
                startCount = endCount+1;
                if(this.raSection=='quote'){
                  let quoteRAData = data.Result?.CustomerDetailsRes;
                  this.quoteRAData = data.Result?.CustomerDetailsRes;
                  if(quoteRAData.length<=this.raPageCount){
                    endCount = quoteRAData.length
                  }
                  else endCount = this.raPageCount;
                }
                else{
                  this.referralAppData = data.Result?.CustomerDetailsRes;
                  let referralData = data.Result?.CustomerDetailsRes;
                  if(referralData.length<=this.raPageCount){
                    endCount = referralData.length
                  }
                  else endCount =this.raPageCount;
                }
                this.startRAIndex = startCount;this.endRAIndex=endCount;
                console.log("Final Data",this.referralAppData,this.quoteData,this.raSection)
              }
              else{
                
                let startCount = element.startCount, endCount = element.endCount;
                this.raPageCount = element.n;
                startCount = endCount+1;
                if(this.raSection=='quote'){
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.quoteRAData = this.quoteRAData.concat(data.Result?.CustomerDetailsRes);
                }
                else{
                  this.referralAppData = this.referralAppData.concat(data.Result?.CustomerDetailsRes);
                  let referralData = data.Result?.CustomerDetailsRes;
                }
                  if(this.raTotalRecords<=endCount+(element.n)){
                    endCount = this.raTotalRecords
                  }
                  else endCount = endCount+(element.n);
                this.startRAIndex = startCount;this.endRAIndex=endCount;
                console.log("Final Received Data",this.quoteData,this.referralAppData,this.startRAIndex,this.endRAIndex)
              }
              
              let datas = data.Result?.CustomerDetailsRes;
            }
            else{
              this.quoteRAData=[];this.referralAppData=[]}
          }
            //this.quoteData = data?.Result;
            this.referralApprovedSection = true;
            if(this.referralApprovedSection && this.quoteSection && this.policySection) this.setChartValue();
        }
      },
      (err) => { },
    );
  }
  onNextRAData(element){
    this.raLimit = String(Number(this.raLimit)+1);
    this.quoteRAPageNo = this.quoteRAPageNo+1;
    this.endtRApageNo = this.endtRApageNo+1;
    this.startRAIndex = element.startCount;
    this.endRAIndex = element.endCount
    this.getReferralApprovedList(element,'direct');
  }
  onPreviousRAData(element){
    this.raLimit = String(Number(this.raLimit)-1);
    if(this.raSection=='quote'){
      this.quoteRAPageNo = this.quoteRAPageNo-1;
    }
    else{
      this.endtRApageNo = this.endtRApageNo-1;
    }
    this.getReferralApprovedList(element,'direct');
  }
  setRASection(val){this.raSection = val;this.getReferralApprovedList(null,'change')}
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
        this.customerheader =  [
          { key: 'ClientName', display: 'Customer Name' },
          { key: 'PolicyHolderTypeDesc', display: 'Type' },
        ];
          this.customerList = data?.Result;
          
      }

    },
    (err) => { },
  );
  }
  getQuotesList(element,entryType){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; 
      //loginId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
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
           "Limit":this.quoteLimit,
           "Offset":60
   }
    let urlLink = `${this.CommonApiUrl}api/existingquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5' || this.productId=='46'){


            this.quoteHeader =  [
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Customer Name' },
              { key: 'PolicyStartDate', display: 'Start Date' },
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
            { key: 'PolicyStartDate', display: 'Start Date' },
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
            //{ key: 'PolicyEndDate', display: 'Policy End Date' },
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
        if (data.Result?.CustomerDetails) {
          if (data.Result?.CustomerDetails.length != 0) {
            this.totalQuoteRecords = data.Result?.TotalCount;
            this.quotePageCount = 10;
            if (entryType == 'change') {
              this.quotePageNo = 1;
              let startCount = 1, endCount = this.quotePageCount;
              startCount = endCount + 1;
                let quoteData = data.Result?.CustomerDetails;
                this.quoteData = data.Result?.CustomerDetails;
                if (quoteData.length <= this.quotePageCount) {
                  endCount = quoteData.length
                }
                else endCount = this.quotePageCount;
              
              this.startQuoteIndex = startCount; this.endQuoteIndex = endCount;
            }
            else {

              let startCount = element.startCount, endCount = element.endCount;
              this.quotePageCount = element.n;
              startCount = endCount + 1;
                let quoteData = data.Result?.CustomerDetails;
                this.quoteData = this.quoteData.concat(data.Result?.CustomerDetails);
              if (this.totalQuoteRecords <= endCount + (element.n)) {
                endCount = this.totalQuoteRecords
              }
              else endCount = endCount + (element.n);
              this.startQuoteIndex = startCount; this.endQuoteIndex = endCount;
            }
          }
          else {
            this.quoteData = []; 
          }
        }
            this.quoteSection = true;
            if(this.referralApprovedSection && this.quoteSection && this.policySection) this.setChartValue();
        }
      },
      (err) => { },
    );
  }
  onNextQuoteData(element){
    this.quoteLimit = String(Number(this.quoteLimit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startQuoteIndex = element.startCount;
    this.endQuoteIndex = element.endCount
    this.getQuotesList(element,'direct');
  }
  onPreviousQuoteData(element){
    this.quoteLimit = String(Number(this.quoteLimit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getQuotesList(element,'direct');
  }
  onEditQuotes(rowData){
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
  getPolicyList(element,entryType){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; 
      loginId = this.brokerCode1;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
      loginId = this.brokerCode1;
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
          "BdmCode":null,
          //"BdmCode": this.agencyCode,
           "ProductId":this.productId,
          "Limit":this.policyLimit,
          "Offset":this.offset
   }
    let urlLink = `${this.CommonApiUrl}api/portfolio/active`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if(this.productId=='5' || this.productId=='46'){
            this.policyHeader =  [
              { key: 'OriginalPolicyNo', display: 'Policy No' },
              { key: 'QuoteNo', display: 'Quote No' },
              { key: 'ClientName', display: 'Customer Name' },
              // { key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'OverallPremiumLc', display: 'Premium' },
              { key: 'PolicyStartDate', display: 'Start Date' },
              //  { key: 'PolicyEndDate', display: 'End Date' },
              
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
              //{ key: 'RequestReferenceNo', display: 'Reference No' },
              { key: 'ClientName', display: 'Insured Name' },
              {key:'OverallPremiumLc', display:'Premium'},
              { key: 'PolicyStartDate', display: 'Policy Start Date' },
              // { key: 'PolicyEndDate', display: 'Policy End Date' },
      
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
          if (data.Result?.PortfolioList) {
            if (data.Result?.PortfolioList.length != 0) {
              this.totalPolicyRecords = data.Result?.Count;
              this.policyPageCount = 10;
              if (entryType == 'change') {
                this.policyPageNo = 1;
                let startCount = 1, endCount = this.policyPageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.policyData = data.Result?.PortfolioList;
                  if (quoteData.length <= this.policyPageCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.policyPageCount;
                
                this.startPolicyIndex = startCount; this.endPolicyIndex = endCount;
              }
              else {

                let startCount = element.startCount, endCount = element.endCount;
                this.policyPageCount = element.n;
                startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.policyData = this.policyData.concat(data.Result?.PortfolioList);
                if (this.totalPolicyRecords <= endCount + (element.n)) {
                  endCount = this.totalPolicyRecords
                }
                else endCount = endCount + (element.n);
                this.startPolicyIndex = startCount; this.endPolicyIndex = endCount;
              }
            }
            else {
              this.policyData = []; 
            }
          }
            this.policySection = true;
            if(this.referralApprovedSection && this.quoteSection && this.policySection) this.setChartValue();
        }
      },
      (err) => { },
    );
  }
  onNextPolicyData(element){
    this.policyLimit = String(Number(this.policyLimit)+1);
    this.policyPageNo = this.policyPageNo+1;
    this.startPolicyIndex = element.startCount;
    this.endPolicyIndex = element.endCount
    this.getPolicyList(element,'direct');
  }
  onPreviousPolicyData(element){
    this.policyLimit = String(Number(this.policyLimit)-1);
      this.policyPageNo = this.policyPageNo-1;
    this.getPolicyList(element,'direct');
  }
  getReferralPendingList(element,entryType){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1";
      // loginId = this.loginId;
      loginId = this.brokerCode2;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId = this.brokerCode2;
      brokerbranchCode = null;
    }
    let type=null;
      if(this.rpSection=='quote'){type='Q'}
      else type='E';
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
       "Type":type,
       "Limit":this.rpLimit,
       "Offset":this.offset
    }
    let urlLink = `${this.CommonApiUrl}api/referralpending`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5' || this.productId=='46'){
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
          sessionStorage.removeItem('loadingType');
          if(data.Result?.CustomerDetailsRes){
            if(data.Result?.CustomerDetailsRes.length!=0){
              this.totalRPRecords = data.Result?.TotalCount;
              this.rpPageCount = 10;
              if(entryType=='change'){
                this.rpQuotePageNo = 1;
                this.rpEndtpageNo = 1;
                let startCount = 1, endCount = this.rpPageCount;
                startCount = endCount+1;
                if(this.rpSection=='quote'){
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.rpQuoteData = data.Result?.CustomerDetailsRes;
                  if(quoteData.length<=this.rpPageCount){
                    endCount = quoteData.length
                  }
                  else endCount = this.rpPageCount;
                }
                else{
                  this.referralPendingList = data.Result?.CustomerDetailsRes;
                  let referralData = data.Result?.CustomerDetailsRes;
                  if(referralData.length<=this.rpPageCount){
                    endCount = referralData.length
                  }
                  else endCount =this.rpPageCount;
                }
                this.startRPIndex = startCount;this.endRPIndex=endCount;
                console.log("Final Data",this.referralPendingList,this.quoteData,this.rpSection)
              }
              else{
                
                let startCount = element.startCount, endCount = element.endCount;
                this.rpPageCount = element.n;
                startCount = endCount+1;
                if(this.rpSection=='quote'){
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.rpQuoteData = this.rpQuoteData.concat(data.Result?.CustomerDetailsRes);
                }
                else{
                  this.referralPendingList = this.referralPendingList.concat(data.Result?.CustomerDetailsRes);
                  let referralData = data.Result?.CustomerDetailsRes;
                }
                  if(this.totalRPRecords<=endCount+(element.n)){
                    endCount = this.totalRPRecords
                  }
                  else endCount = endCount+(element.n);
                this.startRPIndex = startCount;this.endRPIndex=endCount;
              }
              
              let datas = data.Result?.CustomerDetailsRes;
            }
            else{
              this.rpQuoteData=[];this.referralPendingList=[]}
          }
              //this.quoteData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onNextRPData(element){
    this.rpLimit = String(Number(this.rpLimit)+1);
    this.rpQuotePageNo = this.rpQuotePageNo+1;
    this.rpEndtpageNo = this.rpEndtpageNo+1;
    this.startRPIndex = element.startCount;
    this.endRPIndex = element.endCount
    this.getReferralPendingList(element,'direct');
  }
  onPreviousRPData(element){
    this.rpLimit = String(Number(this.rpLimit)-1);
    if(this.rpSection=='quote'){
      this.rpQuotePageNo = this.rpQuotePageNo-1;
    }
    else{
      this.rpEndtpageNo = this.rpEndtpageNo-1;
    }
    this.getReferralPendingList(element,'direct');
  }
  setRPSection(val){this.rpSection = val;
    //this.getBrokerListrp();
    this.getReferralPendingList(null,'change')
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
          if(this.productId=='5' || this.productId=='46'){
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
        height: 200,
        type: "pie"
      },
      labels: labelsList,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
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
  getBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getQuotesList(null,'change');
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getQuotesList(null,'change');
          }
        }
        
      },
      (err) => { },
    );

  }
  getPolicyBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; 
      loginId = this.brokerCode1;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode1;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/portfoliobrokerdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = [];
          this.brokerListpolicy = defaultObj.concat(data.Result);
          if(this.brokerListpolicy.length==0){this.brokerCode1 = ''; this.brokerListpolicy = []}
          else this.brokerCode1= this.loginId;
          if(this.brokerCode1!=null && this.brokerCode1!=''){
            if(!this.brokerListpolicy.some(ele=>ele.Code==this.brokerCode1)) this.brokerCode1 = this.brokerListpolicy[0].Code;
            this.getPolicyList(null,'change');
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getPolicyList(null,'change');
          }
        }
        
      },
      (err) => { },
    );

  }

  getBrokerListrp(){
    let type=null;
    if(this.rpSection=='quote'){type='Q'}
    else type='E';
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode2;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Type": type
    }
  let urlLink = `${this.CommonApiUrl}api/referralpendingsdropdown`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
        let defaultObj = []
          this.brokerListReferral = defaultObj.concat(data.Result);
          if(this.brokerListReferral.length==0){this.brokerCode2 = ''; this.brokerListReferral = [];this.rpQuoteData=[];}
          else this.brokerCode2 = this.loginId;
          if(this.brokerCode2!=null && this.brokerCode2!=''){
            if(!this.brokerListReferral.some(ele=>ele.Code==this.brokerCode2)) this.brokerCode2 = this.brokerListReferral[0].Code;
            this.getReferralPendingList(null,'change');
          }
          else{
            this.brokerCode2 = this.brokerListReferral[0].Code;
            this.getReferralPendingList(null,'change');
          }
      }
      
    },
    (err) => { },
  );

  }
  getBrokerListapproved(){
    let type=null;
    if(this.raSection=='quote'){type='Q'}
    else type='E';
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode3;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Type": type
    }
  let urlLink = `${this.CommonApiUrl}api/referralapproveddropdown`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let defaultObj = []
          this.brokerListapproved = defaultObj.concat(data.Result);
          if(this.brokerListapproved.length==0){this.brokerCode3 = ''; this.brokerListapproved = []}
          else this.brokerCode3 = this.loginId;
          if(this.brokerCode3!=null && this.brokerCode3!=''){
            if(!this.brokerListapproved.some(ele=>ele.Code==this.brokerCode3)) this.brokerCode3 = this.brokerListapproved[0].Code;
            this.getReferralApprovedList(null,'change');
          }
          else{
            this.brokerCode3 = this.brokerListapproved[0].Code;
            this.getReferralApprovedList(null,'change');
          }
      }
      
    },
    (err) => { },
  );

  }

}
