import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { TinyUrl } from './tinyurl';

@Component({
  selector: 'app-tinyurl-details',
  templateUrl: './tinyurl-details.component.html',
  styleUrls: ['./tinyurl-details.component.scss']
})
export class TinyurlDetailsComponent implements OnInit {

  public activeMenu:any='Tinyurl';
  public tinyUrldetalis:any;minDate:Date;
  public branchList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;
  loginId: any;
  Sno: any;
  branchValue: any;
  typeList:any[]=[];
  jsonList:any[]=[];
  KeyNameValue:any;
  MotoYn: string;

  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe) {
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
    console.log("pppppp", this.productId)
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     this.MotoYn=sessionStorage.getItem('productType');
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.tinyUrldetalis = new TinyUrl();
  
  }

  ngOnInit(): void {

    let tinyurl: any = JSON.parse(sessionStorage.getItem('Sno'));
    if (tinyurl) {
      console.log("Sno Obj", tinyurl)
      this.Sno = tinyurl?.Sno;
      //this.branchValue = tinyurl?.BranchCode;
      this.branchValue="All"
    }
    if(this.Sno!=null && this.Sno!=undefined){
      this.getEditTinyUrlDetails()
    }
    else{
      this.tinyUrldetalis = new TinyUrl();
      this.Sno=null;
      this.branchValue="All";
      this.tinyUrldetalis.NotifYn="N";
      this.tinyUrldetalis.RequestYn="N";
      if(this.tinyUrldetalis?.Status==null) this.tinyUrldetalis.Status = 'N';
  this.tinyUrldetalis.CreatedBy = this.loginId;
    }
    this.getBranchList();
    this.tinyurldropdown();

    this.jsonList = [
      {
        "RequestJsonKey":"",
        "RequestColumn":"",
        "DropdownYn":"N",
        "Status":"Y",
        "RequestTable":"NotifTransactionDetails"
      }
    ]
   
  }

  Ye(){
if(this.tinyUrldetalis.RequestYn == 'Y'){
  this.keyName();
}
else if(this.tinyUrldetalis.RequestYn == 'N'){

}
  }

  addItem(){
    let entry = {
      "RequestJsonKey":"",
      "RequestColumn":"",
      "DropdownYn":"N",
      "RequestTable":"NotifTransactionDetails",
      "Status":"Y"
    }
     this.jsonList.push(entry);
  }

  delete(row:any)
  {
      const index = this.jsonList.indexOf(row);
      this.jsonList.splice(index, 1);
  }

  keyName(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": "99999",
      "TableName": "NotifTransactionDetails"
    }
    let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
          this.KeyNameValue = obj.concat(data?.Result);
        }
      },(err)=>{}
    );
  }
  getEditTinyUrlDetails(){
    let ReqObj = {

      "BranchCode":"99999",
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "Sno":this.Sno
    }
    let urlLink = `${this.CommonApiUrl}master/gettinyurl`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        let entry = this.tinyUrldetalis[0];
        if (res.Result) {
          this.tinyUrldetalis = res.Result;
          if (this.tinyUrldetalis) {

            if (this.tinyUrldetalis?.EffectiveDateStart != null) {
              this.tinyUrldetalis.EffectiveDateStart = this.onDateFormatInEdit(this.tinyUrldetalis?.EffectiveDateStart)
            }
            if (this.tinyUrldetalis?.EffectiveDateEnd != null) {
              this.tinyUrldetalis.EffectiveDateEnd = this.onDateFormatInEdit(this.tinyUrldetalis?.EffectiveDateEnd)
            }
            
            if(this.tinyUrldetalis?.RequestYn =='Y'){
              this.keyName();
            }

            if(data.Result.TinyUrlYnDetails.length!=0){
              let list = data.Result.TinyUrlYnDetails;
              this.jsonList =list
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
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
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

          let secObj = JSON.parse(sessionStorage.getItem('Sno'))
          if (secObj) {
            this.branchValue = secObj?.BranchCode;
          }
          else{ this.branchValue= '99999'; }



        }
      },
      (err) => { },
    );
  }

  tinyurldropdown() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
       //"NotifApplicable":"Mail"
    }
    let urlLink = `${this.CommonApiUrl}notification/dropdown/activetemplist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          //let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.typeList = data?.Result;

        }
      },
      (err) => { },
    );
  }
  onProceed(){
    let ReqObj = {
      "AppUrl":this.tinyUrldetalis.AppUrl,
      "BranchCode": "99999",
      "CreatedBy": this.loginId,
      "EffectiveDateStart": this.tinyUrldetalis.EffectiveDateStart,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "Remarks": this.tinyUrldetalis.Remarks,
      "Sno":this.Sno,
      "Status": this.tinyUrldetalis.Status,
      "Type": this.tinyUrldetalis.Type,
      "NotifYn":this.tinyUrldetalis.NotifYn,
      "NotifDesc":this.tinyUrldetalis.NotifDesc,
      "TinyUrlYnDetails":this.jsonList,
       "RequestYn":this.tinyUrldetalis.RequestYn,
    
    }
    let urlLink = `${this.CommonApiUrl}master/inserttinyurl`;
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
            //         'TinyUrl Details Inserted/Updated Successfully',
            //         'TinyUrl Details',
            //         config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
          }

        },
        (err) => { },
      );
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
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

}
