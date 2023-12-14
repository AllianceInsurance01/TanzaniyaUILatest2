import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { count } from 'console';

@Component({
  selector: 'app-companytax',
  templateUrl: './companytax.component.html',
  styleUrls: ['./companytax.component.scss']
})
export class CompanyTaxListComponent implements OnInit {
    activeMenu="CompanyTax";insuranceName:any;insuranceId:any;productId:any;loginId:any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;calculationTypes2:any[]=[];
    taxforlist:any[]=[]; changeorrefundlist:any[]=[];
    public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
    taxList: any[]=[];effectiveDateEnd:any;effectiveDateStart:any;
    minDate: Date;branchList:any[]=[];branchValue:any;
    data: any;
    TaxForList:any[]=[];
    TaxFor:any;
    taxType :any[]=[];
  CountryId: string;
    constructor(private router:Router,private sharedService: SharedService,
     private datePipe:DatePipe) {
      this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.calculationTypes2 = [
        {"value": "","text": "Select"},
        {"value": "A","text": "Amount"},
        {"value": "M","text": "Mile"},
        {"value": "P","text": "Percentage"}
      ];
      this.getBranchList();
      this.CountryId=sessionStorage.getItem('CountryIds');

      if(this.CountryId){
        this.getTaxType();
      }
    }
  
