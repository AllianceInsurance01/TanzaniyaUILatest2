import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss']
})
export class StateDetailsComponent implements OnInit {
  @Input() title: any;
  statusValue:any="YES";
  cityList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];regionValue:any;
  stateData:any[]=[];stateHeader:any[]=[];
  constructor(/*protected ref: NbDialogRef<StateDetailsComponent>*/) {
    this.activeMenu = 'State';
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
