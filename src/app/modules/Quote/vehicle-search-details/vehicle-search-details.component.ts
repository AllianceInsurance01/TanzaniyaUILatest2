import { Component } from '@angular/core';
import * as Mydatas from '../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-vehicle-search-details',
  templateUrl: './vehicle-search-details.component.html',
  styleUrls: ['./vehicle-search-details.component.css']
})
export class VehicleSearchDetailsComponent {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  userType: any=null;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  insuranceId: any;issuerSection:boolean=false;
  brokerCode: any;policyPeriodExceed:boolean=false;
  motorDetails: any;ChassisNo:any='';Code:any;
  branchValue:any;branchList:any[]=[];productList:any[]=[];
  brokerList: any[]=[];
  customerCode: any=null;
  customerName: any=null;
  brokerBranchCode: any=null;
  brokerLoginId: any=null;
  brokerBranchList: any[]=[];
  customerList: any[];
  showCustomerList: boolean;
  branchValueError: boolean;
  sourceCodeError: boolean;
  customerCodeError: boolean;
  brokerCodeError: boolean;
  brokerBranchCodeError: boolean;
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.branchValue = this.branchCode;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('quoteReferenceNo');
  }

  ngOnInit(): void {

    if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.getSourceList()}
    else this.issuerSection = false
    
  }
  getSourceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    //let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    let urlLink = `${this.CommonApiUrl}dropdown/premiasourcetypes`; 
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.productList = data.Result;
            //console.log(this.sourceCode)



        }
        /*if(this.sourceCode =='Broker')
        {
        this.getBrokersList();
        }
      else(this.sourceCode =='Agent')
      {
        //this.getBranchList()
      }*/

      },

      (err) => { },
    );
  }
  onSourceTypeChange(type){
    let ReqObj = {
      "SourceType": this.Code,
      "BranchCode":  this.branchValue,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          //this.branchList = data.Result;
          this.brokerList = data.Result;
          //if(this.Code=='Agent') this.executiveSection = true;
          if(type=='change'){
            this.customerCode = null;
            this.customerName=null;
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
          }
          else{
            //if(this.Code=='Broker' || this.Code=='Agent'){
              let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
              if(entry){
                console.log("Found Entries",this.brokerCode,entry,this.Code)
                this.brokerLoginId = entry.Name; 
              }
              if(this.Code=='broker' || this.Code=='direct' || this.Code=='agent' || this.Code == 'bank' || this.Code=='Broker' || this.Code == 'Agent' || this.Code =='Direct' || this.Code == 'Bank' || this.Code == 'whatsapp'){
                if(type=='change'){
                  
                }
                this.getBrokerBranchList('direct');
                
              }
              else this.onGetCustomerList('direct',this.customerCode);
            // }
            // else if(this.brokerCode){
            //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
            //  if(entry){
            //   this.brokerLoginId = entry.Name; 
            //   this.brokerBranchCode = null;
            //   this.updateComponent.brokerCode = this.brokerCode;
            //   this.updateComponent.brokerLoginId = this.brokerLoginId;
            //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
            //  }
             
            // }
          }
          
      },
      (err) => { },
    );
    
  }
  getBrokerBranchList(type){
    let urlLink = `${this.ApiUrl1}api/brokerbranches`;
    let ReqObj = {
      "BrokerCode": this.brokerCode,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerBranchList = data?.Result;
            if(this.brokerBranchList.length==1){
              this.brokerBranchCode = this.brokerBranchList[0].Code;
              if(type=='change'){
                
              }
            }
            
          }
        },
        (err) => { },
      );
  }
  onGetCustomerList(type,code){
    if(this.userType=='Issuer'){
      if(code!='' && code!=null && code!=undefined){
        let branch = null;
        if(this.userType=='issuer'){branch = this.brokerBranchCode;}
        else branch = this.branchValue
        let ReqObj = {
          "SourceType": this.Code,
          "BranchCode":  branch,
          "InsuranceId": this.insuranceId,
          "SearchValue":code
        }
        let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
                this.customerList = data.Result;
                if(type=='change'){
                  this.showCustomerList = true;
                  this.customerName = null;
                }
                else{
                  this.showCustomerList = false;
                  let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                  this.customerName = entry.Name;
                  this.setCustomerValue(this.customerCode,this.customerName,'direct')
                }
                
          },
          (err) => { },
        );
      }
      else{
        this.customerList = [];
      }
    }
    else{
      this.customerCode = this.userDetails.Result.CustomerCode;
        this.customerName = this.userDetails.Result.UserName;
    }
    
  }
  onBrokerChange(){
    //if(this.Code=='Broker' || this.Code=='Agent'){
      let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
      if(entry){
        this.brokerLoginId = entry.Name; 
      }
      this.getBrokerBranchList('change');
    }
  setCustomerValue(code,name,type){
    this.showCustomerList = false;
      this.customerCode = code;
      this.customerName = name;
      if(this.issuerSection){
        this.brokerCode = null;
          this.brokerBranchCode = null;
          this.brokerLoginId = null;
      }
  }
  checkMandatories(value){
    if(this.issuerSection){
      let i=0;
          if(this.branchValue=='' || this.branchValue==null || this.branchValue==undefined){this.branchValueError=true;i+=1;}
          if(this.Code=='' || this.Code==null || this.Code==undefined){this.sourceCodeError=true;i+=1;}
          if(this.Code=='Premia Agent' || this.Code=='Premia Broker' || this.Code=='Premia Direct'){
            
            if(this.customerCode=='' || this.customerCode==null || this.customerCode==undefined){alert('Error');this.customerCodeError=true;i+=1;}
          }
          else if(this.Code=='agent' || this.Code=='broker' || this.Code=='direct' || this.Code=='bank' || this.Code=='Broker' || this.Code=='whatsapp'){
            if(this.brokerCode=='' || this.brokerCode==null || this.brokerCode==undefined){this.brokerCodeError=true;i+=1;}
            if(this.brokerBranchCode=='' || this.brokerBranchCode==null || this.brokerBranchCode==undefined){this.brokerBranchCodeError=true;i+=1;}
          }
          if(i==0){this.getVehicleDetails(value)}
    }
    else{ this.getVehicleDetails(value) }
  }
  getVehicleDetails(value){
    this.policyPeriodExceed = false;
    let regNo = null,chassisNo = '';
     regNo=String(value).toUpperCase();
    let ReqObj = {
      "ReqChassisNumber":chassisNo,
      "ReqRegNumber":regNo,
      "InsuranceId":"100002",
      "BranchCode":"01",
      "BrokerBranchCode":"01",
      "ProductId":"5",
      "CreatedBy": this.loginId
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
      this.motorDetails = data.Result;
      if(this.motorDetails.ErrorMessage!=null){
        this.policyPeriodExceed = true;
        setTimeout(() => {this.policyPeriodExceed = false;},8000);
      }
      else if(this.motorDetails.PolicyHolderInfo){
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerBranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        sessionStorage.setItem('customerReferenceNo',this.motorDetails.PolicyHolderInfo.CustomerReferenceNo);
        sessionStorage.setItem('firstLoad','yes');
        this.router.navigate(['/Home/customer/ClientDetails']);
      }
      else{
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerBranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        this.getPolicyHolderDetails(ReqObj);
      }
      // sessionStorage.setItem('customerReferenceNo','Cust-00285');
      // sessionStorage.setItem('quoteReferenceNo','MOT-09677');
      //this.router.navigate(['/dashboardpage']);
      }
      },
      (err) => { },
    );
  }
  getPolicyHolderDetails(ReqObj){
    let urlLink = `${this.motorApiUrl}regulatory/showpolicyholder`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(data.Result.CustomerReferenceNo){
            sessionStorage.setItem('customerReferenceNo',data.Result.CustomerReferenceNo);
            sessionStorage.setItem('firstLoad','yes');
            this.router.navigate(['/Home/customer/ClientDetails']);
          }
          else{sessionStorage.setItem('firstLoad','yes'); this.router.navigate(['/Home/customer/ClientDetails']);}
        }
        else{sessionStorage.setItem('firstLoad','yes'); this.router.navigate(['/Home/customer/ClientDetails']);}
        },
        (err) => { },
      );
  }
  
}
