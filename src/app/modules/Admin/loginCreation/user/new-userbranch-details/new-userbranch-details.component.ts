import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-new-userbranch-details',
  templateUrl: './new-userbranch-details.component.html',
  styleUrls: ['./new-userbranch-details.component.scss']
})
export class NewUserbranchDetailsComponent implements OnInit {
  activeMenu:any="Branch";loginId: any;
  userLoginId: any;BrokerCode: any;insuranceId: any;userId: any;
  branchData: any[]=[];branchList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchHeader: any[]=[];
  oaCode: string;userDetails:any;
  constructor(private router:Router,private sharedService: SharedService,) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails.Result?.LoginId;
    }
    let userObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    if(userObj){
      if(userObj.loginId) this.userLoginId = userObj.loginId;
      if(userObj.BrokerId) this.BrokerCode = userObj.BrokerId;
      console.log('Product loginid',this.userLoginId)
      if(userObj.InsuranceId) this.insuranceId = userObj.InsuranceId;
      console.log('Product insuranceId',this.insuranceId)
      if(userObj.userId) this.userId = userObj.userId;
    }
    this.userId = this.userLoginId;
    this.getUserBranchList();

   }

  ngOnInit(): void {
  }
  getUserBranchList(){
    let ReqObj = {
    "LoginId": this.userLoginId,
    "OaCode":this.BrokerCode,
    "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallnonselecteduserbranches`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){

          this.branchHeader = [
            {
              key: 'BranchIds',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'BrokerBranchName', display: 'Branch Name' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'Mobile', display: 'Mobile Number' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'Status', display: 'Status' },
            // {
            //   key: 'AmendId',
            //   display: 'View',
            //   config: {
            //     isView: true,
            //   },
            // },
          ];
          this.branchData = data.Result.map(x=>({
            ...x,
            isChecked:false
          }));
        }

      },
      (err) => { },
    );
  }
  onSelectCustomer(rowData){
    if(rowData.isChecked){
        this.branchList.push(rowData.BrokerBranchCode);
    }
    else{
      let index = this.branchList.findIndex(ele=>ele==rowData.BrokerBranchCode);
      this.branchList.splice(index,1);
    }
    console.log("Branch List",this.branchList);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);

  }
  ongetBack(){
    this.router.navigate(['/Admin/userList/userBranchDetails'])
  }
  onProceed(){
    if(this.branchList.length!=0){
      let ReqObj = {
        "LoginId": this.userLoginId,
        "CreatedBy":this.loginId,
        "OaCode":this.BrokerCode,
        "InsuranceId":this.insuranceId,
        "BrokerBranchIds":this.branchList,

      };
    let urlLink = `${this.CommonApiUrl}admin/attachuserbranches`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
          if(data.Result){
            // let type: NbComponentStatus = 'success';
            //       const config = {
            //         status: type,
            //         destroyByClick: true,
            //         duration: 4000,
            //         hasIcon: true,
            //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //         preventDuplicates: false,
            //       };
            //       this.toastrService.show(
            //         'Branch Details Inserted Successfully',
            //         'Branch Details',
            //         config);
                    this.router.navigate(['/Admin/userList/userBranchDetails'])
          }
          else if(data.ErrorMessage){
              if(data.ErrorMessage){
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
                //}
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
            }

        },
        (err) => { },
      );

    }
    else{
      // let type: NbComponentStatus = 'danger';
      // const config = {
      //   status: type,
      //   destroyByClick: true,
      //   duration: 4000,
      //   hasIcon: true,
      //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
      //   preventDuplicates: false,
      // };
      // this.toastrService.show(
      //   "Please Select Minimum One Branch to Include",
      //   "Add Branch",
      //   config);
    }
  }
}
