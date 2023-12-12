import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-update-customer-details',
  templateUrl: './update-customer-details.component.html',
  styleUrls: ['./update-customer-details.component.css']
})
export class UpdateCustomerDetailsComponent implements OnInit {

  public activeStep='Customer-stepper';
  public stepheader = '';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  navStart!: Observable<NavigationStart>;
  titleValue: any;quoteRefNo:any;
  clientName: any;vehicleDetails:any;
  clientStatus: any;vehicleDetailSection:boolean=false;
  idTypeDesc: any;vehicleWishList:any[]=[];customerData:any[]=[];
  idNumber: any;quoteNo:any;
  referenceNo: string;
  customerDetails: any;CurrencyCode:any;exchangeRate:any;
  travelStartDate:any;travelEndDate:any;noOfDays:any;
  userDetails: any;productId:any;
  policyStartDate: any;
  policyEndDate: any;
  HavePromoCode: any;
  PromoCode: any;
  selectedItem:any;
  active:any;
  branchValue: any=null;
  sourceType: any=null;
  brokerCode: any=null;
  brokerLoginId: any=null;
  brokerBranchCode: any=null;
  CustomerCode: any=null;subUserType:any=null;
  showStepperSection: boolean = true;
  b2cSection: boolean=false;customerSection:boolean=false;
  modifiedYN: any='N';
  additionalSection: boolean=false;
  CustomerName: any;
  Title: any;
  UserName: any;
  MobileCode: any;
  MobileNo: any;
  PolicyHolderTypeid: any;
  IdNumber: any;
  EmailId: any;
  MobileCodeDesc: any;
  ModifiedCustomer: boolean=false;
  CustomerType: any;
  ModifiedCurrencyYN: string;
  PreferredNotification: any;
  sourceTypeDesc: null;
  policySection: boolean=false;
  //public orderStatus="customerDetails"

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.userDetails.Result.ProductId;
    this.subUserType = sessionStorage.getItem('typeValue');
    if(this.subUserType=='B2C'){
      this.b2cSection  = true;
      let sectionType = sessionStorage.getItem('riskSection');
      if(sectionType=='additional') this.additionalSection = true;
      else this.additionalSection = false;
      let type = sessionStorage.getItem('b2cType');
      if(type) this.customerSection = true;
    }
    this.navStart = router
      .events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      }))as Observable<NavigationStart>;
  }
  checkRouting(type){
    if(type=='customerDetails') return this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/customer-details';
    if(type=='riskDetails'){
     
      return (this.checkRouting('motorDetails') && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/vehicle-details' && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/risk-selection' && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/personal-accident');
    }
    if(type=='motorDetails') return(this.checkRouting('customerDetails') && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/motor-details');
    if(type=='coverDetails') return (this.checkRouting('riskDetails') && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/excess-discount');
    if(type=='additionalDetails') return (this.checkRouting('coverDetails') && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details');
    if(type=='passengerDetails') return (this.checkRouting('coverDetails') && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details');
    if(type=='premiumDetails') return (this.checkRouting('additionalDetails') && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/premium-details' && this.router.url!='/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details');
    if(type=='paymentDetails') return (this.checkRouting('premiumDetails') && this.policySection);
  }
  getCustomerDetails(referenceNo){
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          if(this.customerDetails){
            console.log("Cust Details",this.customerDetails)
            sessionStorage.setItem('customerDetails',JSON.stringify(this.customerDetails));
            //this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
              this.titleValue = customerDetails.TitleDesc;
              this.clientName = customerDetails?.ClientName;
              this.clientStatus = customerDetails?.ClientStatusDesc;
              this.idTypeDesc = customerDetails?.IdTypeDesc;
              this.idNumber = customerDetails?.IdNumber;
        }
      },
      (err) => { },
    );
  }
  setCommonValues(rowData){
        //this.customerDetailsComp.setCommonValues(rowData);
  }
  ngOnInit(): void {

    let active= sessionStorage.getItem('quoteNo');

    console.log('quotesnumber',active)

    if(active){

      this.navStart.subscribe((customData: any) => {
        console.log('CCCCCCCCC',customData);
        this.activeStep = customData;

        console.log('EEEEEEEEEE',this.activeStep)

        if (this.activeStep == 'Excess-stepper') {
          this.stepheader = "Please Select Insurer Details or Enter Insurer Details";

        }
        //sessionStorage.removeItem('quoteNo');


      });

      /*if (this.activeStep == 'UW-stepper') {
        this.stepheader = "Please Select Insurer Details or Enter Insurer Details";
      }*/
          }

    else
    {

      this.navStart.subscribe((customData: any) => {
        console.log('UUUUUUUUU',customData);

        this.activeStep = customData;


        if (this.activeStep == 'Customer-stepper') {
          this.stepheader = "Please Select Insurer Details or Enter Insurer Details";
        }

      });
    }

    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
    }
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.quoteRefNo = quoteRefNo;
  }

  ontap(type:any,url: string) {
    if(type=='customerDetails'){
      if(this.customerDetails){
        this.router.navigate([url]);
      }
    }

  }
  resetVehicleTab(){
    let vehTab = sessionStorage.getItem('vehicleType');
    if(vehTab=='edit') this.vehicleDetailSection = false;
    else if(vehTab=='new') this.vehicleDetailSection = true;
  }
  /*listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
}*/

}
