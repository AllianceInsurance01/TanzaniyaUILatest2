import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-depositmaster',
  templateUrl: './depositmaster.component.html',
  styleUrls: ['./depositmaster.component.scss']
})
export class DepositMasterComponent implements OnInit {

  activeMenu:any="Deposit";brokerId:any;
  insuranceId:any;brokerLoginId:any;brokerCompanyYN:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];agencyCode:any;branchsHeader:any[]=[];branchDatas:any[]=[];
  userType: any;
  subUserType: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.agencyCode = brokerObj.brokerId;
      //if(brokerObj.) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
      if(brokerObj.UserType) this.userType = brokerObj.UserType;
      if(brokerObj.SubUserType) this.subUserType = brokerObj.SubUserType;
    }
    this.brokerId = this.brokerLoginId;
    
   }

  ngOnInit(): void {
    
    this.branchsHeader = [
                    { key: 'CbcNo', display: 'CBC NO' },
                    { key: 'BrokerName', display: 'Broker' },
                    { key: 'DepositAmount', display: 'Deposit Amount' },
                    { key: 'DepositUtilised', display: 'Utilised Amount' },
                    { key: 'RefundAmt', display: 'Refund Amount' },
                    { key: 'Status', display: 'Status' },
                    {
                      key: 'actions',
                      display: 'Action',
                      config: {
                        isEdit: true,
                      },
                    },
            
                  ];
   this.getBrokersBranchList();
  }
  getBackPage(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
  }
  getBrokersBranchList(){
    this.branchDatas=[];
    let urlLink = `${this.CommonApiUrl}deposit/get/CbcbyBrokerId/${this.brokerLoginId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Message!='FAILED'){
          this.branchDatas = data?.Result;
          console.log('HHHHHHHHHHHHHHHHH',this.branchDatas);
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
      "BranchCode": null,
      "UserType": this.userType,
      "SubUserType": this.subUserType
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    sessionStorage.removeItem('editBranchId');
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerBranchDetails']);
  }
  onEditData(rowData){
    let ReqObj ={
      "loginId": this.brokerLoginId,
      'CbcNo':rowData.CbcNo,
      'BrokerName':rowData.BrokerName,
    }
    sessionStorage.setItem('CbcDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositdetails'])
    //sessionStorage.setItem('editBranchId',rowData.BranchCode);
   
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
    if(value=='Deposit') this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositMasterList']);
    if(value=='paymentTypes') this.router.navigate(['/Admin/brokersList/newBrokerDetails/paymentTypesList']);
  }
}
