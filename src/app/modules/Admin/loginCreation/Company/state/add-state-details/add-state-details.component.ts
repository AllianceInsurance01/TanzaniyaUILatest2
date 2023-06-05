import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

import { StateDetailsComponent } from '../state-details/state-details.component';


@Component({
  selector: 'app-add-state-details',
  templateUrl: './add-state-details.component.html',
  styleUrls: ['./add-state-details.component.scss']
})
export class AddStateDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any='State'
  insuranceName: string;regionValue:any="";
  regionList: any[]=[];
  constructor(private router:Router,public dialogService: MatDialog,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
   }

  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'AmendId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'StateName', display: 'State Name' },
      { key: 'StateId', display: 'State Code' },
      { key: 'EntryDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' }
    ];
    this.tableData = [
      {
        "StateId": "100001",
        "StateName": "India",
        "MobileCode":"+91",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "StateId": "100002",
        "StateName": "Newzeland",
        "MobileCode":"+114",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "StateId": "100003",
        "StateName": "United States Of America",
        "MobileCode":"+811",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "3",
        "AmendId": 1,
        "Remarks": "Ok"
       },
    ];
    this.regionList = [
        {"Code":"01","CodeDesc":"North"},
        {"Code":"02","CodeDesc":"East"},
        {"Code":"03","CodeDesc":"West"},
    ]
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
  }
  onAddSection(){
    this.router.navigate(['/Admin/companyList/companyConfigure/stateList']);
  }
   onEditSection(){
    /*this.dialogService.open(StateDetailsComponent, {
      context: {
        title: 'State Details'
      },
    });*/

    const dialogRef = this.dialogService.open(StateDetailsComponent,{
      data: {
        title: 'State Details'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }
}
