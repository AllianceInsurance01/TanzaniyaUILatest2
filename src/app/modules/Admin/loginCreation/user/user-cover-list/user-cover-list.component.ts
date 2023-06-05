import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-user-cover-list',
  templateUrl: './user-cover-list.component.html',
  styleUrls: ['./user-cover-list.component.scss']
})
export class UserCoverListComponent implements OnInit {

  activeMenu:any="Cover";
  insuranceId:any;sectionValue:any="";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];
  tableData: any[]=[];sectionList:any[]=[];
  productList: any[]=[];productValue:any;columnHeader:any[]=[];
  loginId: any;
  userLoginId: any;
  BrokerCode: any;
  userId: any;
  constructor(private router:Router,private sharedService:SharedService) {
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
      if(userObj.userId) this.userId = userObj.userId;
    }
    this.userId = this.userLoginId;
    //this.getProductList();
  }

  ngOnInit(): void {
    this.getProductList();
    this.columnHeader = [
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'CoverDesc', display: 'Cover Desc' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDateEnd', display: 'End Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
  }
  getProductList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "LoginId": this.userLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.productList = data.Result;
            let productValue = sessionStorage.getItem('brokerProductId');
            if(productValue){
              this.productValue = productValue;
              this.onChangeProduct();
            }
            else if(this.sectionList.length!=0){
              this.productValue = this.productList[0].Code;
              this.onChangeProduct();
            }
        }
      },
      (err) => { },
    );
  }
  onChangeProduct(){
    this.sectionValue = null;
    this.sectionList = [];
    this.tableData = [];
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          sessionStorage.setItem('brokerProductId',this.productValue)
          this.sectionList = data.Result;
          let sectionValue = sessionStorage.getItem('brokerSectionId');
          if(sectionValue){
            this.sectionValue = sectionValue;
            this.getBrokerCoverList();
          }
          else if(this.sectionList.length!=0){
            this.sectionValue = this.sectionList[0].Code;
            this.getBrokerCoverList();
          }
        }

        },
        (err) => { },
      );
  }
  getBrokerCoverList(){
    let ReqObj = {
      "Limit":"",
      "Offset":"100000",
      "InsuranceId": this.insuranceId,
      "SectionId":this.sectionValue,
      "ProductId": this.productValue
    }
    let urlLink = `${this.ApiUrl1}master/getallsectioncoverdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            sessionStorage.setItem('brokerSectionId',this.sectionValue)
            //sessionStorage.setItem('companySectionId',this.sectionValue);
            this.tableData = data.Result;
        }
      },
      (err) => { },
    );
  }

  onEditCover(rowData){
    sessionStorage.setItem('editBrokerCoverId',rowData.CoverId);
    this.router.navigate(['/Admin/userList/newUsercoverDetails'])
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
  }

}
