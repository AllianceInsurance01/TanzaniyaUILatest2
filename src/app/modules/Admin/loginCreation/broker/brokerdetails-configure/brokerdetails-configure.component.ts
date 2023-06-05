import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { NewCompanyDetailsComponent } from '../new-company-details/new-company-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-brokerdetails-configure',
  templateUrl: './brokerdetails-configure.component.html',
  styleUrls: ['./brokerdetails-configure.component.scss']
})
export class BrokerdetailsConfigureComponent implements OnInit {

  brokerSection:any;sectionHeader:any;sectionHeader2:any;
  sectionData:any[]=[];includeSections:boolean = false;
  includeCovers:boolean = false;coversData:any[]=[];
  coversHeader:any;coversHeader2:any;sectionList:any[]=[];
  sectionValue:any;includeCompany:boolean = false;statusValue:any="YES";
  companyHeader: any[]=[];companyData:any[]=[];companyHeader2:any[]=[];
  branchHeader: any[]=[];includeProduct:boolean=false;
  branchData: any[]=[];productHeader:any[]=[];productData:any[]=[];
  productHeader2: any[]=[];includeBranch:boolean = false;
  brokerId: string;
  insuranceId: string;
  constructor(private router:Router,public dialogService: MatDialog,) {
    this.brokerSection = "Insurance";
    this.sectionList = [
      {
        "SectionId": 3,
        "SectionName": "All Risk",
      },
      {
          "SectionId": 1,
          "SectionName": "Building"
      },
    ]
    this.brokerId = sessionStorage.getItem('editBroker');
    this.insuranceId = sessionStorage.getItem('brokerInsuranceId');
  }

