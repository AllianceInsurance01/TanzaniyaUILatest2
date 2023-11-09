import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NewCompanyDetailsComponent } from '../new-company-details/new-company-details.component';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companyHeader: any[]=[];
  companyData: any[]=[];
  brokerYn:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  userDetails: any;
  loginId: any;
  constructor(private router:Router,private sharedService: SharedService) {
    sessionStorage.removeItem('insuranceConfigureId')
    this.brokerYn = "N";
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.loginId = user?.LoginId;
        this.getCompanyList();
  }

  ngOnInit(): void {
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":this.brokerYn,
      "LoginId": this.loginId,
      "Limit":"0",
      "Offset":""
    }
    let urlLink = `${this.ApiUrl1}master/getallinscompanydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.companyHeader = [
            { key: 'CompanyName', display: 'InsuranceCompany Name' },
            { key: 'InsuranceId', display: 'Insurance Code' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'Status', display: 'Status' },

            {
              key: 'configure',
              display: 'Configure',
              config: {
                isConfigure: true,
              },
            },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
          ];
          this.companyData = data.Result;
        }

      },
      (err) => { },
    );
  }
  onAddNew(){
    this.router.navigate(['/Admin/companyList/companyConfigure']);
  }
  EditStatus(event){
    let ReqObj = {
      "InsuranceId":event.InsuranceId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate

    }
    let urlLink = `${this.ApiUrl1}master/company/changestatus`;
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
                window.location.reload()
        }
      },
      (err) => { },
    );
  }

  onEdit(event){
    sessionStorage.setItem('InsuranceId',event.InsuranceId);
    this.router.navigate(['/Admin/companyList/newCompanyDetails'])
  }
  onConfigure(rowData:any){
    console.log('OOOOOOOOOOOO',rowData.CountryId);
    sessionStorage.removeItem('insuranceConfigureName');
    sessionStorage.setItem('insuranceConfigureName',rowData.CompanyName);
    sessionStorage.setItem('insuranceConfigureId',rowData.InsuranceId)
    sessionStorage.setItem('insReload',"true");
    sessionStorage.setItem('CountryIds',rowData.CountryId);
    this.router.navigate(['/Admin/companyList/companyConfigure'])
  }
  onAddNewIns(){

      sessionStorage.removeItem('InsuranceId');
      this.router.navigate(['/Admin/companyList/newCompanyDetails'])

  }
}
