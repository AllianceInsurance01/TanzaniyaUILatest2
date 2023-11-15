import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-depositaddnew',
  templateUrl: './depositaddnew.component.html',
  styleUrls: ['./depositaddnew.component.scss']
})
export class DepositAddNewComponent implements OnInit {

  activeMenu:any="Deposit";brokerId:any;
  insuranceId:any;brokerLoginId:any;brokerCompanyYN:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1; closeResult: string;
  paymentid:any;payeeName:any;Premium:any;VatAmount:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;CbcDatas:any[]=[];CBCHeader:any[]=[];ProductName:any;
  branchData: any[]=[];branchHeader:any[]=[];agencyCode:any;branchsHeader:any[]=[];branchDatas:any[]=[];
    cbcno: any;show:any=false;PaymentList:any[]=[];
    accountNo:any;
    bamount: any;
    chargabletype: any;chequedate:Date;
    chequeno: any;
    depositamt: any;
    depositno: any;
    deposiType: any;
    ibanno: any;
    micrno: any;
    reciptNo: any;
    referenceno: any;
    p:Number=1;
    policyinsu: any;viewData:any;ChargableList:any[]=[];chequeDate:any;viewDatas:any[]=[];
  userType: any;
  subUserType: any;
  constructor(private router:Router,private sharedService: SharedService,private modalService: NgbModal,private datePipe:DatePipe) {
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
    this.PaymentList = [{"Code":"1","CodeDesc":"Cash"},{"Code":"2","CodeDesc":"Cheque"}];
    
   }

  ngOnInit(): void {
    this.CBCHeader = [
        { key: 'CbcNo', display: 'CBC NO' },
        { key: 'DepositNo', display: 'Deposit No' },
        { key: 'PaymentTypeDesc', display: 'Payment Type' },
        { key: 'PayeeName', display: 'Name' },
        { key:'EntryDate', display: 'Entry Date' },
        { key: 'Premium', display: 'Amount' },
        {
            key: 'edit',
            display: 'View',
            config: {
                isViews: true,
            },
          },
          {
          key: 'actions',
          display: 'Action',
          config: {
            isinfos: true,
          },
        },

      ];
    let DepositObj = JSON.parse(sessionStorage.getItem('CbcDetails'));
     this.cbcno= DepositObj?.CbcNo;
     if(this.cbcno){
        this.getDetails();
     }
     this.paymentid='1';
     this.deposiType="C";

  }
  getBackPage(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositMasterList']);
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails']);
  }
  getDetails(){
    this.branchDatas=[];
    let ReqObj={
      "CbcNo":this.cbcno,
    }
    let urlLink = `${this.CommonApiUrl}deposit/get/Payment`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Message!='FAILED'){
          this.CbcDatas = data?.Result;
          console.log('HHHHHHHHHHHHHHHHH',this.branchDatas);
        }

      },
      (err) => { },
    );

  }

 

  onAddNewBranch(){
    this.show=true;
    // let ReqObj ={
    //   "loginId": this.brokerLoginId,
    //   "brokerId": this.agencyCode,
    //   "insuranceId": this.insuranceId,
    //   "brokerCompanyYN": this.brokerCompanyYN,
    //   "BranchCode": null
    // }
    // sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    // sessionStorage.removeItem('editBranchId');
    // this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerBranchDetails']);
  }
  onEditBranch(rowData){
    let ReqObj ={
      "loginId": this.brokerLoginId,
      "brokerId": this.agencyCode,
      "insuranceId": this.insuranceId,
      "brokerCompanyYN": this.brokerCompanyYN,
      "BranchCode": rowData.BrokerBranchCode,
      "UserType": this.userType,
      "SubUserType": this.subUserType
    }
    sessionStorage.setItem('brokerConfigureDetails',JSON.stringify(ReqObj));
    sessionStorage.setItem('editBranchId',rowData.BranchCode);
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerBranchDetails']);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
    if(value=='Deposit') this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositMasterList']);
    if(value=='paymentTypes') this.router.navigate(['/Admin/brokersList/newBrokerDetails/paymentTypesList']);
  }
  getSave(){
    let chequeDate
    if(this.chequeDate!='' && this.chequeDate!=null && this.chequeDate!= undefined){
      chequeDate = this.datePipe.transform(this.chequeDate,'dd/MM/yyyy');
    }
    let ReqObj =  {
            "AccountNo": this.accountNo,
            "BalanceAmount": this.bamount,
            "CbcNo":this.cbcno,
            "ChargableType": this.chargabletype,
            "ChequeDate":chequeDate,
            "ChequeNo": this.chequeno,
            "DepositAmount": this.Premium,
            "DepositNo": this.depositno,
            "DepositType": this.deposiType,
            "IbanNumber": this.micrno,//this.ibanno,
            "LoginId": this.brokerLoginId,
            "MicrNo": this.micrno,
            "PayeeName": this.payeeName,
            "PaymentType": this.paymentid,
            "PolicyInsuranceFee": this.policyinsu,
            "Premium": this.Premium,
            "PremiumAmount": this.Premium,
            "ProductId":"",
            "QuoteNo": "",
            "ReceiptNo":this.reciptNo,
            "ReferenceNo":this.referenceno,
            "Status":"",
            "VatAmount":this.VatAmount,
            "CompanyId": this.insuranceId,
  
      }
      let urlLink = `${this.CommonApiUrl}deposit/save/payment`;
    //   if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
    //     ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    //   }
    //   else{
    //     ReqObj['EffectiveDateStart'] = "";
    //   }
    //   if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
    //     ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
    //   }
    //   else{
    //     ReqObj['EffectiveDateEnd'] = "";
    //   }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result=='Insert/Update SuccessFully'){
            this.show=false;
            //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
          }
          else if(data.ErrorMessage){
            if(data.ErrorMessage){
              console.log("Error Iterate",data.ErrorMessage)
            }
          }
        },
        (err) => { },
      );
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onViews(row,modal){
    let ReqObj={
       "CbcNo":"",
      "DepositNo":row.DepositNo
    }
    let urlLink = `${this.CommonApiUrl}deposit/get/Payment`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Message!='FAILED'){
          this.viewData = data?.Result[0];
          console.log('HHHHHHHHHHHHHHHHH',this.branchDatas);
        }

      },
      (err) => { },
    );
    this.open(modal);
  }
  onInfo(row,modal){
    this.open(modal);
    let urlLink =`${this.CommonApiUrl}deposit/get/depositDetailById?cbcNo=${row.CbcNo}`
    //let urlLink = `${this.CommonApiUrl}deposit/get/depositMasterById?cbcNo=${row.CbcNo}`
    //`${this.CommonApiUrl}deposit/get/depositMasterById?cbcNo=${row.CbcNo}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Message!='FAILED'){
          this.viewDatas= data?.Result;
          console.log('HHHHHHHHHHHHHHHHH',this.viewDatas);
        }
      },
      (err) => { },
    );
   
  }
}
