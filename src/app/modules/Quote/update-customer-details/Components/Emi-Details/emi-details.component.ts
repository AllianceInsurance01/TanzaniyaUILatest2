import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';



@Component({
  selector: 'app-emi-details',
  templateUrl: './emi-details.component.html',
  styleUrls: ['./emi-details.component.scss']
})
export class EmiDetailsNewComponent implements OnInit {

  public quoteData:any []=[];innerColumnHeader:any []=[];customerData:any[]=[];
  userDetails:any;loginId:any;agencyCode:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchCode:any;productId:any;userType:any;insuranceId:any;quoteHeader:any[]=[];
  quoteHeaders:any[]=[];
  PolicyNo: any;
  pageCount: number;
  totalQuoteRecords: any;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
  limit: any='0';totalPremium:any;
  show: boolean = false;
  OthersList:any[]=[];
  searchValue:any[]=[];brokerCode:any='';brokerList:any[]=[];
  customersearch:any;
  subuserType: string;
  customerDetails: any;vehicleDetails:any;emiSection:boolean = false;
  vehicleList: any[]=[];
    requestReferenceNo: string;Emilist1:any[]=[];
    quoteNo: string;
    policySection: boolean = false;yearlySection=false;nineMonthSection:boolean=false;
    sixMonthSection:boolean = false;threeMonthSection:boolean = false;endorsementId:any;
    fiveMonthSection:boolean = false;eightMonthSection:boolean = false;totallistselected:any[]=[];
  quoteLoginId: any;
  quoteSubUsertype: any;
  quoteUsertype: any;
  quoteBranchCode: any;
  currencyCode: any;
  IsChargeOrRefund: any;
  endtPremium: any;selectedvalues:boolean=false;
  payAmount: any;
  EmiYn: any;
  emiPeriod: any;
  emiMonth: any;payamount:any=0;
  paidshow:boolean=false;
  constructor(private router:Router,private sharedService: SharedService,private updateComponent:UpdateCustomerDetailsComponent) {
    sessionStorage.removeItem('buyPolicyDetails');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    this.updateComponent.quoteNo = this.quoteNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
   
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
    this.updateComponent.showStepperSection = false;
   }

