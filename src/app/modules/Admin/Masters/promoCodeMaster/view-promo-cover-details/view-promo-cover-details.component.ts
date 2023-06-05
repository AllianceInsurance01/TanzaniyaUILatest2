import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-promo-cover-details',
  templateUrl: './view-promo-cover-details.component.html',
  styleUrls: ['./view-promo-cover-details.component.scss']
})
export class ViewPromoCoverDetailsComponent implements OnInit {

  promoList:any[]=[];public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu = 'Applied';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'coverId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'policyType', display: 'Policy Type' },
      { key: 'coverName', display: 'Cover Desc' },
      { key: 'Rate', display: 'Rate' },
      { key: 'amount', display: 'Amount' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.tableData = [
      {
          "policyType": 'Comprehensive',
          "coverName": 'Medex',
          "Rate": "25",
          "amount": "1500",
          "Status": "Y",
          "Remarks": "None"
      },
      {
        "policyType": 'TPL',
        "coverName": 'Personal Liability',
        "Rate": "45",
        "amount": "6500",
        "Status": "Y",
        "Remarks": "None"
    },
    ];
  }
  ongetBack(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
  onProceed(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
  onAddNewCover(){
    this.router.navigate(['/Admin/promoCodeMaster/viewPromoCoverDetails/editPromoCoverDetails'])
  }
}
