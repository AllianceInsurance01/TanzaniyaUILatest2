import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { SharedService } from '../../../../../../shared/shared.service';
//import { TinyUrl } from './tinyurl';
import { Industry } from './industry-details';

@Component({
  selector: 'app-industry-details',
  templateUrl: './industry-details.component.html',
  styleUrls: ['./industry-details.component.scss']
})
export class IndustryDetailsComponent implements OnInit {

  public activeMenu:any='Tinyurl';
 public Industrydetails:any;minDate:Date;
  public branchList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;
  loginId: any;
  Sno: any;
  branchValue: any;
  CategoryId: any;
  BranchCode: any;
  IndustryId: any;
  CategoryList:any[]=[];
  CategoryValue: any;


  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe,) {
    this.minDate = new Date();
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
    console.log("pppppp", this.productId)
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
    }
    // this.insuranceId = userDetails.Result.LoginBranchDetails[0].InsuranceId;
    this.Industrydetails = new Industry();


  }

  ngOnInit(): void {

    let tinyurl: any = JSON.parse(sessionStorage.getItem('CategoryId'));

      console.log("Sno Obj", tinyurl)
      this.CategoryId = tinyurl?.CategoryId;
      this.branchValue = tinyurl?.BranchCode;
      this.IndustryId = tinyurl?.IndustryId;
      this.insuranceId = tinyurl?.InsuranceId;

      this.productId=tinyurl?.ProductId;

    if(this.IndustryId!=null && this.IndustryId!=undefined){
      this.getEditIndustryDetails()
    }
    else{

      this.Industrydetails = new Industry();
      this.branchValue = tinyurl?.BranchCode;
      this.productId=tinyurl?.ProductId;
      this.IndustryId =null;
      if(this.Industrydetails?.Status==null) this.Industrydetails.Status = 'N';

      this.Industrydetails.CreatedBy = this.loginId;
    }
    this.getBranchList();
    this.getCatogery();
    //this.getEditTinyUrlDetails()

  }
  getEditIndustryDetails(){
    let ReqObj = {

      "BranchCode":this.branchValue,
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "CategoryId":this.CategoryId,
      "IndustryId":this.IndustryId
    }
    let urlLink = `${this.CommonApiUrl}master/getbyindustryid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        let entry = this.Industrydetails[0];
        if (res.Result) {
          this.Industrydetails = res.Result;
          if (this.Industrydetails) {

            if (this.Industrydetails?.EffectiveDateStart != null) {
              this.Industrydetails.EffectiveDateStart = this.onDateFormatInEdit(this.Industrydetails?.EffectiveDateStart)
            }
            if (this.Industrydetails?.EffectiveDateEnd != null) {
              this.Industrydetails.EffectiveDateEnd = this.onDateFormatInEdit(this.Industrydetails?.EffectiveDateEnd)
            }
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
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  getCatogery(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchValue,
    }
    let urlLink = `${this.CommonApiUrl}dropdown/industrycategory`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.CategoryList = data?.Result;

        let docObj = JSON.parse(sessionStorage.getItem('CategoryId'))
        if(docObj){ this.CategoryValue = docObj?.CategoryId;
          console.log('IIIIIIIIII',this.CategoryValue);
         }
        else{ this.CategoryValue='3';}
        //if(!this.branchValue){ this.branchValue = "99999";  }
      }
    },
    (err) => { },

  );
  }
  getBranchList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);

          let secObj = JSON.parse(sessionStorage.getItem('CategoryId'))
          if (secObj) {
            this.BranchCode = secObj?.BranchCode;
          }
          else{ this.BranchCode= '99999'; }



        }
      },
      (err) => { },
    );
  }
  onProceed(){
    /*if(this.ItemValue!=undefined && this.ItemValue!=null && this.ItemValue!=''){
      //let code = this.productItem
      let code = this.TypeList.find(ele=>ele.CodeDesc==this.ItemValue)
      console.log('codes',code)
      this.DropDownDetails.ItemValue=code.Code
      //code.label

      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }*/
     let IndustryId
     if(this.IndustryId){
      IndustryId=this.IndustryId
     }
     else{
      IndustryId=null;
     }
    let ReqObj = {
      "IndustryId":IndustryId,
      "IndustryName":this.Industrydetails.IndustryName,
      "CategoryId":this.CategoryId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.BranchCode,
    "ProductId": this.productId,
    "EffectiveDateStart": this.Industrydetails.EffectiveDateStart,
    "CreatedBy":this.loginId,
    "Status": this.Industrydetails.Status,
    "Remarks":this.Industrydetails.Remarks,
    "CoreAppCode":this.Industrydetails.CoreAppCode,
    "RegulatoryCode":this.Industrydetails.RegulatoryCode
    }
    let urlLink = `${this.CommonApiUrl}master/saveindustry`;
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
            //         'industry Details Inserted/Updated Successfully',
            //         'industry Details',
            //         config);
                    this.router.navigate(['/Admin/Industry'])
          }

        },
        (err) => { },
      );
  }
  ongetBack(){
    this.router.navigate(['/Admin/Industry'])
  }

  getTinyurlList(){
    let ReqObj = {

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
  }
}