  ngOnInit(): void {
    this.getCurrentEmiDetails();
    this.getEditQuoteDetails();
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.vehicleList = data?.Result?.ProductDetails;
            let quoteDetails = data?.Result?.QuoteDetails;
            this.quoteLoginId = quoteDetails?.LoginId;
            this.quoteSubUsertype = quoteDetails?.SubUserType;
            this.quoteUsertype = quoteDetails?.UserType;
            this.quoteBranchCode = quoteDetails?.BrokerBranchCode;
            this.currencyCode = quoteDetails?.Currency;
            this.IsChargeOrRefund = quoteDetails?.IsChargeOrRefund;
            this.endtPremium = quoteDetails?.TotalEndtPremium;
            //this.payamount= quoteDetails?.DueAmount;
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
              // emiList.map(emiList=>({
              //   ...emiList,
              //   isChecked:false
              // }));
              if(emiList.length!=0){
                    let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[],fiveList=[],eightList=[];
                    let isChecked=false;
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
                    else if(emiList.length==6){
                      fiveList = emiList;
                      this.fiveMonthSection = true;
                    }
                    else if(emiList.length==9){
                      eightList = emiList;
                      this.eightMonthSection = true;
                    }
                    this.setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList,isChecked);
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
  setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList,isChecked){
    if(this.yearlySection){
       let i=0;this.Emilist1=[];
       for(let entry of yearlyList){
            let data = entry;
            if(data.PaymentStatus=='Paid'){
              this.paidshow=true;
            }
            if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
            else{data['yearlyAmount']=null}
            if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
            else{data['nineAmount']=null}
            if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
            else{data['sixAmount']=null}
            if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
            else{data['threeAmount']=null}
            if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
            //if(data.SelectYn){data['isChecked']=false}
            if(data.SelectYn == 'Y'){data['isChecked']=true}
            else{data['isChecked']=false}
            this.Emilist1.push(entry);
            i+=1;
            if(i==yearlyList.length){this.emiSection=true}
       }
    }
    else if(this.nineMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of nineList){
           let data = entry;
           if(data.PaymentStatus=='Paid'){
            this.paidshow=true;
          }
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
            if(data.SelectYn){data['isChecked']=false}
            // if(data.SelectYn == 'Y'){data['isChecked']=true}
            // else{data['isChecked']=false}
           this.Emilist1.push(entry);
           i+=1;
           if(i==nineList.length){this.emiSection=true}
      }
   }
   else if(this.sixMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of sixList){
           let data = entry;
           if(data.PaymentStatus=='Paid'){
            this.paidshow=true;
          }
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
            if(data.SelectYn){data['isChecked']=false}
            // if(data.SelectYn == 'Y'){data['isChecked']=true}
            // else{data['isChecked']=false}
           this.Emilist1.push(entry);
           i+=1;
           if(i==sixList.length){this.emiSection=true}

      }
   }
   else if(this.threeMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of threeList){
           let data = entry;
           if(data.PaymentStatus=='Paid'){
            this.paidshow=true;
          }
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
            if(data.SelectYn){data['isChecked']=false}
            // if(data.SelectYn == 'Y'){data['isChecked']=true}
            // else{data['isChecked']=false}
           this.Emilist1.push(entry);
           i+=1;
           if(i==threeList.length){this.emiSection=true}
      }
   }
   else if(this.fiveMonthSection){
    let i=0;this.Emilist1=[];
    for(let entry of fiveList){
         let data = entry;
         if(data.PaymentStatus=='Paid'){
          this.paidshow=true;
        }
         if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
         else{data['yearlyAmount']=null}
         if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
         else{data['nineAmount']=null}
         if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
         else{data['sixAmount']=null}
         if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
         else{data['threeAmount']=null}
         if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
          else{data['fiveAmount']=null}
          if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
          else{data['eightAmount']=null}
          // if(data.SelectYn == 'Y'){data['isChecked']=true}
          // else{data['isChecked']=false}
          if(data.SelectYn){data['isChecked']=false}
         this.Emilist1.push(entry);
         i+=1;
         if(i==fiveList.length){this.emiSection=true}
    }
 }
 else if(this.eightMonthSection){
  let i=0;this.Emilist1=[];
  for(let entry of eightList){
       let data = entry;
       if(data.PaymentStatus=='Paid'){
        this.paidshow=true;
      }
       if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
       else{data['yearlyAmount']=null}
       if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
       else{data['nineAmount']=null}
       if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
       else{data['sixAmount']=null}
       if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
       else{data['threeAmount']=null}
       if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
        else{data['fiveAmount']=null}
        if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
        else{data['eightAmount']=null}
        // if(data.SelectYn == 'Y'){data['isChecked']=true}
        // else{data['isChecked']=false}
        if(data.SelectYn){data['isChecked']=false}
          
       this.Emilist1.push(entry);
       i+=1;
       if(i==eightList.length){this.emiSection=true}
  }
}
console.log('NNNNNNNNNNNNN',this.Emilist1)
  }

  updateinstallemnet(){
    let i=0,totallist:any[]=[];let menu
    // let type=this.paymentTypeList.filter(ele => ele.Code == this.activeMenu)
    //   if(type){
    //     menu = type[0].CodeDesc
    //    console.log('MMMMMMMMMMMM',menu);
    //   }
      if(this.totallistselected.length!=0){
     for(let n of this.totallistselected){
         totallist.push({
           "QuoteNo":this.quoteNo,
        "NoOfInstallment":n.NoOfInstallment,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "InstallmentPeriod":n.InstallmentPeriod,
      "CreatedBy":this.loginId,
      "PaymentStatus":"Paid",
      "Remarks":"",
      "PaymentDetails":menu
         })
         i+=1; 
         // var sorted = this.totallistselected.sort();
         // console.log('NNNNNNNNNNNN',sorted)
       if(i==this.totallistselected.length) {
         let sorted = totallist.sort((a, b) => a.NoOfInstallment - b.NoOfInstallment); 
         console.log('NNNNNNNNNNNN',sorted);
         console.log('Paymentsss',this.totallistselected.length); this.makepayments(totallist);
       }
     }
     }
     else{
       totallist.push({
         "QuoteNo":this.quoteNo,
      "NoOfInstallment":"",
    "InsuranceId":this.insuranceId,
    "ProductId":this.productId,
    "InstallmentPeriod":"",
    "CreatedBy":this.loginId,
    "PaymentStatus":"Paid",
    "Remarks":"",
    "PaymentDetails":menu
       });
      
       //this.makepayments(totallist);
     }
   }
   makepayments(emilisttt){
    //alert('YYY')
    let makepayment= sessionStorage.getItem('Makepaymentid');
    this.finalproceed(emilisttt);
    // if(makepayment){
    //   this.onMakePayment(emilisttt);
    // }
    // else{
    //   this.finalproceed(emilisttt);
    // }
    // let urlLink = `${this.CommonApiUrl}api/updateemitransactiondetails`;
    // this.sharedService.onPostMethodSync(urlLink,emilisttt).subscribe(
    //  (data: any) => {
    //    console.log(data);
    //    if(data.Result){
    //   console.log('BBBBBBBBBBBBB',data.Result);
    //   if(data.Result.Response=='Updated Successfully'){
    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
    //   }
    //   sessionStorage.removeItem('Makepaymentid')
    //   //this.onCashPayment();
    //    } 
    //  },
    //  (err) => { },
    //  );
  }
  finalproceed(emilisttt){
let urlLink = `${this.CommonApiUrl}api/updateemitransactiondetails`;
    this.sharedService.onPostMethodSync(urlLink,emilisttt).subscribe(
     (data: any) => {
       console.log(data);
       if(data.Result){
      console.log('BBBBBBBBBBBBB',data.Result);
      if(data.Result.Response=='Updated Successfully'){
        let makepayment= sessionStorage.getItem('Makepaymentid');
        if(makepayment){
          this.onMakePayment(emilisttt);
        }
        else{
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
        }
        
      }
      //sessionStorage.removeItem('Makepaymentid')
      //this.onCashPayment();
       } 
     },
     (err) => { },
     );
  }


  updatelists(){
    let i=0;
    //let tot=this.Emilist1.find(ele => ele.Status == 'Y' && ele.isChecked);
    let tot = this.Emilist1.filter(ele=> ele.Status =='Y' && ele.isChecked);
    console.log('totss',tot)
    let emilist=[];let emilisttt:any=[];
    if(tot){
      console.log('NNNNNNNNNN',tot)
      emilist.push(tot)
    }
    if(tot.length!=0){     
      for(let n of tot){
          emilisttt.push({
            "QuoteNo":this.quoteNo,
         "NoOfInstallment":n.NoOfInstallment,
       "InsuranceId":this.insuranceId,
       "ProductId":this.productId,
       "InstallmentPeriod":n.InstallmentPeriod,
       "CreatedBy":this.loginId,
       "PaymentDetails":"Cash",
       "PaymentStatus":"Paid",
       "Remarks":"",
       "SelectedYn":"Y"
          })
          i+=1;
      }
      if(i==emilisttt.length) {
        let sorted =  emilisttt.sort((a, b) => a.NoOfInstallment - b.NoOfInstallment); 
        this.makepayments(sorted);
        console.log('NNNNNNNNNNNN',sorted);
      }
      }
      else{
        emilisttt.push({
          "QuoteNo":this.quoteNo,
       "NoOfInstallment":"",
     "InsuranceId":this.insuranceId,
     "ProductId":this.productId,
     "InstallmentPeriod":"",
     "CreatedBy":this.loginId,
     "PaymentStatus":"Paid",
     "Remarks":"",
     "PaymentDetails":"Cash"
        });
        this.makepayments(emilisttt);
      }
  }

  ongetBack(){
    let makepayment= sessionStorage.getItem('Makepaymentid');
    if(makepayment){
      this.router.navigate(['/Home/policies']);
      sessionStorage.removeItem('Makepaymentid');
    }
    else{
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details'])
    }
  }

  onSelectPolicyTypeRow(event,index){
    let totalamount:any=0;
    console.log('Eventsss',event,index);
    let entry = this.Emilist1[index];
    console.log('Entryyys',entry); console.log('TotalLists',this.totallistselected);
    if(event){
      let tot=this.Emilist1.find(ele => ele.NoOfInstallment == entry.NoOfInstallment);
         if(tot){
          this.Emilist1[index].isChecked=true;
          this.Emilist1[index].Status='Y';
          if(this.Emilist1[index].isChecked){
            this.payamount=  Number(this.payamount) + Number(this.Emilist1[index].DueAmount);
          }
          console.log('paying Amountss',this.payamount);
          let makepayment= sessionStorage.getItem('Makepaymentid');
       if(makepayment){
        this.Emilist1[index+1].isChecked = true;
        console.log('IsChecked Listttt',this.Emilist1)
       }
         }
    }
     else{
     
      console.log('llllllllllll',entry.NoOfInstallment);
      let tot=this.Emilist1.find(ele => ele.NoOfInstallment == entry.NoOfInstallment);
      if(tot){
      //  this.Emilist1[index].isChecked=false;
      this.Emilist1[index].Status='N';
      let tots = this.Emilist1.filter(ele=> ele.Status =='N' && !ele.isChecked);
       let makepayment= sessionStorage.getItem('Makepaymentid');
       if(makepayment == 'Ids'){
        if(this.Emilist1[index].Status='N'){
       
          let totm = this.Emilist1.filter(ele=> ele.Status =='N' && ele.isChecked && ele.SelectYn=='Y');
          console.log('Loss of Pay',totm)
          let j=0;
          if(totm.length!=0){
            console.log('Paying AMounts');
            let totf = this.Emilist1.filter(ele=> ele.Status =='Y' && ele.isChecked);
            if(totf.length!=0){
              this.payamount=0;
            //   for(let i=0;i<index;i++){
            //     console.log('YYYYYYYYYYY',totm.length,totm,this.payamount);
            //     for(let n of this.Emilist1){
            //       this.payamount=Number(n.DueAmount) - Number(this.payamount);
            //       console.log('Payee Amounts',totm.length,totm,this.payamount);
            //     }
            // }
            }
            else{
              console.log('Firstee',this.Emilist1[index].Status,this.Emilist1[index].isChecked);
            this.payamount= Number( this.Emilist1[index].DueAmount) - Number(this.payamount);   
            }
          }
          else{
            console.log('Secnnnnnnnnnnnn',this.Emilist1[index-1].Status,this.Emilist1[index-1].isChecked,this.payamount,this.Emilist1[index-1].SelectYn);
            if(this.Emilist1[index-1].Status=='N' && this.Emilist1[index-1].isChecked){
              this.payamount= Number(this.payamount) - (Number( this.Emilist1[index].DueAmount)) - (Number( this.Emilist1[index-1].DueAmount));
              console.log('Seconnnd',this.Emilist1[index].Status,this.payamount); 
            }
            else{
              console.log('Paye AMounts',this.Emilist1[index].Status,this.Emilist1[index].isChecked,this.payamount);
              this.payamount= Number(this.payamount) - (Number( this.Emilist1[index].DueAmount));  
            }
           
          }
          // if(totm.length!=0){
          //     for(let i=0;i<totm.length;i++){
          //       console.log('YYYYYYYYYYY',totm.length,totm,this.payamount);
          //       for(let n of totm){
          //         this.payamount=Number(this.payamount) - Number(n.DueAmount);
          //         console.log('Payee Amounts',totm.length,totm,this.payamount);
          //       //j+=1;
          //       }
          //   }
          // }
          // else{
          //   console.log('Another',this.payamount)
          //   this.payamount= Number( this.Emilist1[index].DueAmount) - Number(this.payamount); 
          // }

        }
       let List =this.Emilist1.indexOf(tot);
            for(let i=List+1;i<this.Emilist1.length;i++){
            console.log('totss',i,this.Emilist1)
            console.log('indexessslist',List,this.Emilist1[i].isChecked);
            this.Emilist1[i].Status='N';
            this.Emilist1[i].isChecked=false;
          }
      console.log('IsChecked Listttt',this.Emilist1)
    }
    else{
      this.payamount= Number(this.payamount) - Number( this.Emilist1[index].DueAmount); 
    }
      }
      }
     

    // if(event && entry.SelectYn == 'Y'){
    //   this.selectedvalues=true;
    //   this.totallistselected.push({"DueAmount":entry.DueAmount,"NoOfInstallment":entry.NoOfInstallment,"InstallmentPeriod":entry.InstallmentPeriod});
    //   for(let i=0;i<this.totallistselected.length;i++){
    //     console.log('ToLists',index,i,this.totallistselected.length);
    //     totalamount=Number(this.totallistselected[i].DueAmount)+Number(totalamount);
    //   }
    //   this.numberWithCommas(totalamount);
    //   console.log('Due Amounts',totalamount);
    //   let makepayment= sessionStorage.getItem('Makepaymentid');
    //   if(makepayment){
    //     this.Emilist1[index+1].isChecked = true;
    //     console.log('IsChecked Listttt',this.Emilist1)
    //   }
    //     }
    // else{
    //   console.log('llllllllllll',this.payAmount)
    //   const withoutCommas = this.payAmount.replaceAll(',', '');
    //   console.log('entry new amounts',this.payAmount,entry.DueAmount)
    //   totalamount=withoutCommas - entry.DueAmount;
    //   this.numberWithCommas(totalamount);
    //   let tot=this.totallistselected.find(ele => ele.NoOfInstallment == entry.NoOfInstallment);
    //   let ind:any;
    //   let makepayment= sessionStorage.getItem('Makepaymentid');
    //   if(tot){
    //     console.log('find result',tot)
    //     ind =this.totallistselected.indexOf(tot);
    //     console.log('IIIIIIII',ind)
    //     this.totallistselected.splice(ind,1);
    //     if(makepayment){
    //       this.Emilist1[index-1].isChecked = false;
    //     }
    //   }
     
    
    //   //this.totallistselected.splice(index,1);
    //   console.log('Not entryss',this.totallistselected,index,this.payAmount);
    // } 
  
  }

  onMakePayment(emilisttt){
    if(this.subuserType==null){
      this.subuserType = this.userDetails.Result.SubUserType;
      sessionStorage.setItem('typeValue',this.subuserType)
    }
    let amount = null;
    // if(this.payAmount!=null){
    //   if(this.payAmount==undefined) amount = null;
    //   else if(String(this.payAmount).includes(',')){ amount = this.payAmount.replace(/,/g, '') }
    //   else amount = this.payAmount;
    // }
    let tot = this.Emilist1.filter(ele=> ele.Status =='Y' && ele.isChecked);
    let j=0;let totalamount=0;
    if(tot){
      for(let n of tot){
        totalamount=Number(totalamount) + Number(n.DueAmount)
      }
      j+=1;
    }

   let emimonth:any;let i=0;
   if(emilisttt.length!=0){
        for(let n of emilisttt){
          emimonth=n.NoOfInstallment;
          //totalamount=Number(totalamount) + Number(n.DueAmount)
        }
        i+=1;
   }
    // if(this.Emilist1[0]?.NoOfInstallment!=null){
    //   emimonth=this.totallistselected[0]?.NoOfInstallment
    // }
    // else{
    //   emimonth=this.emiMonth;
    // }
    // if(this.EmiYn=='Y'){
    //   amount = this.dueAmount;
    // }
    // else{
    //   amount = this.localPremiumCost;
    // }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "EmiYn": this.EmiYn,
      "InstallmentMonth":emimonth,
      "InstallmentPeriod":this.emiPeriod,
      "InsuranceId": this.loginId,
      "Premium": totalamount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "SubUserType": this.subuserType,
      "UserType": this.userType
    }
    let urlLink = `${this.CommonApiUrl}payment/makepayment`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
          //this.finalproceed(emilisttt);
            sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
            //this.updateinstallemnet();
       
        }
      },
      (err) => { },
    );
  }
  numberWithCommas(x) {
    this.payAmount= x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
}

        //let tot = this.Emilist1.find(ele=> ele.SelectYn =='Y' && ele.isChecked);
        //let tots = this.Emilist1.filter(ele=> ele.isChecked && ele.Status =='N');