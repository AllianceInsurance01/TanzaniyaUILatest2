import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { ProductNewComponent } from './productnew/productnew.component';
import { ProductDialogComponent } from './productDialog/productDialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  userDetails:any;
  companyList:any[]=[];companyValue:any;
  insuranceName: any;public activeMenu:any='Product';
  insuranceId: string;productList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,private sharedService: SharedService,public dialog: MatDialog) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    //sessionStorage.removeItem('addDetailsObj')

     //let c=sessionStorage.getItem('addDetailsObj')

    let c=sessionStorage.removeItem('addDetailsObj')
    console.log('SSSSSSeeeeee',c);
    let reload = sessionStorage.getItem('insReload');
    if(reload){
      sessionStorage.removeItem('insReload');
      window.location.reload();
    }
    else{
      if(this.insuranceId){
        this.getCompanyProductList();
      }
    }
    // let name = sessionStorage.getItem('productName');
    // if(name){
    //   sessionStorage.removeItem('productName');
    //   sessionStorage.removeItem('reload');
    // }
    this.companyList = [
      {"Code":"100001","CodeDescription":"Alliance Insurance"},
      {"Code":"100002","CodeDescription":"Warba Insurance"},
      {"Code":"100003","CodeDescription":"Uganda Insurance"},
    ]
   }

  ngOnInit(): void {
  }
  getCompanyProductList(){
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "Limit":"0",
      "Offset":"100000"
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.productList = data.Result;
          console.log('UUUUUUUUUUUUUUUUUUU',this.productList)
        }

      },
      (err) => { },
    );
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList'])
  }
  onAddProduct(){
    this.router.navigate(['/Admin/companyList/companyConfigure/newProductDetails']);
  }
  onProductSelect(rowData){
    sessionStorage.setItem('productName',rowData.ProductName);
    sessionStorage.setItem('companyProductId',rowData.ProductId);
    sessionStorage.setItem('reload','false');
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails']);
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    // if(value=='Mail') this.router.navigate(['/Admin/companyList/companyConfigure/mailList']);
    // if(value=='Sms') this.router.navigate(['/Admin/companyList/companyConfigure/SmsList']);
    if(value=='Mail') this.router.navigate(['/Admin/mailMaster']);
    if(value=='Sms') this.router.navigate(['/Admin/smsMaster/newSmsDetails']);
    if(value=='tax') this.router.navigate(['/Admin/CompanyTax']);
    if(value=='CompanyTax') this.router.navigate(['/Admin/CompanyTax']);
    //if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
    //if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
    //if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);

  }

  open(name,product){
   
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width:'80%',   
      height:'90vh',
      data: {
        title:name,
        Id:product
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed',result);
      if(result){
      //this.select({'data':result,"element":this.result});
      }
      //this.onStatus.emit(result);
      //this.animal = result;
    });
  }
}
