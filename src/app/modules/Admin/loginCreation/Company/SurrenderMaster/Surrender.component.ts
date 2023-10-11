import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
//import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-Surrender',
  templateUrl: './Surrender.component.html',
  styleUrls: ['./Surrender.component.scss']
})
export class SurrenderDetailsComponent implements OnInit {


    activeMenu = "Surrender";insuranceName:any;insuranceId:any;productId:any;loginId:any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;calculationTypes2:any[]=[];
    taxforlist:any[]=[]; changeorrefundlist:any[]=[];
    public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
    taxList: any[]=[];effectiveDateEnd:any;effectiveDateStart:any;
    minDate: Date;branchList:any[]=[];branchValue:any;
    data: any;
    TaxFor: any;
    TaxForList:any[]=[];
    CountryId: string;
    taxType :any[]=[];
    emp:Number=1;
    MotoYn:any;
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
            if(!this.branchValue){ this.branchValue = "99999"; this.getTaxForList();
            // this.getTaxFor(); this.getChangeorrefund();
             }
          }
        },
        (err) => { },
      );
    }
    onAddNewEntry(){
      console.log("Final Tax List ", this.taxList);
      //let number = String(this.taxList.length+1);
      this.taxList.push(
        {
          "EndOfYear":null,
          "SurrenderPercentage": null,
          "Status": "Y",
          "CalcType": null,
          "CoreAppCode": null,
          "RegulatoryCode":null,
          "Remarks": null
      //   "CalcType":null,
      //   "CoreAppCode":null,
      //   "DependentYn":null,
      //   "RegulatoryCode":null,
      //   "TaxExemptAllowYn": "Y",
      //   "Status": "Y",
      //   "TaxCode":null,
      //   "TaxId":null,
      //   "Value":null,
      //   "MinimumAmount":null
       
        }
      );
      this.taxList.push()
    }
  
    getTaxForList(){
         let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "SectionId": "99999",
         }
         let urlLink = `${this.CommonApiUrl1}master/dropdown/policytermsmaster`;
       this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
         (data: any) => {
           if(data.Result){
            this.TaxForList=data?.Result;
           }
         },
         (err) => { },
       );
     }
    getTaxDetails(){
      this.taxList=[];
      let ReqObj ={
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "SectionId": "99999",
          "PolicyTerm": this.TaxFor
      }
      let urlLink = `${this.CommonApiUrl1}master/getallsurrender`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result.Surrenders){
            this.emp=1;
            if(data?.Result?.EffectiveDateStart!=null){
              this.effectiveDateStart = this.onDateFormatInEdit(data?.Result?.EffectiveDateStart)
            }
          //   if(data?.Result?.EffectiveDateEnd!=null){
          //     this.effectiveDateEnd = this.onDateFormatInEdit(data?.Result?.EffectiveDateEnd);
          //   }
          //   this.TaxFor=data?.Result?.TaxFor;
          this.taxList.push(
            {
              "PolicyYear":null,
              "SurrenderPercentage": null,
              "Status": "Y",
              "CalcType": null,
              "CoreAppCode": null,
              "RegulatoryCode":null,
              "Remarks": null
            }
          );
              this.taxList = data?.Result?.Surrenders;
              console.log("TaxList ",this.taxList)
           
              // this.getTaxFor(); 
              // this.getChangeorrefund();
          }
          else{
            this.taxList=[]; this.emp=1;
           if(this.TaxFor!=null){
            console.log('JJJJJJJJJJ',this.TaxFor);
                for(let i=1;i<=this.TaxFor;i++){
                    this.taxList.push(
                        {
                          "PolicyYear":i,
                          "SurrenderPercentage": null,
                          "Status": "Y",
                          "CalcType": null,
                          "CoreAppCode": null,
                          "RegulatoryCode":null,
                          "Remarks": null
                        }
                      );
                }
            }
            //   this.taxList = [
            //     {
            //         "EndOfYear":null,
            //         "SurrenderPercentage": null,
            //         "Status": "Y",
            //         "CalcType": null,
            //         "CoreAppCode": null,
            //         "RegulatoryCode":null,
            //         "Remarks": null
            //     }
            //   ]
           
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
    onSaveTaxDetails(type){
      let ReqObj = {
          "CreatedBy":this.loginId,
    "EffectiveDateEnd":null,
    "EffectiveDateStart": this.effectiveDateStart,
    "InsuranceId": this.insuranceId,
    "PolicyTerm":this.TaxFor,
    "ProductId":this.productId,
    "SectionId": "99999",
    "Surrenders":this.taxList,
    "SaveType":type
      }
      let urlLink = `${this.CommonApiUrl1}master/insertsurrender`;
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
    deleteRow(i){
        var delBtn = confirm("Do you want to delete ?");
      if ( delBtn == true ) {
        this.taxList.splice(i, 1 );
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

  activeclick(taxList){
    let total
    let i=0;
    for(let f of taxList){
      if(f.Status == 'P'){
     f.Status='Y';
     }
     else if(f.Status == 'N'){
      f.Status='Y';
     }
  console.log('Change',f.Status);
       i+=1;
    } 
  }

  Deactiveclick(taxList){
    let total
    let i=0;
    for(let f of taxList){
      if(f.Status == 'Y'){
     f.Status='N';
     }
  console.log('Change',f.Status);
       i+=1;
    } 
  }
  }
  
