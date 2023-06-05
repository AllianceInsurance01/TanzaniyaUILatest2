import { Component, OnInit } from '@angular/core';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NewSectionDetailsComponent } from '../new-section-details/new-section-details.component';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-existing-section',
  templateUrl: './existing-section.component.html',
  styleUrls: ['./existing-section.component.scss']
})
export class ExistingSectionComponent implements OnInit {

  sectionHeader:any;sectionHeader2:any;
  sectionData:any[]=[];activeMenu="Section";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;SectionId:any;
  loginId: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    this.getExistingSectionist();
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }

  }

  ngOnInit(): void {
    sessionStorage.removeItem('sectionId')
  }
  getExistingSectionist(){
    let urlLink = `${this.ApiUrl1}master/getallsectiondetails`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          sessionStorage.removeItem('sectionId')
          this.sectionHeader = [
            { key: 'SectionName', display: 'Section Name' },
            { key: 'RegulatoryCode', display: 'Regulatory Code' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
          ];
          this.sectionData = data?.Result;
        }

      },
      (err) => { },
    );
  }
  onAddSection(){
    sessionStorage.removeItem('SectionId');
    console.log("Section Id",sessionStorage.getItem('SectionId'))
    this.router.navigate(['/Admin/globalConfigure/newSectionDetails'])
  }
  onEditSection(event){
   sessionStorage.setItem('SectionId',event.SectionId);
   this.router.navigate(['/Admin/globalConfigure/newSectionDetails'])
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
  EditStatus(event){
    let ReqObj = {
      "SectionId":event.SectionId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate,
      "CreatedBy":this.loginId

    }
    let urlLink = `${this.ApiUrl1}master/section/changestatus`;
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
                this.getExistingSectionist();
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
}
