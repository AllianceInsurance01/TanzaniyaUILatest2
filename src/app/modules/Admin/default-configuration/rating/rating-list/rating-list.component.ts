import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent implements OnInit {

  activeMenu:any="Rating";factorData:any[]=[];
  columnHeader:any[]=[];productList:any[]=[];productValue:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,private sharedService: SharedService,) {
        this.getExistingProductList();
  }

  ngOnInit(): void {
  }
  getExistingProductList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/product`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.productList = data.Result;
          let productValue =  sessionStorage.getItem('ratingProductId');
          if(productValue){
              this.productValue = productValue;
              this.ongetRatingList();
          }
        }

      },
      (err) => { },
    );

  }

  ongetRatingList(){
    if(this.productValue!=null && this.productValue!=undefined){
      let ReqObj = {"ProductId":this.productValue}
      let urlLink = `${this.ApiUrl1}master/getallratingfields`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          sessionStorage.setItem('ratingProductId',this.productValue);
          //this.productList = data.Result;
          this.columnHeader = [
            { key: 'RatingField', display: 'Rating Field Name' },
            { key: 'RatingDesc', display: 'Description' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            // { key: 'InputTable', display: 'Input Table' },
            // { key: 'InputColumn', display: 'Input Column' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
            // {
            //   key: 'actions',
            //   display: 'FactorTypeDetails',
            //   config: {
            //     isAdd: true,
            //   },
            // }
          ];
          this.factorData = data?.Result;
        }

      },
      (err) => { },
    );
    }
  }
  onRedirect(value){
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
  onAddNewFactor(){
    sessionStorage.removeItem('ratingFactorId');
    this.router.navigate(['/Admin/globalConfigure/updateRating'])
  }
  onEditFactor(rowData){
    sessionStorage.setItem('ratingFactorId',rowData.RatingId);
    this.router.navigate(['/Admin/globalConfigure/updateRating'])
  }
  EditStatus(rowData){
    let ReqObj = {
      "RatingId":rowData.RatingId,
      "ProductId":this.productValue,
      "Status":rowData.ChangedStatus,
      "EffectiveDateStart":rowData.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/ratingfield/changestatus`;
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
                  this.ongetRatingList();
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }

}
