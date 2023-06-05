import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
//import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';

@Component({
  selector: 'app-workmens-quote-details',
  templateUrl: './workmens-quote-details.component.html',
  styleUrls: ['./workmens-quote-details.component.scss']
})
export class WorkmensQuoteDetailsComponent implements OnInit {
  constructor(private router:Router){}
  countyList:any[]=[];
  policyStartDate:any;
  DateOfBirth:any;
  FirstName:any;
  minDate:Date;
  maxDate:Date;
  activeMenu:any='menu2';
  active:any='N';
  BenifitList:any[]=[];
ngOnInit(): void {

  this.BenifitList=[{Code:1,CodeDescription:'12 Months'},
  {Code:2,CodeDescription:'24 Months'},
  {Code:3,CodeDescription:'36 Months'},
  ]
}
onAddVehicle(value){
  //sessionStorage.setItem('vehicleType',value);
  //this.updateComponent.resetVehicleTab();
    // if(value=='edit'){

    //   this.router.navigate(['/PersonalAccident/newQuoteDetails/excess-discount']);
    // }
    // if(value=='new'){
    //   this.router.navigate(['/PersonalAccident/newQuoteDetails/excess-discount']);
    // }

}
onStartDateChange()
{

}
}
