import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userData:any[]=[];userHeader:any[]=[];
  filterValue:any;brokerList:any[]=[];brokerValue:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  productIds:any[]=[]; productList:any[]=[];
  companyList:any[]=[];
  loginId: any;
  userDetails: any;
  insuranceId: any;
  issuerType: any;
  subUserType:any;
  value:any;
  editSection:boolean = false;
  brokerBranchCode: any;channelId:any=null;
  channelList: any[]=[];
  constructor(private router:Router,public dialogService: MatDialog,
    private sharedService:SharedService) {
      /*let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
     if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    }
    let insurance = sessionStorage.getItem('issuerInsuranceId');
    if(insurance){
      this.insuranceId = insurance;
      const user = this.userDetails?.Result;
    }
    else this.insuranceId = user.LoginBranchDetails[0].InsuranceId;*/
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    let insurance = sessionStorage.getItem('issuerInsuranceId');
    if(insurance){
      this.insuranceId = insurance;
    }
    else this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = user.LoginId;
    this.subUserType = sessionStorage.getItem('typeValue');
    this.getInsuranceList();
    this.getChannelList();
    //this. getBrokersList();
    //this. onBrokerChange();
    //this.onBrokerChange();
    //this.getBrokersList();
    // this.brokerList = [
    //   { "Code":"01","CodeDesc":"AllianceBroker"},
    //   { "Code":"02","CodeDesc":"WarbaBroker"},
    //   { "Code":"03","CodeDesc":"UgandaBroker"},
    // ];
    this.userHeader = [
      { key: 'UserName', display: 'User Name' },
      { key: 'LoginId', display: 'LoginId' },
      { key: 'SubUserType', display: 'Sub UserType' },
      { key: 'UserMobile', display: 'MobileNo' },
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
    /*this.userHeader=[
        {"UserName":"Menu","LoginId":"1"},
        {"UserName":"Menu","LoginId":"2"},


    ]*/
    //this.onCompanyChange('change',null,null);

  }

  ngOnInit(): void {
    let useObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    if(useObj) { this.brokerValue = useObj?.BrokerId; this.insuranceId = useObj?.InsuranceId;this.channelId = useObj?.channelId; this.getBrokersList('direct')}
    //this.onBrokerChange()

  }
  getBrokersList(type){
    let ReqObj = {
      "SubUserType": this.channelId,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerList = data?.Result;
            if(type!='direct'){
              this.userData = [];
              this.brokerValue = null;
            }
            else{
              this.onBrokerChange()
            }
            /*if(this.brokerValue!=undefined && this.insuranceId!=undefined){
              let useObj = {"broker":this.brokerValue,"insuranceId":this.insuranceId};
              sessionStorage.setItem('adduserDetailsObj',JSON.stringify(useObj));
            }*/
             //this.onBrokerChange();
            

        }
      },
      (err) => { },
    );
  }
  /*getInsuranceList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    let ReqObj ={
      "BrokerCompanyYn": "N"
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            //this.companyList = data.Result;
          //if(this.insuranceId) this.getBrokersList();
          //let obj = [];
          //this.companyList = obj.concat(data?.Result);

          let obj = [];
          this.companyList = obj.concat(data?.Result);
          let useObj = JSON.parse(sessionStorage.getItem('adduserDetailsObj'))
          if(useObj){ this.brokerValue = useObj?.broker; this.insuranceId = useObj?.insuranceId; this.getInsuranceList();}
           /*let obj = [];
            this.companyList = obj.concat(data?.Result);
            let useObj = JSON.parse(sessionStorage.getItem('adduserDetailsObj'))
            if(useObj){ this.brokerValue = useObj?.broker; this.insuranceId = useObj?.Cover; this.getInsuranceList();}



        }
      },
      (err) => { },
    );
   }*/
  /*onCompanyChange(type,branches,products){
    if(this.insuranceId!='' && this.insuranceId!= undefined){
      let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.productList = data.Result;
              if(type=='direct'){
                this.productIds = products;
              }
              this. getBrokersList()
          }
        },
        (err) => { },
      );
    }
  }*/
  getChannelList(){
    let ReqObj = {
      "UserType": "Broker"
    }
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.channelList = data.Result;
          
        }
      },
      (err) => { },
    );
  }
  getInsuranceList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    let ReqObj ={
      "BrokerCompanyYn": "N"
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            //this.companyList = data.Result;
            //if(this.insuranceId) this.onBrokerChange();
            let obj = [];
            this.companyList = obj.concat(data?.Result);
            


        }
      },
      (err) => { },
    );
   }
  onBrokerChange(){
    if(this.insuranceId && this.channelId && this.brokerValue){
      let ReqObj = {
        "UserType": "User",
        "SubUserType":"",
        "InsuranceId": this.insuranceId,
        "OaCode": this.brokerValue,
        "Limit":"0",
        "Offset":"10000",
      }
      let urlLink = `${this.CommonApiUrl}admin/getallusers`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          this.userData = data.Result;
          if(this.brokerValue!=undefined && this.insuranceId!=undefined){
            let useObj = {"BrokerId":this.brokerValue,"InsuranceId":this.insuranceId,"channelId":this.channelId,"UserId": null};
            sessionStorage.setItem('userEditDetails',JSON.stringify(useObj));
          }
        },
        (err) => { },
      );
    }
  }
  onAddNew(){
    if(this.brokerValue!= '' && this.brokerValue!= undefined){
      let brokerValue = this.brokerList.find(ele=>ele.BrokerId==this.brokerValue);
      if(brokerValue){
        let entry = {
           "BrokerId":this.brokerValue,
           "InsuranceId": this.insuranceId,
           "channelId":this.channelId,
           "UserId": null
        }
        sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
        this.router.navigate(['/Admin/userList/newUserDetails'])
      }
    }

  }
  onEdit(rowData){
    sessionStorage.removeItem('editInsuranceId');
    sessionStorage.setItem('editInsuranceId',this.insuranceId);
    if(this.brokerValue!= '' && this.brokerValue!= undefined){
      let brokerValue = this.brokerList.find(ele=>ele.BrokerId==this.brokerValue);
          let entry = {
            "BrokerId":this.brokerValue,
            "InsuranceId": this.insuranceId,
            "UserId": rowData.LoginId,
            "channelId":this.channelId,
            "BrokerBranchCode":this.brokerBranchCode,

        }
        sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
        this.router.navigate(['/Admin/userList/newUserDetails'])
    }
  }
  /*onBroker(value)
  {
    this.value=value;
 if(value=='NEW INDIA'){
  this.userData=[
    {"UserName":"Menu","LoginId":"1"}
  ]
 }
  }*/
onConfigure(rowData){
  let entry = {
    "BrokerId":this.brokerValue,
    "loginId": rowData.LoginId,
    "InsuranceId": this.insuranceId,
    "channelId":this.channelId,
    "UserId": rowData.LoginId
  }
    sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
    sessionStorage.setItem('editUser',rowData.LoginId);
  this.router.navigate(['/Admin/userList/userBranchDetails'])
}
}
