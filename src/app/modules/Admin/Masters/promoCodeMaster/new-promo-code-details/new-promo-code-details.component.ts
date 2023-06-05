import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-promo-code-details',
  templateUrl: './new-promo-code-details.component.html',
  styleUrls: ['./new-promo-code-details.component.scss']
})
export class NewPromoCodeDetailsComponent implements OnInit {

  productList:any[]=[];renewalValue:any="Both";
  typeList:any[]=[];statusValue:any="Y";promoList:any[]=[];
  promoTypeValue:any="";productValue:any="";
  constructor(private router:Router) {
    this.promoList = [
      {"Code":"Discount","CodeDesc":"Discount"},
      {"Code":"Schema","CodeDesc":"Schema"},
      {"Code":"Premium","CodeDesc":"Premium"},
    ];
    this.productList = [
      {"Code":"Home","CodeDesc":"Home Insurance"},
      {"Code":"Motor","CodeDesc":"Motor Insurance"},
      {"Code":"Life","CodeDesc":"Life Insurance"},
    ]
   }

  ngOnInit(): void {
  }
  ongetBack(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
  onProceed(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
  onGetCovers(){
    this.router.navigate(['/Admin/promoCodeMaster/viewPromoCoverDetails']);
  }
  onGetDiscount(){
    this.router.navigate(['/Admin/promoCodeMaster/viewPromoDiscountDetails']);
  }

}
