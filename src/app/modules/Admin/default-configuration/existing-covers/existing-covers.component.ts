import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-existing-covers',
  templateUrl: './existing-covers.component.html',
  styleUrls: ['./existing-covers.component.scss']
})
export class ExistingCoversComponent implements OnInit {

  coversData:any[]=[];coversHeader:any[]=[];
  activeMenu='Cover';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,private sharedService: SharedService,) {
    // this.coversHeader = [
    //   { key: 'CoverName', display: 'Cover Name' },
    //   { key: 'SectionName', display: 'Section Name' },
    //   { key: 'EffectiveDateStart', display: 'Start Date' },
    //   { key: 'EffectiveDateEnd', display: 'End Date' },
    //   { key: 'Status', display: 'Status' },
    //   {
    //     key: 'actions',
    //     display: 'Action',
    //     config: {
    //       isEdit: true,
    //     },
    //   },

    // ];
    // this.coversData = [
    //   {
    //     "CoverId": 1,
    //     "SectionId": 1,
    //     "ProductId": 5,
    //     "InsuranceId": "100002",
    //     "EffectiveDateStart": "29/09/2022",
    //     "EffectiveDateEnd": "25/12/2049",
    //     "CoverName": "Health",
    //     "SectionName": "Building",
    //     "CoverDesc": "Fire",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "1",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    //   {
    //       "CoverId": 2,
    //       "SectionId": 1,
    //       "ProductId": 4,
    //       "InsuranceId": "100002",
    //       "EffectiveDateStart": "29/09/2022",
    //       "EffectiveDateEnd": "25/12/2049",
    //       "CoverName": "Accident",
    //       "SectionName": "Building",
    //       "CoverDesc": "Fire",
    //       "EntryDate": "10/09/2022",
    //       "Status": "Y",
    //       "CoreAppCode": "1",
    //       "AmendId": 1,
    //       "Remarks": "Ok"
    //   },
    //   {
    //     "CoverId": 1,
    //     "SectionId": 3,
    //     "ProductId": 5,
    //     "InsuranceId": "100002",
    //     "EffectiveDateStart": "29/09/2022",
    //     "EffectiveDateEnd": "25/12/2049",
    //     "CoverName": "Health",
    //     "SectionName": "All Risk",
    //     "CoverDesc": "Fire",
    //     "EntryDate": "14/09/2022",
    //     "Status": "Y",
    //     "CoreAppCode": "1",
    //     "AmendId": 1,
    //     "Remarks": "Ok"
    //    },
    //   {
    //       "CoverId": 2,
    //       "SectionId": 3,
    //       "ProductId": 4,
    //       "InsuranceId": "100002",
    //       "EffectiveDateStart": "29/09/2022",
    //       "EffectiveDateEnd": "25/12/2049",
    //       "CoverName": "Accident",
    //       "SectionName": "All Risk",
    //       "CoverDesc": "Fire",
    //       "EntryDate": "10/09/2022",
    //       "Status": "Y",
    //       "CoreAppCode": "1",
    //       "AmendId": 1,
    //       "Remarks": "Ok"
    //   }
    // ];
    this.getExistingCoverList();
   }

  ngOnInit(): void {

  }
  getExistingCoverList(){
    let ReqObj = { "Limit":"0", "Offset":"100" }
    let urlLink = `${this.ApiUrl1}master/getallcoverdetails`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.coversHeader = [
            { key: 'CoverName', display: 'Cover Name' },
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
            {
              key: 'SubCoverYn',
              display: 'CoverRating',
              config: {
                isCoverRatingEdit: true,
              },
            },
            {
              key: 'SubCover',
              display: 'SubCoverRating',
              config: {
                isSubCoverRatingEdit: true,
              },
            },
          ];
          this.coversData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onAddCover(){
    sessionStorage.removeItem('editGlobalCoverId');
    sessionStorage.removeItem('ratingSection');
    sessionStorage.removeItem('SubCoverEdit');
    this.router.navigate(['/Admin/globalConfigure/coverDetails'])
  }
  onEditCovers(rowData){
    if(rowData){
      sessionStorage.setItem('editGlobalCoverId',rowData.CoverId);
      sessionStorage.removeItem('ratingSection');
      sessionStorage.removeItem('SubCoverEdit');
      this.router.navigate(['/Admin/globalConfigure/coverDetails'])
    }
  }
  onCoverRatingEdit(rowData){
    console.log("rating edit",rowData);
    sessionStorage.setItem('ratingSection',rowData.CoverId);
    sessionStorage.removeItem('editGlobalCoverId');
    this.router.navigate(['/Admin/globalConfigure/coverDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "CoverId":event.CoverId,
        "Status":event.ChangedStatus,
        "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/covers/changestatus`;
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
                  this.getExistingCoverList();
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onSubCoverRatingEdit(rowData)
  {
    console.log("SubCover edit",rowData);
    sessionStorage.setItem('SubCoverEdit',rowData.CoverId);
    sessionStorage.removeItem('editGlobalCoverId');
    sessionStorage.removeItem('ratingSection');
    this.router.navigate(['/Admin/globalConfigure/coverDetails'])
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
}
