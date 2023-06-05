import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-broker-product-list',
  templateUrl: './broker-product-list.component.html',
  styleUrls: ['./broker-product-list.component.scss']
})
export class BrokerProductListComponent implements OnInit {

  activeMenu:any="Product";brokerId:any;
  insuranceId:any;brokerLoginId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];
  productHeader: any[]=[];
  productData: any;brokerCompanyYN:any;
  constructor(private router:Router,private sharedService: SharedService,) {
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      console.log('LoginId.....',this.brokerLoginId)
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.brokerId = brokerObj.brokerId;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;

    }
    this.brokerId = this.brokerLoginId;
    this.getBrokerProductList();
   }

  ngOnInit(): void {
  }
  getBrokerProductList(){
    let ReqObj = {
    "LoginId": this.brokerLoginId,
    "InsuranceId": this.insuranceId,
    "EffectiveDateStart": null,
    "Limit":"0",
    "Offset":"100000"
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
  ongetBack(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
  }

  
  onConfigure(event:any){
     sessionStorage.setItem('productbroker',this.insuranceId);
     sessionStorage.setItem('brokerproduct',event.ProductId);
     sessionStorage.setItem('loginbroker',this.brokerLoginId);
    this.router.navigate(['Admin/brokersList/newBrokerDetails/Endrosementbroker']);
   }
  onAddNewProduct(){
    let ReqObj = {
      "loginId": this.brokerLoginId,
      "brokerId": this.brokerId,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "ProductId": null
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/addBrokerProducts']);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
  }
  onEditProduct(rowData:any){
    let ReqObj = {
      "loginId": this.brokerLoginId,
      "brokerId": this.brokerId,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "ProductId": rowData.ProductId
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newProductDetails']);

  }
}
