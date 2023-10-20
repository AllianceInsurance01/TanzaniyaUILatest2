import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-under-writer-details',
  templateUrl: './under-writer-details.component.html',
  styleUrls: ['./under-writer-details.component.scss']
})
export class UnderWriterDetailsComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;statusValue:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;adminSection:boolean=false;
  loginId:any;userType:any;agencyCode:any;branchCode:any;requestReferenceNo:any;
  branchList:any[]=[];productId:any;insuranceId:any;userDetails:any;
  uwQuestionList:any[]=[];motorDetails:any;customerDetails:any;vehicleDetailsList:any[]=[];
  title:any;clientName:any;dateOfBirth:any;clientType:any;vehicleId:any;
  emailId:any;mobileNo:any;idNumber:any;questionSection:boolean = false;
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    //this.vehicleId = sessionStorage.getItem('editVehicleId');
    this.vehicleId = "1";
    this.vehicleDetailsList = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
    if(this.customerDetails){
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
      if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
    }
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
      this.getUWDetails();
  }

  ngOnInit(): void {
    let chassisNo = sessionStorage.getItem('vehChassisNo');
    if(chassisNo) this.getVehicleDetails(chassisNo);
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus == 'AdminRA'){
      if(quoteStatus=='AdminRP') this.statusValue ="RP";
      else if(quoteStatus =='AdminRA') this.statusValue ="RA";
        this.adminSection = true;
    }
    else{
      if(quoteStatus) this.statusValue = quoteStatus;
      this.adminSection = false;
    }
  }
  getUWDetails(){
    let ReqObj = {
    "Limit":"0",
    "Offset":"100",
    "ProductId": this.productId,
    "LoginId": this.loginId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        let res:any = data;
        this.uwQuestionList = res?.Result;
        if(this.uwQuestionList.length!=0){
          let i=0;
          for(let ques of this.uwQuestionList){
            if(ques.QuestionType=='01') ques['Value'] = "N";
            else ques['Value'] = "";
            i+=1;
            if(i==this.uwQuestionList.length){
              this.getEditUwQuestions();
              this.questionSection = true;
            } 
          }
        }
        // else{
        //   this.saveVehicleDetails();
        // }
      },
      (err) => { },
    );
  }
  getEditUwQuestions(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "RequestReferenceNo": this.requestReferenceNo,   
      "VehicleId": this.vehicleId
    }
    let urlLink = `${this.CommonApiUrl}api/getuwquestionsdetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        let uwList = data?.Result;
        if(uwList.length!=0){
          let i=0;
          for(let ques of uwList){
            let entry = this.uwQuestionList.find(ele=>ele.UwQuestionId == ques.UwQuestionId);
            if(entry){ entry.Value = ques.Value};
            i+=1;
            if(i==uwList.length) this.questionSection = true;
          }
        }
        else{
          this.questionSection = true;
        }
      },
      (err) => { },
    );
  }
  getVehicleDetails(chassisNo){
    let ReqObj = {
      "ReqChassisNumber": chassisNo,
      "ReqRegNumber": null,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.branchCode,
      "ProductId": this.productId,
      "CreatedBy": this.loginId
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.motorDetails = data.Result;
      }
      },
      (err) => { },
    );
  }
  onGetBack(){
    if(this.productId=='5'){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details']);
    }
    else if(this.productId == '3'){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-quote-details']);
    }
  }
  onFormSubmit(){
    if(this.uwQuestionList.length!=0){
      let i = 0;
      let uwList:any[]=[];
      for(let ques of this.uwQuestionList){
        ques['BranchCode'] = this.branchCode;
        let createdBy="";
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP'){
              createdBy = this.vehicleDetailsList[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
          }
        if(ques.QuestionType == '01'){
          
          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = this.vehicleId
          uwList.push(ques);
        } 
        else if(ques.Value!=""){
          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = this.vehicleId
          uwList.push(ques);
        } 
        i+=1;
        if(i==this.uwQuestionList.length) this.onProceed(uwList);
      }
    }
    else{
      this.saveVehicleDetails();
    }
  }
  onProceed(uwList){
    if(uwList.length!=0){ 
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if(data.Result){
            if(this.productId=='5'){
              this.saveVehicleDetails();
            }
            else{ 
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
            }
            
            
            
          }
        },
        (err) => { },
      );
    }
  }
  saveVehicleDetails(){
    if(this.vehicleDetailsList.length!=0){
      let i=0;
      let createdBy="";
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRA' || quoteStatus=='RA'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      }
      else{
        if(quoteStatus =='AdminRP'){
          createdBy = this.vehicleDetailsList[0].CreatedBy;
        }
        else{
          createdBy = this.loginId;
        }
        for(let vehicle of this.vehicleDetailsList){
          console.log("vehicle Iterate",vehicle)

          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode,
            "AgencyCode": this.agencyCode,
            "SectionId": vehicle?.InsuranceType,
            "ProductId": this.productId,
            "MSRefNo": vehicle?.MSRefNo,
            "VehicleId": vehicle?.Vehicleid,
            "CdRefNo": vehicle?.CdRefNo,
            "VdRefNo": vehicle?.VdRefNo,
            "CreatedBy": createdBy,
            "productId": this.productId,
            "RequestReferenceNo": this.requestReferenceNo
          }
          let urlLink = `${this.CommonApiUrl}calculator/calc`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
              vehicle['CoverList'] = res?.CoverList;
              i+=1;
              if(i==this.vehicleDetailsList.length){
                sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList));
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              }
            },
            (err) => { },
          );
        }
      }
      
  }
  else{
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }
  }
}
