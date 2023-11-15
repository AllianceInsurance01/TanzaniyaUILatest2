import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-depositmaster',
  templateUrl: './paymentTypesList.component.html',
  styleUrls: ['./paymentTypesList.component.scss']
})
export class PaymentTypesListComponent implements OnInit {

  activeMenu:any="paymentTypes";brokerId:any;
  insuranceId:any;brokerLoginId:any;brokerCompanyYN:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];columnHeader:any[]=[];agencyCode:any;branchsHeader:any[]=[];branchDatas:any[]=[];
  branchList: any[]=[];
  branchValue: any;
  paymentData: any[]=[];
  productData: any;
  productId: any;
  userType: any;
  subUserType: any;
  paymentMasterId: any;
  paymentdetalis: any;
  SubUserType: any;minDate:any;editSection:boolean=false;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.agencyCode = brokerObj.brokerId;
      //if(brokerObj.) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
      if(brokerObj.brokerCompanyYN) this.brokerCompanyYN = brokerObj.brokerCompanyYN;
      if(brokerObj.UserType) this.userType = brokerObj.UserType;
      if(brokerObj.SubUserType) this.subUserType = brokerObj.SubUserType;
    }
    this.brokerId = this.brokerLoginId;
      this.minDate = new Date();
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
    this.getProductList();
   
  }
  getProductList(){
    let ReqObj = {
      "LoginId": this.brokerLoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": null,
      "Limit":"0",
      "Offset":"100000"
      }
      let urlLink = `${this.CommonApiUrl}admin/getbrokercompanyproducts`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
              this.productData = data.Result;
              if(this.productData.length!=0) this.productId = this.productData[0].ProductId;
              else{this.productId='99999'}
              this.getBranchList();
          }
        });
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
        let docObj = JSON.parse(sessionStorage.getItem('paymentMasterId'))
        
          this.branchValue="99999";
          this.getExistingPayment();
          //this.getIndustryList()
        //if(!this.branchValue){ this.branchValue = "99999"; this.getExistingPayment() }
      }
    },
    (err) => { },

  );
  }
  getBackPage(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
  }
  onModifyPaymentType(){
    
  }
 
  getExistingPayment(){
    let ReqObj = {
      "BranchCode":this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "AgencyCode": this.agencyCode,
      "UserType": this.userType,
      "SubUserType": this.subUserType
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

    this.paymentMasterId = event.PaymentMasterId
    this.paymentdetalis = event;
    this.editSection = true;
    if (this.paymentdetalis?.EffectiveDateEnd != null) {
      this.paymentdetalis.EffectiveDateStart = this.onDateFormatInEdit(this.paymentdetalis?.EffectiveDateStart)
    }
    if (this.paymentdetalis?.EffectiveDateEnd != null) {
      this.paymentdetalis.EffectiveDateEnd = this.onDateFormatInEdit(this.paymentdetalis?.EffectiveDateEnd)
    }
    if(this.paymentdetalis.SubUserType!=null && this.paymentdetalis.SubUserType!=undefined){
        this.getsubusertype('direct');
    }
  }
  getsubusertype(type){
    if(type=='change'){
           this.paymentdetalis.SubUserType='';
    }
    let ReqObj = {
      "InsuranceId":this.insuranceId,
     "BranchCode":this.branchValue,
        "ItemType":this.paymentdetalis.UserType
    }
    let urlLink = `${this.CommonApiUrl}master/getalllovdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.SubUserType= data?.Result;
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
  onAddNewBranch(){
    let ReqObj ={
      "loginId": this.brokerLoginId,
      "brokerId": this.agencyCode,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "BranchCode": null,
      "UserType": this.userType,
      "SubUserType": this.subUserType
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    sessionStorage.removeItem('editBranchId');
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerBranchDetails']);
  }
  onEditData(rowData){
    let ReqObj ={
      "loginId": this.brokerLoginId,
      'CbcNo':rowData.CbcNo,
      'BrokerName':rowData.BrokerName,
    }
    sessionStorage.setItem('CbcDetails',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositdetails'])
    //sessionStorage.setItem('editBranchId',rowData.BranchCode);
   
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
    if(value=='Deposit') this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositMasterList']);
    if(value=='paymentTypes') this.router.navigate(['/Admin/brokersList/newBrokerDetails/paymentTypesList']);
  }
  onProceed(){
    let ReqObj = {
      "BranchCode":this.branchValue,
      "CashYn":this.paymentdetalis.CashYn,
      "ChequeYn":this.paymentdetalis.ChequeYn,
      "CreatedBy":this.brokerLoginId,
      "AgencyCode": this.agencyCode,
      "CreditYn":this.paymentdetalis.CreditYn,
      "EffectiveDateStart": this.paymentdetalis.EffectiveDateStart,
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "PaymentMasterId":this.paymentMasterId,
      "Status":this.paymentdetalis.Status,
      "SubUserType":this.paymentdetalis.SubUserType,
      "UserType":this.paymentdetalis.UserType,
      "OnlineYn":this.paymentdetalis.OnlineYn
    }
    let urlLink = `${this.CommonApiUrl}master/insertpayment`;
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
            //         'Payment Details Inserted/Updated Successfully',
            //         'Payment Details',
            //         config);
            this.editSection = false;
            this.paymentMasterId = null;
            this.paymentdetalis = null;
            this.getExistingPayment();
          }

        },
        (err) => { },
      );
  }
}
