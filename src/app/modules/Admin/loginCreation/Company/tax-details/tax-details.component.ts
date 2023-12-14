import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
//import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.scss']
})
export class TaxDetailsComponent implements OnInit {

  activeMenu = "Tax";insuranceName:any;insuranceId:any;productId:any;loginId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;calculationTypes2:any[]=[];
  taxforlist:any[]=[]; changeorrefundlist:any[]=[];
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  taxList: any[]=[];effectiveDateEnd:any;effectiveDateStart:any;
  minDate: Date;branchList:any[]=[];branchValue:any;
  data: any;
  TaxFor: string;
  TaxForList:any[]=[];
  CountryId: string;
  taxType :any[]=[];
  MotoYn: string;
  constructor(private router:Router,private sharedService: SharedService,
   private datePipe:DatePipe) {
    this.minDate = new Date();
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    this.MotoYn=sessionStorage.getItem('productType');
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
      "CalcType":null,
      "CoreAppCode":null,
      "DependentYn":null,
      "RegulatoryCode":null,
      "TaxExemptAllowYn": "Y",
      "Status": "Y",
      "TaxCode":null,
      "TaxId":null,
      "Value":null,
      "MinimumAmount":null
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

  getTaxForList(type){
    if(type=='change'){
     this.TaxFor="";
    }
       let ReqObj = {
         "InsuranceId": this.insuranceId,
         "BranchCode":this.branchValue
       }
       let urlLink = `${this.CommonApiUrl1}dropdown/taxfordesc`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         if(data.Result){
          this.TaxForList=data?.Result;
          if(this.TaxFor==null || this.TaxFor==''){
            this.TaxFor = 'NB';
            this.getTaxDetails();
          }
         
         }
       },
       (err) => { },
     );
   }
  getTaxDetails(){
    this.taxList=[];
    let ReqObj ={
      "ProductId" : this.productId,
      "InsuranceId" : this.insuranceId,
      "BranchCode": this.branchValue,
      "CountryId":this.CountryId,
      "TaxFor":this.TaxFor
    }
    let urlLink = `${this.ApiUrl1}master/getallproducttax`;
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
                "CalcType":null,
                "TaxExemptAllowYn": "Y",
                "Status": "Y",
               "CoreAppCode":null,
               "DependentYn":null,
                "RegulatoryCode":null,
                "TaxCode":null,
                "TaxId":null,
               "Value":null,
               "MinimumAmount":null
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
    let ReqObj = {
      "CreatedBy": this.loginId,
      "BranchCode": this.branchValue,
      "CountryId": this.CountryId,
      "EffectiveDateStart": this.effectiveDateStart,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "TaxFor": this.TaxFor,
      "TaxList": this.taxList
    }
    let urlLink = `${this.ApiUrl1}master/saveproducttaxes`;
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
          this.getTaxDetails();
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              console.log("Error Iterate",data.ErrorMessage)
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
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList'])
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
    if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
    if(value=='SURVIVAL')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/survival']);
    if(value=='Surrender')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/surrender']);
    if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
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