    ngOnInit(): void {
    }
    getTaxForList(type){
   if(type=='change'){
    this.TaxFor=''
   }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode":this.branchValue
      }
      let urlLink = `${this.CommonApiUrl1}dropdown/taxfordesc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          // let obj = [{Code:"99999",CodeDesc:"ALL"}];
         this.TaxForList=data?.Result;
         if(this.TaxFor==null || this.TaxFor==''){
          this.TaxFor = 'NB';
          this.getTaxDetails();
        }
        //  if(!this.TaxFor){ this.TaxFor = "NB"; this.getTaxDetails();
        //  // this.getTaxFor(); this.getChangeorrefund();
        //   }
         

        }
      },
      (err) => { },
    );
  }
    getBranchList(){
        let ReqObj = {
          "InsuranceId": this.insuranceId
        }
        let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            let obj = [{Code:"99999",CodeDesc:"ALL"}];
            this.branchList = obj.concat(data?.Result);
            if(!this.branchValue){ this.branchValue = "99999"; this.getTaxForList('direct');
            // this.getTaxFor(); this.getChangeorrefund();
             }
          }
        },
        (err) => { },
      );
    }
    onAddNewEntry(){
      console.log("Final Tax List ", this.taxList);
      let number = String(this.taxList.length+1);
      this.taxList.push(
        {
          "TaxId":null,
          "TaxCode":null,
          "CalcType":null,
           "Value":null,
          "TaxExemptAllowYn":"Y",
           "Status": "Y",
           "RegulatoryCode": null,
           "CoreAppCode": null,
          "MinimumAmount":null,
          "DependentYn":null
          // "CalcType": null,
          // "Status": "Y",
          // "TaxDesc": null,
          // "TaxCode": null,
          // "TaxId": number,
          // "TaxName": null,
          // "Value": null,
          // "Delete":null,
          // "TaxFor":null,
          // "ChargeOrRefund":null
        }
      );
      this.taxList.push()
    }
    getTaxDetails(){
      this.taxList=[];
      let ReqObj ={
        "CountryId": sessionStorage.getItem('CountryIds'),
        "InsuranceId" : this.insuranceId,
        "BranchCode": this.branchValue,
        "TaxFor": this.TaxFor
      }
      let urlLink = `${this.ApiUrl1}master/getallcompaniestax`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            if(data?.Result?.EffectiveDateStart!=null){
              this.effectiveDateStart = this.onDateFormatInEdit(data?.Result?.EffectiveDateStart)
            }
            if(data?.Result?.EffectiveDateEnd!=null){
              this.effectiveDateEnd = this.onDateFormatInEdit(data?.Result?.EffectiveDateEnd);
            }
            this.TaxFor=data?.Result?.TaxFor;
              this.taxList = data?.Result?.TaxList;
            
              console.log("TaxList ",this.taxList)
             
              // this.getTaxFor(); 
              // this.getChangeorrefund();
          }
          else{
            this.taxList = [
              {
            
                "TaxId":null,
                "TaxCode":null,
                "CalcType":null,
                 "Value":null,
                "TaxExemptAllowYn":"Y",
                 "Status": "Y",
                 "RegulatoryCode": null,
                 "CoreAppCode": null,
                "MinimumAmount":null,
                "DependentYn":null

              }
            ]
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
    onStartDateChange(){
      console.log("Start Date",this.effectiveDateStart)
      var d = this.effectiveDateStart;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.effectiveDateEnd = new Date(year + 28, month, day);
    }
    onSaveTaxDetails(){

      let countryId=sessionStorage.getItem('CountryIds');
      let countID
      if(countryId){
           countID= countryId
      }
      else{
        countID=null;
      }
      let ReqObj = {
        "TaxFor": this.TaxFor,
        "CreatedBy": this.loginId,
        "BranchCode": this.branchValue,
        "EffectiveDateStart": this.effectiveDateStart,
        "InsuranceId": this.insuranceId,
        "CountryId":countID,
        "TaxList": this.taxList
      }
      let urlLink = `${this.ApiUrl1}master/savecompanytaxes`;
      if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
        ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
      }
      else{
        ReqObj['EffectiveDateStart'] = "";
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res:any =data;
          if(data.Result){
  
            //   this.Toaster.open({
            //   text:'Tax Details Inserted/Updated Successfully',
            //   caption: 'Tax Details',
            //   type: 'success',
            // });
            this.getTaxDetails()
  
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
            //         'Tax Details Inserted/Updated Successfully',
            //         'Tax Details',
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
    deleteRow(x,name,i){
      /*var delBtn = confirm(" Do you want to delete ?");
      if ( delBtn == true ) {
        this.taxList.splice(x, 1 );
      }*/
      console.log('nnnnnnn',name)
      console.log('vvvvvvv',x);
      console.log('iiiiiiiiiii',i);
      if(name!=null){
        let ReqObj = {
          "ProductId": this.productId,
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchValue,
          "TaxId": x
        }
        let urlLink = `${this.ApiUrl1}master/deletecompanytaxesid`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res:any =data;
            if(data.Result){
              //window.location.reload();
          // this.Toaster.open({
          //       text:'Tax Details Deleted Successfully',
          //       caption: 'Tax DetailsDelete',
          //       type: 'success',
          //     });
              this.getTaxDetails()
  
  
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
              //         'Tax Details Inserted/Updated Successfully',
              //         'Tax Details',
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
      else{
        var delBtn = confirm("Do you want to delete ?");
      if ( delBtn == true ) {
        this.taxList.splice(i, 1 );
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
        if(value=='Mail') this.router.navigate(['/Admin/mailMaster']);
        if(value=='Sms') this.router.navigate(['/Admin/smsMaster/newSmsDetails']);
        if(value=='CompanyTax') this.router.navigate(['/Admin/CompanyTax']);

      }
    getTaxFor(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode":this.branchValue
      }
      let urlLink = `${this.CommonApiUrl1}dropdown/taxfor`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.taxforlist = data?.Result;
         
        }
      },
      (err) => { },
    );
  }

  getTaxType(){
    let ReqObj = {
      "CountryId": this.CountryId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/countrytaxes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        this.taxType = data?.Result;
      }
    },
    (err) => { },
  );
}
  getChangeorrefund(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchValue
    }
    let urlLink = `${this.CommonApiUrl1}dropdown/taxpaymenttype`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        this.changeorrefundlist = data?.Result;
      }
    },
    (err) => { },
  );
  }
}