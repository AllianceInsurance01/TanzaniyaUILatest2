import { Referral } from './../new-referral-details/ReferralModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NewReferralDetailsComponent } from '../new-referral-details/new-referral-details.component';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-existing-referral',
  templateUrl: './existing-referral.component.html',
  styleUrls: ['./existing-referral.component.scss']
})
export class ExistingReferralComponent implements OnInit {
  activeMenu='Referral';referralHeader:any[]=[];
  referralData:any[]=[];
  CountryId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,private sharedService: SharedService) {
    this.referralHeader = [
      { key: 'ReferalName', display: 'Referral Name' },
      { key: 'ReferalDesc', display: 'Referal Description' },
      //{ key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
   this.getExistingreferral();
   }

  ngOnInit(): void {
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
  onAddReferral(){
   sessionStorage.removeItem('ReferalId')
   this.router.navigate(['/Admin/globalConfigure/newReferralDetails'])
  }

  onEditreferral(event){
   sessionStorage.setItem('ReferalId',event.ReferalId);
   console.log(event.ReferalId)
   this.router.navigate(['/Admin/globalConfigure/newReferralDetails'])
  }

  getExistingreferral(){
    //let ReqObj = {
      //"CountryId":this.CountryId,
    //}
    let urlLink = `${this.ApiUrl1}master/getallreferaldetails`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.referralData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  EditStatus(event){
    let ReqObj = {
      "ReferalId":event.ReferalId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/referal/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          //       const config = {
          //         status: type,
          //         destroyByClick: true,
          //         duration: 4000,
          //         hasIcon: true,
          //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //         preventDuplicates: false,
          //       };
          //       this.toastrService.show(
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getExistingreferral();
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
}
