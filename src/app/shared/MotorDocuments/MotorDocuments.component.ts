import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../app-config.json';
import { MatDialog } from '@angular/material/dialog';
// import { CoverDetailsComponent } from '../cover-details/cover-details.component';
import { CoverDetailsComponent } from 'src/app/modules/Quote/update-customer-details/Components/cover-details/cover-details.component';
import { ViewDocumnetDetailsComponent } from '../view-documnet-details/view-documnet-details.component';


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
  CyberItem:any[]=[];
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
  chhassisno: any;
  index: any;
  sectionnameopted: any;
  sectionnamenonopted: any;
  CustomerName: any;
  PolicyNo: any;
  ProductName: any;
  historyRecords:any[]=[];
  passengerName: any;
  History:any[]=[];
  accessoriesList:any[]=[];
  chassislist:any[]=[];
  buildingDetails:any[]=[];
  Cotentrisk:any[]=[];
  PersonalAccident:any[]=[];
  PersonalIntermediary:any[]=[];
  employeeList:any[]=[];fidelityList: any[]=[];
  pa:Number=1;
  fa:Number=1;
  all:Number=1;
  Allrisk:any[]=[];
  machineries:any[]=[];
  LocationList:any[]=[];
  borrowerList:any[]=[];
  moneydetails:any[]=[];
  curency: any;MechineryInfo:any;

  constructor(public router:Router,private sharedService: SharedService,public dialogService: MatDialog){

   this.s= sessionStorage.getItem('Status')
 this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      // this.productId = this.userDetails.Result.ProductId;
      this.userType = this.userDetails?.Result?.UserType;
      this.insuranceId = this.userDetails.Result.InsuranceId;
          this.History=[
            {
                "RequestId": "EWAY1690539843418",
                "Status": "Y",
                "AcknowledgementId": "202307281324040155084",
                "RequestStatusCode": "TIRA001",
                "RequestStatusDesc": "Successful",
                "RequestFilePath": "/home/ewayportal/commonpath/EwayPortal/PushPolicy/BAVFE85CGFSY02451/REQ 2023-07-28T10-24-04.179.txt",
                "ResponseFilePath": "/home/ewayportal/commonpath/EwayPortal/PushPolicy/BAVFE85CGFSY02451/RES 2023-07-28T10-24-04.179.txt",
                "Acknowledgement": {
                    "ResponseId": "202307281324040155084",
                    "Status": "Y",
                    "ResponseStatusCode": "TIRA001",
                    "RequestStatusDesc": "Successful",
                    "RequestFilePath": "/home/ewayportal/commonpath/EwayPortal/PushPolicy/BAVFE85CGFSY02451/REQ 2023-07-28T10-24-08.488.txt",
                    "ResponseFilePath": "/home/ewayportal/commonpath/EwayPortal/PushPolicy/BAVFE85CGFSY02451/RES 2023-07-28T10-24-08.488.txt"
                }
            }
        ];
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
       this.productId=CustomerObj?.ProductId;
       this.CustomerName=CustomerObj?.CustomerName
       this.PolicyNo=CustomerObj?.PolicyNo
       this.ProductName=CustomerObj?.ProductName;
       this.curency=CustomerObj?.Currency;

       console.log('sssssssssss',this.search)
            
           if(this.quoteNo){
            this.onPremium();
            this.VechileTira();
            this.payment();
            this.Documentview();
            this.onCustomerSearch();
            this.getallriskDetails();
           }
           if(this.productId!='42'){
            this.getbuilding();
           }
           if(this.productId == '39'){
            this.getmachinerydetails();
           }

           if(this.productId =='5' && this.quoteNo){
            this.onRisk();
            this.getDriverDetails();
            this.getAccessories();
            // this.getBorrowerList();
           }
           if(this.productId =='4' && this.ReferenceNo){
            this.onTravelRisk();
           }
           if(this.productId =='3' && this.ReferenceNo){
            this.onDomesRisk();
            this.getContentDetails();
            this.getPersonalAccidentDetails();
            this.getPersonalIntermediaryDetails();
           }
           if(this.productId =='16'){
            this.getMoneyDetails();
           }

           if(this.ReferenceNo){
            this.onRating()
           }
           if(this.quoteNo){
            if(this.productId=='14' || this.productId=='32'){
              this.getEmployeeDetails();
            }
            if(this.productId=='42'){
              this.getCyberDetails();
            }
            this.getMachineryRisk();
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
      else if(this.pageFrom =='Portfolio') { this.router.navigate(['Home/NewDetails']);
    sessionStorage.setItem('Dates','new')}
    }
    getCyberDetails(){
      let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
      let ReqObj = {
        "QuoteNo":this.quoteNo,
        "SectionId":'30' //this.item[0]
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          if(res.Result){
            if (res.Result.ContentRiskDetails) {
             if(res.Result.ContentRiskDetails.length!=0){
                this.CyberItem = res.Result.ContentRiskDetails;
             }
            }
          }
        })
    }
    getbuilding() {
      let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
      let ReqObj = {
        "QuoteNo": this.quoteNo,
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;let i=0;
          if (res.Result.length!= 0) {
          this.buildingDetails= res.Result;      
          if(this.buildingDetails.length!=0){
            for(let entry of this.buildingDetails){
              this.LocationList.push({ "Code": String(i + 1), "CodeDesc": entry.LocationName });
              console.log('NNNNNNNNNNNN',this.LocationList);
              i+=1;
            }
            
          }

        
          }
        })
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
    onDomesRisk(){
      console.log('ReferenceNo',this.ReferenceNo)
      let ReqObj ={
        "RequestReferenceNo": this.ReferenceNo,
      }
      let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.ViewRisk=data?.Result;
              console.log('mmmmmmmmmm',this.ViewRisk);
          }

        },
        (err) => { },
      );
    }
    onTravelRisk(){
      console.log('ReferenceNo',this.ReferenceNo)
      let ReqObj ={
        "RequestReferenceNo": this.ReferenceNo,
        "TravelId": "1"
      }
      let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.ViewRisk=data?.Result;

              if(this.ViewRisk?.length!=0){
                this.onTravelRiskPassenger();
              }
              console.log('Travel Passenger',this.ViewRisk)
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
    }
    passnger(type){
      console.log('Passsssssss',type)
this.passengerName=type;
 
    }

    onTravelRiskPassenger(){
      console.log('ReferenceNo',this.ReferenceNo)
      let ReqObj ={
        "QuoteNo": this.quoteNo,
      }
      //let urlLink = `${this.motorApiUrl}api/getallpasshistorydetails`;
      let urlLink = `${this.motorApiUrl}api/getactiverpassengers`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.historyRecords=data?.Result;
              console.log('Recordesssss',this.historyRecords);
              this.passnger(this.historyRecords[0]?.PassengerName);
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
    }


    viewplanBenifits(plantype,SectionId) {
      let ReqObj = {
        "PlanTypeId":plantype,
        //"PolicyTypeId":this.TravelForm.controls[''].value,
        //"PolicyTypeId":this.TravelForm.controls['PlanTypeId'].value,
        "PolicyTypeId":SectionId
      }
      let urlLink = `${this.motorApiUrl}api/gettravelpolicytype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            const dialogRef = this.dialogService.open(CoverDetailsComponent, {
              data: {
                titles: 'travel PolicyDetails',
                benefitList: data.Result
              }
            });
  
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
          }
        },
  
        (err) => { },
      );
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
              this.ChasNo(this.ViewRisk,this.ViewRisk[0].Chassisnumber,'1');
              console.log('mmmmmmmmmm',this.ViewRisk)
              //this.quoteno=data.Result.QuoteNo
          }

        },
        (err) => { },
      );
    }
    getmachinerydetails(){
      let ReqObj ={
          "RequestReferenceNo":this.ReferenceNo,
          "RiskId": "1",
          "SectionId": "41"
      }
      let urlLink = `${this.motorApiUrl}api/slide9/getmachinerybreakdown`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.MechineryInfo=data?.Result;
              console.log('kkkkkkkkk',this.customerInfo)
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
       ChasNo(rowData,type,i){
         this.chhassisno=type
         this.index=i;
         console.log('OOOOOOOOOO',rowData);
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
                this.sectionnamenonopted=this.RatingInfo[0]?.SectionName;
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
          "RequestReferenceNo":this.ReferenceNo,
           "ProductId":this.productId
        }
        let urlLink = `${this.CommonApiUrl}api/view/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data?.Result){
           
                this.PremiumInfo=data?.Result;
                this.sectionnameopted=this.PremiumInfo[0]?.SectionName;
                this.Currency=this.PremiumInfo[0].Currency;
                console.log('PREEEEEEEEEEEEEEE',this.PremiumInfo);
                if(data.Result.length!=0){
                  let i=0;
                 for(let s of data.Result){
                  let risk=s?.RiskDetails;
                  console.log('RiskDetails',risk);
                  let j=0;
                     if(risk.length!=0){
                      this.chassislist.push({ "Code": String(i + 1), "CodeDesc": risk.Chassisnumber});
                      console.log('Chasiissss List',this.chassislist);
                      // for(let g of risk){
                      //   this.chassislist.push({ "Code": String(i + 1), "CodeDesc": g.Chassisnumber});
                      //   console.log('Chasiissss List',this.chassislist);
                      //   j+=1;
                      // }
                     }
                    i+=1;
                 }
                }
                
                //this.quoteno=data.Result.QuoteNo
  
  
            }
  
          },
          (err) => { },
        );
       }


       getMoneyDetails(){
        let sectionId = null;
        sectionId='42';
        let ReqObj = {
          "RequestReferenceNo": this.ReferenceNo,
          "RiskId": "1",
          "SectionId":  sectionId
        }
        let urlLink = `${this.motorApiUrl}api/slide10/getmoneydetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              this.moneydetails = data?.Result;
              // this.productItem.MoneySafeLimit=details?.MoneySafeLimit;
              // this.productItem.MoneyOutofSafe=details?.MoneyOutofSafe;
              // this.productItem.MoneyDirectorResidence=details?.MoneyDirectorResidence;
              // this.productItem.MoneyCollector=details?.MoneyCollector;
              // this.productItem.MoneyAnnualEstimate=details?.MoneyAnnualEstimate;
              // this.productItem.MoneyMajorLoss=details?.MoneyMajorLoss;
            }
          },
          (err) => { },
        );
      }

       getDriverName(Id){
        let DriverList=[];
        DriverList.push({ "Code":"1", "CodeDesc": "Owner"},
        { "Code":"2", "CodeDesc": "Driver"});
        let entry = DriverList.find(ele=>ele.Code==Id);
        if(entry){
          return entry.CodeDesc;
        }
       }
       getLocationName(Id){
        let entry = this.chassislist.find(ele=>ele.Code==Id);
        if(entry){
          return entry.CodeDesc;
        }
      }
      getLocationNames(Id){
        let entry = this.LocationList.find(ele=>ele.Code==Id);
        if(entry){
          return entry.CodeDesc;
        }
      }
      getDriverDetails(){
        let ReqObj = {
          "QuoteNo": this.quoteNo
        }
        let urlLink = `${this.motorApiUrl}api/getmotordrivers`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result){
               this.DriverInfo= data.Result;
               console.log("License List ",this.DriverInfo)
            }
          },
          (err) => { },
        );
      }

      getContentDetails(){
        let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
        let ReqObj = {
          "QuoteNo":this.quoteNo,
          "SectionId": "47"
        }
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res: any = data;
            if(res.Result){
              if (res.Result.ContentRiskDetails) {
                 this.Cotentrisk = res.Result.ContentRiskDetails;
                 console.log('Get details',this.Cotentrisk);
              }
            }
          })
      }
      getPersonalAccidentDetails() {
        let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
        let ReqObj = {
          "QuoteNo":this.quoteNo,
          "SectionId":"35"
        }
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res: any = data;
            if(res.Result){
              if (res.Result.PersonalDetails) {
                  this.PersonalAccident = res.Result.PersonalDetails
              }
            }
          })
      }
      getPersonalIntermediaryDetails(){
        let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
        let ReqObj = {
          "QuoteNo": this.quoteNo,
          "SectionId":"36"
        }
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res: any = data;
            if(res.Result){
    
              if (res.Result.PersonalDetails) {
                this.PersonalIntermediary = res.Result.PersonalDetails;
              }
            }
          })
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

       getAccessories(){
        let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
        let ReqObj = {
          "QuoteNo": this.quoteNo,
          "SectionId": "99999"
        }
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res: any = data;
            if(res.Result){
              if (res.Result.ContentRiskDetails) {
               if(res.Result.ContentRiskDetails.length!=0){
                 this.accessoriesList= res.Result.ContentRiskDetails;
                 console.log('Get details of Accessories', this.accessoriesList);
               }
              }
           
            }
          })
      }


      //  DriverDetails(){
    
      //   let ReqObj={
      //     "QuoteNo":this.quoteNo,
      //      "ProductId":this.productId
      //   }
      //   let urlLink = `${this.CommonApiUrl}api/adminviewropdriverdetails`;
       
      //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      //     (data: any) => {
      //       console.log(data);
      //       if(data?.Result){
  
      //           this.DriverInfo=data?.Result.DriverDetails;

      //           console.log('DriverInformation',this.DriverInfo)
      //           //this.quoteno=data.Result.QuoteNo
  
  
      //       }
  
      //     },
      //     (err) => { },
      //   );
      //  }


       
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
       getMachineryRisk(){
    
        let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
        let ReqObj = {
          "QuoteNo": this.quoteNo,
          "SectionId":"41"
        }
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res: any = data;
            if(res.Result){
              if (res.Result.ContentRiskDetails) {
                if(res.Result.ContentRiskDetails.length!=0){
                  this.machineries = res.Result.ContentRiskDetails;
                  console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPP',this.machineries);
                }
               }
        }
          })
      }

       getallriskDetails(){
        let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
        let ReqObj = {
            "QuoteNo":this.quoteNo,
            "SectionId":"3"
        }
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
                let res: any = data;
                if(res.Result){
                  if (res.Result.ContentRiskDetails) {
                   if(res.Result.ContentRiskDetails.length!=0){
                     this.Allrisk = res.Result.ContentRiskDetails;
                     console.log('Get pre risk Details',this.Allrisk); 
                   }
                  }
                }
            })
      }

       getEmployeeDetails(){
        let SectionId = null;
        if(this.productId=='14' || this.productId=='19') SectionId = '45';
        if(this.productId=='32') SectionId = '43';
        let ReqObj = {
          "QuoteNo": this.quoteNo,
           //"RiskId": "1",
           "SectionId": SectionId
        }
        let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;
        //let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data?.Result){
              if(this.productId!=='32'){
                this.employeeList = data?.Result;
                console.log('OOOOO',this.employeeList);
              }
              else if(this.productId=='32'){
                this.fidelityList =data?.Result;
                console.log('Ferdility Lists',this.fidelityList);
              }
            }
          });
      }

      // getBorrowerList(){
      //   let ReqObj = {
      //     "InsuranceId": this.insuranceId,
      //     "BranchCode": this.branchCode
      //   }
      //   let urlLink = `${this.CommonApiUrl}dropdown/borrowertype`;
      //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      //     (data: any) => {
      //       console.log(data);
      //       if(data.Result){
      //           this.borrowerList = data.Result;              
      //       }
      //     },
      //     (err) => { },
      //   );
      // }

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


onViewListDocument(index,doc)
  {
    let ReqObj = {
      "Id": doc.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": doc.UniqueId
    }
  let urlLink = `${this.CommonApiUrl}document/getcompressedimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
        data: {
          title: data.Result.OrginalFileName,
               imageUrl: data.Result.ImgUrl
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    },
    (err) => { },
  );
}
onViewCommonDocument(index)
  {
    let entry = this.CommonDoc[index];
    let ReqObj = {
      "Id": entry.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": entry.UniqueId
  }
  let urlLink = `${this.CommonApiUrl}document/getcompressedimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
        data: {
          title: data.Result.OrginalFileName,
               imageUrl: data.Result.ImgUrl
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    },
    (err) => { },
  );
}
onCommonDocumentDownload(index){
  let entry = this.CommonDoc[index];
  let ReqObj = {
    "Id": entry.Id,
    "QuoteNo": this.quoteNo,
    "UniqueId": entry.UniqueId
  }
  let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', data?.Result?.ImgUrl);
      link.setAttribute('download', data?.Result?.OriginalFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
  },
    (err) => { },
  );
}
onListDocumentDownload(vehicleIndex,doc){
  let ReqObj = {
    "Id": doc.Id,
    "QuoteNo": this.quoteNo,
    "UniqueId": doc.UniqueId
  }
  let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', data?.Result?.ImgUrl);
      link.setAttribute('download', data?.Result?.OriginalFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
  },
    (err) => { },
  );
}

}
