import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogRef,NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition  } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';
import { Color} from './ColorModel'
import { SharedService } from '../../../../../shared/shared.service';



@Component({
  selector: 'app-newcolor-details',
  templateUrl: './newcolor-details.component.html',
  styleUrls: ['./newcolor-details.component.scss']
})
export class NewcolorDetailsComponent implements OnInit {
  @Input() title: any;@Input() ColorId:any;
  statusValue:any= "YES";cityList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;stateList:any[]=[];
  countryList: any[]=[];

  activeMenu:any='Color';insuranceName:any;
  ColorDetails: Color;
  BranchCode: any;
   constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');

      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.insuranceId = userDetails?.Result?.LoginBranchDetails[0].InsuranceId;
    }
    this.ColorId = sessionStorage.getItem('ColorId');
    this.ColorDetails = new Color();
  //this.getEditColorDetails();
  }
  ngOnInit(): void {
    console.log("Color id",this.ColorId);
    if(this.ColorId!=null && this.ColorId!=undefined){
      this.getEditColorDetails();
    }
    else{
      this.ColorDetails = new Color();
      if(this.ColorDetails?.Status==null)  this.ColorDetails.Status = 'Y';
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

  getEditColorDetails(){
    console.log("Color ID",this.ColorId)
    let ReqObj =  {
      "ColorId": String(this.ColorId),
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"

  }
    let urlLink = `${this.CommonApiUrl}master/getmotorcolor`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.ColorDetails = res.Result;
        if(this.ColorDetails){
          if(this.ColorDetails?.EffectiveDateStart!=null){

           this.ColorDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ColorDetails?.EffectiveDateStart)
          }
          if(this.ColorDetails?.EffectiveDateEnd!=null){
            this.ColorDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ColorDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.ColorDetails);
    },
    (err) => { },
  );
}
  private newMethod() {
    return this;
  }

onSaveColor() {
  let ReqObj = {

    "ColorId":this.ColorId,
    "ColorCode":this.ColorDetails.ColorCode,
    "ColorDesc":this.ColorDetails.ColorDesc,
    "EffectiveDateStart":this.ColorDetails.EffectiveDateStart,
    "Remarks":this.ColorDetails.Remarks,
     "InsuranceId":this.insuranceId,
    "BranchCode":"99999",
    "CreatedBy":this.loginId,
    "RegulatoryCode":this.ColorDetails.RegulatoryCode,
    "Status": this.ColorDetails.Status,
  }
  let urlLink = `${this.CommonApiUrl}master/savemotorcolor`;
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
          /*let type: NbComponentStatus = 'success';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  'Color Details Inserted/Updated Successfully',
                  'Color Details',
                  config);*/

                  this.router.navigate(['/Admin/colorMaster'])
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              for(let entry of res.ErrorMessage){
                /*let type: NbComponentStatus = 'danger';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  entry.Field,
                  entry.Message,
                  config);*/
              }
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );
}
dismiss() {
  this.router.navigate(['/Admin/colorMaster'])
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
        let NewDate = format[2]+'-'+format[1]+'-'+format[0];
        console.log("Retrn Date",NewDate)
        return NewDate;
      }
    }

  }
}


}
