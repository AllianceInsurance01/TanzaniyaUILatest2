import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { NewRegiondetailsComponent } from '../new-regiondetails/new-regiondetails.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-region-details',
  templateUrl: './add-region-details.component.html',
  styleUrls: ['./add-region-details.component.scss']
})
export class AddRegionDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any='Region'
  insuranceName: string;
  constructor(private router:Router,public dialogService: MatDialog) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
   }

  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'CoverId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'RegionName', display: 'Region Name' },
      { key: 'RegionId', display: 'Region Code' },
      { key: 'EntryDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' }
    ];
    // this.tableData = [
    //   {
    //     "RegionId": "100001",
    //     "RegionName": "North",
    //     "MobileCode":"+91",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "1",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    //    {
    //     "RegionId": "100002",
    //     "RegionName": "South",
    //     "MobileCode":"+114",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "2",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    //    {
    //     "RegionId": "100003",
    //     "RegionName": "East",
    //     "MobileCode":"+811",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "3",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    // ];
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
  }
   onEditSection(){
    /*this.dialogService.open(NewRegiondetailsComponent, {
      context: {
        title: 'Region Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewRegiondetailsComponent,{
      data: {
        title: 'Region Details'
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
