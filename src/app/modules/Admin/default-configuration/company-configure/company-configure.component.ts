import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NewBranchDetailsComponent } from '../new-branch-details/new-branch-details.component';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
import { NewSectionDetailsComponent } from '../new-section-details/new-section-details.component';
import { NewCoverDetailsComponent } from '../new-cover-details/new-cover-details.component';
import { NewSubCoverDetailsComponent } from '../new-sub-cover-details/new-sub-cover-details.component';
import { NewReferralDetailsComponent } from '../new-referral-details/new-referral-details.component';
import { NewDocumentDetailsComponent } from '../new-document-details/new-document-details.component';
import * as Mydatas from '../../../../app-config.json';
import { MatDialog } from '@angular/material/dialog';

import { NewBasicProductDetailsComponent } from '../new-basic-product-details/new-basic-product-details.component';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-company-configure',
  templateUrl: './company-configure.component.html',
  styleUrls: ['./company-configure.component.scss']
})
export class CompanyConfigureComponent implements OnInit {

  activeMenu:any="";sectionHeader:any[]=[];sectionHeader2:any;
  sectionData:any[]=[];includeSections:boolean = false;includeSubCovers:boolean=false;
  includeCovers:boolean = false;coversData:any[]=[];includeBranch:boolean = false;
  coversHeader:any;coversHeader2:any;sectionList:any[]=[];includeDocument:boolean = false;
  sectionValue:any;includeCompany:boolean = false;statusValue:any="YES";
  companyHeader: any[]=[];companyData:any[]=[];companyHeader2:any[]=[];
  branchHeader: any[]=[];includeProduct:boolean=false;includeReferral:boolean=false;
  branchData: any[]=[];productHeader:any[]=[];productData:any[]=[];
  productHeader2: any[]=[];subCoversHeader:any[]=[];
  subCoversData: any[]=[];
  referralHeader: any[]=[];documentData:any[]=[];
  referralData: any[]=[];documentHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  loginId: any;
  constructor(private router:Router,private sharedService: SharedService,public dialogService: MatDialog,) {

      this.activeMenu = "Product";
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.getExistingProductList();

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
      { key: 'InsuranceName', display: 'InsuranceCompany Name' },
      { key: 'InsuranceId', display: 'Insurance Code' },
      { key: 'TIRACode', display: 'TIRA Code' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      // {
      //   key: 'remove',
      //   display: 'Remove',
      //   config: {
      //     isRemove: true,
      //   },
      // },
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
       {
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
        "InsuranceId": "100003",
        "InsuranceName": "Uganda Insurance",
        "TIRACode":"254814",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "3",
        "AmendId": 1,
        "Remarks": "Ok"
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




  }
  getExistingProductList(){
    let ReqObj = { "Limit":"0", "Offset":"100000" }
    let urlLink = `${this.ApiUrl1}master/getallproductdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.productHeader = [
            { key: 'ProductName', display: 'Product Name' },
            { key: 'RegulatoryCode', display: 'Regulatory Code' },
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
  getExistingSectionist(){
    let ReqObj = { "Limit":"0", "Offset":"100000" }
    let urlLink = `${this.ApiUrl1}master/getallsectiondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.sectionHeader = [
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
          ];
          this.sectionData = data?.Result;
        }

      },
      (err) => { },
    );
  }
  getExistingCoverList(){
    let ReqObj = { "Limit":"0", "Offset":"100000" }
    let urlLink = `${this.ApiUrl1}getallcoverdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.coversHeader = [
            { key: 'CoverName', display: 'Cover Name' },
            { key: 'CoreAppCode', display: 'Core App Code' },
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

          ];
          this.coversData = data?.Result;
        }

      },
      (err) => { },
    );
  }
  getExistingSubCoverList(){
    let ReqObj = { "Limit":"0", "Offset":"100000" }
    let urlLink = `${this.ApiUrl1}master/getallsubcover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.subCoversHeader = [
            { key: 'SubCoverName', display: 'SubCover Name' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            }
          ];
          this.subCoversData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  getExistingReferralList(){
    let ReqObj = { "Limit":"0", "Offset":"100000" }
    let urlLink = `${this.ApiUrl1}master/getallreferaldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.referralHeader = [
            { key: 'ReferalName', display: 'Referral Name' },
            { key: 'CoreAppCode', display: 'Core App Code' },
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
          ];
          this.referralData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  getExistingDocumentList(){
    let ReqObj = { "Limit":"0", "Offset":"100000" }
    let urlLink = `${this.ApiUrl1}master/getalldocuments`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.documentHeader = [
            { key: 'DocumentDescr', display: 'Document Desc' },
            { key: 'EffectiveDate', display: 'Start Date' },
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
          ];
          this.documentData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  ongetBack(){
    sessionStorage.removeItem('insuranceConfigureName');
    this.router.navigate(['/Admin/companyList']);
  }

  onFormSubmit(){
    sessionStorage.removeItem('insuranceConfigureName');
    this.router.navigate(['/Admin/companyList']);
  }
  onAddBranch(){
    /*this.dialogService.open(NewBranchDetailsComponent, {
      context: {
        title: 'Branch Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewBranchDetailsComponent,{
      data: {
        title: 'Branch Details'
      }
    });
  }

  onAddProduct(){
   sessionStorage.removeItem('ProductId');
   this.router.navigate(['/Admin/globalConfigure/newBasicProductlDetails'])
  }
  onEditProduct(rowData){
  sessionStorage.setItem('ProductId',rowData.ProductId);
  this.router.navigate(['/Admin/globalConfigure/newBasicProductlDetails'])
  }
  onAddSection(){
    /*this.dialogService.open(NewSectionDetailsComponent, {
      context: {
        title: 'Section Details',
        SectionId: null
      },
    });*/
    const dialogRef = this.dialogService.open(NewSectionDetailsComponent,{
      data: {
        title: 'Section Details',
        SectionId: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onEditSection(rowData){
    /*this.dialogService.open(NewSectionDetailsComponent, {
      context: {
        title: 'Section Details',
        SectionId: rowData.SectionId
      },
    });*/
    const dialogRef = this.dialogService.open(NewSectionDetailsComponent,{
      data: {
        title: 'Section Details',
        SectionId: rowData.SectionId

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  onAddCover(){
    sessionStorage.removeItem('editGlobalCoverId');
    this.router.navigate(['/Admin/globalConfigure/coverDetails'])
  }
  onEditCovers(rowData){
    if(rowData){
      sessionStorage.setItem('editGlobalCoverId',rowData.CoverId);
      this.router.navigate(['/Admin/globalConfigure/coverDetails'])
    }
  }
  onAddSubCover(){
    /*this.dialogService.open(NewSubCoverDetailsComponent, {
      context: {
        title: 'SubCover Details',
        SubCoverId: null
      },
    });*/
    const dialogRef = this.dialogService.open(NewSubCoverDetailsComponent,{
      data: {
        title: 'SubCover Details',
        SubCoverId: null
      }
    });

  }
  onEditSubCover(rowData){
    /*this.dialogService.open(NewSubCoverDetailsComponent, {
      context: {
        title: 'SubCover Details',
        SubCoverId: rowData.SubCoverId
      },
    });*/
    const dialogRef = this.dialogService.open(NewSubCoverDetailsComponent,{
      data: {
        title: 'SubCover Details',
        SubCoverId: rowData.SubCoverId
      }
    });

  }
  onAddReferral(){
    /*this.dialogService.open(NewReferralDetailsComponent, {
      context: {
        title: 'Referral Details',
        ReferralId: null
      },
    });*/

    const dialogRef = this.dialogService.open(NewReferralDetailsComponent,{
      data: {
        title: 'Referral Details',
        ReferralId: null
      }
    });
  }
  onEditReferral(rowData){
    /*this.dialogService.open(NewReferralDetailsComponent, {
      context: {
        title: 'Referral Details',
        ReferralId: rowData.ReferalId
      },
    });*/
    const dialogRef = this.dialogService.open(NewReferralDetailsComponent,{
      data: {
        title: 'Referral Details',
        ReferralId: rowData.ReferalId
      }
    });
  }
  onAddDocument(){
    /*this.dialogService.open(NewDocumentDetailsComponent, {
      context: {
        title: 'Document Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewReferralDetailsComponent,{
      data: {
        title: 'Document Details',
      }
    });
  }
  EditStatus(event){
    let ReqObj = {
      "ProductId":event.ProductId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate,
      "CreatedBy":this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/products/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
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
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getExistingProductList();
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    console.log("Val",value);
    this.activeMenu = value;
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
}
