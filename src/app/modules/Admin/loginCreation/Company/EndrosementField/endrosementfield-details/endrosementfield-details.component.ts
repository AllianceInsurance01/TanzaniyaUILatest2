import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { endrosement } from './endrosement.Model';
@Component({
  selector: 'app-endrosementfield-details',
  templateUrl: './endrosementfield-details.component.html',
  styleUrls: ['./endrosementfield-details.component.scss']
})
export class EndorsementDetailsComponent implements OnInit {
  DependentList:any[]=[];
  minDate:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;
  loginId: any;
  DepId: any;
  EndoDetails:any;
  activeMenu:any='EndorsementField'
  constructor(
    private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
      console.log("pppppp",this.productId)
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }

      this.EndoDetails = new endrosement();
    }
ngOnInit(){
  let DropDown:any = JSON.parse(sessionStorage.getItem('DependantFieldId'));

  console.log("Sno Obj",  DropDown)

  this.DepId= DropDown?.DependantFieldId;
  //this.ItemCode=DropDown?.ItemCode
  //this.branchValue =  DropDown?.BranchCode;
  //this.ItemValue= DropDown?.ItemType;

  if(this.DepId){
    this.getEditDropdownDetails()
  }
  else{
    this.EndoDetails = new endrosement();
    this.DepId=null;
    // this.DropDownDetails = new Dropdown();
    if(this.EndoDetails?.Status==null)  this.EndoDetails.Status = 'Y';
  }
}
     getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId
  }
    let urlLink = `${this.CommonApiUrl}master/dropdown/dependant`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this. DependentList = data.Result;
        // let docObj = JSON.parse(sessionStorage.getItem('CategoryId'))
        // if(docObj){
        //   this.branchValue = docObj?.BranchCode;

        // }
        // else{
        //   this.branchValue="99999";


        // }

        //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
      }
    },
    (err) => { },
  );
  }
  getEditDropdownDetails(){
    let ReqObj =  {
      "InsuranceId":this.insuranceId,
  "ProductId":this.productId,
  "DependantFieldId":this.DepId
  }
    let urlLink = `${this.CommonApiUrl}master/getbydependantid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.EndoDetails = res.Result;
       
        //this.ItemValue=res.Result.ItemType

        if(this.EndoDetails){
          if(this.EndoDetails?.EffectiveDateStart!=null){
            this.EndoDetails.EffectiveDateStart = this.onDateFormatInEdit(this.EndoDetails?.EffectiveDateStart)
          }
          if(this.EndoDetails?.EffectiveDateEnd!=null){
            this.EndoDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.EndoDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.EndoDetails);
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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield']);
  }
  onProceed(){

    let ItemId
    if(this.DepId){
        ItemId=this.DepId
    }
    else{
      ItemId=null;
    }
    /*if(this.DepId!=undefined && this.DepId!=null && this.DepId!=''){
      //let code = this.productItem
      let code = this.DependentList.find(ele=>ele.Code==this.DepId)
      console.log('codes',code)
      this.EndoDetails.=code.CodeDesc;
      //code.label

      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }*/
  
        let ReqObj = {
          "CoreAppCode": this.EndoDetails.CoreAppCode,
          "CreatedBy": this.loginId,
          "DependantFieldId": ItemId,
          "DependantFieldName":this.EndoDetails.DependantFieldName,
          "EffectiveDateStart": this.EndoDetails.EffectiveDateStart,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "RegulatoryCode": this.EndoDetails.RegulatoryCode,
          "Remarks": this.EndoDetails.Remarks,
          "Status": this.EndoDetails.Status
    
        }
        let urlLink = `${this.CommonApiUrl}master/savedependant`;
        if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined)
        {
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
              //         'Dropdown Details Inserted/Updated Successfully',
              //         'Dropdown Details',
              //         config);
    
              this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield']);  
    
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
        if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
        if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
        if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
      }
     
}
