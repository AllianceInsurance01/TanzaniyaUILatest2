import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LifeInsurance } from './LifeInsurance';
import { ProductData } from './product';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-life-risk-details',
  templateUrl: './life-risk-details.component.html',
  styleUrls: ['./life-risk-details.component.css']
})
export class LifeRiskDetailsComponent {
  public fields: any[] = [];formSection:any=null;
  public productItem: ProductData = null;gender:any="M";
  termList:any[]=[];termValue:any=null;maxDobDate:any=null;
  paymentModeList: any[]=[];paymentMode:any="Y";
  premiumSection:boolean = false;
constructor(){
  this.fields[0] = new LifeInsurance().fields;
  this.productItem = new ProductData();
  this.paymentModeList = [
    {"Code":"01","CodeDesc":"Monthly"},
    {"Code":"02","CodeDesc":"Quarterly"},
    {"Code":"03","CodeDesc":"Half-Yearly"},
    {"Code":"04","CodeDesc":"Yearly"},
  ]
  var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.maxDobDate = new Date(year - 18, month, day);
}
public form = new FormGroup({})
  onSubmit(productItem){

  }
}
