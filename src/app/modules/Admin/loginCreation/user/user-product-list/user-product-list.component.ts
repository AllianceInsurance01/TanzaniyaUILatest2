import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-user-product-list',
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.scss']
})
export class UserProductListComponent implements OnInit {

  activeMenu:any="Product";
  productData:any[]=[];productHeader:any[]=[];
  userLoginId: any;insuranceId: any;userId: any;
  brokerCompanyYN: any;BrokerCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  constructor(private router:Router,private sharedService:SharedService) {
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
    this.getUserProductList();
  }

  ngOnInit(): void {
  }
  getUserProductList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "LoginId": this.userLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getbrokercompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.productHeader = [
            { key: 'ProductName', display: 'Product Name' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
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
              display: 'Endrosement',
              config: {
                isConfigure: true,
              },
            }
            // {
            //   key: 'remove',
            //   display: 'Remove',
            //   config: {
            //     isRemove: true,
            //   },
            // },
          ];
          this.productData = data.Result;
        }

      },
      (err) => { },
    );
  }

  onConfigure(event:any){
    sessionStorage.setItem('productuser',this.insuranceId);
    sessionStorage.setItem('userproduct',event.ProductId);
    sessionStorage.setItem('loginUser',this.userLoginId);
   this.router.navigate(['Admin/userList/EndrosementUser']);
  }
  onAddNewProduct(){
    let entry = {
      "BrokerId":this.BrokerCode,
      "InsuranceId": this.insuranceId,
      "loginId": this.userLoginId,
      "UserId":this.userId,
      "ProductId": null
  }
  sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
    this.router.navigate(['/Admin/userList/newUserproductDetails'])
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
  }
  onEditProduct(rowData){
    let entry = {
      "BrokerId":this.BrokerCode,
      "InsuranceId": this.insuranceId,
      "loginId": this.userLoginId,
      "UserId":this.userId,
      "ProductId": rowData.ProductId
  }
  sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
    this.router.navigate(['/Admin/userList/newProductDetails'])
  }
}
