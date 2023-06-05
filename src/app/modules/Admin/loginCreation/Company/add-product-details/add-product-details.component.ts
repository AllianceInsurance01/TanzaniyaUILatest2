import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss']
})
export class AddProductDetailsComponent implements OnInit {

  sectionValue:any; public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  insuranceName: string;
  insuranceId: string;
  loginId: any;
  productList: any[]=[];
  constructor(private router:Router,
    private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.getProductList();
  }

  ngOnInit(): void {
    // this.columnHeader = [
    //   {
    //     key: 'ProductId',
    //     display: 'Select',
    //     config: {
    //       isChecked: true,
    //     },
    //   },
    //   { key: 'ProductName', display: 'Product Name' },
    //   { key: 'Commission', display: 'Commission(%)' },
    //   { key: 'VAT', display: 'VAT(%)' },
    //   { key: 'CoreAppCode', display: 'Core App Code' },
    //   { key: 'Status', display: 'Status' },
    //   {
    //     key: 'AmendId',
    //     display: 'View',
    //     config: {
    //       isView: true,
    //     },
    //   },
    // ];
    // this.tableData = [
    //   {
    //     "ProductId": 5,
    //     "InsuranceId": "100002",
    //     "Commission": "25",
    //     "VAT": "35",
    //     "ProductName": "Travel Insurance",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "431",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    //    {
    //     "ProductId": 4,
    //     "InsuranceId": "100002",
    //     "Commission": "45",
    //     "VAT": "55",
    //     "ProductName": "Life Insurance",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "241",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    // ];
  }
  onSelectCustomer(rowData){
    if(rowData.isChecked){
        let entry =  {
          "CreatedBy": this.loginId,
          "InsuranceId": this.insuranceId,
          "ProductId": rowData.ProductId
        }
        this.productList.push(entry);
    }
    else{
      let index = this.productList.findIndex(ele=>ele.ProductId==rowData.ProductId);
      this.productList.splice(index,1);
    }
    console.log("Product List",this.productList);
  }
  getProductList(){
    let ReqObj = {"InsuranceId":this.insuranceId}
    let urlLink = `${this.ApiUrl1}master/getallnonselectedcompanyproducts`;
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
            { key: 'Status', display: 'Status' ,cellRenderer: this.createHyperLink.bind(this),},
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


  createHyperLink(params): any {
    if (!params.data) { return; }
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
    spanElement.addEventListener('click', ($event) => {
      $event.preventDefault();
      this.router.navigate([this.homeUrl]);
    });
    return spanElement;
  }

  get homeUrl(): string {
    return 'home';
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure']);
  }
  onProceed(){
    //this.router.navigate(['/Admin/companyList/companyConfigure']);
    if(this.productList.length!=0){
      let ReqObj = this.productList;
    let urlLink = `${this.ApiUrl1}master/insertcompanyproducts`;
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
                    this.router.navigate(['/Admin/companyList/companyConfigure'])
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
