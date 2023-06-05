import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-cover-details',
  templateUrl: './add-sub-cover-details.component.html',
  styleUrls: ['./add-sub-cover-details.component.scss']
})
export class AddSubCoverDetailsComponent implements OnInit {

  sectionList:any[]=[];coverValue:any;coverList:any[]=[];
  sectionValue:any; public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  constructor(private router:Router) { 
    this.sectionList = [
      {
        "SectionId": "",
        "SectionName": "All",
      },
      {
        "SectionId": 3,
        "SectionName": "All Risk",
      },
      {
          "SectionId": 1,
          "SectionName": "Building"
      },
    ];
    this.coverList = [
      {
        "CoverId": "",
        "CoverName": "All",
      },
      {
        "CoverId": 1,
        "CoverName": "Health",
      },
      {
        "CoverId": 2,
        "CoverName": "Accident",
      },
    ]
  }

  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'CoverId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'SubCoverName', display: 'SubCover Name' },
      { key: 'SubCoverDesc', display: 'SubCover Desc' },
      { key: 'EffectiveDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'AmendId',
        display: 'View',
        config: {
          isView: true,
        },
      },
    ];
    this.tableData = [
      {
        "SubCoverId":"1",
        "InsuranceId":"100002",
        "SubCoverName":"Alt SubCover2",
        "SubCoverDesc":"Alt SubCover2 Desc",
        "CoreAppCode":"1",
        "Remarks":"Ok",
        "Status":"Y",
        "AmendId":"01",
        "EffectiveDate":"16/9/2022"
      },
      {
        "SubCoverId":"2",
        "InsuranceId":"100003",
        "SubCoverName":"Content SubCover2",
        "SubCoverDesc":"Content SubCover2 Desc",
        "CoreAppCode":"2",
        "Remarks":"Ok",
        "Status":"Y",
        "AmendId":"01",
        "EffectiveDate":"16/9/2022"
      }
    ]
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails']);
  }
  onProceed(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails']);
  }

}
