import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-add-warranty-derails',
  templateUrl: './add-warranty-derails.component.html',
  styleUrls: ['./add-warranty-derails.component.scss']
})
export class AddWarrantyDerailsComponent implements OnInit {

  WarrantyHeader:any[]=[];WarrantyData:any[]=[];WarrantyList:any[]=[];
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
  branchValue: any;warrantydoc:any;

  constructor(
    private sharedService: SharedService, private router: Router) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');

     // this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){

      this.insuranceId = userDetails?.Result?.InsuranceId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      if(user.AttachedCompanies){
        if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
      }


      let docObj = JSON.parse(sessionStorage.getItem('ValueGet'))
        if(docObj){
           this.productValue = docObj?.ProductId,
          this.branchValue = docObj?.BranchCode,
          this.sectionValue = docObj?.SectionId;
        };


    }
    this.getExistingDoc()
  }

  ngOnInit(): void {


  }

  ongetBack(){
    this.router.navigate(['/Admin/warrantyMaster'])
  }


  getExistingDoc(){
    let ReqObj = {

      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchValue,
      "ProductId":this.productValue,
      "SectionId":this.sectionValue,
    }
    let urlLink = `${this.CommonApiUrl}master/getallnonselectedwarranty`;

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
            { key: 'WarrantyDescription', display: 'List Description' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'EffectiveDateStart', display: 'Effectiv eDate' },
            { key: 'Status', display: 'Status' },

          ];
            this.WarrantyData = data.Result.map(x=>({
              ...x,
              isChecked:false
            }));
            //this.getExistingDocument();
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
          "WarrantyId":rowData.WarrantyId,
          "BranchCode":this.branchValue
        }
        this.WarrantyList.push(entry);
    }
    else{
      let index = this.WarrantyList.findIndex(ele=>ele.CoverId==rowData.CoverId);
      this.WarrantyList.splice(index,1);
    }
    console.log("Cover List",this.WarrantyList);
    }
  onProceed(){
    if(this.WarrantyList.length!=0){
      let ReqObj = this.WarrantyList;
    let urlLink = `${this.CommonApiUrl}master/insertwarrantylist`;
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
            //         'Warranty Details Inserted Successfully',
            //         'Warranty Details',
            //         config);
                    this.router.navigate(['/Admin/warrantyMaster']);
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

