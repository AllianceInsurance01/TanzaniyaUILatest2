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
  CustomerCode: any=null;
  showStepperSection: boolean = true;
  //public orderStatus="customerDetails"

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.userDetails.Result.ProductId;
    this.navStart = router
      .events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => {
        let child = this.activatedRoute.firstChild;
        console.log(child);

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
