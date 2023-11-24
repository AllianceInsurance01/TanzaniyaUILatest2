import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../../shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import { Premia } from './premia';

@Component({
  selector: 'app-premia-config-details',
  templateUrl: './premia-config-details.component.html',
  styleUrls: ['./premia-config-details.component.scss']
})
export class PremiaConfigDetailsComponent implements OnInit {

  public activeMenu:any="Premia";minDate:Date;peemiaList:any
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  peemmultiaList: any[];
  insuranceId: string;
  productId: string;
  loginId: any;
  PreId: any;
  SectionValue: any;
  premiaDetails:any;
  PremiaTableName:any;
  SourceTableName:any;
  queryKey: any;
  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe) {
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  if(userDetails){
    this.loginId = userDetails?.Result?.LoginId;
  }

  this.premiaDetails = new Premia();

  }

  ngOnInit(): void {
    this.getpremiaList();
    this.getmultpremiaList();
    let PremObj = JSON.parse(sessionStorage.getItem('editPremiaId'));
    this.PreId=PremObj?.PremiaId,
    this.SectionValue=PremObj.SectionId;

    if(this.PreId){
      this.getExistingpremia()
    }
    else{
      this.premiaDetails = new Premia();
      if(this.premiaDetails?.Status==null)  this.premiaDetails.Status = 'Y';
    }


  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
  }
  onProceed(){

  }
  getpremiaList() {
    let ReqObj = {
      "InsuranceId":this.insuranceId
         }
    let urlLink = `${this.CommonApiUrl}dropdown/integratointable`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.peemiaList = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
  }
  getmultpremiaList() {
    let ReqObj = {
      "InsuranceId":this.insuranceId
         }
    let urlLink = `${this.CommonApiUrl}dropdown/sourcetable`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.peemmultiaList = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
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
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
  }

  getExistingpremia(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999",
      "PremiaId":  this.PreId,
      "ProductId": this.productId,
      "SectionId": this.SectionValue
         }
       let urlLink = `${this.CommonApiUrl}master/getpremiaconfig`;
       this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
         (data: any) => {
           console.log(data);
           if(data.Result){
             this.premiaDetails = data.Result;
             console.log('ttttttt',this.premiaDetails);
             //this.getpremiaList()
             this.PremiaTableName=this.premiaDetails.EntityName;
             console.log(this.PremiaTableName)
             this.SourceTableName=this.premiaDetails.SourceTableName;

             this.queryKey=this.premiaDetails.QueryKey;

             sessionStorage.setItem('QueryKey',this.queryKey)
             if(this.premiaDetails){
               if(this.premiaDetails?.EffectiveDateStart!=null){
                 this.premiaDetails.EffectiveDateStart= this.onDateFormatInEdit(this.premiaDetails?.EffectiveDateStart)
               }if(this.premiaDetails?.EffectiveDateEnd!=null){
                 this.premiaDetails.EffectiveDateEnd= this.onDateFormatInEdit(this.premiaDetails?.EffectiveDateEnd)
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


    onsave(){

      this.queryKey=this.premiaDetails.QueryKey;

      if(this.PremiaTableName!=undefined && this.PremiaTableName!=null && this.PremiaTableName!=''){
        //let code = this.productItem
        let code = this.peemiaList.find(ele=>ele.Code==this.PremiaTableName)
        console.log('codes',code)
        this.premiaDetails.EntityName=code.CodeDesc;
        //code.label

        //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
       }

  if(this.PreId){
        this.premiaDetails.PremiaId=this.PreId
      }else{
        this.premiaDetails.PremiaId=""
      }
      let ReqObj={
        "CreatedBy":this.loginId ,
  "EffectiveDateStart":this.premiaDetails.EffectiveDateStart,
  "InsuranceId":this.insuranceId,
  "BranchCode":"99999",
  "PremiaId":  this.premiaDetails.PremiaId,
  "PremiaTableName":this.premiaDetails.EntityName,
  "ProductId":this.productId,
  "SectionId": this.SectionValue,
  "Remaeks":this.premiaDetails.Remaeks,
  "Status":this.premiaDetails.Status,
  "QueryKey":this.premiaDetails.QueryKey,
  "EntityName":this.PremiaTableName
  //"SourceTableName":this.SourceTableName
      }

      let urlLink = `${this.CommonApiUrl}master/insertpremiaconfig`;
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
            //         'Referal Details Inserted/Updated Successfully',
            //         'Referal Details',
            //         config);
            //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);

            //sessionStorage.setItem('QueryKey',this.queryKey)
            this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])

          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
                  // let type: NbComponentStatus = 'danger';
                  // const config = {
                  //   status: type,
                  //   destroyByClick: true,
                  //   duration: 4000,
                  //   hasIcon: true,
                  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //   preventDuplicates: false,
                  // };
                  // this.toastrService.show(
                  //   entry.Field,
                  //   entry.Message,
                  //   config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }



}
