import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-promo-discount-details',
  templateUrl: './view-promo-discount-details.component.html',
  styleUrls: ['./view-promo-discount-details.component.scss']
})
export class ViewPromoDiscountDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  constructor(private router:Router) {
    this.columnHeader = [
      { key: 'policyType', display: 'Policy Type' },
      { key: 'coverName', display: 'Cover Desc' },
      { key: 'Rate', display: 'Rate' },
      { key: 'amount', display: 'Amount' },
      { key: 'Status', display: 'Status' }
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

  ngOnInit(): void {
  }
  ongetBack(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
  onProceed(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
}
