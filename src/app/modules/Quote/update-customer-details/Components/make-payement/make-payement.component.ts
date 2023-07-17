import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-make-payement',
  templateUrl: './make-payement.component.html',
  styleUrls: ['./make-payement.component.css']
})
export class MakePayementComponent implements OnInit {
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  activeMenu:any;
  Menu:any;micrNo:any;
  first:boolean=false;Fifth:boolean=false;
  second:boolean=false;Fourth:boolean=false;
  Third: boolean;currencyCode:any;
  minDate: Date;
  customerDetails: any;
  vehicleDetails: any;
  requestReferenceNo: string;
  userDetails: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  branchList: any;
  productId: any;
  insuranceId: any;
  subuserType: string;
  paymentTypeList: any[]=[];
  title: any;
  clientName: any;
  dateOfBirth: any;
  emailId: any;
  mobileNo: any;quoteNo:any;
  idNumber: any;quoteRefNo:any;
  vehicleList: any[]=[];totalPremium:any;chequeDate:any;
  policySection: boolean = false;yearlySection=false;nineMonthSection:boolean=false;
  sixMonthSection:boolean = false;threeMonthSection:boolean = false;endorsementId:any;
  policyNo: any;EmiYn:any="N";emiPeriod:any=null;emiMonth=null;endorsementSection:boolean = false;
  customerType: string;Emilist1:any[]=[];emiSection:boolean = false;
  endorsePolicyNo: string;cancelEndorse:boolean =false;
  IsChargeOrRefund: any;bankList:any[]=[];bankName:any='';
  chequeNo: null;payeeName:any=null;
  orgPolicyNo: string;
  endorseCategory: any;
  endorsementName: any;
  enableFieldsList: any;
  endtPremium: any;
  accNo: any;
  iBanNo: any;
  paymentDetails: any;
  payAmount: any=null;
  Sixth: boolean=false;
  successSection: boolean;
  tinyUrlInfo: boolean;
  productName: any;
  redirectUrl: string;
  constructor(private router:Router,private sharedService: SharedService,
    private updateComponent:UpdateCustomerDetailsComponent,private route:ActivatedRoute,
   private datePipe:DatePipe) {
    this.minDate = new Date();
    sessionStorage.removeItem('buyPolicyDetails');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    this.updateComponent.quoteNo = this.quoteNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName = this.userDetails.Result.ProductName
    this.subuserType = sessionStorage.getItem('typeValue');
    this.insuranceId = this.userDetails.Result.InsuranceId;
    let paymentId = sessionStorage.getItem('quotePaymentId');
    this.redirectUrl = "aHR0cHM6Ly90ei5zZWxjb20ub25saW5lL3BheW1lbnRndy9jaGVja291dC9XbXRLVmpWbVVGWmtWRTFTY2xGWlVIbEpWR1ZFYTFWbFlqQmFkWHBEWmtJelpFOXdlR1JSTUhZNGQwTjBZa2hZVTFFMVJVNXZTbmwwYWs1cGNHd3dhV3BrYWxZMGFGVkdZbUpWUFE9PS8=";
    this.decodeUrl();
    console.log("Payment Id",paymentId)
      if(paymentId){
        this.getPaymentTypeList();
      }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        if(this.endorsementId==42 || this.endorsementId==842) this.cancelEndorse = true;
        else this.cancelEndorse = false;
        
      }
    }
    else{
      this.endorsementSection = false;
    }
      
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      console.log("Params",params.params)
      let quoteNo = params?.params?.QuoteNo;
      let type = params?.params?.type;
      if(quoteNo){
        this.quoteNo = quoteNo;
        this.updateComponent.quoteNo = this.quoteNo;
        if(type!='cancel') this.successSection = true;
      }
    })
    if(this.customerDetails){
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
      if(this.customerDetails.PolicyHolderType=='1'){this.customerType="Individual";}
      else if(this.customerDetails.PolicyHolderType=='2'){this.customerType="Corporate";}
    }
    this.getEditQuoteDetails();
  }
  decodeUrl(){
    console.log(atob(this.redirectUrl))
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.requestReferenceNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.vehicleList = data?.Result?.ProductDetails;
            let quoteDetails = data?.Result?.QuoteDetails;
            
            this.currencyCode = quoteDetails?.Currency;
            this.IsChargeOrRefund = quoteDetails?.IsChargeOrRefund;
            this.endtPremium = quoteDetails?.TotalEndtPremium;
            if(this.endorsementSection){
                this.totalPremium = quoteDetails?.TotalEndtPremium;
            }
            else this.totalPremium = quoteDetails?.OverallPremiumFc;
            console.log("Total",this.totalPremium)
            if(quoteDetails.EmiYn!=null){
              this.EmiYn = quoteDetails.EmiYn;
              this.emiPeriod = quoteDetails.InstallmentPeriod;
              this.emiMonth = quoteDetails.InstallmentMonth;
              if(this.EmiYn=='Y') this.getCurrentEmiDetails();
            }
            else{
              this.EmiYn = "N";
              this.emiPeriod = null;
              this.emiMonth = null;
            }
            this.getBankList();
          }
      },
      (err) => { },
    );

  }
  alphaNumberOnly (e) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e) {
    e.preventDefault();
    return false;
  }
  checkRefundMandatories(){
    return (this.IsChargeOrRefund=='REFUND' && this.bankName!=undefined && this.bankName!=null && this.bankName!='' && 
            this.accNo!=undefined && this.accNo!=null && this.accNo!='' &&
            this.iBanNo!=undefined && this.iBanNo!=null && this.iBanNo!='' && !this.policySection)
  }
  getBankList(){
    let branchCode = '';
    if((this.userType!='Broker' && this.userType!='User')){
      branchCode = this.branchCode
    }
    else{
      branchCode = this.brokerbranchCode
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.bankList = data.Result;
            if(this.orgPolicyNo!=undefined && this.endorsementSection && (this.endtPremium==null || this.endtPremium=='' || this.endtPremium==0 || this.endtPremium==undefined) && !this.cancelEndorse){
              this.updateEndorseStatus();
            }
        }

      },
      (err) => { },
    );
  }
  updateEndorseStatus(){
    let ReqObj = {
      "QuoteNo":this.quoteNo,
      "PolicyNo": this.orgPolicyNo,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}endorsment/changeEndtStatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
                this.IsChargeOrRefund = null;
                this.paymentDetails = {
                  "QuoteNo": this.quoteNo,
                  "PolicyNo": this.endorsePolicyNo
                }
                this.updateTiraDetails();
                
          }
      },
      (err) => { },
    );
  }
  getCurrentEmiDetails(){
    let ReqObj = {
         "QuoteNo": this.quoteNo,
         "InsuranceId": this.insuranceId,
         "ProductId": this.productId
         }
    let urlLink = `${this.CommonApiUrl}api/getemidetailsbyquoteno`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
              let emiList = data.Result;
              if(emiList.length!=0){
                    let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[];
                    if(emiList.length==13){
                      this.yearlySection = true;
                      yearlyList = emiList;
                    }
                    else if(emiList.length==10){
                      nineList = emiList;
                      this.nineMonthSection = true;
                    }
                    else if(emiList.length==7){
                      sixList = emiList;
                      this.sixMonthSection = true;
                    }
                    else if(emiList.length==4){
                      threeList = emiList;
                      this.threeMonthSection = true;
                    }
                    this.setEmiTableValues(yearlyList,nineList,sixList,threeList);
                // this.Emilist1=data?.Result[0]?.EmiPremium
                // this.Emilist2=data?.Result[1]?.EmiPremium;
                // this.EmiDetails=data.Result[0].EmiDetails;
                // this.EmiDetails1=data.Result[1].EmiDetails;
                console.log('tttt',this.totalPremium);
              }
          }
        },
        (err) => { },
      );
  }
  setEmiTableValues(yearlyList,nineList,sixList,threeList){
    if(this.yearlySection){
       let i=0;this.Emilist1=[];
       for(let entry of yearlyList){
            let data = entry;
            if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
            else{data['yearlyAmount']=null}
            if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
            else{data['nineAmount']=null}
            if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
            else{data['sixAmount']=null}
            if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
            else{data['threeAmount']=null}
            this.Emilist1.push(entry);
            i+=1;
            if(i==yearlyList.length){this.emiSection=true}
       }
    }
    else if(this.nineMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of nineList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==nineList.length){this.emiSection=true}
      }
   }
   else if(this.sixMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of sixList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==sixList.length){this.emiSection=true}

      }
   }
   else if(this.threeMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of threeList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==threeList.length){this.emiSection=true}
      }
   }
  }
  getTotalVehiclesCost(){
    let totalCost=0,i=0;
    console.log('VECGJKKK',this.vehicleList);
    for(let veh of this.vehicleList){
      if(veh?.OverallPremiumFc) totalCost = totalCost+Number(veh?.OverallPremiumFc);

      i+=1;
      if(i==this.vehicleList.length) this.totalPremium = totalCost;
    }
  }
  onRedirect(value:any){
    this.Menu=value;
    this.first = false;this.second = false;this.Third=false;this.Fourth=false;this.Fifth = false;
    this.bankName = null;this.chequeDate=null;this.chequeNo = null;this.Sixth=false;
    if(this.Menu=='VisionPay'){ this.first=true;}
    else if(this.Menu=='Pos'){ this.second=true;}
    else if(this.Menu=='1'){ this.Third=true; }
    else if(this.Menu == '2'){ this.Fourth = true;}
    else if(this.Menu == 'Bank'){ this.Fifth = true;}
    else if(this.Menu == '4'){this.Sixth = true;}
  }
  getPaymentTypeList(){
    let ReqObj = {
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "UserType": this.userType,
      "SubUserType": this.subuserType,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/paymenttypes`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.paymentTypeList = data.Result;
        } 
      },
      (err) => { },
      );
  }
  onCashPayment(){
    let chequeDate = "";let amount=this.totalPremium;
    if(this.IsChargeOrRefund=='REFUND'){
      this.Menu='2';
      this.activeMenu = '2';
      amount = this.totalPremium
    }
    else{this.iBanNo = null;this.accNo=null;
      if(this.payAmount==undefined) amount = null;
      else if(this.payAmount.includes(',')){ amount = this.payAmount.replace(/,/g, '') }
      else amount = this.payAmount;
    }
    if(this.IsChargeOrRefund!='REFUND' && this.Menu=='2'){
        if(this.chequeDate!='' && this.chequeDate!=null && this.chequeDate!= undefined){
          chequeDate = this.datePipe.transform(this.chequeDate,'dd/MM/yyyy');
        }
    }
    else{
      this.chequeDate = null;this.chequeNo = null;this.micrNo=null;if(this.IsChargeOrRefund!='REFUND')this.bankName = null;
    }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "EmiYn":"N",
      "Premium": amount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "PayeeName": this.payeeName,
      "SubUserType": this.subuserType,
      "UserType": this.userType,
      "MICRNo": this.micrNo,
      "BankName":this.bankName,
      "ChequeNo":this.chequeNo,
      "ChequeDate":chequeDate,
      "PaymentType": this.activeMenu,
      "Payments": this.IsChargeOrRefund,
      "PaymentId": sessionStorage.getItem('quotePaymentId'),
      "AccountNumber":this.accNo,
      "IbanNumber": this.iBanNo
    }
    console.log("Final Pay Req",ReqObj)
    let urlLink = `${this.CommonApiUrl}payment/insertpaymentdetails`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){

          if(data.Result.PolicyNo){
            this.paymentDetails = data.Result;
            this.policyNo = data.Result.PolicyNo;
            this.policySection = true;
            this.updateTiraDetails();
            
          }
          else if(data.Result.paymentUrl){
            this.redirectUrl = data.Result.paymentUrl;
            console.log("Url",atob(this.redirectUrl))
            window.location.href =  atob(this.redirectUrl)
          }
        } 
      },
      (err) => { },
      );
  }
  updateTiraDetails(){
      let ReqObj={
        "QuoteNo": this.quoteNo,
      }
      let urlLink = `${this.CommonApiUrl}payment/pushtira`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            if(data?.Result?.Response=='Success') this.policySection = true;
        } 
      },
      (err) => { },
      );
  }
  CommaFormatted() {

    // format number
    if (this.payAmount) {
     this.payAmount = this.payAmount.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  onAmountChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  ongetBack(){
    if(this.subuserType=='B2C'){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    else if(this.endorsementSection && this.cancelEndorse){
      this.router.navigate(['Home/policies/Endorsements/endorsementTypes'])
    }
    else{
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details'])
    }
  }
  onOnlinePayment(){
    this.successSection = true;
    this.tinyUrlInfo = false;
  }

  finalTinyUrlInfo(){
    this.tinyUrlInfo = true;
  }
}
