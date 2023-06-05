import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-add-cover-details',
  templateUrl: './add-cover-details.component.html',
  styleUrls: ['./add-cover-details.component.scss']
})
export class AddCoverDetailsComponent implements OnInit {

  sectionList:any[]=[];
  sectionValue:any; public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  insuranceName: string;insuranceId: string;
  loginId: any; productId: string;coverList:any[]=[];

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.getSectionList();
    //this.getCoversList();
  }

  ngOnInit(): void {


  }
  getSectionList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.sectionList = data.Result;
          let sectionValue = sessionStorage.getItem('companySectionId')
          if(sectionValue){ this.sectionValue = sectionValue; this.getCoversList(); };
          // if(this.sectionList.length!=0){
          //   this.sectionValue = this.sectionList[0].Code;
          //
          // }
        }

        },
        (err) => { },
      );
  }
  getCoversList(){
    let ReqObj = {"Limit":"0",
    "Offset":"100",
    "ProductId": this.productId,
    "InsuranceId":this.insuranceId,
    "SectionId": this.sectionValue
    }
    let urlLink = `${this.ApiUrl1}master/getallnonselectedsectioncovers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          sessionStorage.setItem('companySectionId',this.sectionValue);
          this.columnHeader = [
            {
              key: 'CoverId',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'CoverName', display: 'Cover Name' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'RegulatoryCode', display: 'Regulatory Code' },
            { key: 'Status', display: 'Status' },
            {
              key: 'AmendId',
              display: 'View',
              config: {
                isView: true,
              },
            },
          ];
          this.tableData = data.Result.map(x=>({
            ...x,
            isChecked:false
          }));
        }

      },
      (err) => { },
    );
  }
  onSelectCustomer(rowData){
    console.log("RowData",rowData);
    if(rowData.isChecked){
        let entry =  {
          "CreatedBy": this.loginId,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "SectionId":this.sectionValue,
          "CoverId": rowData.CoverId,
        }
        this.coverList.push(entry);
    }
    else{
      let index = this.coverList.findIndex(ele=>ele.CoverId==rowData.CoverId);
      this.coverList.splice(index,1);
    }
    console.log("Cover List",this.coverList);
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
  }
  onProceed(){
    if(this.coverList.length!=0){
      let ReqObj = this.coverList;
    let urlLink = `${this.ApiUrl1}master/insertsectioncover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
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
            //         'Cover Details Inserted Successfully',
            //         'Cover Details',
            //         config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
          }
          else if(data.ErrorMessage){
              if(data.ErrorMessage){
                // for(let entry of data.ErrorMessage){
                //   let type: NbComponentStatus = 'danger';
                //   const config = {
                //     status: type,
                //     destroyByClick: true,
                //     duration: 4000,
                //     hasIcon: true,
                //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //     preventDuplicates: false,
                //   };
                //   this.toastrService.show(
                //     entry.Field,
                //     entry.Message,
                //     config);
                // }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
            }

        },
        (err) => { },
      );
    }
    else{
      // let type: NbComponentStatus = 'danger';
      // const config = {
      //   status: type,
      //   destroyByClick: true,
      //   duration: 4000,
      //   hasIcon: true,
      //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
      //   preventDuplicates: false,
      // };
      // this.toastrService.show(
      //   "Please Select Minimum One Cover to Include",
      //   "Add Cover",
      //   config);
    }

  }


}
