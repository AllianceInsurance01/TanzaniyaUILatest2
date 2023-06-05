import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogRef,NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition  } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { Make} from './MakeModel';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-newmake-details',
  templateUrl: './newmake-details.component.html',
  styleUrls: ['./newmake-details.component.scss']
})
export class NewmakeDetailsComponent implements OnInit {
  @Input() title: any;@Input() MakeId:any;
  statusValue:any= "YES";cityList:any[]=[]; branchList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;stateList:any[]=[];
  countryList: any[]=[];
  activeMenu:any='Make';insuranceName:any;
  MakeDetails: Make;
  BranchCode: any;
  MakeList:any;



  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    //this.MakeId = sessionStorage.getItem('MakeId');
    this.MakeDetails = new Make();
    //this.getMakeList();

     }

  ngOnInit(): void {

    let Makeurl: any = JSON.parse(sessionStorage.getItem('MakeId'));

    console.log("Sno Obj", Makeurl)
    this.MakeId= Makeurl?.MakeId;
    this.BranchCode= Makeurl?.BranchCode;

    console.log('vvvvvvvvv',this.BranchCode)
    this.getBranchList();
    if(this.MakeId!=null && this.MakeId!=undefined && this.MakeId != "undefined"){
      this.getEditMakeDetails();
    }
    else{
      this.MakeDetails = new Make();
      this.MakeId=null;
      if(this.MakeDetails?.Status==null)  this.MakeDetails.Status = 'Y';
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

  getBranchList() {
    let ReqObj = {
      "InsuranceId":"100002"
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);

          let secObj = JSON.parse(sessionStorage.getItem('MakeId'))
          if (secObj) {
            this.BranchCode = secObj?.BranchCode;
            //this.getEditMakeDetails()
          }
          else{ this.BranchCode= '99999';
          //this.getEditMakeDetails()
        }



        }
      },
      (err) => { },
    );
  }
  getEditMakeDetails(){
    console.log("Make ID",this.MakeId);
    let ReqObj =  {
      "MakeId":this.MakeId,
"InsuranceId":"100002",
"BranchCode":this.BranchCode

  }
    let urlLink = `${this.CommonApiUrl}master/getmakeid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.MakeDetails = res.Result;
        if(this.MakeDetails){
          if(this.MakeDetails?.EffectiveDateStart!=null){

           this.MakeDetails.EffectiveDateStart = this.onDateFormatInEdit(this.MakeDetails?.EffectiveDateStart)
          }
          if(this.MakeDetails?.EffectiveDateEnd!=null){
            this.MakeDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.MakeDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.MakeDetails);
    },
    (err) => { },
  );
}
getMakeList(){
  let ReqObj = {
 "InsuranceId":"100002"

  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      let obj = [];
      this.MakeList = obj.concat(data?.Result);
      //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
    }
  },
  (err) => { },
);
}
  private newMethod() {
    return this;
  }
  onSaveMake() {
    let ReqObj = {

      "MakeId":this.MakeId,
      "MakeNameEn":this.MakeDetails.MakeNameEn,
      "ColorDesc":this.MakeDetails.ColorDesc,
      "EffectiveDateStart":this.MakeDetails.EffectiveDateStart,
      "Remarks":this.MakeDetails.Remarks,
      //"EffectiveDateEnd":this.MakeDetails.EffectiveDateEnd,
      "EntryDate":this.MakeDetails.EntryDate,
      "Status":this.MakeDetails.Status,
      "InsuranceId":"100002",
      "BranchCode":this.BranchCode,
      "CreatedBy":this.loginId


    }
    let urlLink = `${this.CommonApiUrl}master/savemakemotor`;
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
            //         'Make Details Inserted/Updated Successfully',
            //         'Make Details',
            //         config);
            //         this.dismiss();
                    this.router.navigate(['/Admin/makeMaster']);

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
    this.router.navigate(['/Admin/makeMaster']);
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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }



}

