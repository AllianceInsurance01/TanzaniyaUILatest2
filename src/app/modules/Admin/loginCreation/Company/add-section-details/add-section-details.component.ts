import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
@Component({
  selector: 'app-add-section-details',
  templateUrl: './add-section-details.component.html',
  styleUrls: ['./add-section-details.component.scss']
})
export class AddSectionDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  sectionList:any[]=[];
  insuranceName: any;insuranceId:any;productId:any;loginId:any;
  constructor(private router:Router,
    private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.getSectionList();
   }

  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'ProductId',
        display: 'Select',
        config: {
          isChecked: true,
          model:'isChecked'
        },
      },
      { key: 'SectionName', display: 'Section Name' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDateEnd', display: 'End Date' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'AmendId',
        display: 'View',
        config: {
          isView: true,
        },
      },
    ];
    // this.tableData = [
    //   {
    //       "SectionId": 3,
    //       "ProductId": 4,
    //       "InsuranceId": "100002",
    //       "EffectiveDateStart": "02/09/2022",
    //       "EffectiveDatEend": "03/11/2029",
    //       "SectionName": "All Risk",
    //       "EntryDate": "03/09/2022",
    //       "Status": "Y",
    //       "CoreAppCode": "40032",
    //       "AmendId": 0,
    //       "Remarks": "None"
    //   },
    //   {
    //       "SectionId": 1,
    //       "ProductId": 4,
    //       "InsuranceId": "100003",
    //       "EffectiveDateStart": "18/09/2022",
    //       "EffectiveDatEend": "25/12/2049",
    //       "SectionName": "Building",
    //       "EntryDate": "14/09/2022",
    //       "Status": "Y",
    //       "CoreAppCode": "1",
    //       "AmendId": 0,
    //       "Remarks": "Ok"
    //   },
    // ];
  }
  getSectionList(){
    let ReqObj = {"Limit":"0",
    "Offset":"100",
    "ProductId": this.productId,
    "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/getallnonselectedsections`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.columnHeader = [
            {
              key: 'ProductId',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'SectionName', display: 'Section Name' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'CoreAppCode', display: 'Core App Code' },
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
    if(rowData.isChecked){
        let entry =  {
          "CreatedBy": this.loginId,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "SectionId":rowData.SectionId
        }
        this.sectionList.push(entry);
    }
    else{
      let index = this.sectionList.findIndex(ele=>ele.SectionId==rowData.SectionId);
      this.sectionList.splice(index,1);
    }
    console.log("Referral List",this.sectionList);
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails']);
  }
  onProceed(){
    if(this.sectionList.length!=0){
      let ReqObj = this.sectionList;
    let urlLink = `${this.ApiUrl1}master/insertproductsection`;
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
            //         'Section Details Inserted Successfully',
            //         'Section Details',
            //         config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails']);
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
      //   "Please Select Minimum One Section to Include",
      //   "Add Section",
      //   config);
    }

  }
}
