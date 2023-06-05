import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { ENdorsementType } from './EndorsementType.Model';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-new-endorsement-type-details',
  templateUrl: './new-endorsement-type-details.component.html',
  styleUrls: ['./new-endorsement-type-details.component.css']
})
export class NewEndorsementTypeDetailsComponent {

  public activeMenu:any='Endrosement';
  iconList:any[]=[];endorseData:any[]=[];
  statusValue:any= "YES";cityList:any[]=[];
  insuranceName: string;calcTypeList:any[]=[];
  insuranceId: string;
  productId: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any= this.AppConfig.CommonApiUrl;
  endorsementDetails: any;categoryList:any[]=[];
  loginId: any;fieldList:any[]=[];
  minDate: Date;
  endTypeId:any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {

      this.minDate = new Date();
    // let reload =  sessionStorage.getItem('reload');
    // if(reload){
    //   if(reload == 'false'){
    //     sessionStorage.removeItem('reload');
    //     window.location.reload();
    //   }
    // }
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
      this.endorsementDetails = new ENdorsementType();
      /*let endorseObj=JSON.parse(sessionStorage.getItem('endorseObj'));
      if(endorseObj){
        this.endorsementDetails.EndtTypeCategoryId=endorseObj?.Category;
        this.endTypeId = endorseObj?.EndorsementId;
        if(this.endTypeId) this.getEndorsementDetails();
        else{
          this.endorsementDetails = new  ENdorsementType();
          this.endorsementDetails.EndtFeeYn = 'N';this.endorsementDetails.Status = 'Y';
          
        }
      }
      else{
        alert("Empty")
      }*/
    
    this.calcTypeList = [
      {"Code": "","CodeDesc": "- - -Select- - -"},
      {"Code": "A","CodeDesc": "Amount"},
      {"Code": "M","CodeDesc": "Mile"},
      {"Code": "P","CodeDesc": "Percentage"}
    ]
    this.categoryList = [
      {"Code":"2","CodeDesc":"Financial"},
      {"Code":"1","CodeDesc":"Non-Financial"}
      
    ]
    let endorseObj=JSON.parse(sessionStorage.getItem('endorseObj'));
   
    this.endorsementDetails.EndtTypeCategoryId=endorseObj?.Category;
    this.endTypeId = endorseObj?.EndorsementId;
    if(this.endTypeId) 
    {this.getEndorsementDetails();}
    else{
      this.endorsementDetails = new ENdorsementType();
      this.endorsementDetails.EndtTypeCategoryId=endorseObj?.Category;
      this.endorsementDetails.CoreAppCode=null;
      this.endorsementDetails.Remarks=null;
      this.endorsementDetails.RegulatoryCode=null;
      this.endorsementDetails.EndtDependantIds=[];
      this.endorsementDetails.Priority=null;
      this.endorsementDetails.EndtTypeDesc=null;
      this.endorsementDetails.EndtType=null;


      console.log('uuuuuu',this.endorsementDetails)
      this.endorsementDetails.EndtFeeYn = 'N';this.endorsementDetails.Status = 'Y';
      
    }
    console.log('tttttttt',this.endorsementDetails)
   }

  ngOnInit(): void {
 
    this.getFieldList();
  }
  getEndorsementDetails(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "EndtTypeCategoryId": this.endorsementDetails?.EndtTypeCategoryId,
      "EndtTypeId": this.endTypeId,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/getbyendorsementid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          let res = data;
          if(res?.Result){
            this.endorsementDetails = res.Result;
            if(this.endorsementDetails?.EffectiveDateStart!=null){
              this.endorsementDetails.EffectiveDateStart = this.onDateFormatInEdit(this.endorsementDetails?.EffectiveDateStart)
            }
            this.onChangeEndFeeYN();
          }
      },
      (err) => { },
    );
  }
  getFieldList(){
    let ReqObj = {
      // "CompanyId": this.insuranceId,
      // "BranchCode":"99999"
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/dependant`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          let res = data;
          if(res?.Result){
              this.fieldList = res?.Result;
          }
        },
        (err) => { },
      );
  }
  onChangeEndFeeYN(){
    if(this.endorsementDetails?.EndtFeeYn=='N') {this.endorsementDetails.CalcType = null;this.endorsementDetails.EndtFeePercent=null;}
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
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
  }
  ongetBack(){
        this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
  }
  onSaveEndorsement(){
 let end
    if(this.endTypeId){
      end=this.endTypeId
    }
    else{
      end=null;
    }

    if(this.endorsementDetails.EndtFeeYn=='N'){
      this.endorsementDetails.CalcTypeId="";
      this.endorsementDetails.EndtFeePercent="";
    }

    let ReqObj={
      "CompanyId": this.insuranceId,
      "CoreAppCode": this.endorsementDetails.CoreAppCode,
      "CreatedBy": this.loginId,
      "EffectiveDateStart": this.endorsementDetails.EffectiveDateStart,
      "EndtDependantIds": this.endorsementDetails.EndtDependantIds,
      "EndtFeePercent": this.endorsementDetails.EndtFeePercent,
      "EndtFeeYn": this.endorsementDetails.EndtFeeYn,
      "EndtType": this.endorsementDetails.EndtType,
      "EndtTypeCategoryId": this.endorsementDetails.EndtTypeCategoryId,
      "EndtTypeDesc":this.endorsementDetails.EndtTypeDesc,
      "EndtTypeId":end,
      "Priority": this.endorsementDetails.Priority,
      "ProductId": this.productId,
      "Remarks": this.endorsementDetails.Remarks,
      "Status": this.endorsementDetails.Status,
      "CalcTypeId":this.endorsementDetails.CalcTypeId,
      "RegulatoryCode":this.endorsementDetails.RegulatoryCode
      //this.endorsementDetails?.CalcTypeId,
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}master/insertendorsement`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          let res = data;
          if(res?.Result){
            // this.Toaster.open({
            //   text:'Endorsement Type Details Inserted/Updated Successfully',
            //   caption: 'Endorsement Type Details',
            //   type: 'success',
            // });
            this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
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
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }
}
