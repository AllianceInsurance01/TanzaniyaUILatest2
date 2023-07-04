import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CoverDetailsComponent } from '../cover-details/cover-details.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-travel-quote-details',
  templateUrl: './travel-quote-details.component.html',
  styleUrls: ['./travel-quote-details.component.scss']
})
export class TravelQuoteDetailsComponent implements OnInit {

  @Input('quoteRefNo') quoteRefNo: any;
  @Input('travelDetails') travelDetails: any;
  @Output('getBack') getBack = new EventEmitter();
  @Output('onWishListProceed') onWishListProceed = new EventEmitter();
  @Output('redirectValidations') redirectValidations = new EventEmitter();
  searchList: any[] = []; customerHeader: any[] = []; customerData: any[] = [];
  addSection: boolean = false; customerData2: any[] = []; customerHeader2: any[] = [];
  title: any; clientName: any; dateOfBirth: any; productValue: any;
  emailId: any; mobileNo: any; idNumber: any; productList: any[] = [];
  travelsList: any[] = []; minDate: Date; kidSection: boolean = false;
  adultSection: boolean = false; seniorSection: boolean = false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; ageList: any[] = [];
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  countryList: any[] = []; referenceNo: any = null; travelGroupList: any[] = [];
  customerHeader3: any[] = []; noOfDays: any;
  currencyList: any[] = []; planList: any[] = []; exchangeRate: any; productId: any; commissionValue: any = "";
  userDetails: any; currencyCode: any; endDate: any; applicationId: any = null; executiveValue: any = "";
  loginId: any; userType: any; agencyCode: any; branchCode: any; insuranceId: any; customerDetails: any;
  endMinDate: Date; adminSection: boolean = false; issuerSection: boolean; public TravelForm: FormGroup;
  maxDate: Date; travelId: any; travelName: any; premiumList: any; travelStartDate: any; grandSeniorEndAge: any;
  travelEndDate: any; customerDatas: any; subuserType: any; executiveSection: boolean = false;
  kidStartAge: any; kidEndAge: any; brokerbranchCode: any; superSeniorSection: boolean = false;
  adultStartAge: any; adultEndAge: any; seniorStartAge: any; seniorEndAge: any; grandSeniorStartAge: any;
  BelongingCountryId: any; brokerCode: any; brokerLoginId: any; superSeniorStartAge: any;
  executiveList: any[] = []; commissionTypeList: any[] = []; superSeniorEndAge: any; grandSeniorSection: boolean = false;
  PlanList: any[] = []; benefitList: any[] = [];
  questionSection: boolean = false; uwQuestionList: any[] = [];
  requestReferenceNo: string;
  passengerError: boolean = false;

