import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-broker-branch-list',
  templateUrl: './broker-branch-list.component.html',
  styleUrls: ['./broker-branch-list.component.scss']
})
export class BrokerBranchListComponent implements OnInit {

  activeMenu:any="Branch";brokerId:any;
  insuranceId:any;brokerLoginId:any;brokerCompanyYN:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];agencyCode:any;
  constructor(private router:Router,private sharedService: SharedService,) {
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.agencyCode = brokerObj.brokerId;
      //if(brokerObj.) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
    }
    this.brokerId = this.brokerLoginId;
    this.getBrokerBranchList();
   }

  ngOnInit(): void {
  }
  getBackPage(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
  }
  getBrokerBranchList(){
    let ReqObj = {
      "LoginId": this.brokerLoginId
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
            { key: 'CoreAppCode', display: 'Core App Code' },
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
  onAddNewBranch(){
    let ReqObj ={
      "loginId": this.brokerLoginId,
      "brokerId": this.agencyCode,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "BranchCode": null
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    sessionStorage.removeItem('editBranchId');
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerBranchDetails']);
  }
  onEditBranch(rowData){
    let ReqObj ={
      "loginId": this.brokerLoginId,
      "brokerId": this.agencyCode,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "BranchCode": rowData.BrokerBranchCode
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    sessionStorage.setItem('editBranchId',rowData.BranchCode);
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerBranchDetails']);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
  }
}
