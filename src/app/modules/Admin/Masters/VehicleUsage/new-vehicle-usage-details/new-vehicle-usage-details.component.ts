import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { VehicleUsage } from '../Vehicle-usage-list/VehicleUsageModel';

@Component({
  selector: 'app-new-/vehicle-usage-details',
  templateUrl: './new-vehicle-usage-details.component.html',
  styleUrls: ['./new-vehicle-usage-details.component.scss']
})
export class NewVehicleUsageDetailsComponent implements OnInit {
  public minDate:Date;BranchCodeList:any;

 public VehicleUsageId:any;
  activeMenu:any;statusValue:any="YES";
  insuranceId: string;productId: string;
  loginId :any;
  regionDetails :any ={};
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public countryList:any;branchList:any;branchValue:any;
  VehicleDetails:any={};
  public InsuranceList:any;InsuranceValue:any;
  userDetails: any;
  constructor(private router :Router,
    private sharedService: SharedService,private datePipe:DatePipe) {
      this.minDate = new Date();
      //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
    // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
      this.loginId = this.userDetails?.Result?.LoginId;

    this.VehicleUsageId = sessionStorage.getItem('VehicleUsageId');
    this.VehicleDetails = new VehicleUsage();

  }

  ngOnInit(): void {
    console.log("VehicleUsageId",this.VehicleUsageId);


    let Vehicle:any = JSON.parse(sessionStorage.getItem('VehicleUsageId'));
      this.VehicleUsageId = Vehicle?.VehicleUsageId;
      this.branchValue = Vehicle?.BranchCode;
      this.insuranceId= Vehicle?.InsuranceId;
    //   if(this.VehicleUsageId)  
    //   {
    //     this.getVehicleUsageDetails();
    //   }
    // else this.VehicleUsageId = null;
    if(this.VehicleUsageId!=null && this.VehicleUsageId!=undefined){
      this.getVehicleUsageDetails();
    }
    else{
      this.VehicleUsageId = null;
      this.VehicleDetails = new VehicleUsage();
      this.branchValue = Vehicle?.BranchCode;

      if(this.VehicleDetails.ClaimStatus==null)  this.VehicleDetails.ClaimStatus = 'N';
      if(this.VehicleDetails.Status==null)   this.VehicleDetails.Status ="N";
      if(this.VehicleDetails.B2CStatus==null) this.VehicleDetails.B2CStatus ="N";
    }
    this.getInsuranceList();
    this.getBranchList();
  }
  getInsuranceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":"5",
      "SectionId":"1"
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"1",CodeDesc:"ALL"}];
        this.InsuranceList = obj.concat(data?.Result);
        if(!this.InsuranceValue){ this.InsuranceValue = "1"; }
      }
    },
    (err) => { },
  );
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "VehicleUsageId":this.VehicleUsageId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
      
      }
    },
    (err) => { },
    ) ;
}
getVehicleUsageDetails(){
  let ReqObj =  {
  "InsuranceId":this.insuranceId,
  "BranchCode":this.branchValue,
  "VehicleUsageId":this.VehicleUsageId
}
  console.log("Vehicle",ReqObj)
  let urlLink = `${this.CommonApiUrl}api/getmotorvehicleusagedetails `;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    let res:any = data;
    if(res.Result){
      this.VehicleDetails = res.Result;
     //this.branchValue=this.VehicleDetails.BranchCode 
      if(this.VehicleDetails){
        if(this.VehicleDetails?.EffectiveDateStart!=null){
          this.VehicleDetails.EffectiveDateStart = this.onDateFormatInEdit(this.VehicleDetails?.EffectiveDateStart)
        }
        if(this.VehicleDetails?.EffectiveDateEnd!=null){
          this.VehicleDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.VehicleDetails?.EffectiveDateEnd)
        }
      }
    }
    console.log("Final Modal Class",this.VehicleDetails);
  },
  (err) => { },
);
}
  ongetBack(){
    this.router.navigate(['/Admin/vehicleUsageMaster'])
  }
  onProceed(){
    //
    let ReqObj = {
      "VehicleUsageId":this.VehicleUsageId,
      "SectionId":this.VehicleDetails.SectionId,
      "VehicleUsageDesc":this.VehicleDetails.VehicleUsageDesc,
      "Status":this.VehicleDetails.Status,
      "EffectiveDateStart":this.VehicleDetails.EffectiveDateStart,
      "CreatedBy":this.loginId,
      "Remarks":this.VehicleDetails.Remarks,
      "ClaimStatus":this.VehicleDetails.ClaimStatus,
      "B2CStatus":this.VehicleDetails.B2CStatus,
      "RegulatoryCode":this.VehicleDetails.RegulatoryCode,
      "BranchCode":this.branchValue,
      "InsuranceId":this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl}api/savemotorvehicleusagedetails`;
  if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
    ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
  }
  else{
    ReqObj['EffectiveDateStart'] = "";
  }
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
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
          //         'VehicleUsage Details Inserted/Updated Successfully',
          //         'VehicleUsage Details',
          //         config);
                  this.router.navigate(['/Admin/vehicleUsageMaster'])
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              // for(let entry of res.ErrorMessage){
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

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
}
