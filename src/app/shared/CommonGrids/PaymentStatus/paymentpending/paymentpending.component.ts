import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-paymentpending',
  templateUrl: './paymentpending.component.html',
  styleUrls: ['./paymentpending.component.scss']
})
export class PaymentPendingComponent implements OnInit {
    
    
    issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
    quoteno:any;
    startdate:Date;enddate:Date;
    insuranceId:any;userDetails:any;subUserType:any;
    pageCount: number;
    totalRecords: any;
    quotePageNo: any;
    startIndex: number;
    endIndex: number;
    totalQuoteRecords: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    productId: string;show:boolean=false;productList:any[]=[];
    loginId: any;limit:any=0;
    insuranceList: any[]=[];
      branchValue: any;
      branchList:any;
  searchedSection: boolean;
  closeResult: string;
  paymentPendingInfo: boolean = false;
  quoteDetails: any;
  paymentDetails: any;
  policyNo: any;
  policySection: boolean;
  quoteNo: any=null;
  merchantRefNo: any=null;
  creditNoteNo: any=null;
  debitNoteNo: any=null;sampleData:any;
    constructor(private router:Router,private sharedService:SharedService,private modalService: NgbModal) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      this.sampleData = {
        "QuoteNo":"Q07578"
      }
      let insurance = sessionStorage.getItem('issuerInsuranceId');
      if(insurance){
        this.insuranceId = insurance;
      }
      else{
        this.insuranceId = this.userDetails.Result.InsuranceId;
      }
      // this.productId =  sessionStorage.getItem('companyProductId');
      this.subUserType = sessionStorage.getItem('typeValue');
    }
    ngOnInit(): void {
      this.getProductList();
      this.getBranchList('direct');
      this.issuerHeader = [
        { key: 'QuoteNo', display: 'QuoteNo'},
        { key: 'LoginId', display: 'LoginId' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PaymentId', display: 'PaymentId' },
        { key: 'PaymentTypedesc', display: 'Payment Type' },
        { key: 'PaymentStatus', display: 'Check Status',
          config: {
            isCheckStatus:true,
          },
        },
      ];
    }
  
    getCompanyList(){
      let ReqObj = {
        "BrokerCompanyYn":"",
        "LoginId": this.loginId
      }
      let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            let defaultObj = []
            this.insuranceList = defaultObj.concat(data.Result);
            if(this.insuranceId) this.getProductList();
          }
    
        },
        (err) => { },
      );
    }
    getBranchList(type){
      if(type=='change'){
          this.branchValue = null;
        }
       
      let ReqObj = {
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.branchList = obj.concat(data?.Result);
          if(!this.branchValue){ this.branchValue = "99999";}
          if(this.productId && this.branchValue) this.getalldetails(null,'change');
          // else{}
        }
      },
      (err) => { },
    
    );
    }
    getProductList(){
  
      console.log('KKKKKKKKKKKK',this.insuranceId);
      let ReqObj = {
        "InsuranceId": this.insuranceId,
      }
      let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.productList = data.Result;
            if(this.productId==null){this.productId = this.userDetails.Result.ProductId};
            if(this.productId && this.branchValue) this.getalldetails(null,'change');
          }
        },
        (err) => { },
      );
    
    }
    getalldetails(element,entryType){
      this.searchedSection = false;
      let ReqObj = {
          "LoginId":"",
          "ProductId":this.productId,
          "InsuranceId":this.insuranceId,
          "BranchCode":this.branchValue,
          "Limit":this.limit,
          "Offset":60
        }
        let urlLink = `${this.CommonApiUrl}api/paymentpendingstatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          this.searchedSection = true;
          if(data.Result?.PaymentStausRes){
           
           
            this.totalQuoteRecords = data.Result?.TotalCount;
            this.pageCount = 10;
            if (entryType == 'change') {
              this.quotePageNo = 1;
              let startCount = 1, endCount = this.pageCount;
              startCount = endCount + 1;
              let quoteData = data.Result?.PaymentStausRes
              this.issuerData=data.Result?.PaymentStausRes;
              if (quoteData.length <= this.pageCount) {
                endCount = quoteData.length
              }
              else endCount = this.pageCount;
            
              this.startIndex = startCount; this.endIndex = endCount;
            }
            else{
              let startCount = element.startCount, endCount = element.endCount;
              this.pageCount = element.n;
              startCount = endCount + 1;
                let quoteData = data.Result?.CustomerDetails;
                this.issuerData = this.issuerData.concat(data.Result?.CustomerDetails);
              if (this.totalQuoteRecords <= endCount + (element.n)) {
                endCount = this.totalQuoteRecords
              }
              else endCount = endCount + (element.n);
              this.startIndex = startCount; this.endIndex = endCount;
            }
        }
        },
        (err) => { },
      
      );
    }
    onNextData(element){
      this.limit = String(Number(this.limit)+1);
      this.quotePageNo = this.quotePageNo+1;
      this.startIndex = element.startCount;
      this.endIndex = element.endCount
      this.getalldetails(element,'direct');
    }
    onPreviousData(element){
      this.limit = String(Number(this.limit)-1);
        this.quotePageNo = this.quotePageNo-1;
      this.getalldetails(element,'direct');
    }
    onCheckStatus(rowData,modal){
      let ReqObj = {
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${rowData.QuoteNo}`;
      
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.result=='FAIL'){
            // this.paymentPendingInfo = true;
            // setTimeout(() => this.paymentPendingInfo = false, (4*1000));
            let response = {
              "Message": "Success",
              "IsError": false,
              "ErrorMessage": null,
              "Result": {
                  "QuoteDetails": {
                      "QuoteNo": "Q07600",
                      "RequestReferenceNo": "MOT-11836",
                      "CustomerId": "C-07489",
                      "CompanyId": "100002",
                      "BranchCode": "01",
                      "ProductId": "5",
                      "SectionId": "10",
                      "AmendId": "0",
                      "LoginId": "newbroker1",
                      "ApplicationId": "Issuer11",
                      "ApplicationNo": "0",
                      "AgencyCode": "10111",
                      "AcExecutiveId": null,
                      "BrokerCode": "10111",
                      "EffectiveDate": "25/11/2023",
                      "ExpiryDate": "24/11/2024",
                      "Status": "P",
                      "QuoteCreatedDate": "24/11/2023",
                      "EntryDate": "24/11/2023",
                      "InceptionDate": "25/11/2023",
                      "LapsedDate": null,
                      "LapsedRemarks": null,
                      "LapsedUpdatedBy": null,
                      "Currency": "TZS",
                      "Remarks": null,
                      "AdminRemarks": null,
                      "ReferalRemarks": null,
                      "VehicleNo": "1",
                      "ExchangeRate": "1.0",
                      "NoOfVehicles": "1",
                      "PremiumFc": "300000.0",
                      "OverallPremiumFc": "354000.0",
                      "VatPremiumFc": "54000.0",
                      "VatPercent": "18.0",
                      "PremiumLc": "300000.0",
                      "OverallPremiumLc": "354000.0",
                      "VatPremiumLc": "54000.0",
                      "FinalizeYn": "N",
                      "Tax1": "0.0",
                      "Tax2": "0.0",
                      "Tax3": "0.0",
                      "EmiYn": "N",
                      "InstallmentPeriod": "",
                      "InstallmentMonth": "",
                      "DueAmount": null,
                      "TinyUrl": null,
                      "ManualReferalYn": "N",
                      "SubUserType": "both",
                      "ProductName": "Motor",
                      "CompanyName": "Alliance - Tanzania",
                      "HavePromoCode": "N",
                      "PromoCode": null,
                      "BrokerBranchCode": "2",
                      "AdminLoginId": null,
                      "UserType": "Issuer",
                      "BdmCode": null,
                      "SourceType": "broker",
                      "CustomerCode": "7010000240",
                      "BrokerBranchName": "Arusha",
                      "BranchName": "Arusha",
                      "EndtStatus": "",
                      "EndtTypeId": null,
                      "policyNo": "P11/2023/110/100201/10/0002601",
                      "Endtcategdesc": null,
                      "Endorsementremarks": null,
                      "Endorsementeffdate": null,
                      "Endtprevpolicyno": null,
                      "Endtprevquoteno": null,
                      "Endtcount": 0,
                      "EndtTypeDesc": "",
                      "IsChargeOrRefund": "",
                      "OriginalPolicyNo": "P11/2023/110/100201/10/0002601",
                      "EndtPremium": 0,
                      "EndtPremiumTax": 0,
                      "TotalEndtPremium": 0,
                      "CommissionPercentage": "2.0000",
                      "VatCommission": "0.0",
                      "MerchantReference": "MERCHANT-03375",
                      "DebitNoteNo": "DNP110-000003722",
                      "CreditNo": "CNP110-000003138",
                      "StickerNumber": ""
                  },
                  "CustomerDetails": {
                      "CustomerId": "C-07489",
                      "CustomerReferenceNo": "99999",
                      "PolicyHolderTypeid": "4",
                      "AppointmentDate": null,
                      "PreferredNotification": "Mail",
                      "IdType": "4",
                      "IdNumber": "2222222222",
                      "Age": "36",
                      "Gender": "M",
                      "Occupation": "12",
                      "BusinessType": null,
                      "RegionCode": "01",
                      "IsTaxExempted": "N",
                      "ClientName": "Individual Customer",
                      "Address1": "Test Addres1",
                      "Address2": "Test Adress2",
                      "Title": "1",
                      "TitleDesc": "Mr",
                      "Clientstatus": "Y",
                      "ClientStatusDesc": "Active",
                      "PolicyHolderType": "1",
                      "IdTypeDesc": "Driving License",
                      "DobOrRegDate": "09/06/1987",
                      "Nationality": "TZA",
                      "Placeofbirth": "Chennai",
                      "GenderDesc": "Male",
                      "OccupationDesc": "Motor Racing",
                      "BusinessTypeDesc": null,
                      "Vrngst": "2222222222",
                      "StateCode": "10000",
                      "StateName": "Dar es Salaam",
                      "CityCode": "12000",
                      "CityName": "Kigamboni",
                      "Street": "Samples Street",
                      "Fax": null,
                      "TelephoneNo1": "044555572",
                      "TelephoneNo2": null,
                      "TelephoneNo3": null,
                      "MobileNo1": "7898997888",
                      "MobileNo2": null,
                      "MobileNo3": null,
                      "Email1": "maanrsa001@gmail.com",
                      "Email2": null,
                      "Email3": null,
                      "Language": "1",
                      "LanguageDesc": "Swahili",
                      "TaxExemptedId": null,
                      "CreatedBy": "Issuer11",
                      "Status": "Y",
                      "UpdatedDate": "09/10/2023",
                      "UpdatedBy": "Issuer11",
                      "EntryDate": "24/11/2023",
                      "InsuranceId": "100002",
                      "BranchCode": "01",
                      "BrokerBranchCode": "None",
                      "ProductId": null,
                      "VrTinNo": "2222222222",
                      "PinCode": "52222"
                  },
                  "RiskDetails": [
                      {
                          "RiskId": "1",
                          "Accident": "N",
                          "Gpstrackinginstalled": "N",
                          "Windscreencoverrequired": "Y",
                          "Insurancetype": "10",
                          "InsuranceTypeDesc": "MOTOR Private Vehicles",
                          "MotorCategory": "1",
                          "MotorCategoryDesc": "Motor Vehicle",
                          "Motorusage": "14",
                          "Registrationnumber": "T351DAY",
                          "Chassisnumber": "JTGRB71J3E7017264",
                          "Vehiclemake": "Toyota",
                          "VehiclemakeDesc": null,
                          "Vehcilemodel": "Landcruiser",
                          "VehcilemodelDesc": "Landcruiser",
                          "VehicleType": "2",
                          "VehicleTypeDesc": "4 WHEEL DRIVE/SUV",
                          "ModelNumber": null,
                          "EngineNumber": "778211",
                          "FuelType": "Diesel",
                          "FuelTypeDesc": "Diesel",
                          "RegistrationYear": null,
                          "SeatingCapacity": 5,
                          "CubicCapacity": 4200.0,
                          "Color": "White",
                          "ColorDesc": "White",
                          "Grossweight": 2400.0,
                          "Tareweight": 2000.0,
                          "Actualpremium": null,
                          "CoverNoteNo": null,
                          "Stickerno": null,
                          "WindScreenSumInsured": 0.0,
                          "AcccessoriesSumInsured": 0.0,
                          "AccessoriesInformation": null,
                          "NumberOfAxels": "2",
                          "AxelDistance": 0.0,
                          "SumInsured": 650000.0,
                          "OverRidePercentage": null,
                          "TppdFreeLimit": null,
                          "TppdIncreaeLimit": 0.0,
                          "InsurerSettlement": null,
                          "PolicyType": "1",
                          "PolicyTypeDesc": "Comprehensive",
                          "RadioOrCasseteplayer": null,
                          "RoofRack": null,
                          "SpotFogLamp": null,
                          "TrailerDetails": null,
                          "InsuranceClass": "1",
                          "OwnerCategory": "Company",
                          "ManufactureAge": 9,
                          "RegistrationAge": null,
                          "NcdYears": null,
                          "NcdYn": "N",
                          "ManufactureYear": "2014",
                          "CollateralYn": null,
                          "BorrowerType": null,
                          "CollateralName": "",
                          "FirstLossPayee": "",
                          "FleetOwnerYn": "N",
                          "NoOfComprehensives": null,
                          "ClaimRatio": "0.0",
                          "CityLimit": null,
                          "DocumentsTitle": "MOTOR Private Vehicles",
                          "SavedFrom": "API",
                          "DriverDetails": [
                              {
                                  "DriverId": "1",
                                  "DriverName": "Individual Customer",
                                  "DriverDob": "09/06/1987",
                                  "DriverType": "1",
                                  "LicenseNo": "2222222222",
                                  "EntryDate": "24/11/2023",
                                  "CreatedBy": "Issuer11"
                              }
                          ],
                          "SectionId": "10",
                          "SectionDetails": [
                              {
                                  "SectionId": "10",
                                  "SectionName": "MOTOR Private Vehicles",
                                  "PremiumAfterDiscount": "72750.0",
                                  "PremiumAfterDiscountLc": "72750.0",
                                  "PremiumBeforeDiscount": "72750.0",
                                  "PremiumBeforeDiscountLc": "72750.0",
                                  "PremiumExcluedTax": "300000.0",
                                  "PremiumExcluedTaxLc": "300000.0",
                                  "PremiumIncludedTax": "354000.0",
                                  "PremiumIncludedTaxLc": "354000.0",
                                  "Covers": [
                                      {
                                          "CoverId": "16",
                                          "Rate": 50000.0,
                                          "CoverName": "Loss of Use ",
                                          "CoverDesc": "Loss of Use ",
                                          "IsSubCover": "N",
                                          "SumInsured": 250000.0,
                                          "SumInsuredLc": 250000.0,
                                          "SubCovers": null,
                                          "DependentCoverYN": "Y",
                                          "DependentCoverId": "5",
                                          "CoverageType": "O",
                                          "isSelected": "Y",
                                          "PremiumBeforeDiscountLC": 50000.0,
                                          "PremiumAfterDiscountLC": 50000.0,
                                          "PremiumExcluedTaxLC": 50000.0,
                                          "PremiumIncludedTaxLC": 59000.0,
                                          "PremiumBeforeDiscount": 50000.0,
                                          "PremiumAfterDiscount": 50000.0,
                                          "PremiumExcluedTax": 50000.0,
                                          "PremiumIncludedTax": 59000.0,
                                          "RegulatoryCode": "SP014001000000",
                                          "ExcessAmount": "1000.0",
                                          "ExcessPercent": "10.0",
                                          "ExcessDesc": "None",
                                          "MultiSelectYn": "N",
                                          "SectionName": null,
                                          "MinimumPremiumYn": "N"
                                      },
                                      {
                                          "CoverId": "5",
                                          "Rate": 3.5,
                                          "CoverName": "Base Cover",
                                          "CoverDesc": "Base Cover - Motor",
                                          "IsSubCover": "N",
                                          "SumInsured": 650000.0,
                                          "SumInsuredLc": 650000.0,
                                          "SubCovers": null,
                                          "DependentCoverYN": "N",
                                          "DependentCoverId": "",
                                          "CoverageType": "B",
                                          "isSelected": "D",
                                          "PremiumBeforeDiscountLC": 22750.0,
                                          "PremiumAfterDiscountLC": 22750.0,
                                          "PremiumExcluedTaxLC": 250000.0,
                                          "PremiumIncludedTaxLC": 295000.0,
                                          "PremiumBeforeDiscount": 22750.0,
                                          "PremiumAfterDiscount": 22750.0,
                                          "PremiumExcluedTax": 250000.0,
                                          "PremiumIncludedTax": 295000.0,
                                          "RegulatoryCode": "SP014001000001",
                                          "ExcessAmount": "350000.0",
                                          "ExcessPercent": "5.0",
                                          "ExcessDesc": "None",
                                          "MultiSelectYn": "N",
                                          "SectionName": null,
                                          "MinimumPremiumYn": "Y"
                                      }
                                  ]
                              }
                          ],
                          "EndorsementYn": "N",
                          "EndtCount": null,
                          "EffectiveDate": null,
                          "PremiumLc": 300000.0,
                          "PremiumFc": 300000.0,
                          "OverAllPremiumFc": 354000.0,
                          "OverAllPremiumLc": 354000.0,
                          "CommissionAmount": "7080.000",
                          "CommissionPercentage": "2.0",
                          "VatCommission": "0.0",
                          "BorrowerTypeDesc": "",
                          "BankCode": null,
                          "BankName": null,
                          "FinalyseYn": "N"
                      }
                  ],
                  "DocumentDetails": [
                      {
                          "DocumentTitle": "JTGRB71J3E7017264~null~Landcruiser",
                          "RiskId": "1",
                          "SectionId": "10"
                      }
                  ],
                  "TotalAccessoriesSumInsured": 0.0
              },
              "ErroCode": 0
            }
            this.quoteDetails = response?.Result?.QuoteDetails;
            if(this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!=''){
              this.quoteNo = rowData.QuoteNo;
              this.policyNo = this.quoteDetails?.policyNo;
              this.merchantRefNo = this.quoteDetails?.MerchantReference;
              this.creditNoteNo = this.quoteDetails?.CreditNoteNo;
              this.debitNoteNo = this.quoteDetails?.DebitNoteNo
              this.paymentDetails = {
                "QuoteNo": rowData.QuoteNo,
                "PolicyNo": this.quoteDetails?.policyNo,
                "MerchantReference": this.quoteDetails?.MerchantReference,
                "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
                "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
              };
              this.policySection = true;
              this.open(modal);  
            }
          }
          else{
            
            this.getviewQuoteDetails(rowData,modal);
          }
        });
    }
    getviewQuoteDetails(rowData,modal){
      let ReqObj = {
        "QuoteNo": rowData?.QuoteNo
      }
      let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data?.Result){
              this.open(modal);  
            }
        });
    }
    open(content) {
      this.modalService.open(content, { size: 'md', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    onDebitdownload(rowData){
      console.log('KKKKKKKKKKK',rowData.QuoteNo);
      let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`
  
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', data?.Result.PdfOutFile);
          link.setAttribute('download','DebitPdf');
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
        (err) => { },
      );
    }
    onCreditdownload(rowData){
      console.log('KKKKKKKKKKK',rowData.QuoteNo);
      let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`
  
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', data?.Result.PdfOutFile);
          link.setAttribute('download','Creditpdf');
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
        (err) => { },
      );
    }
    onGetSchedule(rowData){
      let schedule:any;let ReqObj
        ReqObj = {
          "QuoteNo":rowData.QuoteNo,
        }
      let urlLink = `${this.CommonApiUrl}pdf/policyform`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result?.PdfOutFile){
              this.downloadMyFile(data.Result.PdfOutFile);
          }
          else{
            Swal.fire({
              title: '<strong>Schedule Pdf</strong>',
              icon: 'error',
              html:
                `No Pdf Generated For this Policy`,
              //showCloseButton: true,
              //focusConfirm: false,
              showCancelButton: false,
  
              //confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
            })
          }
        },
        (err) => { },
      );
    }
    downloadMyFile(data) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', data);
      link.setAttribute('download', 'Schedule');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
}
