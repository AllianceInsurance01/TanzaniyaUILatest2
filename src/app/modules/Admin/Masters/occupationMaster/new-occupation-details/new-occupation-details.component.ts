import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-new-occupation-details',
  templateUrl: './new-occupation-details.component.html',
  styleUrls: ['./new-occupation-details.component.scss']
})
export class NewOccupationDetailsComponent implements OnInit {

  public activeMenu:any='Occupation';branchValue:any="";
  insuranceName: string;regionValue:any="";effectiveDate:any;
  paramList:any[]=[];paramKeylist:any[]=[];minDate:Date;
  statusValue:any="Y";branchList:any[]=[];productId:any;
  occupationName:any="";coreAppCode:any="";regCode:any="";
  remarks:any="";occupationId:any=null;loginId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId:any;userDetails:any;productList:any[]=[];categoryList:any[]=[];
  categoryvalue:any;

  constructor(private router:Router,private datePipe:DatePipe,private sharedService: SharedService,
    ) {
    this.minDate = new Date();
    //this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;

    this.paramList = [
      { "key":"", "ColumnName" : "" }
    ];
    this.paramKeylist = [
      {"text":"CoverId","value":"01"},
      {"text":"SectionId","value":"02"},
      {"text":"branchCode","value":"03"},
      {"text":"CountryId","value":"04"},
      {"text":"CityId","value":"05"},
      {"text":"InsuranceId","value":"06"},
      {"text":"subUserType","value":"07"},
    ]
   }

  ngOnInit(): void {
    let docObj = JSON.parse(sessionStorage.getItem('addDetails'))
    if(docObj){ this.insuranceId = docObj?.InsuranceId;}
    this.getBranchList();
    this.getProductList();
    this.getCategoryList();
  }


  getProductList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        /*let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getExistingOccupations() }*/
        let obj = [{Code:"99999",CodeDesc:"ALL"}]
        this.productList = obj.concat(data?.Result);
        let docObj = JSON.parse(sessionStorage.getItem('addDetails'))
        if(docObj){ this.productId = docObj?.CodeDesc;}
        //sessionStorage.setItem('product',this.productId);

      }
    },
    (err) => { },
  );
  }

  getCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchValue
    }
    let urlLink = `${this.CommonApiUrl}dropdown/categoryid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        /*let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getExistingOccupations() }*/
        this.categoryList=data.Result;
      }
    },
    (err) => { },
  );
  }

  getBranchList(){
      let ReqObj = {
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.branchList = obj.concat(data?.Result);
          let occupation:any = JSON.parse(sessionStorage.getItem('editOccupationId'));
          if(occupation){
            this.occupationId = occupation?.OccupationId;
            this.branchValue = occupation?.BranchCode;
            this.productId= occupation?.ProductId;
            this.getOccupationDetails();
           
            //this.getCategoryList();
          }
          else this.occupationId = null;
        }
      },
      (err) => { },
    );
  }
  getOccupationDetails(){
    let ReqObj = {
      "OccupationId": this.occupationId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId":this.productId

    }
    let urlLink = `${this.CommonApiUrl}master/getbyoccupationid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let res = data?.Result;
          this.branchValue = res?.BranchCode;
          this.coreAppCode = res?.CoreAppCode;
          this.occupationName = res?.OccupationName;
          this.regCode = res?.RegulatoryCode;
          this.remarks = res?.Remarks;
          this.statusValue = res?.Status;
          this.categoryvalue=res?.CategoryId

          
          if(res?.EffectiveDateStart!=null){
            this.effectiveDate = this.onDateFormatInEdit(res?.EffectiveDateStart)
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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

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
  }
  ongetBack(){
    sessionStorage.removeItem('editOccupationId');
    this.router.navigate(['/Admin/occupationMaster'])
  }
  onProceed(){
    let ReqObj = {
      "OccupationId": this.occupationId,
      "OccupationName": this.occupationName,
      "CoreAppCode": this.coreAppCode,
      "RegulatoryCode": this.regCode,
      "Status": this.statusValue,
      "EffectiveDateStart": this.effectiveDate,
      "Remarks": this.remarks,
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId":this.productId,
      "CategoryId":this.categoryvalue
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
      let urlLink = `${this.CommonApiUrl}master/insertoccupation`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            console.log(data);
            let res:any=data;
            if(data.Result){
                  // let type: NbComponentStatus = 'success';
                  // const config = {
                  //   status: type,
                  //   destroyByClick: true,
                  //   duration: 4000,
                  //   hasIcon: true,
                  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //   preventDuplicates: false,
                  // };
                  // this.toastrService.show(
                  //   'Occupation Details Inserted/Updated Successfully',
                  //   'Occupation Details',
                  //   config);
                    this.router.navigate(['/Admin/occupationMaster'])
                   //this.ref.close();
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
}
