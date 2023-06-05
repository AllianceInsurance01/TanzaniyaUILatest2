import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-promo-code-list',
  templateUrl: './promo-code-list.component.html',
  styleUrls: ['./promo-code-list.component.scss']
})
export class PromoCodeListComponent implements OnInit {

  countryData:any[]=[];countryHeader:any[]=[];
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceName: string;
  insuranceId: string;
  productId: string;
  loginId: any;
  constructor(private router:Router) {
    this.countryHeader = [
      { key: 'PromoCode', display: 'Promo Code' },
      { key: 'ProductName', display: 'Product Name' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'PromoType', display: 'Promo Type' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];

    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.countryData = [
      {
        "PromoCode": "DIS10213",
        "ProductName": "Health Insurance",
        "Status": "Y",
        "CoreAppCode": "131",
        "PromoType": "Discount",
        "Remarks": "Ok"
       },
       {
        "PromoCode": "SCH10121",
        "ProductName": "Motor Insurance",
        "Status": "Y",
        "CoreAppCode": "242",
        "PromoType": "Schema",
        "Remarks": "Ok"
       },
       {
        "PromoCode": "DIS15247",
        "ProductName": "Life Insurance",
        "Status": "Y",
        "CoreAppCode": "342",
        "PromoType": "Discount",
        "Remarks": "Ok"
       },
    ];
  }

  ngOnInit(): void {
  }
  onAddNew(){
    this.router.navigate(['/Admin/promoCodeMaster/newPromoCodeDetails']);
  }
  EditStatus(event){
    console.log("Status Changed",event)
}


/*getExistingCity(){
  let ReqObj = {
   "ProductId" : this.productId ,
   "InsuranceId" : this.insuranceId,
    "SectionId":"99999",
    "AgencyCode":"10065",
    "BranchCode":"01"

 }
 let urlLink = `${this.ApiUrl1}master/getallcompanypromocodedetails`;

   this.sharedService.onGetMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.countryData = data?.Result;
        }
      },
(err) => { },
);
}*/


}