  constructor(private router: Router, private updateComponent: UpdateCustomerDetailsComponent,
    private sharedService: SharedService, private datePipe: DatePipe
    , public dialogService: MatDialog, private updateCustomerComponent: UpdateCustomerDetailsComponent) {

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails", this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if (this.userType != 'Broker') {
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        this.adminSection = true;
      }
    }
    else {
      this.subuserType = sessionStorage.getItem('typeValue');
    }
    this.ageDropdown();
    this.createForm();

    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if (quoteRefNo) this.requestReferenceNo = quoteRefNo;
    else {
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
        if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
        else { this.issuerSection = false; }
      }
      else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
      else this.issuerSection = false
    }
    //this.getUWDetails();
  }

  ngOnInit(): void {
    this.getUWDetails();
  }
  public createForm() {

    this.TravelForm = new FormGroup({
      PlanTypeId: new FormControl('', Validators.required),
      SourceCountry: new FormControl(''),
      SectionId: new FormControl(''),
      HavePromoCode: new FormControl('N', Validators.required),
      PromoCode: new FormControl('', Validators.required),
      SportsCoverYn: new FormControl('N', Validators.required),
      TerrorismCoverYn: new FormControl('N', Validators.required),
      CovidCoverYn: new FormControl('N', Validators.required),
      TravelGroupDetails1: new FormControl('0'),
      TravelGroupDetails2: new FormControl('0'),
      TravelGroupDetails3: new FormControl('0'),
      TravelGroupDetails4: new FormControl('0'),
      TravelGroupDetails5: new FormControl('0'),
      travelStartDate: new FormControl(''),
      travelEndDate: new FormControl(''),
      Currency: new FormControl('Y', Validators.required),
      ExchangeRate: new FormControl('', Validators.required),
    });
  }
  setValues(customerDatas) {
    console.log("Travel Details",this.travelDetails)
    this.travelName = customerDatas.travelName;
    this.BelongingCountryId = customerDatas.CountryId;
    this.executiveValue = customerDatas?.AcExecutiveId;
    this.commissionValue = customerDatas?.CommissionType;
    this.TravelForm.controls['PlanTypeId'].setValue(customerDatas.PlanTypeId);
    this.TravelForm.controls['SourceCountry'].setValue(customerDatas.DestinationCountry);
    this.premiunDropdown(customerDatas.SectionId)
    this.TravelForm.controls['HavePromoCode'].setValue(customerDatas.HavePromoCode);
    this.TravelForm.controls['PromoCode'].setValue(customerDatas.PromoCode);
    this.TravelForm.controls['SportsCoverYn'].setValue(customerDatas.SportsCoverYn);
    this.TravelForm.controls['TerrorismCoverYn'].setValue(customerDatas.TerrorismCoverYn);
    this.TravelForm.controls['CovidCoverYn'].setValue(customerDatas.CovidCoverYn);
    let passengerDetails = customerDatas.GroupDetails;
    if (passengerDetails.length != 0) {
      for (let passenger of passengerDetails) {
        let entry = this.travelGroupList.filter(ele => ele.GroupId == passenger.GroupId);
        console.log("Entryyyyyyy", entry)
        if (entry) {
          entry[0].GroupMembers = passenger.GroupMembers
        }
      }
    }
    //  this.TravelForm.controls['travelStartDate'].setValue(customerDatas.TravelStartDate);
    //  this.TravelForm.controls['travelEndDate'].setValue(customerDatas.TravelEndDate);
  }
  ageDropdown() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": "4"
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productgroup`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.ageList = data.Result;
          if (this.ageList.length != 0) {
            let i = 0;
            for (let age of this.ageList) {
              let entry = { "GroupId": age.Code, "GroupMembers": "0", "GroupDesc": age.CodeDesc };
              this.travelGroupList.push(entry)
              i += 1;
              if (i == this.ageList.length) this.planType();
            }
          }
          else {
            this.planType();
          }

        }
      },
      (err) => { },
    );
  }
  planType() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.planList = data.Result;

          this.getCountryList();
        }

      },
      (err) => { },
    );
  }
  getCountryList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/nationality`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.countryList = data.Result;
          if (this.travelDetails) {
            this.setValues(this.travelDetails);
          }

        }
      },
      (err) => { },
    );
  }
  premiunDropdown(value) {
    let loginId = null;
    if(this.userType!='Issuer'){
      loginId=this.loginId;
    }
    else{
      loginId = this.updateComponent.brokerLoginId;
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "CountryId": this.TravelForm.controls['SourceCountry'].value,
      "LoginId":loginId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/countryplans`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.premiumList = data.Result;
          this.TravelForm.controls['SectionId'].setValue(value);
        }
      },
      (err) => { },
    );
  }
  viewplanBenifits() {
    let ReqObj = {
      "PlanTypeId": this.TravelForm.controls['PlanTypeId'].value,
      //"PolicyTypeId":this.TravelForm.controls[''].value,
      //"PolicyTypeId":this.TravelForm.controls['PlanTypeId'].value,
      "PolicyTypeId": this.TravelForm.controls['SectionId'].value
    }
    let urlLink = `${this.motorApiUrl}api/gettravelpolicytype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          const dialogRef = this.dialogService.open(CoverDetailsComponent, {
            data: {
              titles: 'travel PolicyDetails',
              benefitList: data.Result
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
      },

      (err) => { },
    );
  }
  onchangeContents(type, index) {
    if (type == 'sub') {
      this.travelGroupList[index].GroupMembers = String(Number(this.travelGroupList[index].GroupMembers) - 1);
    }
    else {
      this.travelGroupList[index].GroupMembers = String(Number(this.travelGroupList[index].GroupMembers) + 1);
    }
  }
  onProceed() {
    let validDetais = this.checkMandatories();
    if (validDetais) {
      this.onSave();
    }
  }
  checkMandatories() {

    if (this.issuerSection) {
      if (this.updateComponent.branchValue != '' && this.updateComponent.branchValue != undefined && this.updateComponent.branchValue != null) {
        //this.branchValueError = false;
        this.redirectValidations.emit('reset');
        if (this.updateComponent.sourceType != '' && this.updateComponent.sourceType != undefined && this.updateComponent.sourceType != null) {
          //this.sourceCodeError = false;
          this.redirectValidations.emit('reset');
          if (this.updateComponent.brokerCode != '' && this.updateComponent.brokerCode != undefined && this.updateComponent.brokerCode != null) {
            //this.brokerCodeError = false;
            this.redirectValidations.emit('reset');
            if (this.updateComponent.CustomerCode != '' && this.updateComponent.CustomerCode != undefined && this.updateComponent.CustomerCode != null) {
              //this.customerCodeError = false;
              this.redirectValidations.emit('reset');
              if (this.updateComponent.travelStartDate != '' && this.updateComponent.travelStartDate != undefined && this.updateComponent.travelStartDate != null) {
                this.redirectValidations.emit('reset');
                if (this.updateComponent.travelEndDate != '' && this.updateComponent.travelEndDate != undefined && this.updateComponent.travelEndDate != null) {
                  this.redirectValidations.emit('reset');
                  if (this.updateComponent.CurrencyCode != '' && this.updateComponent.CurrencyCode != undefined && this.updateComponent.CurrencyCode != null) {
                    this.redirectValidations.emit('reset');
                    if (this.updateComponent.HavePromoCode != '' && this.updateComponent.HavePromoCode != undefined && this.updateComponent.HavePromoCode != null) {
                      this.redirectValidations.emit('reset');
                      if(this.updateComponent.HavePromoCode!='N'){
                        if (this.updateComponent.PromoCode != '' && this.updateComponent.PromoCode != undefined && this.updateComponent.PromoCode != null) {
                          this.redirectValidations.emit('reset');
                          return true;
                        }
                        else {
                          this.redirectValidations.emit('promoCode');
                        }
                      }
                      else return true;
                    }
                    else {
                      this.redirectValidations.emit('havePromoCode');
                    }
                  }
                  else {
                    this.redirectValidations.emit('currencyCode');
                  }
                }
                else {
                  this.redirectValidations.emit('travelEndDate');
                }
              }
              else {
                this.redirectValidations.emit('travelStartDate');
              }
              // if(this.executiveSection){
              //   if(this.executiveValue!='' && this.executiveValue!=undefined && this.executiveValue!=null){
              //       this.executiveError=false;
              //       if(this.commissionValue!='' && this.commissionValue!=undefined && this.commissionValue!=null){
              //         this.commissionError=false;
              //         return true;
              //       }
              //       else{
              //         this.commissionError=true;
              //       }
              //   }
              //   else{
              //     this.executiveError=true;
              //   }
              // }
              // else{
              //   this.executiveValue = null;
              //   this.commissionValue = null;
              //   return true;
              // }
            }
            else {
              this.redirectValidations.emit('customerCode');
              //this.customerCodeError = true;
            }

          }
          else if (this.updateComponent.sourceType == 'Broker') {
            this.redirectValidations.emit('brokerCode');
            //this.brokerCodeError = true;
          }
          else if (this.updateComponent.sourceType == 'Agent' || this.updateComponent.sourceType == 'Direct') {
            this.updateComponent.brokerCode = null;
            this.updateComponent.branchValue = null;
            this.redirectValidations.emit('reset');
            //this.brokerCodeError = false;
            return true;
          }
        }
        else {
          this.redirectValidations.emit('sourceType');
          //this.sourceCodeError = true;
          return false;
        }
      }
      else {
        this.redirectValidations.emit('branchValue');
        //this.branchValueError = true;
      }
    }
    else {
        if (this.updateComponent.travelStartDate != '' && this.updateComponent.travelStartDate != undefined && this.updateComponent.travelStartDate != null) {
          this.redirectValidations.emit('reset');
          if (this.updateComponent.travelEndDate != '' && this.updateComponent.travelEndDate != undefined && this.updateComponent.travelEndDate != null) {
            this.redirectValidations.emit('reset');
            if (this.updateComponent.CurrencyCode != '' && this.updateComponent.CurrencyCode != undefined && this.updateComponent.CurrencyCode != null) {
              this.redirectValidations.emit('reset');
              if (this.updateComponent.HavePromoCode != '' && this.updateComponent.HavePromoCode != undefined && this.updateComponent.HavePromoCode != null) {
                this.redirectValidations.emit('reset');
                if(this.updateComponent.HavePromoCode=='Y'){
                  if (this.updateComponent.PromoCode != '' && this.updateComponent.PromoCode != undefined && this.updateComponent.PromoCode != null) {
                    this.redirectValidations.emit('reset');
                    return true;
                  }
                  else {
                    this.redirectValidations.emit('promoCode');
                  }
                }
                else{
                  return true;
                }
                
              }
              else {
                this.redirectValidations.emit('havePromoCode');
              }
            }
            else {
              this.redirectValidations.emit('currencyCode');
            }
          }
          else {
            this.redirectValidations.emit('travelEndDate');
          }
        }
        else {
          this.redirectValidations.emit('travelStartDate');
        }

    }
  }
  onSave() {
    let travelList = [];
    let totalPassengers = 0;
    travelList = this.travelGroupList.filter(ele => ele.GroupMembers != '0');
    if (travelList.length != 0) {
      let i = 0;
      this.passengerError = false;
      for (let travel of travelList) {
        totalPassengers = totalPassengers + Number(travel.GroupMembers);
        i += 1;
        if (i == travelList.length) {
          this.onFormSubmit(travelList, totalPassengers);
        }

        /*else{
          this.onFinalProceed();
        }*/
      }
    }
    else {
      this.passengerError = true;
    }
  }
  onFormSubmit(travelList, totalPassengers) {
    let createdBy = "";
    createdBy = this.loginId;
    this.brokerCode = this.agencyCode;
    this.brokerLoginId = createdBy;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.applicationId = "01";
    let appId = "1", loginId = "", brokerbranchCode = "";
    let acExecutiveId = "", commissionType = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        createdBy = this.travelDetails.CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
        acExecutiveId = this.executiveValue;
        commissionType = this.commissionValue;
      }
      else{
        appId = this.loginId;
        loginId = this.updateComponent.brokerLoginId
        brokerbranchCode = null;
      }
    }
    let currencyCode = null, exchangeRate = null, startDate = null, endDate = null, noOfDays = null;
    if (this.updateComponent.CurrencyCode) {
      currencyCode = this.updateComponent.CurrencyCode
    }
    if (this.updateComponent.exchangeRate) {
      exchangeRate = this.updateComponent.exchangeRate
    }
    if (this.updateComponent.travelStartDate) {
      startDate = this.updateComponent.travelStartDate
    }
    if (this.updateComponent.travelEndDate) {
      endDate = this.updateComponent.travelEndDate
    }
    if (this.updateComponent.noOfDays) {
      noOfDays = this.updateComponent.noOfDays
    }
    let sourceType=null,branchValue=null,bdmCode=null,brokerCode=null,brokerBranchCode=null,customerCode=null;
    if(this.userType!='Broker' && this.userType!='User'){
      sourceType = this.updateComponent.sourceType;
      branchValue = this.updateComponent.branchValue;
      bdmCode = this.updateComponent.brokerCode;
      brokerCode = this.updateComponent.brokerCode;
      brokerbranchCode =  this.updateComponent.brokerBranchCode;
      customerCode = this.updateComponent.CustomerCode;
    }
    else{
      customerCode = this.updateComponent.CustomerCode;
      sourceType = 'Broker';
      branchValue = this.branchCode;
      brokerCode = this.brokerCode;
      brokerBranchCode = this.brokerbranchCode
    }
    let ReqObj = {

      "AcExecutiveId": acExecutiveId,
      "ApplicationId": appId,
      "CommissionType": commissionType,
      "BrokerCode": brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
      "RequestReferenceNo": this.quoteRefNo,
      "BranchCode": branchValue,
      "ProductId": this.productId,
      "UserType": this.userType,
      "BrokerBranchCode": brokerbranchCode,
      "BdmCode": bdmCode,
      "CreatedBy": createdBy,
      "CustomerCode": customerCode,
      "InsuranceId": this.insuranceId,
      "SourceType": sourceType,
      "SectionId": this.TravelForm.controls['SectionId'].value,
      "TravelCoverId": this.TravelForm.controls['SectionId'].value,
      "Currency": currencyCode,
      "ExchangeRate": exchangeRate,
      "PlanTypeId": this.TravelForm.controls['PlanTypeId'].value,
      "SourceCountry": "TZA",
      "DestinationCountry": this.TravelForm.controls['SourceCountry'].value,
      "TotalPassengers": totalPassengers,
      "TravelId": "1",
      "HavePromoCode": this.updateComponent.HavePromoCode,
      "PromoCode": this.updateComponent.PromoCode,
      "SportsCoverYn": this.TravelForm.controls['SportsCoverYn'].value,
      "TerrorismCoverYn": this.TravelForm.controls['TerrorismCoverYn'].value,
      "CovidCoverYn": this.TravelForm.controls['CovidCoverYn'].value,
      "TravelCoverDuration": noOfDays,
      "TravelEndDate": this.travelStartDate,
      "TravelStartDate": this.travelEndDate,
      "GroupDetails": travelList
    }
    ReqObj['TravelStartDate'] = this.datePipe.transform(startDate, "dd/MM/yyyy");
    ReqObj['TravelEndDate'] = this.datePipe.transform(endDate, "dd/MM/yyyy");
    console.log("Received Obj",ReqObj)
    let urlLink = `${this.motorApiUrl}api/savetraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {
          }
        }
        else {
          let entry = data?.Result;
          entry['TravelStartDate'] = ReqObj?.TravelStartDate;
          entry['TravelEndDate'] = ReqObj?.TravelEndDate;
          entry['TotalPassengers'] = ReqObj?.TotalPassengers;
          entry['SectionId'] = ReqObj?.SectionId;
          entry['Currency'] = ReqObj?.Currency;
          entry['DestinationCountry'] = data?.Result?.DestinationCountryDesc;
          entry['NoofDays'] = ReqObj?.TravelCoverDuration;
          this.requestReferenceNo = data.Result.RequestReferenceNo;
          this.onFinalProceed(entry);



        }
      },
      (err) => { },
    );
  }
  getCoverList(coverListObj) {
    this.currencyCode = coverListObj?.Currency;
    let createdBy = this.loginId
    let groupList = coverListObj?.GroupDetails;
    let vehicleList = [];
    if (groupList.length != 0) {
      let i = 0;
      for (let group of groupList) {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "SectionId": coverListObj?.SectionId,
          "ProductId": this.productId,
          "MSRefNo": coverListObj?.MSRefNo,
          "VehicleId": group.TravelId,
          "CdRefNo": coverListObj?.CdRefNo,
          "VdRefNo": coverListObj?.VdRefNo,
          "CreatedBy": createdBy,
          "productId": this.productId,
          "Passengers": group.GroupMembers,
          "RequestReferenceNo": coverListObj?.RequestReferenceNo,
          "CoverModification":'N'
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let entry = data;

            entry['DestinationCountry'] = coverListObj.DestinationCountry;
            entry['TravelStartDate'] = coverListObj.TravelStartDate;
            entry['TravelEndDate'] = coverListObj.TravelEndDate;
            let groupEntry = groupList.filter(ele => ele.GroupId == data?.VehicleId);
            if (groupEntry) {
              entry['Passengers'] = groupEntry[0].GroupMembers;
              entry['TravelId'] = entry.VehicleId;
            }
            vehicleList.push(entry);
            i += 1;
            console.log("iiiiiiiii ", i)
            if (i == groupList.length) {
              console.log("grouppppppppppppppppppp");
              sessionStorage.setItem('quoteReferenceNo', coverListObj.RequestReferenceNo)
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              // this.vehicleDetailsList = vehicleList;
              // console.log("Final Vehicle Details",vehicleList);
              // this.checkSelectedCovers();

            }
          },
          (err) => { },
        );
      }
    }

  }


  getUWDetails() {
    let ReqObj = {
      "Limit": "0",
      "Offset": "100",
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          this.uwQuestionList = res;
          this.getEditUwQuestions();
        }
        else {
          //this.getCurrencyList();
        }
      },
      (err) => { },
    );
  }


  getEditUwQuestions() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "RequestReferenceNo": this.requestReferenceNo,
      "VehicleId": "1"
    }
    let urlLink = `${this.CommonApiUrl}api/getuwquestionsdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let uwList = data?.Result;
        if (uwList.length != 0) {
          let i = 0;
          for (let ques of uwList) {
            let entry = this.uwQuestionList.find(ele => ele.UwQuestionId == ques.UwQuestionId);
            if (entry) { entry.Value = ques.Value };
            i += 1;
            if (i == uwList.length) {
              this.uwQuestionList.forEach(x => {
                x.Value = x.Value ? '' || 'N' : 'N'
              });
              this.questionSection = true; console.log("Final UW List", this.uwQuestionList); /*this.getCurrencyList();*/
            }
          }
        }
        else {
          this.uwQuestionList.forEach(x => {
            x.Value = x.Value ? '' || 'N' : 'N'
          });
          console.log("Final UW List", this.uwQuestionList);
          this.questionSection = true;
          //this.getCurrencyList();
        }
      },
      (err) => { },
    );
  }
  onSaveUWQues(uwList, entry) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
            this.getCoverList(entry);
            //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        },
        (err) => { },
      );
    }
  }

  onFinalProceed(entry) {
    /*let i=0,j=0;
    for(let veh of this.travelDetails){
      let refNo = veh?.MSRefNo;
      if(refNo == undefined){
        i+=1;
      }
      j+=1;
      if(j==this.travelDetails.length){
        console.log("Final I",i)
        if(i==0){
          sessionStorage.setItem('travelDetailsList',JSON.stringify(this.travelDetails));
          if(this.uwQuestionList.length!=0){
            let i = 0;
            let uwList:any[]=[];
            for(let ques of this.uwQuestionList){
              ques['BranchCode'] = this.branchCode;
              let createdBy="";
                let quoteStatus = sessionStorage.getItem('QuoteStatus');
                if(quoteStatus=='AdminRP'){
                    createdBy = this.travelDetails[0].CreatedBy;
                }
                else{
                  createdBy = this.loginId;
                }
              if(ques.QuestionType == '01'){

                ques['CreatedBy'] = createdBy;
                ques['RequestReferenceNo'] = this.requestReferenceNo;
                ques['UpdatedBy'] = this.loginId;
                //ques["VehicleId"] = this.vehicleId
                uwList.push(ques);
              }
              else if(ques.Value!=""){
                ques['CreatedBy'] = createdBy;
                ques['RequestReferenceNo'] = this.requestReferenceNo;
                ques['UpdatedBy'] = this.loginId;
                //ques["VehicleId"] = this.vehicleId
                uwList.push(ques);
              }
              i+=1;
              if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList);
            }
          }
          else{
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }

        }
        else{
          console.log("Redirecting to Save Data");
          //this.saveExistData();
        }
      }
    }*/

    if (this.uwQuestionList.length != 0) {
      let i = 0;
      let uwList: any[] = [];
      for (let ques of this.uwQuestionList) {
        ques['BranchCode'] = this.branchCode;
        let createdBy = "";
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP') {
          createdBy = this.travelDetails[0].CreatedBy;
        }
        else {
          createdBy = this.loginId;
        }
        if (ques.QuestionType == '01') {

          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = "1"
          uwList.push(ques);
        }
        else if (ques.Value != "") {
          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = "1"
          uwList.push(ques);
        }
        i += 1;
        if (i == this.uwQuestionList.length) this.onSaveUWQues(uwList, entry);
        //this.getCoverList('direct');
      }
    }
    else {
      this.getCoverList(entry);
      //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }

  }

}
