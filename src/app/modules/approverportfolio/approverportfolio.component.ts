import { Component, OnInit, Input, Output,OnChanges,AfterViewInit,ViewChild} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../app-config.json';
import { SharedService } from '../../shared/shared.service';
//import {NbDialogService } from '@nebular/theme';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-approverportfolio',
  templateUrl: './approverportfolio.component.html',
  styleUrls: ['./approverportfolio.component.scss'],
})

export class ApproverPortfolioComponent implements OnInit,OnChanges, AfterViewInit{
  
  StartDate:any;minDate:any;TemplateList:any[]=[];EndDate:any;bussinesstype:any;
  branchValue:any;branchList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  insuranceId: any;
  productId: any;
  tableData:any[]=[];
  quoteHeader:any[]=[];
  loginId: any;
  tableData1:any[]=[];
  show:boolean=false;
  quotesHeader:any[]=[];
  enddate: string;
  startDate: string;
  ProductName: string;
  dataSource: any;
  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
  @ViewChild('paginatorSecond') paginatorSecond: MatPaginator;
  BrokerName: any;
  newlogin: any;
  newproductId: any;
  page: any;rowdata:any;
  // @Output('Currency') Currency:any=sessionStorage.getItem('CurrencyidLogin');;
  constructor(private datePipe:DatePipe,public sharedService: SharedService,private router:Router){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
 this.minDate=new Date();
 this.insuranceId = this.userDetails.Result.InsuranceId;
 this.productId = this.userDetails.Result.ProductId;
 this.loginId = this.userDetails.Result.LoginId;
  }
    ngOnInit(): void {
      this.getBranchList('direct');
      
      this.quoteHeader =  [
        { key: 'BrokerName', display: 'Broker' },
        { key: 'SourceType', display: 'Channel' },
        {
          key: 'actions',
          display: 'Count',
          config: {
            isTotalCount:true,
          },
        },
        {
          key: 'edit',
          display: 'Premium',
          config: {
            isPremium:true,
          },
        },
        // { key: 'TotalCount', display: 'Count' },
        // { key: 'TotalPremiumLc', display: 'Premium' },
      ];

      let CustomerObj = JSON.parse(sessionStorage.getItem('datedetails'));
      if(CustomerObj){
     
     this.StartDate=CustomerObj?.StartDate;
     this.EndDate=CustomerObj?.EndDate;
     this.branchValue=CustomerObj?.BranchCode;
     this.bussinesstype=CustomerObj?.Businesstype;

     if(this.StartDate){
      this.StartDate=this.onDateFormatInEdit(this.StartDate);
     }
    else{
      this.StartDate=''
    }
    if(this.EndDate){
      this.EndDate=this.onDateFormatInEdit(this.EndDate);
     }
    else{
      this.EndDate=''
    }
     console.log('PPPPPPPPPPPPPPP',this.StartDate);
      this.getsearchlist(this.bussinesstype);
      console.log( this.StartDate,this.EndDate);
      }
  
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

    getBranchList(type){
      // if(type=='change'){
      //   this.tableData=[];
      //   this.branchValue='';
      // }
      let ReqObj = {
        "InsuranceId":this.insuranceId
    
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.branchList = obj.concat(data?.Result);
          this.getBussinessType('direct');
          //if(!this.branchValue){ this.branchValue = "99999"; this.getVehicleUsage() }
          // let docObj = JSON.parse(sessionStorage.getItem('addVehicle'))
          // if(docObj){ this.branchValue = docObj?.branch;
          //   console.log('LLLLLLLLLL',this.branchValue);
          //      }
          // else{ this.branchValue='99999';}
        }
      },
      (err) => { },
    );
    }


    getBussinessType(type){
      if(type=='change'){
        this.bussinesstype=""
      }
      let ReqObj = {
        "InsuranceId":this.insuranceId,
         "BranchCode": this.branchValue
      }
      let urlLink = `${this.CommonApiUrl}dropdown/adminportfoliotypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          this.TemplateList=data.Result
        }
      },
      (err) => { },
    );
    }
    getsearchlist(bussinesstype){
          if(bussinesstype == 'N' || bussinesstype == 'C' || bussinesstype == 'E'){
            this.geteditList();
          }
          else if(bussinesstype == 'Q'){
            this.getQuotationList();
          }
          let quote={
            "bussinesstype":bussinesstype,
            "startDate":this.StartDate,
            "EndDate":this.EndDate
          }
          console.log('ssssssssss',this.StartDate,this.EndDate)
          sessionStorage.setItem('datedetials',JSON.stringify(quote));
    }
    geteditList(){
      this.tableData=[];
this.startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
this.enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");

      let ReqObj = {
        "InsuranceId":this.insuranceId,
         "BranchCode": this.branchValue,
         "BusinessType":this.bussinesstype,
          "StartDate":this.startDate,
         "EndDate":this.enddate,
         "LoginId":"",
         "ProductId": ""//this.productId
      }
      let urlLink = `${this.CommonApiUrl}api/admin/portfoliodashboard`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          this.tableData=data.Result;
          console.log('KKKKKKKKKK',this.bussinesstype);
          console.log('LLLLLLLLLL',this.tableData);
        }
      },
      (err) => { },
    );
    }
    getQuotationList(){
      this.tableData=[];
      this.startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
      this.enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
            let ReqObj = {
              "InsuranceId":this.insuranceId,
               "BranchCode": this.branchValue,
               "BusinessType":this.bussinesstype,
                "StartDate":this.startDate,
               "EndDate":this.enddate,
               "LoginId":"",
               "ProductId": ""//this.productId,
            }
            let urlLink = `${this.CommonApiUrl}api/admin/portfoliopendings`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              if(data?.Result){
                this.tableData=data.Result;
                console.log('Bussiness Type',this.bussinesstype);
                console.log('Quotation',this.tableData);
              }
            },
            (err) => { },
          );
          }

          onTotal(rowdata,ProductName,ProductId){

              let quoteObj = {
              "ProductId":ProductId,
              "ProductName":ProductName,
              "BusinessType": this.bussinesstype,
               "StartDate":this.startDate,
              "EndDate":this.enddate,
              "BranchCode":this.branchValue,
              "LoginId":rowdata.BrokerLoginId,
              "page":'new',
              "rowData":rowdata
            }
            console.log('PPPPPPPP');
            sessionStorage.setItem('editdetails',JSON.stringify(quoteObj));
            this.router.navigate(['Home/NewDetails']);
            // this.show=true;
          
            // this.ProductName=ProductName;
            // console.log('PPPPPPPPPP',this.ProductName);
            // this.BrokerName=rowdata.BrokerName;
            // this.newlogin=rowdata.BrokerLoginId;
            // // this.newproductId=ProductId;
            // if(this.bussinesstype == 'N' || this.bussinesstype == 'C' || this.bussinesstype == 'E'){
            //   this.quotesHeader=[
            //     // { key: 'BrokerName', display: 'Broker Name' },
            //     { key: 'QuoteNo', display: 'Quote No' },
            //     { key: 'PolicyNo', display: 'Policy No' },
            //     { key: 'PolicyStartDate', display: 'Policy StartDate' },
            //     { key: 'PolicyEndDate', display: 'Policy EndDate' },
            //     {
            //       key: 'edit',
            //       display: 'Premium',
            //       config: {
            //         isPremiums:true,
            //       },
            //     },
            //     {
            //       key: 'actions',
            //       display: 'Action',
            //       config: {
            //         isPolicyConfig: true,
            //       },
            //     },
            //     // {
            //     //   key: 'actions',
            //     //   display: 'Schedule / View',
            //     //   config: {
            //     //     isViews:true,
            //     //     isEdit: true,
                    
            //     //   },
            //     // },
            //     // { key: 'OverallPremiumLc', display: 'Premium' }, 
            //     // { key:'StatusDesc', display:'Status Desc'},
            //     // {key:'UserType',display:'UserType'}
            //   ]
            // }
        
            //   if(this.bussinesstype == 'Q'){
            //   this.quotesHeader=[
            //      {key:'RequestReferenceNo',display: 'Request ReferenceNo' },
            //     // { key: 'BrokerName', display: 'Broker Name' },
            //     { key: 'QuoteNo', display: 'Quote No' },
            //     { key: 'PolicyNo', display: 'Policy No' },
            //     { key: 'PolicyStartDate', display: 'Policy StartDate' },
            //     { key: 'PolicyEndDate', display: 'Policy EndDate' },
            //     // { key: 'OverallPremiumLc', display: 'Premium' }, 
            //     {
            //       key: 'edit',
            //       display: 'Premium',
            //       config: {
            //         isPremiums:true,
            //       },
            //     },
            //     {
            //       key: 'actions',
            //       display: 'Action',
            //       config: {
            //         isPolicyConfig: true,
            //       },
            //     },
            //     // { key:'StatusDesc', display:'Status Desc'},
            //     // {key:'UserType',display:'UserType'}
            //   ]
            // }
            //    console.log('IIIIIIIIII',rowdata);
            //   //  let startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
            //   //  let enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
            //    let ReqObj={
            //     "InsuranceId":this.insuranceId,
            //   "BusinessType": this.bussinesstype,
            //    "StartDate":this.startDate,
            //   "EndDate":this.enddate,
            //   "BranchCode":this.branchValue,
            //   "LoginId":this.newlogin,
            //   "ProductId":ProductId,
            //   "Limit":"0",
            //   "Offset":"1000"
            // }
            // let urlLink = `${this.CommonApiUrl}api/admin/portfoliogrid`;
            // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            //   (data: any) => {
            //     if(data?.Result){
            //       this.tableData1=data.Result;
            //       console.log('Bussiness Type',this.tableData1);
                  
            //     }
            //   },
            //   (err) => { },
            // );
            // let quoteObj = {
            //   "ProductId":ProductId,
            //   "ProductName":this.ProductName,
            //   "BusinessType": this.bussinesstype,
            //    "StartDate":this.startDate,
            //   "EndDate":this.enddate,
            //   "BranchCode":this.branchValue,
            //   "LoginId":rowdata.BrokerLoginId,
            //   "page":'new',
            //   "rowData":rowdata
            // }
            // sessionStorage.setItem('editdetails',JSON.stringify(quoteObj));
            // let quote={
            //   "bussinesstype":this.bussinesstype,
            //   "startDate":this.StartDate,
            //   "EndDate":this.EndDate
            // }
            // sessionStorage.setItem('datedetials',JSON.stringify(quote));
          }

          // ongetBack(){
          //      this.show=false;
          //      let CustomerObj = JSON.parse(sessionStorage.getItem('datedetails'));
          //      let buss=CustomerObj?.bussinesstype;
          //     this.StartDate=CustomerObj?.startDate;
          //     this.EndDate=CustomerObj?.EndDate;
          //      this.getsearchlist(buss,this.productId);
          //      console.log( this.StartDate,this.EndDate);

              
          // }
          ngOnChanges() {
            // this.dataSource = new MatTableDataSource(this.tableData);
            // this.dataSource.paginator = this.paginatorFirst;
          }
           ngAfterViewInit() {
          //  this.dataSource.paginator = this.paginatorFirst;
          //   this.dataSource.paginator = this.paginatorSecond;
           }

           onViews(rowData){
            console.log('OOOOOOOOOOO',rowData);
        
            let quoteObj = {
              "QuoteNo": rowData.QuoteNo,
              "ProductId":rowData.ProductId,
              // "PolicyNo":null,
              // "from":'Existing',
              "CustomerReferenceNo": rowData.CustomerReferenceNo,
              "RequestReferenceNo": rowData.RequestReferenceNo,
              "pageFrom": 'Portfolio',
              "CustomerName":rowData.CustomerName,
              "PolicyNo":rowData.PolicyNo,
              "ProductName":rowData.ProductName,
              //"QuoteNo":rowData.QuoteNo
            }
            //sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
            sessionStorage.setItem('editCustomer',JSON.stringify(quoteObj));
            this.router.navigate(['/Home/MotorDocument']);
           }

           onGetSchedule(rowData){
            let ReqObj = {
              "QuoteNo":rowData.QuoteNo
            }
            let urlLink = `${this.CommonApiUrl}pdf/policyform`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if(data?.Result?.PdfOutFile){
                    this.downloadMyFile(data.Result.PdfOutFile);
                }
                else{
                  Swal.fire({
                    title: '<strong>Schedule Pdf</strong>',
                    icon: 'error',
                    html:
                      `No Pdf Generated For this Policy`,
                    //showCloseButton: true,
                    //focusConfirm: false,
                    showCancelButton: false,
        
                    //confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancel',
                  })
                }
              },
              (err) => { },
            );
          }

          downloadMyFile(data) {
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', data);
            link.setAttribute('download', 'Schedule');
            document.body.appendChild(link);
            link.click();
            link.remove();
          }
 }

