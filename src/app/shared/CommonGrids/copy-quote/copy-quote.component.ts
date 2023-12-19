import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import * as Mydatas from '../../../app-config.json';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-existing-customers',
  templateUrl: './copy-quote.component.html',
  styleUrls: ['./copy-quote.component.scss']
})
export class CopyQuoteComponent implements OnInit {

  searchValue:any[]=[];columnHeader:any []=[];innerColumnHeader:any []=[];
  CopyData:any[]=[];
  dob:any;
  quoteData:any []=[];customerData:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;selectedData:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;SearchList:any;
  public userDetails: any;loginId: any;agencyCode: any;branchCode: any;
  public brokerbranchCode: any;productId: any;insuranceId: any;userType: any;
  customerValue: boolean;
  referenceNo: string;search:any;
  quoteno: any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;

    this.columnHeader =  [
      { key: 'QuoteNo', display: 'Quote No' },
      { key: 'RequestReferenceNo', display: 'Reference No' },
      { key: 'ClientName', display: 'Customer Name' },

      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.columnHeader =  [
      //{ key: 'Registrationnumber', display: 'Registration No' },
        //{ key: 'Vehiclemake', display: 'Make' },
        //{ key: 'Vehcilemodel', display: 'Model' },
        {
          key: 'RequestReferenceNo',
          display: 'Select',
          config: {
            select: true,
          },
        },
        {key:'QuoteNo',display:'QuoteNo'},
        { key: 'CustomerReferenceNo', display: 'Customer Reference No' },
        {key:'SectionName',display:'SectionName'},
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'CreatedBy', display: 'Created By' },

      ];


    /*if(this.productId=='5'){
      this.columnHeader =  [
        {
          key: 'RequestReferenceNo',
          display: 'Select',
          config: {
            select: true,
          },
        },
        { key: 'CustomerReferenceNo', display: 'Customer Reference No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'ClientName', display: 'Client Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        {
          key: 'actions',
          display: 'View',
          config: {
            isEdit: true,
          },
        },

      ];
    }

    if(this.productId!='5'){
      this.columnHeader =  [
        {
          key: 'RequestReferenceNo',
          display: 'Select',
          config: {
            select: true,
          },
        },
        { key: 'CustomerReferenceNo', display: 'Customer Reference No' },
        { key: 'ClientName', display: 'Client Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        {
          key: 'actions',
          display: 'View',
          config: {
            isEdit: true,
          },
        },

      ];
    }*/



    this.getCustomersList();
   }

  ngOnInit(): void {
    let refno = sessionStorage.getItem('customerReferenceNo')
    if (refno){
      this.customerValue=true;
      this.referenceNo = refno;
    }
    console.log('RRRRRRRRRRRRRR',refno);

  }
  getCustomersList(){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode":this.branchCode,
        "ProductId":this.productId,
      }
      let urlLink = `${this.CommonApiUrl}api/dropdown/copyquoteby`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
             this.SearchList = data.Result;
             //this.onCustomerSearch()

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

  onCustomerSearch(){

    if(this.search=='EntryDate'){

      let dob:any = this.datePipe.transform(this.dob, "dd/MM/yyyy");
      this.searchValue=dob;
      //this.onDateFormatInEdit(this.searchValue);
    }
    if(this.searchValue){
      this.customerData = [];
      let appId = "1", loginId = "",brokerbranchCode="";
      let createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = ""
        brokerbranchCode = null;
      }
      let ReqObj = {
        "SearchKey":this.search,
        "SearchValue": this.searchValue,
        "LoginId": loginId,
        "InsuranceId":this.insuranceId,
        "BranchCode":this.branchCode,
        //"BrokerBranchCode":this.brokerbranchCode,
        "ProductId":this.productId,
        "UserType":this.userType,
        "ApplicationId":appId

      }
      let urlLink = `${this.CommonApiUrl}api/searchmotordata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customerData=data.Result;
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
    }
  }
  onSelect(rowData){
    console.log("Select",rowData);
    this.selectedData = rowData;
    console.log('NNNNNNNNNNN',this.selectedData.RequestReferenceNo);

  }
  onCopyQuote(){
    // let appId = "1",loginId="",brokerbranchCode="";
    // if(this.userType!='Broker'){
    //   appId = "1"; loginId = this.loginId;
    //   brokerbranchCode = this.brokerbranchCode;
    // }
    // else{
    //   appId = this.loginId;
    //   brokerbranchCode = null;
    // }

    let ReqObj = {
      "RequestReferenceNo": this.selectedData.RequestReferenceNo,
      //"BrokerBranchCode": this.brokerbranchCode,
      "BranchCode":this.branchCode,
      "InsuranceId": this.insuranceId,
      "LoginId":this.loginId,
      "UserType":this.userType,
      "ProductId":this.productId,
      "ApplicationId":"1",
      "EndtTypeId":"",
      "TypeId":"",
      "QuoteNo":""
    }
    let urlLink = `${this.CommonApiUrl}api/copyquote`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            //this.selectedData = data?.Result;
            console.log(data);
            this.CopyData=data?.Result;
            // let type: NbComponentStatus = 'success';
            //   const config = {
            //     status: type,
            //     destroyByClick: true,
            //     duration: 4000,
            //     hasIcon: true,
            //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //     preventDuplicates: false,
            //   };
            //   //this.vehicleDetailsList = this.vehicleDetailsList.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber);
            //   this.toastrService.show(
            //     'Copy Quote Details',
            //     'Quote Details Copied Successfully from this'+this.selectedData.RequestReferenceNo+'to Refeence No '+data?.Result?.RequestReferenceNo,
            //     config);
                this.router.navigate(['/Home/existingQuotes']);
        }

      },
      (err) => { },
    );
  }


}
