import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Mydatas from '../../../../../../app-config.json'
import { NewcolorDetailsComponent } from '../newcolor-details/newcolor-details.component';
//import { NbDialogService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {

  activeMenu:any='Color';insuranceName:any;insuranceId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public columnHeader: any[] = [];
  ColorData: any[]=[];
  BranchCode: any;
  title:string|any;
  constructor(private router:Router,private sharedService: SharedService,public dialogService: MatDialog ) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
   }

  ngOnInit(): void {
    this.columnHeader = [
      { key: 'ColorCode', display: 'Color Code' },
      { key: 'ColorDesc', display: 'Color Desc' },
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
    /*this.dialogService.open(NewcolorDetailsComponent, {
      context: {
        title: 'Color Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewcolorDetailsComponent,{
      data: {
        title: 'Color Details'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onEditColor(rowdata){
    /*this.dialogService.open(NewcolorDetailsComponent, {
        context: {
          title: 'Color Details',
        ColorId: rowdata.ColorId
      },
    });*/
    const dialogRef = this.dialogService.open(NewcolorDetailsComponent,{
      data: {
        title: 'Color Details',
        ColorId: rowdata.ColorId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getExistingColor(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999",
    }
    let urlLink = `${this.CommonApiUrl}master/getallmotorcolor`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ColorData = data?.Result;
        }
      },
      (err) => { },
    );
  }

}