  ngOnInit(): void {
    this.companyHeader2 = [
      {
        key: 'SectionId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'InsuranceName', display: 'InsuranceCompany Name' },
      { key: 'InsuranceId', display: 'Insurance Code' },
      { key: 'TIRACode', display: 'TIRA Code' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
    ];
    this.companyHeader = [
      {
        key: 'select',
        display: 'Select',
        config: {
          select: true,
        },
      },
      { key: 'InsuranceName', display: 'InsuranceCompany Name' },
      { key: 'InsuranceId', display: 'Insurance Code' },
      { key: 'TIRACode', display: 'TIRA Code' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.companyData = [
      {
        "InsuranceId": "100001",
        "InsuranceName": "Alliance Insurance",
        "TIRACode":"254812",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
      //  {
      //   "InsuranceId": "100002",
      //   "InsuranceName": "Warba Insurance",
      //   "TIRACode":"254813",
      //   "EntryDate": "14/09/2022",
      //   "Status": "Y",
      //   "CoreAppCode": "2",
      //   "AmendId": 1,
      //   "Remarks": "Ok"
      //  },
      //  {
      //   "InsuranceId": "100003",
      //   "InsuranceName": "Uganda Insurance",
      //   "TIRACode":"254814",
      //   "EntryDate": "14/09/2022",
      //   "Status": "Y",
      //   "CoreAppCode": "3",
      //   "AmendId": 1,
      //   "Remarks": "Ok"
      //  },
    ];
    this.productHeader = [
      { key: 'ProductName', display: 'Product Name' },
      { key: 'SIStart', display: 'SumInsured Start' },
      { key: 'SIEnd', display: 'SumInsured End' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'remove',
        display: 'Remove',
        config: {
          isRemove: true,
        },
      },
    ];
    this.productHeader2 = [
      {
        key: 'SectionId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'ProductName', display: 'Product Name' },
      { key: 'ProductId', display: 'Product Code' },
      { key: 'SIStart', display: 'SumInsured Start' },
      { key: 'SIEnd', display: 'SumInsured End' },
      { key: 'Commission', display: 'Commission(%)' },
      { key: 'VAT', display: 'VAT(%)' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'remove',
        display: 'Remove',
        config: {
          isRemove: true,
        },
      },
    ];
    this.productData = [
      {
        "ProductName": "Domestic",
        "ProductId": "01",
        "SIStart": "1000",
        "SIEnd": "15000",
        "Commission": "25",
        "VAT": "35",
        "Status": "Y",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "ProductName": "Home Insurance",
        "ProductId": "02",
        "SIStart": "1200",
        "SIEnd": "18000",
        "Commission": "27",
        "VAT": "36",
        "Status": "Y",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "ProductName": "Motor Claim",
        "ProductId": "03",
        "SIStart": "500",
        "SIEnd": "50000",
        "Commission": "40",
        "VAT": "56",
        "Status": "Y",
        "AmendId": 1,
        "Remarks": "Ok"
       },
    ];
    this.branchHeader = [
      { key: 'BranchName', display: 'Branch Name' },
      { key: 'BranchCode', display: 'Branch Code' },
      { key: 'InsuranceName', display: 'Insurance Company' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.branchData = [
      {
        "BranchCode": "01",
        "BranchName": "Dwanza",
        "InsuranceId": "100001",
        "InsuranceName": "Alliance Insurance",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "BranchCode": "02",
        "BranchName": "Swartza",
        "InsuranceId": "100001",
        "InsuranceName": "Alliance Insurance",
        "TIRACode":"254813",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "BranchCode": "03",
        "BranchName": "Dwanza",
        "InsuranceId": "100002",
        "InsuranceName": "Warba Insurance",
        "TIRACode":"254813",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "BranchCode": "04",
        "BranchName": "Swartza",
        "InsuranceId": "100002",
        "InsuranceName": "Warba Insurance",
        "TIRACode":"254813",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
    ];
    this.sectionHeader2 = [
      {
        key: 'SectionId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'SectionName', display: 'Section Name' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDatEend', display: 'End Date' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },

    ];
    this.sectionHeader = [
      { key: 'SectionName', display: 'Section Name' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDatEend', display: 'End Date' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'remove',
        display: 'Remove',
        config: {
          isRemove: true,
        },
      },
    ];
    this.sectionData = [
      {
          "SectionId": 3,
          "ProductId": 4,
          "InsuranceId": "100002",
          "EffectiveDateStart": "02/09/2022",
          "EffectiveDatEend": "03/11/2029",
          "SectionName": "All Risk",
          "EntryDate": "03/09/2022",
          "Status": "Y",
          "CoreAppCode": "40032",
          "AmendId": 0,
          "Remarks": "None"
      },
      {
          "SectionId": 1,
          "ProductId": 4,
          "InsuranceId": "100003",
          "EffectiveDateStart": "18/09/2022",
          "EffectiveDatEend": "25/12/2049",
          "SectionName": "Building",
          "EntryDate": "14/09/2022",
          "Status": "Y",
          "CoreAppCode": "1",
          "AmendId": 0,
          "Remarks": "Ok"
      },
    ];
    this.coversHeader = [
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'SectionName', display: 'Section Name' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDateEnd', display: 'End Date' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'remove',
        display: 'Remove',
        config: {
          isRemove: true,
        },
      },
    ];
    this.coversHeader2 = [
      {
        key: 'CoverId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDateEnd', display: 'End Date' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },

    ];
    this.coversData = [
      {
        "CoverId": 1,
        "SectionId": 1,
        "ProductId": 5,
        "InsuranceId": "100002",
        "EffectiveDateStart": "29/09/2022",
        "EffectiveDateEnd": "25/12/2049",
        "CoverName": "Health",
        "SectionName": "Building",
        "CoverDesc": "Fire",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
      {
          "CoverId": 2,
          "SectionId": 1,
          "ProductId": 4,
          "InsuranceId": "100002",
          "EffectiveDateStart": "29/09/2022",
          "EffectiveDateEnd": "25/12/2049",
          "CoverName": "Accident",
          "SectionName": "Building",
          "CoverDesc": "Fire",
          "EntryDate": "10/09/2022",
          "Status": "Y",
          "CoreAppCode": "1",
          "AmendId": 1,
          "Remarks": "Ok"
      },
      {
        "CoverId": 1,
        "SectionId": 3,
        "ProductId": 5,
        "InsuranceId": "100002",
        "EffectiveDateStart": "29/09/2022",
        "EffectiveDateEnd": "25/12/2049",
        "CoverName": "Health",
        "SectionName": "All Risk",
        "CoverDesc": "Fire",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
      {
          "CoverId": 2,
          "SectionId": 3,
          "ProductId": 4,
          "InsuranceId": "100002",
          "EffectiveDateStart": "29/09/2022",
          "EffectiveDateEnd": "25/12/2049",
          "CoverName": "Accident",
          "SectionName": "All Risk",
          "CoverDesc": "Fire",
          "EntryDate": "10/09/2022",
          "Status": "Y",
          "CoreAppCode": "1",
          "AmendId": 1,
          "Remarks": "Ok"
      }
    ];
  }
  onEdit(rowData:any){
    // this.dialogService.open(NewCompanyDetailsComponent, {
    //   context: {
    //     title: 'Insurance Company Details'
    //   },
    // });
    const dialogRef = this.dialogService.open(NewCompanyDetailsComponent,{
      data: {
        title: 'Insurance Company Details'
      }
    });
  }
  onAddCompany(){
    /*this.dialogService.open(NewCompanyDetailsComponent, {
        context: {
          title: 'Insurance Company Details'
        },
      });*/

  }
  onAddBranch(){
    /*this.dialogService.open(NewCompanyDetailsComponent, {
      context: {
        title: 'Branch Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewCompanyDetailsComponent,{
      data: {
        title: 'Branch Details'
      }
    });
  }
  onAddProduct(){
    /*this.dialogService.open(NewCompanyDetailsComponent, {
      context: {
        title: 'Product Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewCompanyDetailsComponent,{
      data: {
        title: 'Product Details'
      }
    });
  }
  ongetBack(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails'])
  }
  onFormSubmit(){
    this.router.navigate(['/Admin/brokersList']);
  }
}
