import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { DatePipe } from '@angular/common';
//import { NbDialogService } from '@nebular/theme';
//import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import { Toaster } from 'ngx-toast-notifications';
import { ProductBenefit } from './productbenefit.Model';
//import { StateDetailsComponent } from '../state-details/state-details.component';


@Component({
  selector: 'app-productbenefitdetails',
  templateUrl: './productbenefitdetails.component.html',
  styleUrls: ['./productbenefitdetails.component.scss']
})
export class ProductBenefitComponent implements OnInit {

    calcTypeList:any[]=[];
    activeMenu:any='Benefit';
    minDate:any;
  insuranceName: string;
  insuranceId: string;
  productId: string;
  loginId: any;
  sectionList :any[]=[];
  public AppConfig:any = (Mydatas as any).default
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  sectionValue: any;
  coverValue:any;
  coverList:any[]=[];
  BenefitDetails:any;
  benefitId: any;
  CoverList:any[]=[];
  BranchCode: string;
    constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe,){
        this.minDate=new Date();
        this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
        this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
        this.productId =  sessionStorage.getItem('companyProductId');
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
        if(userDetails){
          this.loginId = userDetails?.Result?.LoginId;
        }
        this.calcTypeList = [
            {"value": "","text": "- - -Select- - -"},
            {"value": "A","text": "Amount"},
            {"value": "P","text": "Percentage"},
            {"value": "F","text": "Factor"},
          ];
          this.BenefitDetails = new ProductBenefit();
        this.getSectionList();
          

    }
    ngOnInit(): void {
      let BenefitObj=JSON.parse(sessionStorage.getItem('BenefitDetails'));
      this.sectionValue=BenefitObj?.SectionId;
      this.coverValue=BenefitObj?.CoverId;
      this.benefitId=BenefitObj?.BenefitId;
   
      if(this.benefitId!=null){
        this.BranchCode="ALL";
        this.getBenefitDetails();
      }
      else{
        this.BenefitDetails = new ProductBenefit();
        this.BranchCode="ALL"
        console.log('gggggggggggggggggggggg',this.sectionValue)
        if(this.BenefitDetails?.Status==null)  this.BenefitDetails.Status = 'N';
      }
    }

    getBenefitDetails(){

      let ReqObj =  {
        "InsuranceId":this.insuranceId,
        "ProductId": this.productId,
        "BranchCode": "99999",
        "SectionId":this.sectionValue,
        "CoverId":this.coverValue,
        "BenefitId":this.benefitId
  
    }
      let urlLink = `${this.CommonApiUrl1}master/getbyproductbenefitid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.BenefitDetails = res.Result;
          if(this.BenefitDetails){
            if(this.BenefitDetails?.EffectiveDateStart!=null){
  
             this.BenefitDetails.EffectiveDateStart = this.onDateFormatInEdit(this.BenefitDetails?.EffectiveDateStart)
            }
            if(this.BenefitDetails?.EffectiveDateEnd!=null){
              this.BenefitDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.BenefitDetails?.EffectiveDateEnd)
            }
            //this.getStateList();
  
          }
        }
        console.log("Final City Class",this.BenefitDetails);
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
    getSectionList(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId
      }
      let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            let obj = [];
            this.sectionList = obj.concat(data?.Result);
            console.log(this.sectionList);
            this.getCoverList();
            //let docObj = JSON.parse(sessionStorage.getItem('BenefitDetails'))
            //if(docObj){ this.sectionValue = docObj?.SectionId;
              //console.log('LLLLLLLLLL',this.sectionValue);
              //this.getExistingpromo()
          //}
            //else{ //this.sectionValue=null; 
              //this.getExistingpromo();
          //}
  
          }
  
          },
          (err) => { },
        );
    }


    getCoverList(){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
        "SectionId":this.sectionValue
      }
      let urlLink = `${this.ApiUrl1}master/dropdown/sectioncover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [];
          this.CoverList = obj.concat(data?.Result);
          //this.getExistingDocument();
          //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
        }
      },
  
      (err) => { },
    );
    }
    ongetBack(){
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
    }
    onSaveProductBenefit() {
      let ReqObj = {
        "BenefitId":this.benefitId,
        "BenefitDescription":this.BenefitDetails.BenefitDescription,
        "BranchCode": "99999",
        "CreatedBy": this.loginId,
        "EffectiveDateStart": this.BenefitDetails.EffectiveDateStart,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "SectionId": this.sectionValue,
        "CoverId": this.coverValue,
        "SubCoverId":"",
        "Remarks":this.BenefitDetails.Remarks,
        "LongDesc":this.BenefitDetails.LongDesc,
        "CalcType":this.BenefitDetails.CalcType,
        "Value": this.BenefitDetails.Value,
        "TypeId":"1",
        "AgencyCode":"99999",
        "Status":this.BenefitDetails.Status,
        "CoreAppCode":this.BenefitDetails.CoreAppCode,
        "RegulatoryCode":this.BenefitDetails.RegulatoryCode
      }
      let urlLink = `${this.CommonApiUrl1}master/insertproductbenefit`;
    
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
              //         'Notifications Details Inserted/Updated Successfully',
              //         'Notification Details',
              //         config);
              this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
                      //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
    
            }
            // else if(data.ErrorMessage){
            //     if(res.ErrorMessage){
            //       for(let entry of res.ErrorMessage){
            //         let type: NbComponentStatus = 'danger';
            //         const config = {
            //           status: type,
            //           destroyByClick: true,
            //           duration: 4000,
            //           hasIcon: true,
            //           position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //           preventDuplicates: false,
            //         };
            //         this.toastrService.show(
            //           entry.Field,
            //           entry.Message,
            //           config);
            //       }
            //       console.log("Error Iterate",data.ErrorMessage)
            //       //this.loginService.errorService(data.ErrorMessage);
            //     }
            //}
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
        if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
        if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
        if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
      }

}