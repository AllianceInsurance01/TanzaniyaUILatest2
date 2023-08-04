import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../app-config.json';


@Component({
  selector: 'app-MotorDocuments',
  templateUrl: './MotorDocuments.component.html',
  styleUrls: ['./MotorDocuments.component.scss']
})

export class MotorDocumentsComponent implements OnInit {
  vech:any;
  s:any;
  userDetails: any;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  userType: any;
  insuranceId: any;
  quoteHeader:any[]=[];
  customerData:any[]=[];
  innerColumnHeader:any[]=[];
  innerTableData:any[]=[];
  search: any;
  searchValue: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;selectedData:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  customerInfo:any[]=[];
  ReferenceNo: any;
  quoteNo: any;
  ViewRisk:any[]=[];
  RatingInfo:any[]=[];
  PremiumInfo:any[]=[];
  ColumnHeader:any[]=[];
  DriverInfo:any[]=[];
  RopVechileDetails:any;
  vechileHeader:any[]=[];
  VechileColumnHeader:any[]=[];
  PaymentInfo:any[]=[];
  DocumentInfo:any[]=[];
  CommonDoc:any[]=[];
  Currency:any;
  OverallPremiumFc: any;
  pass: boolean;
  pageFrom: any;


  constructor(public router:Router,private sharedService: SharedService){

   this.s= sessionStorage.getItem('Status')
 this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      // this.productId = this.userDetails.Result.ProductId;
      this.userType = this.userDetails?.Result?.UserType;
      this.insuranceId = this.userDetails.Result.InsuranceId;

      this.quoteHeader =  [
          
        /*{
             key: "more",
             display: "",
             config: {
               isMoView: true,
               actions: ["VIEW"]
             }
           },*/
           {
            key: "more",
            display: "",
            config: {
              isMoreView: true,
              actions: ["EdIT"]
            }
          },
         { key: 'SectionName', display: 'Section Name' },
         { key: 'CoverName', display: 'Cover Name' },
         { key: 'SumInsured', display: 'Sum Insured' },
         { key: 'Rate', display: 'Rate(%)' },
         { key: 'ExcessAmount', display: 'Excess(%)' },
         { key: 'PremiumBeforeDiscount', display: 'Excess Amount' },
         { key: 'PremiumAfterDiscount', display: 'After Discount' },
         { key: 'PremiumIncludedTax', display: 'IncludedTax' },
         //{key:'TaxAmount',display:'TaxAmount'},
         //{key:'TaxDesc',display:'TaxDesc'},
         //{key:'TaxCalcType',display:'TaxCalcType'}
        

       ];

       this.ColumnHeader=[
        {
          key: "more",
          display: "",
          config: {
            isMoView: true,
            actions: ["VIEW"]
          }
        },
      { key: 'SectionName', display: 'Section Name' },
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'SumInsured', display: 'Sum Insured' },
      { key: 'Rate', display: 'Rate(%)' },
      { key: 'ExcessAmount', display: 'Excess(%)' },
      { key: 'PremiumBeforeDiscount', display: 'Excess Amount' },
      { key: 'PremiumAfterDiscount', display: 'After Discount' },
      { key: 'PremiumIncludedTax', display: 'IncludedTax' },
       ]

    
       /*this.innerColumnHeader=[
        { key: 'SubCoverName', display: 'SubCover Name' },
        { key: 'Rate', display: 'Rate' },
        { key: 'Minimum', display: 'Minimum' },
        { key: 'AfterDiscount', display: 'After Discount' },
        { key: 'IncludedTax', display: 'Included Tax' },

    ];*/
    this.innerColumnHeader=[
      { key: 'TaxId', display: 'Tax Id' },
      { key: 'TaxRate', display: 'TaxRate' },
      { key: 'TaxAmount', display: 'TaxAmount' },
      { key: 'TaxDesc', display: 'Tax Description' },
      {key:'TaxCalcType',display:'TaxCalcType'},
      {key:'IsTaxExtempted',display:'IsTaxExtempted'},
      {key:'TaxExemptType',display:'TaxExempt Type'},
      {key:'TaxExemptCode',display:'Tax ExemptCode'},
  


    ]

