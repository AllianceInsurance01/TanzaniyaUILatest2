import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-add-warranty-derails',
  templateUrl: './add-wars-derails.component.html',
  styleUrls: ['./add-wars-derails.component.scss']
})
export class AddWarsDerailsComponent implements OnInit {

  WarrantyHeader:any[]=[];warrData:any[]=[];
  insuranceName: string;
  userDetails: any;
  insuranceId: any;
  loginId: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  sectionList: any[];
  sectionValue: any;
  productValue: any;
  branchValue: any;warratelist:any[]=[];

  constructor(
    private sharedService: SharedService, private router: Router) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');

     // this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){

      this.insuranceId = userDetails?.Result?.InsuranceId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
      this.loginId = userDetails?.Result?.LoginId;
      let docObj = JSON.parse(sessionStorage.getItem('ValueGet'))
        if(docObj){
           this.productValue = docObj?.ProductId,
          this.branchValue = docObj?.BranchCode,
          this.sectionValue = docObj?.SectionId;
        };

    }

  }

  ngOnInit(): void {
    this.getExistingDoc();

  }

  ongetBack(){
    this.router.navigate(['/Admin/warsMaster'])
  }


  getExistingDoc(){
    let ReqObj = {

      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
      "SectionId":this.sectionValue
    }
    let urlLink = `${this.CommonApiUrl}master/getallnonselectedwarrate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.WarrantyHeader = [
            {
              key: 'EntryDate',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'WarRateDesc', display: 'WarRate Description' },
            { key: 'EffectiveDateStart', display: 'Effective Date' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'Status', display: 'Status' },

          ];
            this.warrData = data.Result.map(x=>({
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
          "ProductId": this.productValue,
          "SectionId":this.sectionValue,
          "WarRateId":rowData.WarRateId,
          "BranchCode":this.branchValue
        }
        this.warratelist.push(entry);
    }
    else{
      let index = this.warratelist.findIndex(ele=>ele.CoverId==rowData.CoverId);
      this.warratelist.splice(index,1);
    }
    console.log("Cover List",this.warratelist);

    }
  onProceed(){
    if(this.warratelist.length!=0){
      let ReqObj = this.warratelist;

    let urlLink = `${this.CommonApiUrl}master/insertwarratelist`;
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
            //         'War Rate Details Inserted Successfully',
            //         'War Rate Details',
            //         config);
                    this.router.navigate(['/Admin/warsMaster']);
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
      //   "Please Select Minimum Two Cover to Include",
      //   "Add Cover",
      //   config);
    }
    //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
  }
  }

