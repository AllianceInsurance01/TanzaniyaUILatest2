import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Mydatas from '../../../../../app-config.json'
import { NewcolorDetailsComponent } from '../newcolor-details/newcolor-details.component';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';


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
  BranchCode: any;userDetails:any;
  title:string|any;
  constructor(private router:Router,private sharedService: SharedService) {
    //this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
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
    sessionStorage.removeItem('ColorId');
    this.router.navigate(['/Admin/colorMaster/newColorDetails'])
  }
  onEditColor(event){
    sessionStorage.setItem('ColorId', event.ColorId);
    this.router.navigate(['/Admin/colorMaster/newColorDetails'])
    
  }
  EditStatus(event){
    let ReqObj = {
      "ColorId":event.ColorId,
      "Status": event.ChangedStatus,
      "InsuranceId":this.insuranceId,
      "BranchCode": "99999"
    }
    let urlLink = `${this.CommonApiUrl}master/color/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
          /*let type: NbComponentStatus = 'success';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  'Status Changed Successfully',
                  'Status Updated',
                  config);
                window.location.reload()*/
        }
      },
      (err) => { },
    );
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
