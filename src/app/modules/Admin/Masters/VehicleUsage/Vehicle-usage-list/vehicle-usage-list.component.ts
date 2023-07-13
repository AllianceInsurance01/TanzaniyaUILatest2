import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './vehicle-usage-list.component.html',
  styleUrls: ['./vehicle-usage-list.component.scss']
})
export class VehicleUsageListComponent implements OnInit {

  tableData:any []=[];
  insuranceName: any;activeMenu="VehicleUsage";
  public columnHeader: any[] = [];
  public insuranceId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public branchList:any;branchValue:any;userDetails:any;

  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      // this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.getBranchList();
     }

  ngOnInit(): void {
    sessionStorage.removeItem('VehicleUsageId')
    this.columnHeader = [
      { key: 'VehicleUsageDesc', display: 'Vehicle Usage Desc' },
      { key: 'SectionId', display: 'Insurance Type' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
   

}
getBranchList(){
  let ReqObj = {
    "InsuranceId":this.insuranceId

  }
  let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      let obj = [{Code:"99999",CodeDesc:"ALL"}];
      this.branchList = obj.concat(data?.Result);
      //if(!this.branchValue){ this.branchValue = "99999"; this.getVehicleUsage() }
      let docObj = JSON.parse(sessionStorage.getItem('addVehicle'))
      if(docObj){ this.branchValue = docObj?.branch;
        console.log('LLLLLLLLLL',this.branchValue);
           this.getVehicleUsage();}
      else{ this.branchValue='99999'; this.getVehicleUsage();}
    }
  },
  (err) => { },
);
}
EditStatus(event){
  let ReqObj = {
    "VehicleUsageId":event.VehicleUsageId,
    "Status":event.ChangedStatus,
    "InsuranceId":this.insuranceId,
    "BranchCode":this.branchValue,
    "EffectiveDateStart":event.ChangedEffectiveDate
  }
  let urlLink = `${this.CommonApiUrl1}api/vehicleusage/changestatus`;
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
  onAddSection(){
    let ReqObj = {
      "VehicleUsageId": null,
      "BranchCode": this.branchValue
    }
    sessionStorage.setItem('VehicleUsageId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/vehicleUsageMaster/newVehicleUsageDetails'])
  }
  getVehicleUsage(){
    let ReqObj = {
      "SectionId":"13",
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchValue,
    }
    let urlLink =`${this.CommonApiUrl1}api/getallmotorvehicleusagedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.tableData = data?.Result;
            if(this.branchValue!=undefined && this.branchValue!=null){
              let docObj = {"branch":this.branchValue};
              sessionStorage.setItem('addVehicle',JSON.stringify(docObj));
            }
        }
      },
      (err) => { },
    );

  }
  public onEditSection(event) {
    let ReqObj = {
      "VehicleUsageId": event.VehicleUsageId,
      "BranchCode": this.branchValue
    }
    sessionStorage.setItem('VehicleUsageId', JSON.stringify(ReqObj));
    this.router.navigateByUrl('/Admin/vehicleUsageMaster/newVehicleUsageDetails');
  }
}
