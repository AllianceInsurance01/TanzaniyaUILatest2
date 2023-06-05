import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewCompanyDetailsComponent } from '../new-company-details/new-company-details.component';
//import { NbDialogService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.scss']
})
export class BrokerListComponent implements OnInit {

  brokerHeader:any[]=[];
  brokerData:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  companyList: any;loginId:any;
  insuranceId: any;
  productId: string;
  userDetails: any;
  subUserType: string;
  constructor(private router:Router,public dialogService: MatDialog,
   private sharedService:SharedService) {
    this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = user.LoginId;
    this.subUserType = sessionStorage.getItem('typeValue');

    this.getCompanyList()
  }

  ngOnInit(): void {
    this.brokerHeader = [
      { key: 'BrokerName', display: 'Broker Name' },
      { key: 'BrokerId', display: 'Broker Code' },
      { key: 'TIRACode', display: 'TIRA Code' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'configure',
        display: 'Configure',
        config: {
          isConfigure: true,
        },
      }
    ];
  }
  getBrokerList(){
    let ReqObj = {
    "UserType": "Broker",
    "SubUserType":"",
    "Limit":"0",
    "Offset":"100",
    "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.brokerHeader = [
            { key: 'UserName', display: 'Broker Name' },
            { key: 'UserMail', display: 'MailID' },
            { key: 'UserMobile', display: 'Mobile No' },
            { key: 'CreatedBy', display: 'Created By' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
            {
              key: 'configure',
              display: 'Configure',
              config: {
                isConfigure: true,
              },
            }
          ];
          this.brokerData = data.Result;
        }
      },
      (err) => { },
    );
  }
  onAddNew(){
    sessionStorage.removeItem('editBroker');
    this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
  }
  onEdit(rowData){
    sessionStorage.setItem('editBroker',rowData.LoginId);
    this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
    // this.dialogService.open(NewCompanyDetailsComponent, {
    //   context: {
    //     title: 'Broker Details'
    //   },
    // });
  }
  onConfigure(rowData){
    let brokerCompYN = "N";
    if(rowData.BrokerCompanyYn) brokerCompYN = rowData.BrokerCompanyYn
    let entry = {
      "loginId": rowData.LoginId,
      "brokerId": rowData.AgencyCode,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": brokerCompYN
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(entry));
    sessionStorage.setItem('editBroker',rowData.LoginId);
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList'])
  }
  getCompanyList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    let ReqObj ={
      "BrokerCompanyYn": "N"
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.companyList = data.Result;
            if(this.insuranceId){ this.getBrokerList(); }
        }
      },
      (err) => { },
    );
   }
}
