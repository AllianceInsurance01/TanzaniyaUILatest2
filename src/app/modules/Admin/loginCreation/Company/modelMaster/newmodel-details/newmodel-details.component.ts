import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogRef,NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition  } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../../app-config.json';
import { Model} from './ModelModel'
import { SharedService } from '../../../../../../shared/shared.service';




@Component({
  selector: 'app-newmodel-details',
  templateUrl: './newmodel-details.component.html',
  styleUrls: ['./newmodel-details.component.scss']
})
export class NewmodelDetailsComponent implements OnInit {

  statusValue:any= "YES";cityList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;stateList:any[]=[];
  countryList: any[]=[];

  activeMenu:any='Model';insuranceName:any;
  ModelDetails: Model;
  BranchCode: any;
  ModelId: any;
  MakeId: any;
  BodyId: any;

  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.ModelDetails = new Model();

  }
  ngOnInit(): void {
    let modelObj = JSON.parse(sessionStorage.getItem('editModelId'));
    this.ModelId = modelObj?.ModelId;
    this.MakeId = modelObj.MakeId;
    this.BodyId = modelObj.BodyId;
    if(this.ModelId!=null && this.ModelId!=undefined){
      this.getEditModelDetails();
    }
    else{
      this.ModelDetails = new Model();
      this.MakeId = modelObj.MakeId;
      this.ModelDetails.MakeId = modelObj.MakeId;
      if(this.ModelDetails?.Status==null)  this.ModelDetails.Status = 'Y';
    }
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
  }
  getEditModelDetails(){
    console.log("MakeId",this.MakeId)
    let ReqObj =  {
      "InsuranceId":"100002",
      "BranchCode":"99999",
      "MakeId":String(this.MakeId),
      "ModelId":this.ModelId,
      "BodyId":this.BodyId

  }
    let urlLink = `${this.CommonApiUrl}master/getmotormakemodel`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.ModelDetails = res.Result;
        if(this.ModelDetails){
          if(this.ModelDetails?.EffectiveDateStart!=null){

           this.ModelDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ModelDetails?.EffectiveDateStart)
          }
          if(this.ModelDetails?.EffectiveDateEnd!=null){
            this.ModelDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ModelDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.ModelDetails);
    },
    (err) => { },
  );
}
  private newMethod() {
    return this;
  }

onSaveModel() {
  let ReqObj = {

    "BranchCode":this.ModelDetails.BranchCode,
    "BaseRate": this.ModelDetails.BaseRate,
  "BatchId": this.ModelDetails.BatchId,
  "BodyId": this.ModelDetails.BodyId,
  "BodyNameEn": this.ModelDetails.BodyNameEn,
  "CoreAppCode": this.ModelDetails.CoreAppCode,
  "CoreBodyId": this.ModelDetails.CoreBodyId,
  "CoreMakeId": this.ModelDetails.CoreMakeId,
  "CoreModelId": this.ModelDetails.CoreModelId,
  "CoreRefNo": this.ModelDetails.CoreRefNo,
  "CreatedBy": this.loginId,
  "EffectiveDateStart":this.ModelDetails.EffectiveDateStart ,
  "InsuranceId": this.ModelDetails.InsuranceId,
  "MakeId": this.ModelDetails.MakeId,
  "MakeNameEn": this.ModelDetails.MakeNameEn,
  "ModelId": this.ModelDetails.ModelId,
  "ModelIdOld":   this.ModelDetails.ModelIdOld,
  "ModelNameEn": this.ModelDetails.ModelNameEn,
  "NetRate": this.ModelDetails.NetRate,
  "ObsoleteFlag": "Y",
  "OtherBodyId1": this.ModelDetails.OtherBodyId1,
  "OtherBodyId2": this.ModelDetails.OtherBodyId2,
  "OtherMakeId1": this.ModelDetails.OtherMakeId1,
  "OtherMakeId2": this.ModelDetails.OtherMakeId2,
  "OtherModelId1": this.ModelDetails.OtherModelId1,
  "OtherModelId2": this.ModelDetails.OtherModelId2,
  "PrimaCode": this.ModelDetails.PrimaCode,
  "RefNo": this.ModelDetails.RefNo,
  "RegulatoryCode":this.ModelDetails.RegulatoryCode,
  "Remarks": this.ModelDetails.Remarks,
  "RopBodyId": this.ModelDetails.RopBodyId,
  "Status": "Y",
  "TplRate": this.ModelDetails.TplRate,
  "UploadedBy": this.ModelDetails.UploadedBy,
  "VehCc": this.ModelDetails.VehCc,
  "VehClass": this.ModelDetails.VehClass,
  "VehClassEn": this.ModelDetails.VehClassEn,
  "VehFueltype": this.ModelDetails.VehFueltype,
  "VehManfCountry": this.ModelDetails.VehManfCountry,
  "VehManfCountryEn": this.ModelDetails.VehManfCountryEn,
  "VehManfRegion": this.ModelDetails.VehManfRegion,
  "VehManfRegionEn": this.ModelDetails.VehManfRegionEn,
  "VehWeight": this.ModelDetails.VehWeight,
  "VehicleModelCode": this.ModelDetails.VehicleModelCode,
  "batchId": this.ModelDetails.batchId,

  }
  let urlLink = `${this.ApiUrl1}master/savemakemodel`;

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
          //         'Model Details Inserted/Updated Successfully',
          //         'Model Details',
          //         config);
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
dismiss() {
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
        var NewDate = new Date(new Date(format[2], format[1], format[0]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
    }

  }
}


}










 /* getColorList(){
    let urlLink = `${this.CommonApiUrl}master/getmotorcolor`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
          this.countryList = data?.Result;
      },
      (err) => { },
    );
  }*/
  /*onCountryChange(type){
    let ReqObj =  {
      "InsuranceId": this.insuranceId,
      "CountryId": this.BranchDetails.CountryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/companystate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = data?.Result;
        if(type=='change'){
            this.BranchDetails.StateCode = null;
            this.BranchDetails.CityCode = null;
        }
    },
    (err) => { },
  );
  }*/

