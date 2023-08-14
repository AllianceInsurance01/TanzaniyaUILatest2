import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

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
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  filterValue: any;  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  minDate: Date;filteredList:any[]=[];
  editSection: boolean=false;
  productHeaderAlt: any[]=[];
  selectedList: any[]=[];
  selectedProductList: any;
  nonOptedProductList: any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe: DatePipe) {
    this.minDate = new Date();
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.brokerId = brokerObj.brokerId;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;

    }
    this.brokerId = this.brokerLoginId;
    this.productHeaderAlt = [
      { key: 'ProductName', display: 'BrokerConfigProductName' },
      {key: 'SumInsuredEnd', display: 'Max SumInsured'},
      {key: 'CommissionPercent', display: 'Commission (%)'},
      {key: 'BackDays', display: 'Backdays'},
      { key: 'Status', display: 'Status' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
       {
        key: 'configure',
        display: 'Endrosement',
        config: {
          isConfigure: true,
        },
      }
    ]
    this.productHeader = [
      { key: 'Select', display: 'Select' },
      { key: 'ProductName', display: 'Product Name' },
      {key: 'CommissionPercent', display: 'Commission (%)'},
      {key: 'SumInsuredEnd', display: 'Max SumInsured'},
      {key: 'BackDays', display: 'Backdays'},
      {key: 'CreditYn', display: 'CreditYN'},
      {key: 'CheckerYn', display: 'CheckerYN'},
      { key: 'Status', display: 'Status' },
      { key: 'EffectiveDate', display: 'Effective Date' }
      // {
      //   key: 'remove',
      //   display: 'Remove',
      //   config: {
      //     isRemove: true,
      //   },
      // },
    ];
   
    // let selectedList = this.productData.filter(ele=>ele.SelectedYN=='Y');
    // let nonSelected = this.productData.filter(ele=>ele.SelectedYN!='Y');
    // this.selectedList = selectedList
    // this.filteredList = selectedList.concat(nonSelected);
    
    // this.dataSource = new MatTableDataSource(this.filteredList);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    //this.applyFilter(this.filterValue);
    this.ngOnChanges();
    this.getOptedProductDetails();
    //this.getBrokerProductList();
   }
   get keys() {
    return this.productHeader.map(({ key }) => key);
  }
  ngOnInit(): void {
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.filteredList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    console.log(this.filterValue);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  getOptedProductDetails(){
    let ReqObj = {
      "LoginId": this.brokerLoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": null,
      "Limit":"0",
      "Offset":"100000"
      }
      let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanylistproduct`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
              let selectedList = data.Result;
              if(selectedList.length!=0){
                let i=0;
                  for(let product of selectedList){
                      product['SelectedYN'] = 'Y';
                      if(product?.CreditYn==null) product.CreditYn = 'N';
                      if(product?.CheckerYn==null) product.CheckerYn = 'N';
                      if(product?.SumInsuredEnd!=null){product.SumInsuredEnd =String(product?.SumInsuredEnd).split('.')[0]; this.CommaFormatted(product);}
                      if (product?.EffectiveDateStart != null) {
                        product['EffectiveDate'] = this.onDateFormatInEdit(product?.EffectiveDateStart)
                      }
                      i+=1;
                      if(i==selectedList.length){this.selectedProductList= selectedList;this.getNonOptedProctList();}
                  }
              }
              else{
                this.selectedProductList = [];
                this.getNonOptedProctList();
              }
            }
      },
      (err) => { },
    );
  }
  getNonOptedProctList(){
    let ReqObj = {
      "LoginId": this.brokerLoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": null,
      "Limit":"0",
      "Offset":"100000"
      }
      let urlLink = `${this.CommonApiUrl}admin/getallnonselecteduserproductslist`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
              let selectedList = data.Result;
              if(selectedList.length!=0){
                let i=0;
                  for(let product of selectedList){
                      product['SelectedYN'] = 'N';
                      if(product?.CreditYn==null) product.CreditYn = 'N';
                      if(product?.CheckerYn==null) product.CheckerYn = 'N';
                      if(product?.SumInsuredEnd!=null){product.SumInsuredEnd =String(product?.SumInsuredEnd).split('.')[0]; this.CommaFormatted(product);}
                      if (product?.EffectiveDateStart != null) {
                        product['EffectiveDate'] = this.onDateFormatInEdit(product?.EffectiveDateStart)
                      }
                      else product['EffectiveDate'] = null;
                      i+=1;
                      if(i==selectedList.length){
                        this.nonOptedProductList= selectedList;
                        this.productData = this.selectedProductList.concat(this.nonOptedProductList);
                        this.dataSource = new MatTableDataSource(this.productData);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                        this.applyFilter(this.filterValue);
                        this.editSection = false;
                      }
                  }
              }
              else{
                this.nonOptedProductList = [];
                this.productData = this.selectedProductList.concat(this.nonOptedProductList);
                this.dataSource = new MatTableDataSource(this.productData);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.applyFilter(this.filterValue);
                this.editSection = false;
              }
            }
      },
      (err) => { },
    );
  }
  getBackPage(){
    this.router.navigate(['Admin/brokersList']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue?.trim().toLowerCase();
  }
  checkSelectedProducts(rowData){
    return rowData.SelectedYN=='Y';
  }
  onChangeSelectedProduct(rowData){
    if(rowData.SelectedYN=='Y') rowData.SelectedYN = 'N';
    else rowData.SelectedYN = 'Y';
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
  onSaveProductDetails(){
    let selectedList = this.productData.filter(ele=>ele.SelectedYN=='Y');
    console.log("Final Selected List",selectedList)
    let finalObj = [];let i=0;
    for(let entry of selectedList){
      let SumInsured =0;
      if(entry.SumInsuredEnd.includes(',')){ SumInsured = entry.SumInsuredEnd.replace(/,/g, '') }
      else SumInsured = entry.SumInsuredEnd;
      let effectiveDate = this.datePipe.transform(entry.EffectiveDate, "dd/MM/yyyy");
      let Obj =  {
        "ProductId": entry.ProductId,
        "ProductName": entry.ProductName,
        "ProductDesc": entry.ProductDesc,
        "PolicyTypeId": entry.PolicyTypeId,
        "PolicyTypeDesc": entry.PolicyTypeDesc,
        "CommissionPercent": entry.CommissionPercent,
        "SumInsuredStart": "1",
        "SumInsuredEnd": SumInsured,
        "BackDays": entry.BackDays,
        "CreditYn":entry.CreditYn,
        "CheckerYn": entry.CheckerYn,
        "EffectiveDateStart": effectiveDate,
        "Status": entry.Status,
        "InsuranceId": this.insuranceId,
        "LoginId": this.brokerLoginId,
        "Remarks": "nonr",
        "CreatedBy": entry.CreatedBy
      }
      finalObj.push(Obj);
      i+=1;
      if(i==selectedList.length) this.finalProceed(finalObj);
    }
  }
  finalProceed(finalObj){
      let urlLink = `${this.CommonApiUrl}admin/updatebrokercompanylistproducts`;
      this.sharedService.onPostMethodSync(urlLink, finalObj).subscribe(
        (data: any) => {
          if (data.Result) {
                this.selectedProductList = [];
                this.nonOptedProductList = [];
                this.productData = [];
                this.getOptedProductDetails();
          }
        },
        (err) => { },
      );
  }
  onSIEndChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted(rowData) {

    // format number
    if (rowData?.SumInsuredEnd) {
      rowData.SumInsuredEnd = rowData?.SumInsuredEnd.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }}
  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2] + '-' + format[1] + '-' + format[0];
          return NewDate;
        }
      }
    }
  }
}
