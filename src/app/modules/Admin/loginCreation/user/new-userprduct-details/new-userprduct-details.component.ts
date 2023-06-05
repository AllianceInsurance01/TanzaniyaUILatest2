import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-new-userprduct-details',
  templateUrl: './new-userprduct-details.component.html',
  styleUrls: ['./new-userprduct-details.component.scss']

})
export class NewUserprductDetailsComponent implements OnInit {
  activeMenu:any="Product";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];
  productHeader: any[]=[];productData: any;
  tableData: any[]=[];columnHeader: any[]=[];
  productList: any[]=[];loginId: any;BrokerCode:any;
  userLoginId: any;insuranceId: any;userId: any;
  brokerCompanyYN: any;
  constructor(private router:Router,private sharedService: SharedService,) {
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
    this.userId  = sessionStorage.getItem('editUser');
    this.getUserProductList();
   }

  ngOnInit(): void {
  }
  getUserProductList(){
    let ReqObj = {
    "LoginId": this.userLoginId,
    "OaCode":this.BrokerCode,
    "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallnonselecteduserproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          //this.productList = data.Result;
          this.columnHeader = [
            {
              key: 'ProductId',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'ProductName', display: 'Product Name' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'RegulatoryCode', display: 'Regulatory Code' },
            { key: 'Status', display: 'Status' },
            // {
            //   key: 'AmendId',
            //   display: 'View',
            //   config: {
            //     isView: true,
            //   },
            // },
          ];
          this.tableData = data.Result.map(x=>({
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
        let entry =  {
          "CreatedBy": this.loginId,
          "InsuranceId":this.insuranceId,
          "ProductId": rowData.ProductId
        }
        this.productList.push(rowData.ProductId);
    }
    else{
      let index = this.productList.findIndex(ele=>ele==rowData.ProductId);
      this.productList.splice(index,1);
    }
    console.log("Product List",this.productList);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
  }
  ongetBack(){
    this.router.navigate(['/Admin/userList/UserproductList'])
  }
  onProceed(){
    if(this.productList.length!=0){
      let ReqObj = {
        "LoginId": this.userLoginId,
        "CreatedBy":this.loginId,
        "InsuranceId":this.insuranceId,
        "ProductIds":this.productList,
      };
    let urlLink = `${this.CommonApiUrl}admin/attachbrokerproducts`;
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
            //         'Product Details Inserted Successfully',
            //         'Product Details',
            //         config);
                    this.router.navigate(['/Admin/userList/UserproductList'])
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
                // }
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
      //   "Please Select Minimum One Product to Include",
      //   "Add Product",
      //   config);
    }
  }
}
