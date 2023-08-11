import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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
  constructor(private router:Router,private sharedService: SharedService,) {
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
      { key: 'ProductName', display: 'Product Name' },
      {key: 'SumInsuredEnd', display: 'Max SumInsured'},
      {key: 'Commission', display: 'Commission (%)'},
      {key: 'Backdays', display: 'Backdays'},
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
      {key: 'Commission', display: 'Commission (%)'},
      {key: 'SumInsuredEnd', display: 'Max SumInsured'},
      {key: 'Backdays', display: 'Backdays'},
      {key: 'CreditYN', display: 'CreditYN'},
      {key: 'CheckerYN', display: 'CheckerYN'},
      { key: 'Status', display: 'Status' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
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
    this.productData = [
      {
          "ProductId": "1",
          "ProductName": "Burglary",
          "Backdays": "2",
          "OldProductName": null,
          "Commission":"5",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "100000000000.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "25/12/2049",
          "Status": "Y",
          "SelectedYN":"Y"
      },
      {
          "ProductId": "19",
          "ProductName": "Corporate Plus",
          "Backdays": "1",
          "OldProductName": null,
          "Commission":"6",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "99999999.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"N"
      },
      {
          "ProductId": "3",
          "ProductName": "Domestic",
          "Backdays": "2",
          "OldProductName": null,
          "Commission":"3",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "9999999978.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"Y"
      },
      {
          "ProductId": "14",
          "ProductName": "Employer's Liability",
          "Backdays": "2",
          "OldProductName": null,
          "Commission":"4",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "1.00",
          "SumInsuredEnd": "99999999.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"Y"
      },
      {
          "ProductId": "32",
          "ProductName": "Fidelity",
          "Backdays": "1",
          "OldProductName": null,
          "Commission":"6",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "99999999.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"N"
      },
      {
          "ProductId": "6",
          "ProductName": "Fire And Allied Perills",
          "Backdays": "1",
          "OldProductName": null,
          "Commission":"2",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "99999999.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"Y"
      },
      {
          "ProductId": "39",
          "ProductName": "Machinery Breakdown",
          "Backdays": "1",
          "OldProductName": null,
          "Commission":"5",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "99999999.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"N"
      },
      {
          "ProductId": "16",
          "ProductName": "Money ",
          "Backdays": "2",
          "OldProductName": null,
          "Commission":"6",
          "CheckerYN":'Y',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "99999999.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"N"
      },
      {
          "ProductId": "4",
          "ProductName": "Travel",
          "Backdays": "2",
          "OldProductName": null,
          "Commission":"2",
          "CheckerYN":'N',
          "CreditYN":'N',
          "SumInsuredStart": "0.00",
          "SumInsuredEnd": "3000000000.00",
          "EffectiveDateStart": "08/08/2023",
          "EffectiveDateEnd": "26/12/2049",
          "Status": "Y",
          "SelectedYN":"Y"
      },
      {
        "ProductId": "4",
        "ProductName": "Motor - Comprehensive",
        "Backdays": "2",
        "OldProductName": null,
        "Commission":"2",
        "CheckerYN":'N',
        "CreditYN":'N',
        "SumInsuredStart": "0.00",
        "SumInsuredEnd": "3000000000.00",
        "EffectiveDateStart": "08/08/2023",
        "EffectiveDateEnd": "26/12/2049",
        "Status": "Y",
        "SelectedYN":"Y"
      },
      {
        "ProductId": "4",
        "ProductName": "Motor - TPL",
        "Backdays": "2",
        "OldProductName": null,
        "Commission":"2",
        "CheckerYN":'N',
        "CreditYN":'N',
        "SumInsuredStart": "0.00",
        "SumInsuredEnd": "3000000000.00",
        "EffectiveDateStart": "08/08/2023",
        "EffectiveDateEnd": "26/12/2049",
        "Status": "Y",
        "SelectedYN":"N"
      }
    ];
    let selectedList = this.productData.filter(ele=>ele.SelectedYN=='Y');
    let nonSelected = this.productData.filter(ele=>ele.SelectedYN!='Y');
    this.selectedList = selectedList
    this.filteredList = selectedList.concat(nonSelected);
    this.editSection = false;
    this.dataSource = new MatTableDataSource(this.filteredList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    this.ngOnChanges();
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
  getBackPage(){
    this.router.navigate(['Admin/brokersList']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue?.trim().toLowerCase();
  }
  checkSelectedProducts(rowData){
    return rowData.SelectedYN=='Y';
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
