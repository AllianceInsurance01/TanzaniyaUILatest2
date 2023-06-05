import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import { ClientDetailsComponent } from './Components/client-details/client-details.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public activeStep='ClientDetails-stepper';
  public stepheader='';brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  customerDetails: any;customerId:any;userDetails:any;
  customerSection: boolean;loginId:any;agencyCode:any;
  productId:any;branchCode:any;insuranceId:any;userType:any;
  Address1: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;
   }

  ngOnInit(): void {
    this.router
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
    })).subscribe((customData: any) => {
      console.log(customData);
      this.activeStep=customData;
      if(this.activeStep =='Customer-stepper'){
        this.stepheader="Please Select Insurer Details or Enter Insurer Details";

      }

    });
    let customerId = sessionStorage.getItem('customerReferenceNo');
    if(customerId){
      this.getEditCustomerDetails(customerId);
    }
    else{
     this.customerDetails = {
       "CustomerReferenceNo": null
     }
    }
  }

  ontap(url:string){
    this.router.navigate([url]);
  }
  getEditCustomerDetails(customerId){
    let ReqObj = {
        "CustomerReferenceNo": customerId
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          sessionStorage.setItem('customerDetails',JSON.stringify(data.Result));
          this.customerDetails = data.Result;
          this.customerId = customerId;
          //this.detailsComponent.setClientDetails(this.customerDetails);
           //this.policyHolderTypeList = data.Result;

        }
      },
      (err) => { },
    );
  }
  onUpdateDetails(type){
    if(this.customerDetails.Address1=='' || this.customerDetails.Address1==undefined || this.customerDetails.Address1==null){
    this.customerDetails.Address1=null;
    }
    if(this.customerDetails.Address2=='' || this.customerDetails.Address2==undefined || this.customerDetails.Address2==null){
      this.customerDetails.Address2=null;
      }
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
    let SaveorSubmit = "";
    if(type=='save') SaveorSubmit = "Save";
    else SaveorSubmit = "Submit";
    let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
      "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
      "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
    "ProductId":this.productId,
    "AppointmentDate": this.customerDetails?.AppointmentDate,
    "Address1": this.customerDetails?.Address1,
    "Address2": this.customerDetails?.Address2,
    "BusinessType": this.customerDetails?.BusinessType,
    "CityName":this.customerDetails?.CityName,
    "ClientName": this.customerDetails?.ClientName,
    "Clientstatus": this.customerDetails?.Clientstatus,
    "CreatedBy": this.loginId,
    "DobOrRegDate": this.customerDetails?.DobOrRegDate,
    "Email1": this.customerDetails?.Email1,
    "Email2": this.customerDetails?.Email2,
    "Email3": this.customerDetails?.Email3,
    "Fax": this.customerDetails?.Fax,
    "Gender": this.customerDetails?.Gender,
    "IdNumber": this.customerDetails?.IdNumber,
    "IdType": this.customerDetails?.IdType,
    "IsTaxExempted": this.customerDetails?.IsTaxExempted,
    "Language": "1",
    "MobileNo1":  this.customerDetails?.MobileNo1,
    "MobileNo2":  this.customerDetails?.MobileNo2,
    "MobileNo3":  this.customerDetails?.MobileNo3,
    "Nationality": this.customerDetails?.Nationality,
    "Occupation": this.customerDetails?.Occupation,
    "Placeofbirth": this.customerDetails?.Placeofbirth,
    "PolicyHolderType": this.customerDetails?.PolicyHolderType,
    "PolicyHolderTypeid": this.customerDetails?.PolicyHolderTypeid,
    "PreferredNotification": this.customerDetails?.PreferredNotification,
    "RegionCode": "01",
    "StateCode":  this.customerDetails?.StateCode,
    "Status": this.customerDetails?.Clientstatus,
    "Street": this.customerDetails?.Street,
    "TaxExemptedId": this.customerDetails?.TaxExemptedId,
    "TelephoneNo1": this.customerDetails?.TelephoneNo1,
    "TelephoneNo2": this.customerDetails?.TelephoneNo2,
    "TelephoneNo3": this.customerDetails?.TelephoneNo3,
    "Title": this.customerDetails?.Title,
    "VrTinNo": this.customerDetails?.VrTinNo,
    "SaveOrSubmit": SaveorSubmit
  }
    let urlLink = `${this.CommonApiUrl}api/savecustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(data.ErrorMessage.length!=0){
         
        }
        else{
          // let type: NbComponentStatus = 'success';
          //     const config = {
          //       status: type,
          //       destroyByClick: true,
          //       duration: 4000,
          //       hasIcon: true,
          //       position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //       preventDuplicates: false,
          //     };
          //     this.toastrService.show(
          //       'Customer Details',
          //       'Customer Details Inserted/Updated Successfully',
          //       config);
            sessionStorage.removeItem('customerReferenceNo');
            this.router.navigate(['/Home/customer/'])
        }
      },
      (err) => { },
    );
  }

}
