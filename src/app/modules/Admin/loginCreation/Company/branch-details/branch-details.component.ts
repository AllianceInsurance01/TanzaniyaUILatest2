import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NewBranchDetailsComponent } from '../../../default-configuration/new-branch-details/new-branch-details.component';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any;
  insuranceName: string;
  insuranceId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData:any[]=[];
  branchValue:any;
  BranchId:string;
  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.activeMenu = "Branch";
   }

  ngOnInit(): void {
    

    this.getExistingbranch();
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure'])
  }

  onAddSection(){
    sessionStorage.removeItem('BranchCode');
    this.router.navigate(['/Admin/globalConfigure/newBranchDetails'])
   }
   onEditSection(event){
     sessionStorage.setItem('BranchCode',event.BranchCode)
     this.router.navigate(['/Admin/globalConfigure/newBranchDetails'])
   }
   EditStatus(event){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":event.BranchCode,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/branch/changestatus`;
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
    //if(value=='Mail') this.router.navigate(['/Admin/companyList/companyConfigure/mailList']);
    //if(value=='Sms') this.router.navigate(['/Admin/companyList/companyConfigure/SmsList']);
      if(value=='Mail') this.router.navigate(['/Admin/mailMaster']);
    if(value=='Sms') this.router.navigate(['/Admin/smsMaster/newSmsDetails']);
  }


  getExistingbranch(){
    this.branchData = [];
    let ReqObj = {
      "InsuranceId":this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl}master/getallbranchdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.columnHeader = [
          { key: 'BranchName', display: 'Branch Name' },
          { key: 'CityName', display: 'City Name' },
          { key: 'EffectiveDateStart', display: 'EffectiveDate' },
          { key: 'Status', display: 'Status' },
          {
            key: 'actions',
            display: 'Action',
            config: {
              isEdit: true,
            },
          },
        ];
            this.branchData = data?.Result;
            console.log("Final Branches",this.branchData)
      },
      (err) => { },
    );
  }

}
