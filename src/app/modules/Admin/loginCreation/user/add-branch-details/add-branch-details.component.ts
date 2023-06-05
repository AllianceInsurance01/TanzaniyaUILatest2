import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { Branch } from './branch';

@Component({
  selector: 'app-add-branch-details',
  templateUrl: './add-branch-details.component.html',
  styleUrls: ['./add-branch-details.component.scss']
})
export class AddBranchDetailsComponent implements OnInit {

  activeMenu:any="Branch";brokerId:any;cityList:any[]=[];
  insuranceId:any;brokerLoginId:any;statusValue:any="Y";
  branchList:any[]=[];branchType:any="Main";subBranchId:any;
  public AppConfig: any = (Mydatas as any).default;subBranchList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  brokerCompanyYN: any;branchCode:any;address1:any;
  address2:any;emailId:any;mobileNo:any;subInsuranceId:any;
  effectiveDateStart:any;minDate:Date;remarks:any;
  subInsuranceList: any[]=[];coreAppCode:any;
  branchName: any;loginId:any;agencyCode:any;
  userLoginId: any;BrokerCode:any;
  userId: any;
  branchIds: any;
  branchDetails: Branch;
  brokerBranchCode: any;
  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe,) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let userObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    if(userObj){
      if(userObj.loginId) this.userLoginId = userObj.loginId;
      if(userObj.BrokerId) this.BrokerCode = userObj.BrokerId;
      console.log('Product loginid',this.userLoginId)
      if(userObj.InsuranceId) this.insuranceId = userObj.InsuranceId;
      console.log('Product insuranceId',this.insuranceId)
      if(userObj.BrokerBranchCode) this.brokerBranchCode = userObj.BrokerBranchCode;
      console.log('brokerBranchCode',this.brokerBranchCode)
      if(userObj.userId) this.userId = userObj.userId;
      if(userObj.BranchIds!=null)this.branchIds = userObj.BranchIds;
      else this.branchIds = null;
    }
    this.userId = this.userLoginId;
    this.getEditBranchDetails();
    this.branchDetails = new Branch();
    if(this.branchIds!=null && this.branchIds!=undefined){

    }


  }

  ngOnInit(): void {
    this.getMainBranchList()
    this.getSubInsuranceList()

  }
  getEditBranchDetails(){
    let ReqObj = {
      "BrokerBranchCode":this.brokerBranchCode,
      "InsuranceId": this.insuranceId,
      "LoginId": this.userLoginId
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
            this.onBranchChange();
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
              }

          }
        },
        (err) => { },
      );
  }
  onBranchChange(){
    if(this.brokerCompanyYN=='Y'){
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
    this.router.navigate(['/Admin/userList/userBranchDetails']);
  }
  onFormSubmit(){
    let ReqObj = {
      "Address1": this.address1,
      "Address2": this.address2,
      "BranchCode": this.subBranchId,
      "AttachedCompany": this.subInsuranceId,
      "BrokerBranchCode": this.brokerBranchCode,
      "BranchType":this.branchType,
      "BrokerBranchName": this.branchName,
      "CoreAppCode": this.coreAppCode,
      "CreatedBy": this.loginId,
      "Email": this.emailId,
      "EffectiveDateStart": this.effectiveDateStart,
      "InsuranceId": this.insuranceId,
      "LoginId": this.userLoginId,
      "Mobile": this.mobileNo,
      "Remarks": this.remarks,
      "Status": this.statusValue
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
          this.router.navigate(['/Admin/userList/userBranchDetails']);
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
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
  }
}
