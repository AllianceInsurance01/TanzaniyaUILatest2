import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';



@Component({
  selector: 'app-existing-customers',
  templateUrl: './assign-quote.component.html',
  styleUrls: ['./assign-quote.component.scss']
})
export class AssignQuoteComponent implements OnInit {

  
  public quoteData:any []=[];innerColumnHeader:any []=[];customerData:any[]=[];
  constructor(private router:Router,private sharedService: SharedService) {
    
   }

  ngOnInit(): void {
    this.quoteData =  [
      { key: 'QuoteNo', display: 'Quote No' },
      { key: 'RequestReferenceNo', display: 'Reference No' },
      { key: 'ClientName', display: 'Customer Name' },
      {
        key: 'edit',
        display: 'Vehicle Details',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName:'Vehicles'
        },
      },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.innerColumnHeader =  [
      { key: 'Vehicleid', display: 'VehicleID' },
      { key: 'Registrationnumber', display: 'Registration No' },
      { key: 'Chassisnumber', display: 'Chassis No' },
      { key: 'Vehiclemake', display: 'Make' },
      { key: 'Vehcilemodel', display: 'Model' },
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },
      
    ];
  }
  
     
 
}
