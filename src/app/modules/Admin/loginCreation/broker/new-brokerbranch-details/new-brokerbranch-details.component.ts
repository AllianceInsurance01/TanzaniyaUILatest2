import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-brokerbranch-details',
  templateUrl: './new-brokerbranch-details.component.html',
  styleUrls: ['./new-brokerbranch-details.component.scss']
})
export class NewBrokerbranchDetailsComponent implements OnInit {

  activeMenu:any="Branch";brokerId:any;cityList:any[]=[];
  insuranceId:any;brokerLoginId:any;statusValue:any="Y";
  branchList:any[]=[];branchType:any="Main";subBranchId:any;
  public AppConfig: any = (Mydatas as any).default;subBranchList:any[]=[];
  subSourceId:any;
   sourceList:any[]=[];
   CustomerNo:any;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  brokerCompanyYN: any;branchCode:any;address1:any;
  address2:any;emailId:any;mobileNo:any;subInsuranceId:any;
  effectiveDateStart:any;minDate:Date;remarks:any;
  subInsuranceList: any[]=[];coreAppCode:any;
  branchName: any;loginId:any;agencyCode:any;
  DepartmentCode: any; customerName: any;
  customerList:any[]=[];showCustomerList:boolean = false;customerCode:any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
    this.minDate = new Date();
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.agencyCode = brokerObj.brokerId;
      if(brokerObj.BranchCode!=null) this.branchCode = brokerObj.BranchCode;
      else this.branchCode = null;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
    }
    this.brokerId = this.brokerLoginId;
    this.getMainBranchList();
   }

  ngOnInit(): void {
    if(this.branchCode!=null && this.branchCode!=undefined){
      this.getEditBranchDetails(this.branchCode);
    }
    else{
      this.branchCode = null;
    }
  }
  getEditBranchDetails(branchId){
    let ReqObj = {
      "BrokerBranchCode": branchId,
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let branchDetails = data?.Result;
            this.address1 = branchDetails?.Address1;
            this.address2 = branchDetails?.Address2;
            this.subBranchId = branchDetails?.AttachedBranchCode;
            this.subInsuranceId = branchDetails?.AttachedCompany;
            this.branchCode = branchDetails?.BrokerBranchCode;
            this.branchName = branchDetails?.BrokerBranchName;
            this.remarks = branchDetails?.Remarks;
            this.subSourceId=branchDetails?.SourceType;
            this.CustomerNo=branchDetails?.CustomerCode;
            this.DepartmentCode="11";
            this.onBranchChange();
            this.customerCode = branchDetails.CustomerCode;
            this.onGetCustomerList('direct',this.customerCode);
            //this.branchName = branchDetails?.BranchName;
            if(branchDetails.EffectiveDateStart!=null){
              this.effectiveDateStart = this.onDateFormatInEdit(branchDetails.EffectiveDateStart)
            }
            this.coreAppCode = branchDetails?.CoreAppCode;
            this.emailId = branchDetails?.Email;
            this.mobileNo = branchDetails?.Mobile;
            this.statusValue = branchDetails?.Status;

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
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  getMainBranchList(){
    let ReqObj = {"InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.branchList = data.Result;
              if(this.brokerCompanyYN=='Y'){
                this.subBranchList = [];
                this.getSubInsuranceList();
              }
              else{
                this.subBranchList = data.Result;
                this.SourceType();
              }

          }
        },
        (err) => { },
      );
  }

  SourceType(){
    let ReqObj = {"InsuranceId": this.insuranceId,
    "BranchCode":this.subBranchId
  }
    let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.sourceList = data.Result;

          }
        },
        (err) => { },
      );
  }
  onBranchChange(){
    if(this.brokerCompanyYN=='N'){
      this.subInsuranceId = this.insuranceId;
      let branch = this.branchList.find(ele=>ele.Code==this.subBranchId);
      if(branch){

        this.branchName = branch.CodeDesc;
      }
    }
  }
  getSubInsuranceList(){
    let brokerYN = "";
    if(this.brokerCompanyYN == 'Y') brokerYN = 'N';
    else brokerYN = 'Y';
    let ReqObj = {
      "BrokerCompanyYn": brokerYN
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.subInsuranceList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getBackPage(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
  }
  onFormSubmit(){
    console.log('kkkkkkkkkk',this.customerCode);
    let ReqObj = {
      "Address1": this.address1,
      "Address2": this.address2,
      "BranchCode": this.subBranchId,
      "AttachedCompany": this.subInsuranceId,
      "BrokerBranchCode": this.branchCode,
      "BranchType":this.branchType,
      "BrokerBranchName": this.branchName,
      "CoreAppCode": this.coreAppCode,
      "CreatedBy": this.loginId,
      "Email": this.emailId,
      "EffectiveDateStart": this.effectiveDateStart,
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId,
      "Mobile": this.mobileNo,
      "Remarks": this.remarks,
      "Status": this.statusValue,
      "SourceType":this.subSourceId,
      "DepartmentCode":this.DepartmentCode,
      "CustomerCode":this.customerCode//this.CustomerNo
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}admin/attachbranches`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'Branch Details Inserted/Updated Successfully',
          //   'Branch Details',
          //   config);
          this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
        }
        else if(data.ErrorMessage){
          // for(let entry of data.ErrorMessage){
          //   let type: NbComponentStatus = 'danger';
          //   const config = {
          //     status: type,
          //     destroyByClick: true,
          //     duration: 4000,
          //     hasIcon: true,
          //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //     preventDuplicates: false,
          //   };
          //   this.toastrService.show(
          //     entry.Field,
          //     entry.Message,
          //     config);
          // }
          console.log("Error Iterate",data.ErrorMessage)
          //this.loginService.errorService(data.ErrorMessage);
      }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingSections']);
  }

  onGetCustomerList(type,code){
    console.log("Code",code); let branch:any;
//     if(this.branchCode!=null && this.branchCode!=''){
// branch=this.branchCode
//     }
//     else{
//       branch =this.subBranchId
//     }
    if(code!='' && code!=null && code!=undefined){
      let ReqObj = {
        "BranchCode": this.subBranchId,
        "InsuranceId": this.insuranceId,
         "SearchValue": code,
      }
      let urlLink = `${this.ApiUrl1}api/search/premiacustomercode`;
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
  setCustomerValue(code,name,type){
    this.showCustomerList = false;
      this.customerCode = code;
      this.customerName = name;
  }
}
