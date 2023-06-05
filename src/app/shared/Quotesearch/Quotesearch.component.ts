import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import * as Mydatas from '../../app-config.json';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-Quotesearch',
  templateUrl: './Quotesearch.component.html',
  styleUrls: ['./Quotesearch.component.scss']
})

export class QuotesearchComponent implements OnInit {

    quoteHeader:any[]=[];
    innerColumnHeader:any[]=[];
    customerData:any[]=[];
    innerTableData:any[]=[];
    SearchList:any[]=[];
    public accordionchecked: boolean = true;
    public panelOpen:boolean=true;
  userDetails: any;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  userType: any;
  insuranceId: any;
  innertabData:any[]=[];

  searchValue:any[]=[];
  search:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;selectedData:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
   dob:any;
    constructor(public router:Router,private sharedService: SharedService,private datePipe:DatePipe){
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.userType = this.userDetails?.Result?.UserType;
      this.insuranceId = this.userDetails.Result.InsuranceId;

      this.quoteHeader =  [
            
        {
             key: "more",
             display: "",
             config: {
               isMoreView: true,
               actions: ["VIEW"]
             }
           },
         { key: 'QuoteNo', display: 'Quote No' },
         { key: 'PolicyNo', display: 'Policy No' },
         { key: 'CustomerName', display: 'Customer Name' },
         { key: 'BranchName', display: 'Branch Name' },
         { key: 'LoginId', display: 'Login Id' },
         { key: 'Status', display: 'Status' },
         { key: 'MobileNumber', display: 'Mobile No' },
         {
             key: 'actions',
             display: 'View',
             config: {
             isEdit: true,
             },
           }
    

       ];


       this.innerColumnHeader=[
        { key: 'PolicyType', display: 'Policy Type' },
        { key: 'PolicyStartDate', display: 'Policy StartDate' },
        { key: 'VehicleType', display: 'VehicleType' },
        { key: 'OverallPremiumLc', display: 'Premium' },
        { key: 'QuoteDate', display: 'Quote Date' },
        { key: 'EffectiveDate', display: 'Effective Date' },
   
    ];


      this.getCustomersList();
    }
    ngOnInit(): void {
        
    }


    getCustomersList(){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode":this.branchCode,
        "ProductId":this.productId,
      }
      let urlLink = `${this.CommonApiUrl}api/dropdown/adminsearch`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
             this.SearchList = data?.Result;

             //this.search=sessionStorage.getItem('search');
                 
             //let sr=sessionStorage.getItem('searchvaue');
             //this.searchValue=[sr];
             //this.onCustomerSearch();

             //let docObj=JSON.parse(sessionStorage.getItem('search'))
             //if(docObj){
               //this.searchValue=docObj.SearchValue;
               //this.search=docObj.Search;
               //this.onCustomerSearch();
//}
            //else{
             //this.regionValue="TZA";
                  //this.searchValue=[];
                  //this.search="";

             //this.getExistStateList();
            //}
             //this.onCustomerSearch()

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
    /*if(this.search=='EntryDate'){

      let dob:any = this.datePipe.transform(this.dob, "dd/MM/yyyy");
      this.searchValue=dob;
      //this.onDateFormatInEdit(this.searchValue);
    }*/
    if(this.searchValue){
      this.customerData = [];
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
      let urlLink = `${this.CommonApiUrl}api/adminsearchdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customerData=data?.Result;

              if(this.searchValue!=undefined && this.searchValue!=null){
                let docObj = {"SearchValue":this.searchValue,"Search":this.search}
                sessionStorage.setItem('searchValue',JSON.stringify(docObj));
              }
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
    }
  }

    onCollapseToggle() {
        console.log(this.accordionchecked);
        if (this.accordionchecked) {
          this.panelOpen = true;
        } else {
          this.panelOpen = false;
    
        }
    
      }
    searchout(row:any){
        //console.log('jjjjjjj',this.productId);
        //sessionStorage.setItem('Status',this.productId);

        let ReqObj={
          "Search":this.search,
          "SearchValue":this.searchValue,
          "QuoteNo":row.QuoteNo,
          "RequestReferenceNo":row.RequestReferenceNo
        }
        sessionStorage.setItem('editCustomer',JSON.stringify(ReqObj));
     this.router.navigate(['/Home/MotorDocument']);
    }

    /*searchgrid(){
        this.quoteHeader =  [
            
           {
                key: "more",
                display: "MORE VIEW",
                config: {
                  isMoreView: true,
                  actions: ["VIEW"]
                }
              },
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'BranchName', display: 'Branch Name' },
            { key: 'LoginId', display: 'Login Id' },
            { key: 'Status', display: 'Status' },
            { key: 'MobileNo', display: 'Mobile No' },
            {
                key: 'actions',
                display: 'Edit',
                config: {
                isEdit: true,
                },
              }
       

          ];


          this.customerData=[{
            "RequestReferenceNo":"VISN10018954",
              "QuoteNo":"Q45679",
              "PolicyNo":"P-1006WB-30001-23-00003",
              "Status":"Y",
              "MotorList":[{
                "BrokerCode": "10065",
                "LoginId": "broker71",
              }]
        },
        {
          "RequestReferenceNo":"VFGDSA89765",
            "QuoteNo":"Q45679",
            "PolicyNo":"P-1006WB-30001-23-99987",
            "Status":"No",
            "MotorList":[{
              "BrokerCode": "10065",
              "LoginId": "broker71",
            }]
      },
        ];

       

        this.innerColumnHeader=[
            { key: 'PolicyType', display: 'Policy Type' },
            { key: 'PolicyStartDate', display: 'Policy StartDate' },
            { key: 'VechileType', display: 'VechileType' },
            { key: 'Premium', display: 'Premium' },
            { key: 'QuoteDate', display: 'Quote Date' },
            { key: 'EffectiveDate', display: 'Effective Date' },
       
        ];

        this.innerTableData= [
              
            {
                "PolicyType":"PrivateComprehensive",
                  "PolicyStartDate":"31/01/2023",
                  "VechileType":"Private"
    
            },
        ];
       
           console.log('jjjjjjjjjjj',this.innerTableData)

  
    }*/



    onInnerData(rowData){
            console.log('jjjjjjjjjj',rowData)
        rowData.MotorList =[{
          "PolicyStartDate":rowData.PolicyStartDate,
          "PolicyType":rowData.PolicyType,
          "VehicleType":rowData.VehicleType,
          "OverallPremiumLc":rowData.OverallPremiumLc,
          "QuoteDate":rowData.QuoteDate,
         "EffectiveDate":rowData.EffectiveDate,
        }];

        //rowData.MotorList=this.customerData

        //this.innertabData=rowData;
        console.log('hhhhhhhhhhhh',rowData.MotorList)
        /*let ReqObj = {
            "RequestReferenceNo": rowData.RequestReferenceNo
          }
          let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                  rowData.MotorList = data.Result;
  
                  console.log('hhhhhhhhhhhhh')
              }
            },
            (err) => { },
          );*/
          
    
        
    }
}
