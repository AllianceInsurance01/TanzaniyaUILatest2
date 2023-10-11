import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import { Payment } from './Payment';
import * as Mydatas from '../../../../../../app-config.json';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  activeMenu:any='Payment';
  paymentData:any[]=[];columnHeader:any[]=[];
  minDate: Date;
  insuranceId: string;
  productId: string;
  loginId: any;
  PaymentMasterId: any;
  paymentdetalis: Payment;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchList: { Code: string; CodeDesc: string; }[];
  branchValue: any;
  MotoYn: string;
  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.MotoYn=sessionStorage.getItem('productType');
    this.productId =  sessionStorage.getItem('companyProductId');
      this.PaymentMasterId = sessionStorage.getItem('PaymentMasterId');
   }
   
  ngOnInit(): void {
    this.columnHeader = [
      { key: 'CashYn', display: 'Cash Y/N'},
      { key: 'CreditYn', display: 'Credit Y/N'},
      { key: 'ChequeYn', display: 'Cheque Y/N'},
      { key: 'UserType', display: 'UserType'},
      { key: 'SubUserType', display: 'SubUserType'},
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'Status', display: 'Status'},
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getBranchList();
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
        let docObj = JSON.parse(sessionStorage.getItem('PaymentMasterId'))
        if(docObj){
          this.branchValue = docObj?.BranchCode;
          this.getExistingPayment();
        //this.getIndustryList()
      }
        else{
          this.branchValue="99999";
          this.getExistingPayment();
          //this.getIndustryList()
        }
        //if(!this.branchValue){ this.branchValue = "99999"; this.getExistingPayment() }
      }
    },
    (err) => { },

  );
  }
  getExistingPayment(){
    let ReqObj = {
      "BranchCode":this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/getallpayment`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.paymentData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onEditSection(event){

    let ReqObj = {
      "PaymentMasterId" :event.PaymentMasterId,
      "BranchCode": this.branchValue
    }
    sessionStorage.setItem('PaymentMasterId',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList/paymentDetails'])
  }
  onAddSection(){
    //sessionStorage.removeItem('PaymentMasterId')
    let ReqObj = {
      "PaymentMasterId" :null,
      "BranchCode": this.branchValue
    }
    sessionStorage.setItem('PaymentMasterId',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList/paymentDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "PaymentMasterId":event.PaymentMasterId,
      "ProductId":this.productId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/payment/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
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
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getBranchList();

                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails']);
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails']);
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails']);
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList']);
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails']);
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails']);
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails']);
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata']);
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails']);
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList']);
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification']);
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList']);
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList']);
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList']);
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList']);
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield']);
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType']);
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
    if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
    if(value=='SURVIVAL')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/survival']);
    if(value=='Surrender')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/surrender']);
    if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
  }
}
