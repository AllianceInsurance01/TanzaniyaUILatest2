import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-broker-product-details',
  templateUrl: './add-broker-product-details.component.html',
  styleUrls: ['./add-broker-product-details.component.scss']
})
export class AddBrokerProductDetailsComponent implements OnInit {

  activeMenu:any="Product";brokerId:any;
  insuranceId:any;brokerLoginId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];
  productHeader: any[]=[];productData: any;
  tableData: any[]=[];columnHeader: any[]=[];
  productList: any[]=[];loginId: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.brokerId = brokerObj.brokerId;
    }
    this.brokerId = sessionStorage.getItem('editBroker');
    this.getBrokerProductList();
  }
  ngOnInit(): void {
  }
  getBrokerProductList(){
    let ReqObj = {
      "LoginId": this.brokerLoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart":null,
      "Limit":"0",
      "Offset":"100000"
    }
    let urlLink = `${this.CommonApiUrl}admin/getallnonselectedbrokerproducts`;
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
            {
              key: 'AmendId',
              display: 'View',
              config: {
                isView: true,
              },
            },
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
          "InsuranceId": this.insuranceId,
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
  ongetBack(){

    this.router.navigate(['/Admin/brokersList/newBrokerDetails'])
  }
  onProceed(){
    if(this.productList.length!=0){
      let ReqObj = {
        "CreatedBy": this.loginId,
        "InsuranceId": this.insuranceId,
        "LoginId":this.brokerLoginId,
        "ProductIds": this.productList
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
                    this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList'])
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
    //     "Please Select Minimum One Product to Include",
    //     "Add Product",
    //     config);
    // }
  }
}
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);

}
}
