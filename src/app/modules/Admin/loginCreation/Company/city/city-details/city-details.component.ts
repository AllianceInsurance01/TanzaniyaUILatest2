import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {

  @Input() title: any;
  activeMenu:any;stateList:any[]=[];stateValue:any;
  statusValue:any = "YES";regionList:any[]=[];
  regionValue:any;
  constructor(/*protected ref: NbDialogRef<CityDetailsComponent>*/) {
    this.activeMenu = "City";
   }

  ngOnInit(): void {
  }
  ongetBack(){
    //this.ref.close();
  }
  onProceed(){
    //this.ref.close();
  }

}
