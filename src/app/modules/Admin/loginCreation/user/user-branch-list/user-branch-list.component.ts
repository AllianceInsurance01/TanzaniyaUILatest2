import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-user-branch-list',
  templateUrl: './user-branch-list.component.html',
  styleUrls: ['./user-branch-list.component.scss']
})
export class UserBranchListComponent implements OnInit {

  activeMenu:any="Branch";
  userLoginId: any;BrokerCode: any;insuranceId: any;userId: any;
  branchData: any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchHeader: any[]=[];
  loginId: any;
  brokerBranchCode: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let userObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    if(userObj){
      if(userObj.loginId) this.userLoginId = userObj.loginId;
      if(userObj.BrokerId) this.BrokerCode = userObj.BrokerId;
      console.log('branch loginid',this.userLoginId)
      if(userObj.InsuranceId) this.insuranceId = userObj.InsuranceId;
      if(userObj.BrokerBranchCode) this.brokerBranchCode = userObj.BrokerBranchCode;
      console.log('branch brokerBranchCode',this.brokerBranchCode)
      if(userObj.userId) this.userId = userObj.userId;
    }
    this.userId = this.userLoginId;
    this.getBrokerBranchList();
  }
  ngOnInit(): void {
  }
  getBrokerBranchList(){
    let ReqObj = {
      "LoginId": this.userLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.branchHeader = [
            { key: 'BrokerBranchName', display: 'Branch Name' },
            { key: 'EffectiveDateStart', display: 'Effective Date' },
            { key: 'Mobile', display: 'Mobile No' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
          ];
          this.branchData = data?.Result;
        }
      },
      (err) => { },
    );

  }
  getBackPage(){
    this.router.navigate(['/Admin/userList/newUserDetails'])
  }
  onAddNewBranch(){
    let entry = {
      "BrokerId":this.BrokerCode,
      "InsuranceId": this.insuranceId,
      "loginId": this.userLoginId,
      "UserId":this.userId,
      "BranchIds":null,
  }
  sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
    this.router.navigate(['/Admin/userList/newUserbranchDetails']);
  }
  onEditBranch(rowData){
    let entry = {
      "BrokerId":this.BrokerCode,
      "InsuranceId": this.insuranceId,
      "loginId": this.userLoginId,
      "UserId":this.userId,
      "BrokerBranchCode": rowData.BrokerBranchCode,
      "BranchIds":rowData.BranchIds,
  }
  sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
  this.router.navigate(['/Admin/userList/addBranchDetails'])
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
  }
}
