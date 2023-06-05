import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../../app-config.json'
import { NewmakeDetailsComponent } from '../newmake-details/newmake-details.component';
//import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { SharedService } from '../../../../../../shared/shared.service';



@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.scss']
})
export class MakeListComponent implements OnInit {

  activeMenu:any='Make';insuranceName:any;insuranceId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  MakeData: any;
  BranchCode: any;
  title:string|any;
  MakeId:any;
  public columnHeader: any[] = [];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  constructor(private router:Router,private sharedService: SharedService,public dialogService: MatDialog)
 {  this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
 this.insuranceId = sessionStorage.getItem('insuranceConfigureId');}


  ngOnInit(): void {
    this.columnHeader = [
      //{ key: 'MakeId', display: 'Make Id' },
      { key: 'MakeNameEn', display: 'Make Name En' },
      { key: 'EffectiveDateStart', display: 'EffectiveDateStart' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];

    this.getExistingColor();
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
    if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
    if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);
  }
  onAddColor(){
    /*this.dialogService.open( NewmakeDetailsComponent , {
      context: {
        title: 'Make Details',
        MakeId: null
      },
    });*/
    const dialogRef = this.dialogService.open(NewmakeDetailsComponent,{
      data: {
        title: 'Make Details',
        MakeId: null

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onEditMake(rowdata){
    /*this.dialogService.open( NewmakeDetailsComponent , {
        context: {
          title: 'Make Details',
        MakeId: rowdata.MakeId
      },
    });*/
    const dialogRef = this.dialogService.open(NewmakeDetailsComponent,{
      data: {
        title: 'Make Details',
        MakeId: rowdata.MakeId

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getExistingColor(){
    let ReqObj = {
      "InsuranceId":100002,
      "BranchCode":"99999",
    }
    let urlLink = `${this. CommonApiUrl}master/getallmotormake`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.MakeData = data?.Result;
        }
      },
      (err) => { },
    );
  }
}



