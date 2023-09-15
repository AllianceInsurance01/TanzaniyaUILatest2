import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../app-config.json';
import moment from 'moment';
import { ProductData } from '../../Quote/update-customer-details/Components/models/product';
@Component({
  selector: 'app-endorsement-type-details',
  templateUrl: './endorsement-type-details.component.html',
  styleUrls: ['./endorsement-type-details.component.css']
})
export class EndorsementTypeDetailsComponent {

  userDetails: any;loginId: any;
  agencyCode: any;brokerbranchCode: any;
  branchCode: any;productId: any;remarks:any;
  userType: any;insuranceId: any;effectiveDate:any;
  policyNo: any;quoteHeader:any;effectiveError:boolean=false;
  quoteData:any[]=[];cancelYN:any='N';endorsementId:any;
  financialList:any[]=[];nonFinancialList:any[]=[];minDate:any;
  selectedEndorsement: any;endorsementSection:boolean=false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public tempUrl: any = this.AppConfig.TempUrl;
  remarksError: boolean;financialCoversSection:boolean=false;
  quoteNo: any;financialSISection:boolean=false;
  effectivePassError: boolean;
  vehicleList: any;
  applicationId: any;
  vehicleId: string;
  acExecutiveId: any;
  noOfDays: number;
  brokerCode: any;
  subuserType: string;
  requestReferenceNo: any;
  endorsePolicyNo: any;
  endorseEffectiveDate: string;
  coverModificationYN: any = 'N';
  orginalPolicyNo: any;
  isFinanceEndt: any;
  endtStatus: any;
  endtPrevQuoteNo: any;
  endtPrevPolicyNo: any;
  endtCount: any;
  endtCategoryDesc: any;
  endorsementTypeDesc: any;
  endorsementType: any;
  endorsementRemarks: any;
  endorsementEffectiveDate: any;
  endorsementDate: any;
  productItem: ProductData;
  emiYN: any;
  enableFinancialList: boolean=false;
  constructor(private router:Router,private sharedService: SharedService,private datePipe: DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.subuserType = sessionStorage.getItem('typeValue');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('homeCommonDetails')
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('quoteNo')
    this.policyNo = sessionStorage.getItem('endorsePolicyNo');
    this.productItem = new ProductData();
    let startDate = sessionStorage.getItem('endorseStartDate');
    if(startDate){
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
      let date2 = null;
      if(startDate!='' && startDate !=null){
        if(startDate.split('/').length>1){
          let dates = startDate.split('/')
          date2 = dates[2]+'-'+dates[1]+'-'+dates[0]
        }
      } 
      if(date2<date1 || date2==date1){
        this.minDate = new Date();
      }
      else{this.minDate = new Date(date2);}
    }
    else this.minDate = new Date();
  }
  ngOnInit(){
    // this.financialList = [
      
    //   {
    //       "EndorsementDesc": "Inclusion of CNG/LPG Kit",
    //       "EndtType": 847,
    //       "EndorsementCategoryDesc": "Financial",
    //       "EndorsementCategory": 1,
    //       "FieldsAllowed": [
              
    //       ]
    //   },
    //   {
    //     "EndorsementDesc": "Include/Increase Voluntary Deductible",
    //     "EndtType": 848,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Passengers Covered / Seating Capacity Of Vehicle",
    //     "EndtType": 849,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Vehicle Variant",
    //     "EndtType": 850,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Vehicle Cubic Capacity",
    //     "EndtType": 851,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Make & Model of Vehicle",
    //     "EndtType": 852,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Number Of Claim Bonus",
    //     "EndtType": 853,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Vehicle Fuel Type",
    //     "EndtType": 854,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Vehicle Manufacture Year",
    //     "EndtType": 855,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Vehicle Insured Declared Value(IDV)",
    //     "EndtType": 856,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Transfer OwnerShip",
    //     "EndtType": 857,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Transfer OwnerShip",
    //     "EndtType": 858,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Add/Remove Electrical Accessories",
    //     "EndtType": 859,
    //     "EndorsementCategoryDesc": "Financial",
    //     "EndorsementCategory": 2,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    // ];
    // this.nonFinancialList = [
    //   {
    //     "EndorsementDesc": "Modify Engine Number",
    //     "EndtType": 860,
    //     "EndorsementCategoryDesc": "Non-Financial",
    //     "EndorsementCategory": 1,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Chassis Number",
    //     "EndtType": 861,
    //     "EndorsementCategoryDesc": "Non-Financial",
    //     "EndorsementCategory": 1,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Registration Number",
    //     "EndtType": 862,
    //     "EndorsementCategoryDesc": "Non-Financial",
    //     "EndorsementCategory": 1,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify UserName",
    //     "EndtType": 863,
    //     "EndorsementCategoryDesc": "Non-Financial",
    //     "EndorsementCategory": 1,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Mobile No/EmailId",
    //     "EndtType": 864,
    //     "EndorsementCategoryDesc": "Non-Financial",
    //     "EndorsementCategory": 1,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    //   {
    //     "EndorsementDesc": "Modify Nominee Details",
    //     "EndtType": 865,
    //     "EndorsementCategoryDesc": "Non-Financial",
    //     "EndorsementCategory": 1,
    //     "FieldsAllowed": [
            
    //     ]
    //   },
    // ];
    this.getEndorsementTypes();
    
  }
  getEndorsementTypes(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "LoginId": this.loginId 
    }
    let urlLink = `${this.CommonApiUrl}endorsment/endorsementTypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let endorsementList = data.EndorsementTypes;
            let financialList = endorsementList.filter(ele=>ele.EndorsementCategory==2);
            if(financialList.length!=0){
              let filterList = financialList.filter(ele=>ele.EndtType!='842');
              if(filterList.length!=0) this.enableFinancialList = true;
              this.financialList = financialList.concat(this.financialList);
              let entry = this.financialList.some(ele=>ele.EndtType==852 || ele.EndtType==851 || ele.EndtType==844);
              if(entry){
                this.financialCoversSection = true;
              }
              let sIentry = this.financialList.some(ele=>ele.EndtType==850);
              if(sIentry){
                this.financialSISection = true;
              }
            }
            else this.financialList = [];
            //this.financialList = endorsementList.filter(ele=>ele.EndorsementCategory==2)
            let nonFinancialList = endorsementList.filter(ele=>ele.EndorsementCategory==1)
            this.nonFinancialList = nonFinancialList.concat(this.nonFinancialList);
            let existEnd = JSON.parse(sessionStorage.getItem('endorseTypeId'));
            if(existEnd){
                let endType = existEnd?.EndtTypeId;
                let entry = this.financialList.find(ele=>ele.EndtType==endType);
                let nonFinancialEntry = this.nonFinancialList.find(ele=>ele.EndtType==endType);
                if(existEnd?.PolicyNo!='' && existEnd?.PolicyNo!=null) this.policyNo = existEnd?.PolicyNo;
                if(existEnd?.QuoteNo!='' && existEnd?.QuoteNo!=null) this.quoteNo = existEnd?.QuoteNo;
                if(existEnd?.EffectiveDate!='' && existEnd?.EffectiveDate!=null){
                  if(existEnd?.EffectiveDate.split('/').length>1){
                    let dates = existEnd?.EffectiveDate.split('/')
                    this.effectiveDate = dates[2]+'-'+dates[1]+'-'+dates[0]
                  }
                } 
                this.remarks = existEnd?.Remarks;
                if(endType==42 || endType==842) this.cancelYN='Y';
                else if(entry){this.endorsementId = entry.EndtType;this.selectedEndorsement=entry}
                else if(nonFinancialEntry){this.endorsementId = nonFinancialEntry.EndtType;this.selectedEndorsement=nonFinancialEntry};
            }
      },
      (err) => { },
    );
  }
  onChangeEndorsement(rowData){
    this.endorsementId = rowData?.EndtType
    this.selectedEndorsement = rowData;
    this.cancelYN = 'N';
    if(this.endorsementId==853){
      this.minDate = new Date();
    }
    else{
      let startDate = sessionStorage.getItem('endorseStartDate');
      if(startDate){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
        let date2 = null;
        if(startDate!='' && startDate !=null){
          if(startDate.split('/').length>1){
            let dates = startDate.split('/')
            date2 = dates[2]+'-'+dates[1]+'-'+dates[0]
          }
        } 
        if(date2<date1 || date2==date1){
          this.minDate = new Date();
        }
        else{this.minDate = new Date(date2);}
      }
      else this.minDate = new Date();
    }
  }
  checkEndorseSelection(rowData){
    return this.endorsementId==rowData?.EndtType;
  }
  ongetBack(){
    this.router.navigate(['/Home/policies/Endorsements'])
  }
  onProceed(){
    console.log("Selected",this.selectedEndorsement)
    if(this.cancelYN == 'Y'){
      if(this.effectiveDate!='' && this.effectiveDate!=null && this.effectiveDate!=undefined){
          this.effectiveError = false;
          if( (new Date(this.effectiveDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0) ){
              this.effectivePassError = false;
              if(this.remarks!='' && this.remarks!=null && this.remarks!=undefined){ 
                  this.remarksError = false;
                  this.selectedEndorsement = this.financialList.find(ele=>ele.EndtType==42 || ele.EndtType==842)
                  this.onCreateEndorse(this.selectedEndorsement.EndtType);
              }
              else this.remarksError = true;
          }
          else this.effectivePassError = true;
      }
      else this.effectiveError = true;
    }
    else{
      if(this.effectiveDate!='' && this.effectiveDate!=null && this.effectiveDate!=undefined){
        this.effectiveError = false;
        if(this.remarks!='' && this.remarks!=null && this.remarks!=undefined){ 
            this.remarksError = false;
            if(this.selectedEndorsement){
              this.onCreateEndorse(this.selectedEndorsement.EndtType)
            }
        }
        else this.remarksError = true;
    }
    else this.effectiveError = true;
     
    }
  }
  onCreateEndorse(EndtType){
    let effDate='';
    effDate = this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
    this.endorseEffectiveDate = effDate
    let ReqObj = {
      "PolicyNo": sessionStorage.getItem('endorsePolicyNo'),
      "CompanyId": this.insuranceId,   
      "ProductId": this.productId,
      "BranchCode":this.branchCode,
      "EndtType":EndtType,
      "EndtRemarks":this.remarks,
      "EndtEffectiveDate": effDate
    }
    let urlLink = `${this.CommonApiUrl}endorsment/create`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let category = "";
        let entry = this.selectedEndorsement.FieldsAllowed.some(ele=>ele=='Covers' || ele=='AddOnCovers' || ele=='RemoveSection');
        if(entry) this.coverModificationYN = 'Y';
        else this.coverModificationYN = 'N';
        let res = data.Result[0];
          sessionStorage.setItem('quoteReferenceNo',res.requestReferenceNo);
          this.endorsePolicyNo = res?.policyNo;
          if(this.selectedEndorsement.EndorsementCategory==1) category = 'Non-Financial';
          if(this.selectedEndorsement.EndorsementCategory==2) category = 'Financial';
        if(EndtType==42 || EndtType == 842){
          let obj = {
            "EndtTypeId":EndtType,
            "FieldsAllowed":[],
            "EffectiveDate":effDate,
            "Remarks":this.remarks,
            "Category": category,
            "EndtName": this.selectedEndorsement.EndorsementDesc,
            "PolicyNo": res?.policyNo
          }
          
          sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
         
          if(this.productId=='5'){
            this.getVehicleDetails(res.requestReferenceNo,'cancel');
          }
          else if(this.productId=='3'){
            this.getBuildingDetails(res.requestReferenceNo,'cancel');
          }
          else if(this.productId=='4'){
            this.requestReferenceNo = res.requestReferenceNo;
            this.getTravelDetails(res.requestReferenceNo,'cancel');
          }
          else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14'  || this.productId=='19' || this.productId=='32' || this.productId=='1' || this.productId=='26' || this.productId=='21' || this.productId == '25'){
            this.requestReferenceNo = res.requestReferenceNo;
            this.getCommonDetails(res.requestReferenceNo,'cancel');
            //this.getEmployersDetails(res.requestReferenceNo,'cancel');
          }
          //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
          //this.router.navigate([''])
        }
        else{
          let obj = {
            "EndtTypeId":this.selectedEndorsement.EndtType,
            "FieldsAllowed":this.selectedEndorsement.FieldsAllowed,
            "EffectiveDate":effDate,
            "Remarks":this.remarks,
            "Category": category,
            "EndtName": this.selectedEndorsement.EndorsementDesc,
            "PolicyNo": res?.policyNo
          }
          this.endorsePolicyNo = res?.policyNo
          sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
          if(this.selectedEndorsement.EndorsementCategory==2){
            sessionStorage.removeItem('quoteNo');
            sessionStorage.setItem('customerReferenceNo',res?.customerReferenceNo)
            if(this.quoteNo) sessionStorage.setItem('quoteNo',this.quoteNo);
            // if(this.selectedEndorsement.EndtType == 844){
            //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
            // }
            // else{
            if(this.selectedEndorsement.FieldsAllowed.some(ele=>ele=='AddOnCovers' || (ele=='Covers' && EndtType==852) || ele=='RemoveSection')){
              if(this.productId=='5'){
                this.getVehicleDetails(res.requestReferenceNo,'other');
              }
              else if(this.productId=='3'){
                this.getBuildingDetails(res.requestReferenceNo,'other');
              }
              else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14'  || this.productId=='19' || this.productId=='32' || this.productId=='1' || this.productId=='26' || this.productId=='21' || this.productId == '25'){
                this.requestReferenceNo = res.requestReferenceNo;
                this.getCommonDetails(res.requestReferenceNo,'other');
              }
              //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
            }
            else{
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
            }
              
            //}
            
          }
          else if(this.selectedEndorsement.EndorsementCategory==1){
            if(this.quoteNo) sessionStorage.setItem('quoteNo',this.quoteNo);
            else sessionStorage.setItem('quoteNo',res.quoteNo);
            if((this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14'  || this.productId=='19' || this.productId=='32' || this.productId=='1' || this.productId=='26' || this.productId=='21' || this.productId == '25')){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
            }
            else{
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details'])
            }
           
          }
        }
      },
      (err) => { },
    );
  }
  getCommonDetails(refNo,type){
    let ReqObj = {
      "RequestReferenceNo": refNo,
      "RiskId": "1",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    let urlLink =  `${this.motorApiUrl}api/slide/getcommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
            if(this.productId=='14') this.getEmployersDetails(refNo,customerDatas,type,'employers');
            else if(this.productId=='32') this.getEmployersDetails(refNo,customerDatas,type,'fidelity');
            else if(this.productId=='39') this.getEmployersDetails(refNo,customerDatas,type,'machinery');
            else if(this.productId=='16') this.getEmployersDetails(refNo,customerDatas,type,'money');
            else if(this.productId=='1') this.getEmployersDetails(refNo,customerDatas,type,'burglary');
            else if(this.productId=='6') this.getEmployersDetails(refNo,customerDatas,type,'fire');
        },
        (err) => { },
      );

  }
  getEmployersDetails(refNo,customerData,type,name){
    let sectionId = null,urlLink = null,urlLink2=null;
    if(name=='employers'){sectionId = '45';urlLink = `${this.motorApiUrl}api/slide7/getempliablity`;urlLink2 = `${this.motorApiUrl}api/slide7/saveempliablity`;}
    else if(name=='fidelity'){sectionId = '43';urlLink = `${this.motorApiUrl}api/slide8/getfidelityemp`;urlLink2 = `${this.motorApiUrl}api/slide8/savefidelityemp`;}
    else if(name=='machinery'){sectionId = '41';urlLink = `${this.motorApiUrl}api/slide9/getmachinerybreakdown`;urlLink2 = `${this.motorApiUrl}api/slide9/savemachinerybreakdown`;}
    else if(name=='money'){sectionId = '42';urlLink = `${this.motorApiUrl}api/slide10/getmoneydetails`;urlLink2 = `${this.motorApiUrl}api/slide9/savemoneydetails`;}
    else if(name=='burglary'){sectionId = '52';urlLink = `${this.motorApiUrl}api/slide3/getburglaryandhouse`;urlLink2 = `${this.motorApiUrl}api/slide3/saveburglaryandhouse`;}
    else if(name=='fire'){sectionId = '40';urlLink = `${this.motorApiUrl}api/slide4/getfireandperils`;urlLink2 = `${this.motorApiUrl}api/slide4/savefireandperils`;}
    let ReqObj = {
      "RequestReferenceNo": refNo,
      "RiskId": "1",
      "SectionId": sectionId
    }
    
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
            if(this.productId=='14' || this.productId=='32'){
              if(customerDatas.length!=0){
                let i=0;
                for(let customer of customerDatas){
                  customer['RiskId']="1";
                  i+=1;
                  if(i==customerDatas.length){
                    
                    this.sharedService.onPostMethodSync(urlLink2, customerDatas).subscribe(
                      (data: any) => {
                        if (data?.Result.length!=0) { 
                          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                          this.onCalculate(data.Result,customerData,type);
                        }
                      },
                      (err) => { },
                    );
                  }
                }
              }
            }
            else if(this.productId=='39') this.saveMachineryDetails(customerDatas,refNo,customerData,type,name);
            else if(this.productId=='16') this.saveMoneyDetails(customerDatas,refNo,customerData,type,name);
            else if(this.productId=='1') this.saveBurglaryDetails(customerDatas,refNo,customerData,type,name)
            else if(this.productId=='6') this.saveFireDetails(customerDatas,refNo,customerData,type,name)
        },
        (err) => { },
      );

  }
  saveFireDetails(customerDatas,refNo,customerData,type,name){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": refNo,
      "RiskId": "1",
      "SectionId":  "40",
      "BuildingSuminsured": customerDatas?.BuildingSuminsured,
      "IndemityPeriod": customerDatas?.IndemityPeriod,
      "MakutiYn": customerDatas?.MakutiYn,
      "EndorsementDate": customerDatas.EndorsementDate,
      "EndorsementEffectiveDate": customerDatas.EndorsementEffectiveDate,
      "EndorsementRemarks": customerDatas.EndorsementRemarks,
      "EndorsementType": customerDatas.EndorsementType,
      "EndorsementTypeDesc": customerDatas.EndorsementTypeDesc,
      "EndtCategoryDesc": customerDatas.EndtCategoryDesc,
      "EndtCount": customerDatas.EndtCount,
      "EndtPrevPolicyNo": customerDatas.EndtPrevPolicyNo,
      "EndtPrevQuoteNo": customerDatas.EndtPrevQuoteNo,
      "EndtStatus": customerDatas.EndtStatus,
      "IsFinanceEndt": customerDatas.IsFinanceEndt,
      "OrginalPolicyNo": customerDatas.OrginalPolicyNo,
      "PolicyNo": customerDatas.PolicyNo
    }
    let urlLink = `${this.motorApiUrl}api/slide4/savefireandperils`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          if(data.Result.length!=0){
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            this.onCalculate(data.Result,customerData,type);
          }
          
        }
    },
    (err) => { },
  );
  }
  saveBurglaryDetails(customerDatas,refNo,customerData,type,name){

    let ReqObj = {
      "AgencyCode": customerDatas.AgencyCode,
      "ApplicationId": customerDatas.ApplicationId,
      "BdmCode": customerDatas.BdmCode,
      "BranchCode": customerDatas.BranchCode,
      "BrokerBranchCode": customerDatas.BrokerBranchCode,
      "BrokerCode": customerDatas.BrokerCode,
      "BuidingAreaSqm": customerDatas.BuidingAreaSqm,
      "BuildingBuildYear": customerDatas.BuildingBuildYear,
      "BuildingCondition": customerDatas.BuildingCondition,
      "BuildingFloors": customerDatas.BuildingFloors,
      "BuildingOwnerYn": customerDatas.BuildingOwnerYn,
      "BuildingPurposeId": customerDatas.BuildingPurposeId,
      "CreatedBy": customerDatas.CreatedBy,
      "SourceType": customerDatas.SourceType,
      "CustomerCode": customerDatas.CustomerCode,
      "InsuranceId": customerDatas.InsuranceId,
      "InsuranceType": customerDatas.InsuranceType,
      "RiskId": "1",
      "LoginId": customerDatas.LoginId,
      "UserType": customerDatas.UserType,
      "OutbuildConstructType": customerDatas.OutbuildConstructType,
      "ProductId": customerDatas.ProductId,
      "SectionId": "52",
      "SubUsertype": customerDatas.SubUsertype,
      "InsuranceForId": customerDatas.InsuranceForId,
      "NatureOfTradeId": customerDatas.NatureOfTradeId,
      "WallType": customerDatas.WallType,
      "InternalWallType": customerDatas.InternalWallType,
      "CeilingType": customerDatas.CeilingType,
      "FirstLossPercentId": customerDatas.FirstLossPercentId,
      "StockInTradeSi": customerDatas.StockInTradeSi,
      "GoodsSi": customerDatas.GoodsSi,
      "FurnitureSi": customerDatas.FurnitureSi,
      "ApplianceSi": customerDatas.ApplianceSi,
      "CashValueablesSi": customerDatas.CashValueablesSi,
      "StockLossPercent": customerDatas.StockLossPercent,
      "GoodsLossPercent": customerDatas.GoodsLossPercent,
      "FurnitureLossPercent": customerDatas.FurnitureLossPercent,
      "ApplianceLossPercent": customerDatas.ApplianceLossPercent,
      "CashValueablesLossPercent": customerDatas.CashValueablesLossPercent,
      "Address": customerDatas.Address,
      "RegionCode": customerDatas.RegionCode,
      "DistrictCode": customerDatas.DistrictCode,
      "OccupiedYear": customerDatas.OccupiedYear,
      "WatchmanGuardHours": customerDatas.WatchmanGuardHours,
      "AccessibleWindows": customerDatas.AccessibleWindows,
      "ShowWindow": customerDatas.ShowWindow,
      "FrontDoors": customerDatas.FrontDoors,
      "BackDoors": customerDatas.BackDoors,
      "TrapDoors": customerDatas.TrapDoors,
      "WindowsMaterialId": customerDatas.WindowsMaterialId,
      "DoorsMaterialId": customerDatas.DoorsMaterialId,
      "NightLeftDoor": customerDatas.NightLeftDoor,
      "BuildingOccupied": customerDatas.BuildingOccupied,
      "RoofType": customerDatas.RoofType,
      "RequestReferenceNo": refNo,
      "EndorsementDate": customerDatas.EndorsementDate,
      "EndorsementEffectiveDate": customerDatas.EndorsementEffectiveDate,
      "EndorsementRemarks": customerDatas.EndorsementRemarks,
      "EndorsementType": customerDatas.EndorsementType,
      "EndorsementTypeDesc": customerDatas.EndorsementTypeDesc,
      "EndtCategoryDesc": customerDatas.EndtCategoryDesc,
      "EndtCount": customerDatas.EndtCount,
      "EndtPrevPolicyNo": customerDatas.EndtPrevPolicyNo,
      "EndtPrevQuoteNo": customerDatas.EndtPrevQuoteNo,
      "EndtStatus": customerDatas.EndtStatus,
      "IsFinanceEndt": customerDatas.IsFinanceEndt,
      "OrginalPolicyNo": customerDatas.OrginalPolicyNo,
      "PolicyNo": customerDatas.PolicyNo,
      "Status": "Y"
    }
     ReqObj['Status'] = 'E';
      ReqObj['PolicyNo'] = this.endorsePolicyNo;
      let urlLink = `${this.motorApiUrl}api/slide3/saveburglaryandhouse`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            if(data.Result.length!=0){
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              this.onCalculate(data.Result,customerData,type);
            }
            
          }
      },
      (err) => { },
    );
  }
  saveMoneyDetails(customerDatas,refNo,customerData,type,name){
    let ReqObj = {
      "CreatedBy": customerDatas.CreatedBy,
      "InsuranceId": customerDatas.InsuranceId,
      "ProductId": customerDatas.ProductId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  "42",
      "MoneySafeLimit": customerDatas.MoneySafeLimit,
      "MoneyOutofSafe": customerDatas.MoneyOutofSafe,
      "MoneyDirectorResidence": customerDatas.MoneyDirectorResidence,
      "MoneyCollector": customerDatas.MoneyCollector,
      "MoneyAnnualEstimate":customerDatas.MoneyAnnualEstimate,
      "MoneyMajorLoss":customerDatas.MoneyMajorLoss,
    // "CashInHandEmployees": this.productItem?.CashInHandEmployees,
    // "CashInSafe": this.productItem?.CashInSafe,
    // "CashInTransit": this.productItem?.CashInTransit,
    // "MoneyAnnualcarrySuminsured": this.productItem?.MoneyAnnualcarrySuminsured,
    // "MoneyInPremises": this.productItem?.MoneyInPremises,
    // "MoneyInSafeBusiness": this.productItem?.MoneyInSafeBusiness,
    // "MoneyOutSafeBusiness": this.productItem?.MoneyOutSafeBusiness,
      "EndorsementDate": customerDatas.EndorsementDate,
      "EndorsementEffectiveDate": customerDatas.EndorsementEffectiveDate,
      "EndorsementRemarks": customerDatas.EndorsementRemarks,
      "EndorsementType": customerDatas.EndorsementType,
      "EndorsementTypeDesc": customerDatas.EndorsementTypeDesc,
      "EndtCategoryDesc": customerDatas.EndtCategoryDesc,
      "EndtCount": customerDatas.EndtCount,
      "EndtPrevPolicyNo": customerDatas.EndtPrevPolicyNo,
      "EndtPrevQuoteNo": customerDatas.EndtPrevQuoteNo,
      "EndtStatus": customerDatas.EndtStatus,
      "IsFinanceEndt": customerDatas.IsFinanceEndt,
      "OrginalPolicyNo": customerDatas.OrginalPolicyNo,
    }
    let urlLink = `${this.motorApiUrl}api/slide10/savemoneydetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Result) {
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            this.onCalculate(data.Result,customerData,type);
            }
          },
          (err) => { },
        );
  }
  saveMachineryDetails(customerDatas,refNo,customerData,type,name){
      let ReqObj = {
        "CreatedBy": customerDatas.CreatedBy,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "RequestReferenceNo": refNo,
        "RiskId": "1",
        "SectionId":  "41",
        "BoilerPlantsSi": customerDatas.BoilerPlantsSi,
        "ElecMachinesSi": customerDatas.ElecMachinesSi,
        "EquipmentSi": customerDatas.EquipmentSi,
        "GeneralMachineSi": customerDatas.GeneralMachineSi,
        "MachineEquipSi": customerDatas.MachineEquipSi,
        "ManuUnitsSi": customerDatas.ManuUnitsSi,
        "PowerPlantSi": customerDatas.PowerPlantSi,
        "EndorsementDate": this.endorsementDate,
        "EndorsementEffectiveDate": customerDatas.EndorsementEffectiveDate,
        "EndorsementRemarks": customerDatas.EndorsementRemarks,
        "EndorsementType": customerDatas.EndorsementType,
        "EndorsementTypeDesc": customerDatas.EndorsementTypeDesc,
        "EndtCategoryDesc": customerDatas.EndtCategoryDesc,
        "EndtCount": customerDatas.EndtCount,
        "EndtPrevPolicyNo": customerDatas.EndtPrevPolicyNo,
        "EndtPrevQuoteNo": customerDatas.EndtPrevQuoteNo,
        "EndtStatus": customerDatas.EndtStatus,
        "IsFinanceEndt": customerDatas.IsFinanceEndt,
        "OrginalPolicyNo": customerDatas.OrginalPolicyNo,
      }
      let urlLink = `${this.motorApiUrl}api/slide9/savemachinerybreakdown`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            this.onCalculate(data.Result,customerData,type);
          }
        },
        (err) => { },
      );
  }
  getTravelDetails(refNo,type){
    let ReqObj = {
      "RequestReferenceNo": refNo,
      "TravelId": "1"
      }
    let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
            this.endorsementDate = customerDatas?.EndorsementDate;
          this.endorsementEffectiveDate = customerDatas?.EndorsementEffectiveDate;
          this.endorsementRemarks = customerDatas?.EndorsementRemarks;
          this.endorsementType = customerDatas?.EndorsementType;
          this.endorsementTypeDesc = customerDatas?.EndorsementTypeDesc;
          this.endtCategoryDesc = customerDatas?.EndtCategoryDesc;
          this.endtCount = customerDatas?.EndtCount;
          this.endtPrevPolicyNo = customerDatas?.EndtPrevPolicyNo;
          this.endtPrevQuoteNo = customerDatas?.EndtPrevQuoteNo;
          this.endtStatus = customerDatas?.EndtStatus;
          this.isFinanceEndt = customerDatas?.IsFinanceEndt;
          this.orginalPolicyNo = customerDatas?.OrginalPolicyNo;
           this.saveTravelDetails(customerDatas,type);
      },
      (err) => { },
    );
  }
  saveTravelDetails(customerDatas,type){
    let ReqObj = {

      "AcExecutiveId": customerDatas.AcExecutiveId,
      "ApplicationId": customerDatas.ApplicationId,
      "CommissionType": customerDatas.CommissionType,
      "BrokerCode": customerDatas.BrokerCode,
      "LoginId": customerDatas.LoginId,
      "SubUserType": customerDatas.SubUserType,
      "CustomerReferenceNo": customerDatas.CustomerReferenceNo,
      "RequestReferenceNo": customerDatas?.RequestReferenceNo,
      "BranchCode": customerDatas?.BranchCode,
      "ProductId": customerDatas?.ProductId,
      "UserType": this.userType,
      "BrokerBranchCode": customerDatas.BrokerBranchCode,
      "BdmCode": customerDatas?.BdmCode,
      "CreatedBy": customerDatas?.CreatedBy,
      "CustomerCode": customerDatas?.CustomerCode,
      "InsuranceId": this.insuranceId,
      "SourceType": customerDatas?.SourceType,
      "SectionId": customerDatas?.SectionId,
      "TravelCoverId": customerDatas.TravelCoverId,
      "Currency": customerDatas?.Currency,
      "ExchangeRate": customerDatas?.ExchangeRate,
      "PlanTypeId": customerDatas?.PlanTypeId,
      "SourceCountry": customerDatas.SourceCountry,
      "DestinationCountry": customerDatas.DestinationCountry,
      "TotalPassengers": customerDatas?.TotalPassengers,
      "TravelId": customerDatas.TravelId,
      "HavePromoCode": customerDatas.HavePromoCode,
      "PromoCode": customerDatas.PromoCode,
      "SportsCoverYn": customerDatas.SportsCoverYn,
      "TerrorismCoverYn": customerDatas.TerrorismCoverYn,
      "CovidCoverYn": customerDatas.CovidCoverYn,
      "TravelCoverDuration": customerDatas.TravelCoverDuration,
      "TravelEndDate": customerDatas.TravelEndDate,
      "TravelStartDate": customerDatas.TravelStartDate,
      "GroupDetails": customerDatas.GroupDetails,
      "EndorsementDate": this.endorsementDate,
      "EndorsementEffectiveDate": this.endorsementEffectiveDate,
      "EndorsementRemarks": this.endorsementRemarks,
      "EndorsementType": this.endorsementType,
      "EndorsementTypeDesc": this.endorsementTypeDesc,
      "EndtCategoryDesc": this.endtCategoryDesc,
      "EndtCount":this.endtCount,
      "EndtPrevPolicyNo":this.endtPrevPolicyNo,
      "EndtPrevQuoteNo": this.endtPrevQuoteNo,
      "EndtStatus": this.endtStatus,
      "IsFinanceEndt": this.isFinanceEndt,
      "OrginalPolicyNo": this.orginalPolicyNo,
      "PolicyNo": this.endorsePolicyNo
    }
    if(type=='cancel'){
      ReqObj['Status'] = 'D';
    }
     else if(this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y'){
        ReqObj['Status'] = 'E';
      }
      else{
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
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
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          this.onTravelCalculate(data.Result,customerDatas,type);


        }
      },
      (err) => { },
    );
  }
  getBuildingDetails(refNo,type){
    let ReqObj = {
      "RequestReferenceNo": refNo
    }
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data)
        let customerDatas = data.Result[0];
        if(customerDatas?.WallType!=null && customerDatas?.WallType!=undefined) this.productItem.WallType = customerDatas?.WallType;
        else this.productItem.WallType = '';
        if(customerDatas?.RoofType!=null && customerDatas?.RoofType!=undefined) this.productItem.RoofType = customerDatas?.RoofType;
        else this.productItem.RoofType = '';
        this.productItem.IndustryId = customerDatas?.IndustryId;
        this.productItem.BuildingBuildYear = customerDatas?.BuildingBuildYear;
        this.productItem.BuildingUsageId = customerDatas?.BuildingUsageId;
        this.productItem.BuildingOwnerYn = customerDatas?.BuildingOwnerYn;
        this.productItem.OccupationType = customerDatas?.OccupationType;
        this.productItem.LiabilityOccupationId = customerDatas?.LiabilityOccupationId;
        this.productItem.InbuildConstructType = customerDatas?.InbuildConstructType;
        this.productItem.OutbuildConstructType = customerDatas?.OutbuildConstructType;
        this.productItem.BuildingFloors = customerDatas?.BuildingFloors;
        this.productItem.CategoryId = customerDatas?.CategoryId;
          this.endorsementDate = customerDatas?.EndorsementDate;
          this.endorsementEffectiveDate = customerDatas?.EndorsementEffectiveDate;
          this.endorsementRemarks = customerDatas?.EndorsementRemarks;
          this.endorsementType = customerDatas?.EndorsementType;
          this.endorsementTypeDesc = customerDatas?.EndorsementTypeDesc;
          this.endtCategoryDesc = customerDatas?.EndtCategoryDesc;
          this.endtCount = customerDatas?.EndtCount;
          this.endtPrevPolicyNo = customerDatas?.EndtPrevPolicyNo;
          this.endtPrevQuoteNo = customerDatas?.EndtPrevQuoteNo;
          this.endtStatus = customerDatas?.EndtStatus;
          this.isFinanceEndt = customerDatas?.IsFinanceEndt;
          this.orginalPolicyNo = customerDatas?.OrginalPolicyNo;
        if(customerDatas?.BuildingSuminsured!=null && customerDatas?.BuildingSuminsured!='0'){
          this.productItem.BuildingSuminsured = customerDatas?.BuildingSuminsured;
        }
        else{
          this.productItem.BuildingSuminsured = '0';
        }
        if(customerDatas?.ContentSuminsured!=null && customerDatas?.ContentSuminsured!='0'){
          this.productItem.ContentSuminsured = customerDatas?.ContentSuminsured;
        }
        else this.productItem.ContentSuminsured = '0';
        if(customerDatas?.ElecEquipSuminsured!=null && customerDatas?.ElecEquipSuminsured!='0'){
          this.productItem.ElecEquipSuminsured = customerDatas?.ElecEquipSuminsured;
          this.productItem.BreakDownCoverYN = 'Yes';
        }
        else{
          this.productItem.ElecEquipSuminsured = '0';
          this.productItem.BreakDownCoverYN = 'No';
        }
        if(customerDatas?.GoodsTurnoverSuminsured!=null && customerDatas?.GoodsTurnoverSuminsured!='0'){
          this.productItem.GoodsTurnoverSuminsured = customerDatas?.GoodsTurnoverSuminsured;
          this.productItem.GoodsSinglecarrySuminsured = customerDatas?.GoodsSinglecarrySuminsured;
          this.productItem.GoodsYN = 'Yes';
        }
        else{
          this.productItem.GoodsTurnoverSuminsured = '0';
          this.productItem.GoodsSinglecarrySuminsured = '0';
          this.productItem.GoodsYN = "No"
        }
        if(customerDatas?.MoneyAnnualcarrySuminsured!=null && customerDatas?.MoneyAnnualcarrySuminsured!='0'){
          this.productItem.MoneyAnnualcarrySuminsured = customerDatas?.MoneyAnnualcarrySuminsured;
          this.productItem.MoneySinglecarrySuminsured = customerDatas?.MoneySinglecarrySuminsured;
          this.productItem.MoneyInsafeSuminsured = customerDatas?.MoneyInsafeSuminsured;
          this.productItem.MoneyCoverYN = 'Yes';
        }
        else{
          this.productItem.MoneyAnnualcarrySuminsured = '0';
          this.productItem.MoneySinglecarrySuminsured = '0';
          this.productItem.MoneyInsafeSuminsured = '0';
          this.productItem.MoneyCoverYN = 'No';
        }
        if(customerDatas?.FidelityAnnualSuminsured!=null && customerDatas?.FidelityAnnualSuminsured!='0'){
          this.productItem.FidelityAnnualSuminsured = customerDatas?.FidelityAnnualSuminsured;
          this.productItem.FidelityAnyoccuSuminsured = customerDatas?.FidelityAnyoccuSuminsured;
          this.productItem.FidelityCoverYN = 'Yes';
        }
        else{
          this.productItem.FidelityAnnualSuminsured = '0';
          this.productItem.FidelityAnyoccuSuminsured = '0';
          this.productItem.FidelityCoverYN = 'No';
        }
        if(customerDatas?.TpliabilityAnyoccuSuminsured!=null && customerDatas?.TpliabilityAnyoccuSuminsured!='0'){
          this.productItem.TpliabilityAnyoccuSuminsured = customerDatas?.TpliabilityAnyoccuSuminsured;
          this.productItem.LiabilityYN = 'Yes';
        }
        else{
          this.productItem.TpliabilityAnyoccuSuminsured = '0';
          this.productItem.LiabilityYN = 'No';
        }
        if(customerDatas?.EmpliabilityExcessSuminsured!=null && customerDatas?.EmpliabilityExcessSuminsured!='0'){
          this.productItem.EmpliabilityExcessSuminsured = customerDatas?.EmpliabilityExcessSuminsured;
          this.productItem.EmpliabilityAnnualSuminsured = customerDatas?.EmpliabilityAnnualSuminsured;
          this.productItem.WcYN = 'Yes';
        }
        else{
          this.productItem.EmpliabilityExcessSuminsured = '0';
          this.productItem.EmpliabilityAnnualSuminsured = '0';
          this.productItem.WcYN = 'No';
        }
        if(customerDatas?.PersonalAccSuminsured!=null && customerDatas?.PersonalAccSuminsured!='0'){
          this.productItem.PersonalAccidentSuminsured = customerDatas?.PersonalAccSuminsured;
        }
        else{
          this.productItem.PersonalAccidentSuminsured = '0';
        }
        if(customerDatas?.PersonalIntermediarySuminsured!=null && customerDatas?.PersonalIntermediarySuminsured!='0'){
          this.productItem.PersonalIntermediarySuminsured = customerDatas?.PersonalIntermediarySuminsured;
        }
        else{
          this.productItem.PersonalIntermediarySuminsured = '0';
        }
        if(customerDatas?.AllriskSumInsured!=null && customerDatas?.AllriskSumInsured!='0'){
          this.productItem.AllriskSumInsured = customerDatas?.AllriskSumInsured;
        }
        else{
          this.productItem.AllriskSumInsured = '0';
        }
        this.saveBuildingDetails(customerDatas,type);
      }
     
      );
  }
  saveBuildingDetails(customerData,type){
    console.log("Res",customerData)
    let ReqObj = {
      "AcexecutiveId": customerData.AcexecutiveId,
      "AgencyCode": customerData?.AgencyCode,
      "ApplicationId": customerData?.ApplicationId,
      "BdmCode": customerData?.BdmCode,
      "BranchCode": customerData?.BranchCode,
      "BrokerBranchCode": customerData?.BrokerBranchCode,
      "BrokerCode": customerData?.BrokerCode,
      "BuidingAreaSqm": null,
      "BuildingBuildYear": this.productItem.BuildingBuildYear,
      "BuildingCondition": null,
      "WallType": this.productItem.WallType,
      "RoofType": this.productItem.RoofType,
      "BuildingFloors": this.productItem.BuildingFloors,
      "BuildingOccupationType": this.productItem.OccupationType,
      "OccupationType": this.productItem.OccupationType,
      "LiabilityOccupationId": this.productItem.LiabilityOccupationId,
      "BuildingOwnerYn": this.productItem.BuildingOwnerYn,
      "BuildingPurposeId": "3",
      "BuildingSuminsured": this.productItem.BuildingSuminsured,
      "BuildingType": null,
      "BuildingUsageId": this.productItem.BuildingUsageId,
      "BuildingUsageYn": null,
      "Createdby": customerData?.Createdby,
      "SourceType": customerData?.SourceType,
      "Currency": customerData?.Currency,
      "CustomerReferenceNo": customerData?.CustomerReferenceNo,
      "CustomerCode": customerData?.CustomerCode,
      "ContentSuminsured": this.productItem.ContentSuminsured,
      "PersonalAccSuminsured": this.productItem.PersonalAccidentSuminsured,
      "PersonalIntermediarySuminsured": this.productItem.PersonalIntermediarySuminsured,
      "AllriskSumInsured": this.productItem.AllriskSumInsured,
      "ExchangeRate":  customerData?.ExchangeRate,
      "Havepromocode": customerData?.Havepromocode,
      "Promocode": customerData?.Promocode,
      "InbuildConstructType": this.productItem.InbuildConstructType,
      "InsuranceId": this.insuranceId,
      "InsuranceType": null,
      "LocationId": "1",
      "LoginId": customerData?.LoginId,
      "UserType": this.userType,
      "OutbuildConstructType": this.productItem.OutbuildConstructType,
      "PolicyEndDate": customerData?.PolicyEndDate,
      "PolicyStartDate": customerData?.PolicyStartDate,
      "ProductId": this.productId,
      "SectionId": customerData.SectionId,
      "SubUsertype": customerData?.SubUsertype,
    "ElecEquipSuminsured":this.productItem.ElecEquipSuminsured,
    "MoneySinglecarrySuminsured":this.productItem.MoneySinglecarrySuminsured,
    "MoneyAnnualcarrySuminsured":this.productItem.MoneyAnnualcarrySuminsured,
    "MoneyInsafeSuminsured": this.productItem.MoneyInsafeSuminsured,
    "FidelityAnyoccuSuminsured":this.productItem.FidelityAnyoccuSuminsured,
    "FidelityAnnualSuminsured": this.productItem.FidelityAnnualSuminsured,
    "TpliabilityAnyoccuSuminsured": this.productItem.TpliabilityAnyoccuSuminsured,
    "EmpliabilityAnnualSuminsured": this.productItem.EmpliabilityAnnualSuminsured,
    "EmpliabilityExcessSuminsured": this.productItem.EmpliabilityExcessSuminsured,
    "GoodsSinglecarrySuminsured": this.productItem.GoodsSinglecarrySuminsured,
    "GoodsTurnoverSuminsured": this.productItem.GoodsTurnoverSuminsured,
    "IndustryId": this.productItem.IndustryId,
    "CategoryId": this.productItem.CategoryId,
    "RequestReferenceNo": customerData?.RequestReferenceNo,
    "EndorsementDate": this.endorsementDate,
    "EndorsementEffectiveDate": this.endorsementEffectiveDate,
    "EndorsementRemarks": this.endorsementRemarks,
    "EndorsementType": this.endorsementType,
    "EndorsementTypeDesc": this.endorsementTypeDesc,
    "EndtCategoryDesc": this.endtCategoryDesc,
    "EndtCount":this.endtCount,
    "EndtPrevPolicyNo":this.endtPrevPolicyNo,
    "EndtPrevQuoteNo": this.endtPrevQuoteNo,
    "EndtStatus": this.endtStatus,
    "IsFinanceEndt": this.isFinanceEndt,
    "OrginalPolicyNo": this.orginalPolicyNo,
    "PolicyNo": this.endorsePolicyNo
    }
    if(type=='cancel'){
      ReqObj['Status'] = 'D';
    }
     else if(this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y'){
        ReqObj['Status'] = 'E';
      }
      else{
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    let urlLink = `${this.motorApiUrl}home/savebuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {

          }
        }
        else if (data.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
         this.onCalculate(data.Result,customerData,type);
        }
      })
  }
  onTravelCalculate(coverListObj,customerData,type){
    if(type=='cancel'){
      this.coverModificationYN = "Y";
    }
      let createdBy = this.loginId
      let groupList = coverListObj?.GroupDetails;
      let vehicleList = [];
      let endDate:any = null,coverModificationYN='N';
      if(coverListObj?.TravelEndDate){
        if(this.endorsementSection){
          coverModificationYN = 'Y';
          endDate = this.endorseEffectiveDate;
        }
        else endDate = coverListObj?.TravelEndDate;
      }
      let effectiveDate=null;
      if(this.endorsementSection){
          effectiveDate = this.endorseEffectiveDate;
      }
      else {
        if(coverListObj.TravelStartDate){
          effectiveDate = coverListObj.TravelStartDate;
        }
      }
      if (groupList.length != 0) {
        let i = 0;
        for (let group of groupList) {
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": customerData.BranchCode,
            "AgencyCode": customerData.AgencyCode,
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
            "EffectiveDate": effectiveDate,
            "PolicyEndDate": endDate,
            "CoverModification":'Y'
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
                if(type!='cancel'){
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
                }
                else{
                  this.getCancellationEndorse(coverListObj,customerData);
                }
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
  onCalculate(buildDetails,customerData,type) {
    let createdBy=""
    if(type=='cancel'){
      this.coverModificationYN = "Y";
    }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP') {
          createdBy=""
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        }
        else createdBy = this.loginId;
        if (buildDetails.length != 0) {
          console.log("Details",buildDetails)
          this.requestReferenceNo = buildDetails[0].RequestReferenceNo;
          
          sessionStorage.setItem('quoteReferenceNo', buildDetails[0].RequestReferenceNo);
          let i = 0;
          for (let build of buildDetails) {
            let effectiveDate = this.endorseEffectiveDate;
            let Id = null;
            if(build.LocationId!=undefined) Id=build.LocationId;
            else if(build.RiskId!=undefined) Id=build.RiskId;
            else Id="1";
            let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": customerData.BranchCode,
              "AgencyCode": customerData.AgencyCode,
              "SectionId": build.SectionId,
              "ProductId": this.productId,
              "MSRefNo": build.MSRefNo,
              "VehicleId": Id,
              "CdRefNo": build.CdRefNo,
              "VdRefNo": build.VdRefNo,
              "CreatedBy": this.loginId,
              "productId": this.productId,
              "RequestReferenceNo": this.requestReferenceNo,
              "EffectiveDate": effectiveDate,
              "PolicyEndDate": customerData.PolicyEndDate,
              "CoverModification": this.coverModificationYN
            }
            let urlLink = `${this.CommonApiUrl}calculator/calc`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data) {
                  let entry = data?.Result;
                  i += 1;
                  console.log("Indexxx", i, buildDetails.length)
                  if (i == buildDetails.length) {
                    if(type!='cancel'){
                      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
                    }
                    else{
                      this.getCancellationEndorse(buildDetails,customerData);
                    }
                  }
                }
              },
              (err) => { },
            );
          }
    
        }
      }
  getCancellationEndorse(riskList,customerData){
    let urlLink = `${this.CommonApiUrl}endorsment/cancellation`;
    let ReqObj = {
        "RequestReferenceNo": this.requestReferenceNo,
        "CreatedBy": this.loginId,
        "ProductId": this.productId,
        "CompanyId": this.insuranceId,
        "BranchCode": customerData.BranchCode,
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          sessionStorage.setItem('quoteNo',data?.Result?.QuoteDetails?.QuoteNo);
          this.quoteNo = data?.Result?.QuoteDetails?.QuoteNo;
          this.emiYN = data?.Result?.QuoteDetails?.EmiYn;
          this.getPaymentDetails(data?.Result);
          
          //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
        }
      },
      (err) => { },
    );
  }
  getPaymentDetails(cancelData){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "EmiYn": this.emiYN,
      "InstallmentMonth": null,
      "InstallmentPeriod":null,
      "InsuranceId": this.insuranceId,
      "Premium": cancelData?.QuoteDetails?.EndtPremium,
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
          sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
        }
      },
      (err) => { },
    );
  }
  getVehicleDetails(refNo,type){
    let ReqObj = {
      "RequestReferenceNo": refNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.vehicleList = data.Result;
            console.log("Edit Customer Final 1",this.vehicleList)
            if(this.vehicleList.length!=0){
              this.applicationId = this.vehicleList[0].ApplicationId;
              this.saveVehicleDetails(type);
            }
        }
      },
      (err) => { },
    );
  }
  saveVehicleDetails(type){
    let i = 0;
    for(let veh of this.vehicleList){
      let refNo = veh?.MSRefNo;
      if(refNo == undefined){
        
        let reqRefNo = veh?.RequestReferenceNo;
        if(reqRefNo == undefined){
          reqRefNo = null;
        }
        this.vehicleId = String(veh.Vehicleid);
        let ReqObj =  {
          "RequestReferenceNo": veh.RequestReferenceNo,
           "Idnumber": veh.IdNumber,
          "Vehicleid": veh.Vehicleid
         }
         let urlLink = `${this.motorApiUrl}api/getmotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result){
              let vehicleDetails:any = data.Result;
              let startDate = "",endDate = ""
              //this.updateComponent.vehicleDetails = this.vehicleDetails;
              if(veh.PolicyStartDate){
                  startDate = veh.PolicyStartDate;
                  const oneday = 24 * 60 * 60 * 1000;
                  const momentDate = new Date(veh.PolicyEndDate); // Replace event.value with your date value
                  const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                  const formattedDatecurrent = new Date(veh.PolicyStartDate);
                  console.log(formattedDate);
                  this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
              }
              if(type=='cancel') endDate = this.endorseEffectiveDate;
              else if(veh.PolicyEndDate){
                  endDate = veh.PolicyEndDate;
              }
              let createdBy="";
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                  createdBy = this.vehicleList[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
              }
              if(this.userType=='Broker'){
                this.brokerCode = this.agencyCode;
                createdBy = this.loginId;
                
                this.applicationId = "01";
              }
              this.subuserType = sessionStorage.getItem('typeValue');
              console.log("AcExecutive",this.acExecutiveId);
              if(vehicleDetails?.FleetOwnerYn==null) vehicleDetails.FleetOwnerYn = 'N';
              let appId = "1",loginId="",brokerbranchCode="";
              brokerbranchCode = this.brokerbranchCode;
              console.log("Quote Status Received",quoteStatus)
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                brokerbranchCode = this.vehicleList[0].BrokerBranchCode;
                  createdBy = this.vehicleList[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
                if(this.userType!='Issuer'){
                  this.brokerCode = this.agencyCode;
                  appId = "1"; loginId=this.loginId;
                  brokerbranchCode = this.brokerbranchCode;
                }
                else{
                  appId = this.loginId;
                  loginId = this.vehicleList[0].LoginId;
                }
              }
              console.log("AcExecutive",this.acExecutiveId,veh,vehicleDetails);
              let ReqObj = {
                "BrokerBranchCode": vehicleDetails?.BrokerBranchCode,
                "AcExecutiveId": this.acExecutiveId,
                "CommissionType": vehicleDetails?.CommissionType,
                "CustomerCode": vehicleDetails?.CustomerCode,
                "BdmCode": vehicleDetails?.BdmCode,
                "BrokerCode": vehicleDetails?.BrokerCode,
                "LoginId": vehicleDetails?.LoginId,
              "SourceType":vehicleDetails?.SourceType,
              "SubUserType": this.subuserType,
              "ApplicationId": this.applicationId,
              "CustomerReferenceNo": veh?.CustomerReferenceNo,
              "RequestReferenceNo": veh.RequestReferenceNo,
              "Idnumber": veh.Idnumber,
              "VehicleId": veh.Vehicleid,
              "AcccessoriesSumInsured": vehicleDetails?.AcccessoriesSumInsured,
              "AccessoriesInformation": "",
              "AdditionalCircumstances": "",
              "AxelDistance": vehicleDetails?.AxelDistance,
              "Chassisnumber": vehicleDetails?.Chassisnumber,
              "Color": vehicleDetails?.Color,
              "CityLimit": vehicleDetails?.CityLimit,
              "CoverNoteNo": null,
              "OwnerCategory": vehicleDetails?.OwnerCategory,
              "CubicCapacity": vehicleDetails?.Grossweight,
              "CreatedBy": createdBy,
              "DrivenByDesc": vehicleDetails?.DrivenByDesc,
              "EngineNumber": vehicleDetails?.EngineNumber,
              "FuelType": vehicleDetails?.FuelType,
              "Gpstrackinginstalled": vehicleDetails?.Gpstrackinginstalled,
              "Grossweight": vehicleDetails?.Grossweight,
              "HoldInsurancePolicy": "N",
              "Insurancetype": vehicleDetails?.Insurancetype,
              "InsuranceId": this.insuranceId,
              "InsuranceClass": vehicleDetails?.InsuranceClass,
              "InsurerSettlement": "",
              "InterestedCompanyDetails": "",
              "ManufactureYear": vehicleDetails?.ManufactureYear,
              "ModelNumber": null,
              "MotorCategory": vehicleDetails?.MotorCategory,
              "Motorusage": vehicleDetails?.Motorusage,
              "NcdYn": vehicleDetails?.NcdYn,
              "NoOfClaims": null,
              "NumberOfAxels": vehicleDetails?.NumberOfAxels,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "ProductId": this.productId,
              "SectionId": vehicleDetails?.Insurancetype,
              "PolicyType": vehicleDetails?.PolicyType,
              "RadioOrCasseteplayer": null,
              "RegistrationYear": vehicleDetails?.RegistrationYear,
              "Registrationnumber": vehicleDetails?.Registrationnumber,
              "RoofRack": null,
              "SeatingCapacity": vehicleDetails?.SeatingCapacity,
              "SpotFogLamp": null,
              "Stickerno": null,
              "SumInsured": vehicleDetails?.SumInsured,
              "Tareweight": vehicleDetails?.Tareweight,
              "TppdFreeLimit": null,
              "TppdIncreaeLimit": vehicleDetails?.TppdIncreaeLimit,
              "TrailerDetails": null,
              "Vehcilemodel": vehicleDetails?.Vehcilemodel,
              "VehicleType": vehicleDetails?.VehicleType,
              "Vehiclemake": vehicleDetails?.Vehiclemake,
              "WindScreenSumInsured": vehicleDetails?.WindScreenSumInsured,
              "Windscreencoverrequired": null,
              "accident": null,
              "periodOfInsurance": this.noOfDays,
              "PolicyStartDate": startDate,
              "PolicyEndDate": endDate,
              "Currency" : vehicleDetails?.Currency,
              "ExchangeRate": vehicleDetails?.ExchangeRate,
              "HavePromoCode": vehicleDetails?.HavePromoCode,
              "PromoCode" : vehicleDetails?.PromoCode,
              "CollateralYn": vehicleDetails?.CollateralYn,
              "BorrowerType": vehicleDetails?.BorrowerType,
              "CollateralName": vehicleDetails?.CollateralName,
              "FirstLossPayee": vehicleDetails?.FirstLossPayee,
              "FleetOwnerYn": vehicleDetails?.FleetOwnerYn,
              "NoOfVehicles": vehicleDetails?.NoOfVehicles,
              "NoOfComprehensives": vehicleDetails?.NoOfComprehensives,
              "ClaimRatio": vehicleDetails?.ClaimRatio,
              "SavedFrom": vehicleDetails?.SavedFrom,
              "UserType": this.userType,
              "TiraCoverNoteNo": vehicleDetails?.TiraCoverNoteNo,
              "EndorsementDate":vehicleDetails?.EndorsementDate,
              "EndorsementEffectiveDate": vehicleDetails?.EndorsementEffectiveDate,
              "EndorsementRemarks": vehicleDetails?.EndorsementRemarks,
              "EndorsementType": vehicleDetails?.EndorsementType,
              "EndorsementTypeDesc": vehicleDetails?.EndorsementTypeDesc,
              "EndtCategoryDesc": vehicleDetails?.EndtCategoryDesc,
              "EndtCount":vehicleDetails?.EndtCount,
              "EndtPrevPolicyNo":vehicleDetails?.EndtPrevPolicyNo,
              "EndtPrevQuoteNo": vehicleDetails?.EndtPrevQuoteNo,
              "EndtStatus": vehicleDetails?.EndtStatus,
              "IsFinanceEndt": vehicleDetails?.IsFinanceEndt,
              "OrginalPolicyNo": vehicleDetails?.OrginalPolicyNo
              }
              if(type=='cancel'){
                ReqObj['Status'] = 'D';
              }
               else if(vehicleDetails?.Status == undefined || vehicleDetails?.Status == null || vehicleDetails?.Status == 'Y'){
                  ReqObj['Status'] = 'E';
                }
                else{
                  ReqObj['Status'] = vehicleDetails?.Status;
                }
                
                ReqObj['PolicyNo'] = this.endorsePolicyNo
              let urlLink = `${this.motorApiUrl}api/savemotordetails`;
              this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
                (data: any) => {
                  let res:any = data;
                  if(data.ErrorMessage.length!=0){
                    if(res.ErrorMessage){
                      // for(let entry of res.ErrorMessage){
                      //   let type: NbComponentStatus = 'danger';
                      //   const config = {
                      //     status: type,
                      //     destroyByClick: true,
                      //     duration: 4000,
                      //     hasIcon: true,
                      //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                      //     preventDuplicates: false,
                      //   };
                      //   this.toastrService.show(
                      //     entry.Field,
                      //     entry.Message,
                      //     config);
                      // }
                    }
                  }
                  else{
                    
                    this.requestReferenceNo = data?.Result?.RequestReferenceNo;
                     sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
                    veh['InsuranceType'] = vehicleDetails?.Insurancetype;
                    veh['MSRefNo'] = data?.Result?.MSRefNo;
                    veh['VdRefNo'] = data?.Result?.VdRefNo;
                    veh['CdRefNo'] = data?.Result?.CdRefNo;
                    veh['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
                    veh['VehicleId'] = veh.Vehicleid
                    veh['Active'] = true;
                    console.log("Save Iterate",veh)
                    i+=1;
                    this.getCalculationDetails(veh,i,type);
                    
                    

                    // sessionStorage.setItem('editVehicleId',this.vehicleId);
                    // sessionStorage.removeItem('vehicleDetails');
                    // sessionStorage.setItem('vehChassisNo',this.vehicleDetails?.Chassisnumber);

                    // this.getCalculationDetails(data?.Result);
                  }
                },
                (err) => { },
              );
            }
          },
          (err) => { },
        );
      }
      else{
        i+=1;
        if(i==this.vehicleList.length)  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      }
    }
  }
  getCalculationDetails(vehicleDetails,i,type){
    let createdBy="";
    if(type=='cancel'){
      this.coverModificationYN = "Y";
    }
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP'){
              createdBy = this.vehicleList[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
          }
          let endDate:any = null;
          if(type=='cancel') endDate = this.endorseEffectiveDate;
          else if(vehicleDetails.PolicyEndDate){
              endDate = vehicleDetails.PolicyEndDate;
          }
          let effectiveDate=null;
          //if(this.endorsementSection){
              effectiveDate = this.endorseEffectiveDate;
          // }
          // else {
          //   if(vehicleDetails.PolicyStartDate){
          //     effectiveDate = this.datePipe.transform(vehicleDetails.PolicyStartDate, "dd/MM/yyyy");
          //   }
          // }
    let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": vehicleDetails?.Insurancetype,
        "ProductId": this.productId,
        "MSRefNo": vehicleDetails?.MSRefNo,
        "VehicleId": vehicleDetails?.VehicleId,
        "CdRefNo": vehicleDetails?.CdRefNo,
        "VdRefNo": vehicleDetails?.VdRefNo,
        "CreatedBy": createdBy,
        "productId": this.productId,
        "sectionId": vehicleDetails?.Insurancetype,
        "RequestReferenceNo": this.requestReferenceNo,
        "EffectiveDate": effectiveDate,
        "PolicyEndDate": endDate,
        "CoverModification":this.coverModificationYN
    }
    let urlLink = `${this.CommonApiUrl}calculator/calc`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        let res:any = data;
        if(i==this.vehicleList.length){
          if(type!='cancel'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
          else{
            this.getCancellationEndorse(this.vehicleList,vehicleDetails)
          }
        }
      },
    (err) => { },
  );
}

  checkCanelEndorse(){
    let entry = this.financialList.find(ele=>ele.EndtType==42 || ele.EndtType==842);
    return entry;
  }
  onChangeCancelYN(){
    if(this.cancelYN=='Y'){
      this.endorsementId = null;this.selectedEndorsement = null;
    }
  }
}
