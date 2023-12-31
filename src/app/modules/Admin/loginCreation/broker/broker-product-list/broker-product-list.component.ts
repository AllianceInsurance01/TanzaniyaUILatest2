import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs';

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
  productHeader1:any[]=[];
  productData: any;brokerCompanyYN:any;
  dataSource: any;
  dataSource1:any;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('secondPaginator') secondPaginator: MatPaginator;
  @ViewChild('paginator') private paginator!: MatPaginator;
  filterValue: any;  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  minDate: Date;filteredList:any[]=[];
  editSection: boolean=false;
  productHeaderAlt: any[]=[];
  selectedList: any[]=[];
  selectedProductList: any;
  nonOptedProductList: any;
  p:Number=1;
  newList: any =[];
  newslist: any =[];
  LossList:any;
  userType: any;
  subUserType: any;
  existings: boolean=false;insertlist:any[]=[];
  pa:Number=1;
  constructor(private router:Router,private sharedService: SharedService,private datePipe: DatePipe) {
    this.minDate = new Date();
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.brokerId = brokerObj.brokerId;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
      if(brokerObj.UserType) this.userType = brokerObj.UserType;
      if(brokerObj.SubUserType) this.subUserType = brokerObj.SubUserType;

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


    this.productHeader1 = [
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
    this.dataSource = new MatTableDataSource(this.filteredList);//this.filteredList
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    this.dataSource1 = new MatTableDataSource(this.filteredList);//this.filteredList
    this.dataSource1.sort = this.sort;
    this.dataSource1.paginator = this.secondPaginator;
    this.applyFilters(this.filterValue);
    console.log(this.filterValue);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.secondPaginator;
  }
  getOptedProductDetails(){
    this.newList =[];
    this.newslist=[];
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
              this.newList =[];
              this.newslist=[];
              console.log('KKKKKKKKKK',selectedList);
              if(selectedList.length!=0){
                let i=0;
                 
                  for(let product of selectedList){
                      // product['SelectedYN'] = 'Y';
                      if(product?.CreditYn==null) product.CreditYn = 'N';
                      if(product?.CheckerYn==null) product.CheckerYn = 'N';
                      if(product?.SumInsuredEnd!=null){product.SumInsuredEnd =String(product?.SumInsuredEnd).split('.')[0]; this.CommaFormatted(product);}
                      if (product?.EffectiveDateStart != null) {
                        product['EffectiveDate'] = this.onDateFormatInEdit(product?.EffectiveDateStart)
                      }
                      // if(product.SelectedYn=='Y'){
                      //   this.newList = selectedList;
                      // }
                      if(product.SelectedYn!='Y'){
                        this.newslist.push(product);
                        // this.newslist=this.selectedList[i];
                        console.log('MMMMMMMMMM',this.newslist);
                      }
                      else{
                        this.newList.push(product);
                        //this.newList=this.selectedList[i];
                        console.log('RRRRRRRRRRR',this.newList);
                      }
                    
                      i+=1;
                      if(i==selectedList.length){
                        this.selectedProductList= this.newslist;
                        this.dataSource = new MatTableDataSource(this.selectedProductList);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                        console.log('Paginatorsss',this.dataSource.paginator);
                        this.applyFilter(this.filterValue);
                        console.log('OOOOOOOOOOOOOOO',this.dataSource);
                        this.editSection = false;
                        
                        //this.getNonOptedProctList();
                      }
                      if(this.newList.length!=0){
                         this.dataSource1 = new MatTableDataSource(this.newList);
                        this.dataSource1.sort = this.sort;
                        this.dataSource1.paginator = this.secondPaginator;
                         console.log('OOOOOOOOOOOOOOO',this.secondPaginator,this.dataSource1);
                        this.applyFilters(this.filterValue);
                             }
                  }
                  // if(this.selectedList.length-1 == i){
                  //   this.LossList = this.newList;
                  //   console.log('JJJJJJJJJJJJJ',this.LossList);
                  // }
              }
              else{
                this.selectedProductList = [];
                this.productData = this.selectedProductList;
                this.dataSource = new MatTableDataSource(this.productData);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.applyFilter(this.filterValue);
                this.editSection = false;
                //this.getNonOptedProctList();
              }
            }
      },
      (err) => { },
    );
  }

  existing(){
    this.existings=true;
    this.editSection=false;
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
                        console.log('OOOOOOOOOOOOOOO',this.productData);
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
    console.log('Apply Filters',filterValue);
    this.dataSource.filter = filterValue?.trim().toLowerCase();
  }
  applyFilters(filterValue: string) {
    console.log('Apply Filters',filterValue);
    this.dataSource1.filter = filterValue?.trim().toLowerCase();
  }
  checkSelectedProducts(rowData){
    return rowData.SelectedYn=='Y';
  }
  checkSelectedProductss(rowData){
    return rowData.SelectedYn=='N'; 
  }
  onChangeSelectedProduct(rowData,check){
    console.log('Checked Statusss',rowData,check)
    if(check){
     return rowData.SelectedYn = 'Y';
    }
    else{
      return rowData.SelectedYn = 'N';
    }
    // if(rowData.SelectedYn=='Y') rowData.SelectedYn = 'N';
    // else rowData.SelectedYn = 'Y';
  }



  onChangeSelectedProduc(rowData,check,h){
    console.log('Checked Statusss',rowData,check)
    if(check){
     rowData.SelectedYn = 'N';
     this.insertlist.push(rowData);
    }
    else{
      rowData.SelectedYn = 'Y';
      if(this.insertlist.length!=0){
        let rows = this.insertlist.indexOf(rowData);
        console.log('NNNNNNNNN',rows,this.insertlist);
        this.insertlist.splice(rowData,h);
      }
    }
    // if(rowData.SelectedYn=='Y') rowData.SelectedYn = 'N';
    // else rowData.SelectedYn = 'Y';
  }

  onChangeSelectedProducts(rowData){
    if(rowData.SelectedYn=='Y') rowData.SelectedYn = 'Y';
    else rowData.SelectedYn = 'N';
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
      "ProductId": null,
      "UserType": this.userType,
      "SubUserType": this.subUserType
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/addBrokerProducts']);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
    if(value=='Deposit') this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositMasterList']);
    if(value=='paymentTypes') this.router.navigate(['/Admin/brokersList/newBrokerDetails/paymentTypesList']);
  }
  onEditProduct(rowData:any){
    let ReqObj = {
      "loginId": this.brokerLoginId,
      "brokerId": this.brokerId,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "ProductId": rowData.ProductId,
      "UserType": this.userType,
      "SubUserType": this.subUserType
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newProductDetails']);

  }
  onSaveProductDetails(){
    //let selectedList = this.productData.filter(ele=>ele.SelectedYn=='Y');
    let selectedList=[];
    console.log('KKKKKKKKKKKKK',this.newList);
    if(this.editSection){
      selectedList = this.selectedProductList.filter(ele => ele.SelectedYn=='Y');
      console.log("Final Selected List",selectedList)
    }
    else if(this.existings){
      selectedList = this.newList.filter(ele=>ele.SelectedYn=='N');
      console.log("Existing Selected List",selectedList)
    }
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
                this.newslist=[];
                this.newList=[];
                this.selectedList=[];
                this.insertlist=[];
                this.existings=false;
                this.editSection=false;
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