    this.vechileHeader=[
      {
        key: "more",
        display: "More View",
        config: {
          isMoreVechView: true,
          actions: ["VIEW"]
        }
      },
      /*{
        key: 'actions',
        display: 'View',
        config: {
          isView:true,
        },
      },*/
    { key:'RequestReferenceNo', display:"Request ReferenceNo"},  
    { key: 'QuoteNo', display: 'Quote No' },
    {key:'CustomerId',display:'CustomerId' },
    { key: 'PolicyNo', display: 'Policy No' },
    { key: 'PolicyTypeDesc', display: 'PolicyTypeDesc' },
    { key: 'InsuranceTypeDesc', display: 'InsuranceType' },
    { key: 'VehiclemakeDesc', display: 'Make' },
    { key: 'VehcilemodelDesc', display: 'Model' },
    { key: 'QuatationDate', display: 'QuatationDate' },
    //{key:'Chassisnumber',display:'Chassis Number' },
    /*{
      key: 'actions',
      display: 'View',
      config: {
        isView:true,
      },
    },*/
    //{key:'Promocode'}
    
    ];
    
    this.VechileColumnHeader=[
      { key: 'Registrationnumber', display: 'Registrationnumber' },
      { key: 'SumInsured', display: 'SumInsured' },
      { key: 'MotorCategoryDesc', display: 'MotorCategory' },
      { key: 'SeatingCapacity', display: 'Seats' },
      { key: 'ManufarectuYear', display: 'ManufactureYear' },
      {key:'EngineNumber',display:'EngineNumber'},
      {key:'FuelTypeDesc',display:'FuelType'},
      {key:'HavePromoCode',display:'HavePromoCode'},
      {key:'Promocode',display:'Promocode'}
      //{key:'RegistrationYear',display:'RegistrationYear'},

  ];
 

  }
    ngOnInit(): void {
      /*this.quoteHeader =  [
          
        {
             key: "more",
             display: "MORE VIEW",
             config: {
               isMoreView: true,
               actions: ["VIEW"]
             }
           },
         { key: 'SectionName', display: 'Section Name' },
         { key: 'CoverName', display: 'Cover Name' },
         { key: 'CustomerName', display: 'Customer Name' },
         { key: 'SumInsured', display: 'Sum Insured' },
         { key: 'Rate', display: 'Rate(%)' },
         { key: 'Excess', display: 'Excess' },
         { key: 'ExcessAmount', display: 'Excess Amount' },
         { key: 'AfterDiscount', display: 'After Discount' },
         { key: 'IncludedTax', display: 'Included Tax' },
        

       ];*/
       let CustomerObj = JSON.parse(sessionStorage.getItem('editCustomer'));
            
        
       this.search=CustomerObj?.Search;
       this.searchValue=CustomerObj.SearchValue;
       this.quoteNo=CustomerObj.QuoteNo;
       this.ReferenceNo=CustomerObj.RequestReferenceNo;
       this.pageFrom = CustomerObj?.pageFrom;
       this.productId=CustomerObj.ProductId;

       console.log('sssssssssss',this.search)
            
           if(this.quoteNo){
            this.onRisk();
            this.onPremium();
            this.DriverDetails();
            this.VechileTira();
            this.payment();
            this.Documentview();
            this.onCustomerSearch();
           }

           if(this.ReferenceNo){
            this.onRating()
           }
      //  if(this.searchValue){
      //    this.onCustomerSearch();
      //  }
 

       this.customerData=[{
         "SectionName":"VISN10018954",
           "CoverName":"Wind Cover",
           "Status":"Y",
           "MotorList":[{
             "BrokerCode": "10065",
             "LoginId": "broker71",
           }]
     },
     {
       "SectionName":"VFGDSA89765",
         "CoverName":"Motor Vechile Cover",
         "Status":"No",
         "MotorList":[{
           "BrokerCode": "10065",
           "LoginId": "broker71",
         }]
   },
     ];


    
     /*this.innerColumnHeader=[
         { key: 'PolicyType', display: 'Policy Type' },
         { key: 'PolicyStartDate', display: 'Policy StartDate' },
         { key: 'VechileType', display: 'VechileType' },
         { key: 'Premium', display: 'Premium' },
         { key: 'QuoteDate', display: 'Quote Date' },
         { key: 'EffectiveDate', display: 'Effective Date' },
           /*{
             key: 'actions',
             display: 'Edit',
             config: {
             isEdit: true,
             },
           },
    
     ];*/

     this.innerTableData= [
           
         {
             "PolicyType":"PrivateComprehensive",
               "PolicyStartDate":"31/01/2023",
               "VechileType":"Private"
 
         },
     ];
    
        console.log('jjjjjjjjjjj',this.innerTableData)


    }
    back(){
      sessionStorage.removeItem('editCustomer')
      if(this.pageFrom=='search'){
        sessionStorage.setItem('search',this.search);
        sessionStorage.setItem('searchVaue',this.searchValue);
        this.router.navigate(['/Home/search']);
      } 
      else if(this.pageFrom=='policy'){ this.router.navigate(['Home/policies'])}
      else if(this.pageFrom == 'Existing') { this.router.navigate(['/Home/existingQuotes'])}
      else if(this.pageFrom =='Portfolio') { this.router.navigate(['Home/ApproverPortfolio'])}
    }

    onViews(row:any){
      this.pass=true;
     // this.router.navigate(['/Home/MotorDocument/VechileCustomer']);
      let quoteObj = {
        "QuoteNo": row.QuoteNo,
        "PolicyNo":null,
        "from":'Existing',
        "CustomerReferenceNo": row.CustomerReferenceNo,
        "RequestReferenceNo": row.RequestReferenceNo,
        //"QuoteNo":rowData.QuoteNo
      }
      sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
    }

    onRisk(){
  
      let ReqObj ={
        "ApplicationId": null,
        "BranchCode": null,
        "CustomerCode": null,
        "InsuranceId": this.insuranceId,
        "LoginId": null,
        "MotorCategory": null,
        "RequestReferenceNo": null,
        "SearchKey": null,
        "SearchValue": null,
        "UserType": null,
        "VehicleMake": null,
        "VehicleModel": null,
        "VehicleType": null,
        "QuoteNo":this.quoteNo,
        "ProductId":this.productId,
      }
      let urlLink = `${this.CommonApiUrl}api/adminviewriskdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result?.RiskDetails){
              this.ViewRisk=data?.Result.RiskDetails;

              console.log('mmmmmmmmmm',this.ViewRisk)
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
    }
    onCustomerSearch(){
    
      let app
         if(this.userType == 'Issuer'){
           app=this.loginId
         }
         else{
           app="1"
         }
         //if(this.searchValue){
           //this.customerData = [];
           let ReqObj = {
            "ApplicationId": app,
            "QuoteNo":this.quoteNo,
            "ProductId":this.productId,
            "LoginId": this.loginId,
            "BranchCode": null,
            "CustomerCode": null,
            "InsuranceId": this.insuranceId,
            "MotorCategory": null,
            "RequestReferenceNo": null,
            "SearchKey": null,
            "SearchValue": null,
            "UserType": null,
            "VehicleMake": null,
            "VehicleModel": null,
            "VehicleType": null
     
           }
           let urlLink = `${this.CommonApiUrl}api/adminviewcustomerdetails`;
           this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
             (data: any) => {
               console.log(data);
               if(data?.Result){
                   this.customerInfo=data?.Result;

                   console.log('kkkkkkkkk',this.customerInfo)
                   //this.quoteno=data.Result.QuoteNo
     
     
               }
     
             },
             (err) => { },
           );
         //}
       }


       onRating(){
        let ReqObj={
          "ApplicationId": null,
          "BranchCode": null,
          "CustomerCode": null,
          "InsuranceId": this.insuranceId,
          "LoginId": null,
          "MotorCategory": null,
          "SearchKey": null,
          "SearchValue": null,
          "UserType": null,
          "VehicleMake": null,
          "VehicleModel": null,
          "VehicleType": null,
          "QuoteNo": this.quoteNo,
          "RequestReferenceNo":this.ReferenceNo,
           "ProductId":this.productId
        }
        let urlLink = `${this.CommonApiUrl}api/adminviewratingdetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data?.Result){

              //let obj = [{SubCovers:[{SubCoverName:"CoverDescription"}],CoverName:"Wind"}];
                //this.RatingInfo=obj.concat(data?.Result[0].CoverList);
                this.RatingInfo=data?.Result[0].CoverList;
                this.Currency=data.Result[0].Currency;
                this.OverallPremiumFc=data.Result[0].OverallPremiumFc;
                console.log('RAAAAAAAAAAA',this.RatingInfo)
                //this.quoteno=data.Result.QuoteNo
  
  
            }
  
          },
          (err) => { },
        );
       }


       onPremium(){
        let ReqObj={
          "QuoteNo":this.quoteNo,
           "ProductId":this.productId
        }
        let urlLink = `${this.CommonApiUrl}api/adminviewpremiumdetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data?.Result.CoverId){
                this.PremiumInfo=data?.Result?.CoverId;
                this.Currency=data.Result?.CoverId.Currency;
                console.log('PREEEEEEEEEEEEEEE',this.PremiumInfo)
                //this.quoteno=data.Result.QuoteNo
  
  
            }
  
          },
          (err) => { },
        );
       }


       onInnerData(rowData:any){
        console.log('jjjjjjjjjj',rowData)
        rowData.MotorList = rowData.SubCovers

        console.log('SYYYYYYYYYYY',rowData.MotorList)
   
       }
       onInnerpremiumData(rowData:any){
        console.log('llllllllllllllllll',rowData.MotorList)
        rowData.MotorList =[{
          "TaxId": rowData.TaxId,
          "TaxRate": rowData.TaxRate,
          "TaxAmount": rowData.TaxAmount,
          "TaxDesc": rowData.TaxDesc,
          "TaxCalcType": rowData.TaxCalcType,
          "IsTaxExtempted":rowData.IsTaxExtempted,
          "TaxExemptType": rowData.TaxExemptType,
          "TaxExemptCode": rowData.TaxExemptCode
          }];
   
       }


       vechileInnerdata(rowData:any){
        this.pass=true;
        console.log('vvvvvvvvvv',rowData)
        rowData.MotorList =[{
        "Registrationnumber":rowData.Registrationnumber,
           'SumInsured':rowData.SumInsured,
          'MotorCategoryDesc': rowData.MotorCategoryDesc,
         'SeatingCapacity':rowData.SeatingCapacity,
         'ManufactureYear':rowData.ManufactureYear,
        'EngineNumber':rowData.EngineNumber,
         'FuelTypeDesc':rowData.FuelTypeDesc,
         'HavePromoCode':rowData.HavePromoCode,
         'Promocode':rowData.Promocode
    
        }];
       }


       DriverDetails(){
    
        let ReqObj={
          "QuoteNo":this.quoteNo,
           "ProductId":this.productId
        }
        let urlLink = `${this.CommonApiUrl}api/adminviewropdriverdetails`;
       
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data?.Result){
  
                this.DriverInfo=data?.Result.DriverDetails;

                console.log('DriverInformation',this.DriverInfo)
                //this.quoteno=data.Result.QuoteNo
  
  
            }
  
          },
          (err) => { },
        );
       }


       
       VechileTira(){
    
        let ReqObj={
          "QuoteNo":this.quoteNo,
           "ProductId":this.productId
        }
        let urlLink = `${this.CommonApiUrl}api/adminviewropvehicledetails`;
       
       
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data?.Result){
  
                this.RopVechileDetails=data?.Result?.VehicleDetails;

                console.log('RopInformation',this.RopVechileDetails)
                //this.quoteno=data.Result.QuoteNo
  
  
            }
  
          },
          (err) => { },
        );
       }

payment(){

  let ReqObj={
    "QuoteNo":this.quoteNo,
     "ProductId":this.productId
  }
  let urlLink = `${this.CommonApiUrl}api/adminviewpaymentinfo`;
 
 
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data?.Result){

          this.PaymentInfo=data?.Result;

          console.log('PaymentInfo',this.PaymentInfo);
          //this.quoteno=data.Result.QuoteNo


      }

    },
    (err) => { },
  );
}

Documentview(){
 
  let ReqObj={
    "QuoteNo": this.quoteNo,
    "ProductId":this.productId
  }
  let urlLink = `${this.CommonApiUrl}api/viewdocumentdetails`;
  //http://192.168.1.91:8086/dropdown/viewdocumentdetails

 
 
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data?.Result){
            
        if(data.Result.IndividualDocumentRes){
          this.DocumentInfo=data?.Result?.IndividualDocumentRes;
          console.log('Document Info',this.DocumentInfo);
        }

        if(data.Result.CommonDocumentRes){
          this.CommonDoc=data?.Result?.CommonDocumentRes;
        }
          
          // this.CommonDoc=data?.Result?.CommonDocumentRes;
          //this.quoteno=data.Result.QuoteNo


      }

    },
    (err) => { },
  );
}


onListDocumentDownload(vehicleIndex,doc){
  let ReqObj = {
    "DocumentId": doc.DocumentId,
    "DocumentReferenceNo":String(doc.DocumentReferenceNumber),
    "Id":doc.Id,
    //"Id":"0",
    "QuoteNo": this.quoteNo
  }
  let urlLink = `${this.ApiUrl1}document/getoriginalimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', data?.Result?.ImgUrl);
      link.setAttribute('download', data?.Result?.filePathOrginal);
      document.body.appendChild(link);
      link.click();
      link.remove();
  },
    (err) => { },
  );
}

}
