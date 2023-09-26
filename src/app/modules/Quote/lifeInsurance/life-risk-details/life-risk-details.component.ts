import { Component, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LifeInsurance } from './LifeInsurance';
import { ProductData } from './product';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-life-risk-details',
  templateUrl: './life-risk-details.component.html',
  styleUrls: ['./life-risk-details.component.css']
})
export class LifeRiskDetailsComponent {
  public fields: any[] = [];formSection:any=null;
  public productItem: ProductData = null;gender:any="M";
  termList:any[]=[];termValue:any='';maxDobDate:any=null;
  paymentModeList: any[]=[];paymentMode:any="Y";
  premiumSection:boolean = false;premiumList:any[]=[]
  public dataSource: any;columnHeader: any[] = [];
  innerColumnHeader:any[]=[]
  currencyCode: any=null;payingTermValue:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  userType: any;dateOfBirth:any=null;
  insuranceId: any;customerName:any=null;
  sumInsured: any;mobileno:any=null;
  coverModificationYN: any=null;emailId:any=null;
  endorsementSection: boolean=false;
  selectedCoverList: any[]=[];
  totalPremium: number;
  localPremiumCost: number;
  quoteNo: any=null;
  quoteRefNo: any=null;
  adminSection: any;
  MinimumPremium: number;
  premiumExcluedTax: any;
  premiumIncluedTax: any;
  dependantTaxList: any[];
  premiumBeforeTax: number;
  taxList: any[];mobileCode:any='';
  mobileCodeList: any[]=[];
constructor(private router:Router,private sharedService: SharedService,private datePipe: DatePipe){
  this.fields[0] = new LifeInsurance().fields;
  this.productItem = new ProductData();
  this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  this.loginId = this.userDetails.Result.LoginId;
  this.agencyCode = this.userDetails.Result.OaCode;
  this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
  this.branchCode = this.userDetails.Result.BranchCode;
  this.productId = this.userDetails.Result.ProductId;
  this.userType = this.userDetails?.Result?.UserType;
  this.insuranceId = this.userDetails.Result.InsuranceId;
  this.currencyCode = "TZS"
  this.paymentModeList = [
    {"Code":"01","CodeDesc":"Monthly"},
    {"Code":"02","CodeDesc":"Quarterly"},
    {"Code":"03","CodeDesc":"Half-Yearly"},
    {"Code":"04","CodeDesc":"Yearly"},
  ]
  var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.maxDobDate = new Date(year - 18, month, day);
      
      this.innerColumnHeader =  [
        {
          key: 'SubCoverId',
          display: '',
          config: {
            select:true
          },
        },
        { key: 'SubCoverName', display: 'SubCover Name' },
        { key: 'Rate', display: 'Rate' },
        { key: 'MinimumPremium', display: 'Minimum' },
        { key: 'PremiumAfterDiscount', display: 'After Discount' },
        { key: 'PremiumIncludedTax', display: 'Premium' },
        // {
        //   key: 'actions',
        //   display: 'Action',
        //   config: {
        //     isEdit: true,
        //   },
        // },
  
      ];
      this.columnHeader = [

        // {
        //   key: 'CalcType',
        //   display: '',
        //   config: {
        //     isExpand:true
        //   },
        // },
        // { key: 'SectionName', display: 'Section Name' },
        {
          key: 'selected',
          display: 'Select',
          config: {
            isChecked:true
          },
        },
        { key: 'CoverName', display: 'Cover Name' },
        // { key: 'ReferalDescription', display: 'Referral' },
        // { key: 'Rate', display: 'Rate' },
        // { key: 'ExcessPercent', display: 'Excess Percent' },
        // { key: 'ExcessAmount', display: 'Excess Amount' },
        //{ key: 'MinimumPremium', display: 'Minimum' },
        { key: 'PremiumIncludedTax', display: 'Premium' },

      ];
    this.getPolicyTermList();
    this.getPaymentModeList();
    this.getMobileCodeList();
}
 
ngOnInit(){
  // this.premiumList = [
  //   {
  //     "CoverList": [
  //         {
  //             "CoverId": "5",
  //             "CalcType": "P",
  //             "CoverName": "Base Cover",
  //             "CoverDesc": "Base Cover ",
  //             "MinimumPremium": 0,
  //             "CoverToolTip": "Base cover",
  //             "IsSubCover": "N",
  //             "SumInsured": 1500000,
  //             "SumInsuredLc": 1500000,
  //             "Rate": 7.5,
  //             "SubCoverId": null,
  //             "SubCoverDesc": null,
  //             "SubCoverName": null,
  //             "SectionId": "72",
  //             "Discounts": null,
  //             "Taxes": [
  //                 {
  //                     "isTaxExempted": "N",
  //                     "TaxId": "1",
  //                     "TaxRate": 18,
  //                     "TaxAmount": 20250,
  //                     "TaxDesc": "VAT MAINLAND",
  //                     "TaxExemptType": null,
  //                     "TaxExemptCode": "",
  //                     "TaxCalcType": "P",
  //                     "RegulatoryCode": "4",
  //                     "EndtTypeId": null,
  //                     "EndtTypeCount": 0,
  //                     "DependentYN": "N",
  //                     "TaxExemptedAllowed": "Y",
  //                     "MinimumTaxAmount": 0,
  //                     "MinimumTaxAmountLC": 0,
  //                     "TaxAmountLc": 20250,
  //                     "TaxFor": "NB"
  //                 }
  //             ],
  //             "SubCovers": null,
  //             "FactorTypeId": "1001",
  //             "DependentCoverYN": "N",
  //             "DependentCoverId": "0",
  //             "Exception": null,
  //             "Loadings": null,
  //             "CoverageType": "B",
  //             "isSelected": "D",
  //             "Notsutable": false,
  //             "PremiumBeforeDiscountLC": 112500,
  //             "PremiumAfterDiscountLC": 112500,
  //             "PremiumExcluedTaxLC": 112500,
  //             "PremiumIncludedTaxLC": 132750,
  //             "PremiumBeforeDiscount": 112500,
  //             "PremiumAfterDiscount": 112500,
  //             "PremiumExcluedTax": 112500,
  //             "PremiumIncludedTax": 132750,
  //             "ExchangeRate": 1,
  //             "Currency": "1",
  //             "isReferal": "N",
  //             "ReferalDescription": "",
  //             "ProRata": 1,
  //             "RegulatorSumInsured": 1500000,
  //             "RegulatorRate": 7.5,
  //             "UserOpt": null,
  //             "CoverBasedOn": "sumInsured",
  //             "RegulatoryCode": "NA",
  //             "InsuranceId": null,
  //             "BranchCode": null,
  //             "AgencyCode": null,
  //             "ProductId": null,
  //             "MSRefNo": null,
  //             "VehicleId": null,
  //             "CdRefNo": null,
  //             "VdRefNo": null,
  //             "CreatedBy": null,
  //             "RequestReferenceNo": null,
  //             "MultiSelectYn": "N",
  //             "SectionName": null,
  //             "ExcessPercent": 0,
  //             "ExcessAmount": 0,
  //             "ExcessDesc": "based on Company Rules",
  //             "MinimumPremiumYn": "N",
  //             "ProRataApplicable": "Y",
  //             "Endorsements": null,
  //             "EndtCount": 0,
  //             "EffectiveDate": "25/09/2023",
  //             "PolicyEndDate": "25/09/2023",
  //             "Status": "Y",
  //             "DiffPremiumIncludedTax": null,
  //             "DiffPremiumIncludedTaxLC": null,
  //             "CoverageLimit": 999999999999999,
  //             "MinSumInsured": 5000
  //         },
  //         {
  //             "CoverId": "56",
  //             "CalcType": "P",
  //             "CoverName": "Double Accident Benefit (DAB)",
  //             "CoverDesc": "Double Accident Benefit",
  //             "MinimumPremium": 0,
  //             "CoverToolTip": "Double Accident Benefit\n",
  //             "IsSubCover": "N",
  //             "SumInsured": 112500,
  //             "SumInsuredLc": 112500,
  //             "Rate": 25,
  //             "SubCoverId": null,
  //             "SubCoverDesc": null,
  //             "SubCoverName": null,
  //             "SectionId": "72",
  //             "Discounts": null,
  //             "Taxes": [
  //                 {
  //                     "isTaxExempted": "N",
  //                     "TaxId": "1",
  //                     "TaxRate": 18,
  //                     "TaxAmount": 5062,
  //                     "TaxDesc": "VAT MAINLAND",
  //                     "TaxExemptType": null,
  //                     "TaxExemptCode": "",
  //                     "TaxCalcType": "P",
  //                     "RegulatoryCode": "4",
  //                     "EndtTypeId": null,
  //                     "EndtTypeCount": 0,
  //                     "DependentYN": "N",
  //                     "TaxExemptedAllowed": "Y",
  //                     "MinimumTaxAmount": 0,
  //                     "MinimumTaxAmountLC": 0,
  //                     "TaxAmountLc": 5062,
  //                     "TaxFor": "NB"
  //                 }
  //             ],
  //             "SubCovers": null,
  //             "FactorTypeId": "",
  //             "DependentCoverYN": "Y",
  //             "DependentCoverId": "5",
  //             "Exception": null,
  //             "Loadings": null,
  //             "CoverageType": "O",
  //             "isSelected": "Y",
  //             "Notsutable": false,
  //             "PremiumBeforeDiscountLC": 28125,
  //             "PremiumAfterDiscountLC": 28125,
  //             "PremiumExcluedTaxLC": 28125,
  //             "PremiumIncludedTaxLC": 33187,
  //             "PremiumBeforeDiscount": 28125,
  //             "PremiumAfterDiscount": 28125,
  //             "PremiumExcluedTax": 28125,
  //             "PremiumIncludedTax": 33187,
  //             "ExchangeRate": 1,
  //             "Currency": "1",
  //             "isReferal": "Y",
  //             "ReferalDescription": "CoverageLimit Referral Limits Upto10.0",
  //             "ProRata": 1,
  //             "RegulatorSumInsured": 112500,
  //             "RegulatorRate": 25,
  //             "UserOpt": null,
  //             "CoverBasedOn": "sumInsured",
  //             "RegulatoryCode": "99999",
  //             "InsuranceId": null,
  //             "BranchCode": null,
  //             "AgencyCode": null,
  //             "ProductId": null,
  //             "MSRefNo": null,
  //             "VehicleId": null,
  //             "CdRefNo": null,
  //             "VdRefNo": null,
  //             "CreatedBy": null,
  //             "RequestReferenceNo": null,
  //             "MultiSelectYn": "N",
  //             "SectionName": null,
  //             "ExcessPercent": 0,
  //             "ExcessAmount": 0,
  //             "ExcessDesc": "0",
  //             "MinimumPremiumYn": "N",
  //             "ProRataApplicable": "Y",
  //             "Endorsements": null,
  //             "EndtCount": 0,
  //             "EffectiveDate": "25/09/2023",
  //             "PolicyEndDate": "25/09/2023",
  //             "Status": "Y",
  //             "DiffPremiumIncludedTax": null,
  //             "DiffPremiumIncludedTaxLC": null,
  //             "CoverageLimit": 10,
  //             "MinSumInsured": 0
  //         },
  //         {
  //             "CoverId": "18",
  //             "CalcType": "P",
  //             "CoverName": "Critical illness (CI)",
  //             "CoverDesc": "Critical illness",
  //             "MinimumPremium": 0,
  //             "CoverToolTip": "Critical illness",
  //             "IsSubCover": "N",
  //             "SumInsured": 112500,
  //             "SumInsuredLc": 112500,
  //             "Rate": 25,
  //             "SubCoverId": null,
  //             "SubCoverDesc": null,
  //             "SubCoverName": null,
  //             "SectionId": "72",
  //             "Discounts": null,
  //             "Taxes": [
  //                 {
  //                     "isTaxExempted": "N",
  //                     "TaxId": "1",
  //                     "TaxRate": 18,
  //                     "TaxAmount": 5062,
  //                     "TaxDesc": "VAT MAINLAND",
  //                     "TaxExemptType": null,
  //                     "TaxExemptCode": "",
  //                     "TaxCalcType": "P",
  //                     "RegulatoryCode": "4",
  //                     "EndtTypeId": null,
  //                     "EndtTypeCount": 0,
  //                     "DependentYN": "N",
  //                     "TaxExemptedAllowed": "Y",
  //                     "MinimumTaxAmount": 0,
  //                     "MinimumTaxAmountLC": 0,
  //                     "TaxAmountLc": 5062,
  //                     "TaxFor": "NB"
  //                 }
  //             ],
  //             "SubCovers": null,
  //             "FactorTypeId": "0",
  //             "DependentCoverYN": "Y",
  //             "DependentCoverId": "5",
  //             "Exception": null,
  //             "Loadings": null,
  //             "CoverageType": "O",
  //             "isSelected": "Y",
  //             "Notsutable": false,
  //             "PremiumBeforeDiscountLC": 28125,
  //             "PremiumAfterDiscountLC": 28125,
  //             "PremiumExcluedTaxLC": 28125,
  //             "PremiumIncludedTaxLC": 33187,
  //             "PremiumBeforeDiscount": 28125,
  //             "PremiumAfterDiscount": 28125,
  //             "PremiumExcluedTax": 28125,
  //             "PremiumIncludedTax": 33187,
  //             "ExchangeRate": 1,
  //             "Currency": "1",
  //             "isReferal": "Y",
  //             "ReferalDescription": "CoverageLimit Referral Limits Upto0.0",
  //             "ProRata": 1,
  //             "RegulatorSumInsured": 112500,
  //             "RegulatorRate": 25,
  //             "UserOpt": null,
  //             "CoverBasedOn": "sumInsured",
  //             "RegulatoryCode": "NA",
  //             "InsuranceId": null,
  //             "BranchCode": null,
  //             "AgencyCode": null,
  //             "ProductId": null,
  //             "MSRefNo": null,
  //             "VehicleId": null,
  //             "CdRefNo": null,
  //             "VdRefNo": null,
  //             "CreatedBy": null,
  //             "RequestReferenceNo": null,
  //             "MultiSelectYn": "N",
  //             "SectionName": null,
  //             "ExcessPercent": 10,
  //             "ExcessAmount": 0,
  //             "ExcessDesc": "0",
  //             "MinimumPremiumYn": "N",
  //             "ProRataApplicable": "Y",
  //             "Endorsements": null,
  //             "EndtCount": 0,
  //             "EffectiveDate": "25/09/2023",
  //             "PolicyEndDate": "25/09/2023",
  //             "Status": "Y",
  //             "DiffPremiumIncludedTax": null,
  //             "DiffPremiumIncludedTaxLC": null,
  //             "CoverageLimit": 0,
  //             "MinSumInsured": 0
  //         },
  //         {
  //             "CoverId": "3",
  //             "CalcType": "P",
  //             "CoverName": "Total and Permanent Disability (TPD) ",
  //             "CoverDesc": "Total and Permanent Disability (TPD)",
  //             "MinimumPremium": 0,
  //             "CoverToolTip": "Total and Permanent Disability (TPD)",
  //             "IsSubCover": "N",
  //             "SumInsured": 112500,
  //             "SumInsuredLc": 112500,
  //             "Rate": 20,
  //             "SubCoverId": null,
  //             "SubCoverDesc": null,
  //             "SubCoverName": null,
  //             "SectionId": "72",
  //             "Discounts": null,
  //             "Taxes": [
  //                 {
  //                     "isTaxExempted": "N",
  //                     "TaxId": "1",
  //                     "TaxRate": 18,
  //                     "TaxAmount": 4050,
  //                     "TaxDesc": "VAT MAINLAND",
  //                     "TaxExemptType": null,
  //                     "TaxExemptCode": "",
  //                     "TaxCalcType": "P",
  //                     "RegulatoryCode": "4",
  //                     "EndtTypeId": null,
  //                     "EndtTypeCount": 0,
  //                     "DependentYN": "N",
  //                     "TaxExemptedAllowed": "Y",
  //                     "MinimumTaxAmount": 0,
  //                     "MinimumTaxAmountLC": 0,
  //                     "TaxAmountLc": 4050,
  //                     "TaxFor": "NB"
  //                 }
  //             ],
  //             "SubCovers": null,
  //             "FactorTypeId": "",
  //             "DependentCoverYN": "Y",
  //             "DependentCoverId": "5",
  //             "Exception": null,
  //             "Loadings": null,
  //             "CoverageType": "O",
  //             "isSelected": "Y",
  //             "Notsutable": false,
  //             "PremiumBeforeDiscountLC": 22500,
  //             "PremiumAfterDiscountLC": 22500,
  //             "PremiumExcluedTaxLC": 22500,
  //             "PremiumIncludedTaxLC": 26550,
  //             "PremiumBeforeDiscount": 22500,
  //             "PremiumAfterDiscount": 22500,
  //             "PremiumExcluedTax": 22500,
  //             "PremiumIncludedTax": 26550,
  //             "ExchangeRate": 1,
  //             "Currency": "1",
  //             "isReferal": "N",
  //             "ReferalDescription": "",
  //             "ProRata": 1,
  //             "RegulatorSumInsured": 112500,
  //             "RegulatorRate": 20,
  //             "UserOpt": null,
  //             "CoverBasedOn": "sumInsured",
  //             "RegulatoryCode": "NA",
  //             "InsuranceId": null,
  //             "BranchCode": null,
  //             "AgencyCode": null,
  //             "ProductId": null,
  //             "MSRefNo": null,
  //             "VehicleId": null,
  //             "CdRefNo": null,
  //             "VdRefNo": null,
  //             "CreatedBy": null,
  //             "RequestReferenceNo": null,
  //             "MultiSelectYn": "N",
  //             "SectionName": null,
  //             "ExcessPercent": 0,
  //             "ExcessAmount": 0,
  //             "ExcessDesc": "As per Company Law",
  //             "MinimumPremiumYn": "N",
  //             "ProRataApplicable": "Y",
  //             "Endorsements": null,
  //             "EndtCount": 0,
  //             "EffectiveDate": "25/09/2023",
  //             "PolicyEndDate": "25/09/2023",
  //             "Status": "Y",
  //             "DiffPremiumIncludedTax": null,
  //             "DiffPremiumIncludedTaxLC": null,
  //             "CoverageLimit": 100000000000000000,
  //             "MinSumInsured": 0
  //         }
  //     ],
  //     "RequestReferenceNo": "LIFE-07756",
  //     "CustomerReferenceNo": null,
  //     "VehicleId": "1",
  //     "MSRefNo": "52307",
  //     "CdRefNo": "52305",
  //     "VdRefNo": "52306",
  //     "Response": "Saved Successfully",
  //     "CreatedBy": null,
  //     "InsuranceId": "100002",
  //     "ProductId": "45",
  //     "SectionId": "0",
  //     "UWReferral": null,
  //     "updateas": null,
  //     "MasterReferral": null
  //   }
  // ];
  
}
getPolicyTermList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId
  }
  let urlLink = `${this.CommonApiUrl}dropdown/life/policyterms`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let defaultObj = [{"Code":'',"CodeDesc":'--Select--'}]
        this.termList = defaultObj.concat(data.Result);
      }
    },
    (err) => { },
  );
}
getPaymentModeList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId
  }
  let urlLink = `${this.CommonApiUrl}dropdown/life/paymentType`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        this.paymentModeList = data.Result;
      }
    },
    (err) => { },
  );
}
getMobileCodeList() {
  let ReqObj = { "InsuranceId": this.insuranceId }
  let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
        this.mobileCodeList = obj.concat(data.Result);
      }
    },
    (err) => { },
  );
}
checkSelectedCovers(){
  console.log('VVVVVVVVV',this.premiumList);
  if(this.premiumList.length!=0){
    if(this.premiumList[0].CoverList.length!=0){
      this.currencyCode== this.premiumList[0].CoverList[0].Currency;
    }
    let j=0;
    for(let veh of this.premiumList){
      veh['totalPremium'] = 0;
      let i=0;
      let coverList:any[]=veh.CoverList;
      for(let cover of coverList){
        cover['ExcessDesc'] = 'None';
        let fieldList = [];
        if(cover.Endorsements!=null){
          
          cover['DifferenceYN']= 'Y';
          if(veh?.EndtTypeMaster?.Endtdependantfields){
            fieldList = veh?.EndtTypeMaster?.Endtdependantfields.split(',')
          }
        }
        if(cover.Endorsements!=null && !this.endorsementSection){
          this.endorsementSection = true;
          
          let obj = {
            "EndtTypeId":cover.Endorsements[0].EndorsementId,
            "FieldsAllowed": fieldList,
            "EffectiveDate":cover.EffectiveDate,
            "Remarks":null,
            "Category": veh?.EndtTypeMaster?.Endttypecategory,
            "EndtName": cover.Endorsements[0].EndorsementDesc,
            "PolicyNo": null
          }
          sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
        }
        if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
        (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='D' || cover.isSelected=='O')) ){
          // if(this.endorsementId == 846 && veh.Status=='D'){
          //   cover['selected']= false;
          //   this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
          // }
          // else{
            console.log("Final Selection",veh)
            cover['selected']= true;
            this.onSelectCover(cover,true,veh.VehicleId,veh,'coverList','direct');
          //}
          
        }
        else{
          console.log("Not Selected 1",cover);
          cover['selected']= false;
        }
        if(cover.SubCovers!=null){
          let k=0;
          for(let sub of cover.SubCovers){
            if(sub.isSelected=='D' || sub.isSelected=='O' || sub.isSelected=='Y' || sub?.UserOpt=='Y'){
                  this.onChangeSubCover(sub,cover,veh,true);
            }
            k+=1;
            if(k==cover.SubCovers){
              i+=1;
              if(i==coverList.length){
                let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
                let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
                veh.CoverList = defaultList.concat(otherList);
                if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
              }
            }
          }
        }
        else{
          i+=1;
          if(i==coverList.length){
            let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
            let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
            veh.CoverList = defaultList.concat(otherList);
            if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
            
          }
        }
        
      }
      j+=1;
      if(j==this.premiumList.length){
          if(this.quoteNo!="null" && this.quoteNo!=null){
            //this.getEditQuoteDetails();
          }
           if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
            //this.updateComponent.quoteNo = this.quoteNo;
            
          }
          else{
            this.dataSource = new MatTableDataSource(this.premiumList[0].CoverList);
            // this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator;
            // this.applyFilter(this.filterValue);
          }
        
        //this.onGetCoverListById();
      }
    }


  }
}
onChangeSubCover(subCover,cover,vehicle,event){
  console.log("SubCover Data",subCover,event);
  if(subCover.MultiSelectYn=='Y'){
      if(event){
        if(this.selectedCoverList.length!=0){
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId);
          if(entry.length==0){
            let element = {
                "Covers": [
                  {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicle.VehicleId,
                "SectionId": cover.SectionId,

              }
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
            cover.selected = true;
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            console.log("Selected Covers",this.selectedCoverList)
            if(vehicle?.totalPremium){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            
            }
            else{
             
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              
            }
            // if(vehicle?.totalPremium){
            //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTax;
            //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
            // }
            // else{
            //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
            //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            // }
              console.log("Total Premium",cover,vehicle)
            this.getTotalVehiclesCost();
            //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          }
          else{
           let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
           if(sectionEntry == undefined){
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicle.VehicleId,
              "SectionId": cover.SectionId
            }
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

            cover.selected = true;
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
            
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
              // if(vehicle?.totalPremium){
              //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTax;
              //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
              // }
              // else{
              //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              // }
              console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
           }
           else{
             console.log("Sections",sectionEntry)
            let covers:any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
            if(findCover.length==0) {
              let newEntry = {
                "CoverId": cover.CoverId,
                "SubCoverId":subCover.SubCoverId,
                "SubCoverYn": "Y"
                //"isReferal": rowData.isReferal
              }
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.selected = true;
              subCover['selected'] = true;
              sectionEntry.Covers.push(newEntry);
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
            }
            else{
              console.log("Finded Covers",findCover,sectionEntry)
              let subCoverEntry = findCover.filter(ele=>ele.SubCoverId==subCover.SubCoverId);
              if(subCoverEntry.length==0){
                let newEntry = {
                  "CoverId": cover.CoverId,
                  "SubCoverId":subCover.SubCoverId,
                  "SubCoverYn": "Y"
                  //"isReferal": rowData.isReferal
                }
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.selected = true;
                subCover['selected'] = true;
                sectionEntry.Covers.push(newEntry);
                if(vehicle?.totalPremium){
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                  }
                
                }
                else{
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                    vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
              }
              
            }
           }
          }
        }
        else{
          let element = {
            "Covers": [
              {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y",
                //"isReferal": rowData.isReferal
              }
            ],
            "Id": vehicle.VehicleId,
            "SectionId": cover.SectionId
          }
          cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

          cover.selected = true;
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
            
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
            
          }
          this.getTotalVehiclesCost();
        }
      }
      else{
        if(this.selectedCoverList.length!=0){
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId);
          console.log("Entry List",entry);
          let sectionEntry = entry.find(ele=>ele.SectionId==cover.SectionId);
          sectionEntry.Covers = sectionEntry.Covers.filter(ele=>ele.SubCoverId!=subCover.SubCoverId )
          let covers:any[] = sectionEntry.Covers;
          let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
          subCover['selected'] = false;
          
          cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
          cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
          if(vehicle?.totalPremium==null || vehicle?.totalPremium==undefined){ vehicle['totalLcPremium']=0;vehicle['totalPremium']=0 }
          if(vehicle?.totalPremium){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - subCover.PremiumIncludedTax;
            vehicle['totalPremium'] =  vehicle['totalPremium']-subCover.PremiumIncludedTax;
            if(findCover.length==0){cover['selected'] = false;  vehicle['totalPremium'] =  vehicle['totalPremium']-cover.PremiumIncludedTax; vehicle['totalLcPremium'] =  vehicle['totalLcPremium']-cover.PremiumIncludedTax;}
          }
          else{
            if(findCover.length!=0){
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
          }
          this.getTotalVehiclesCost();
        }
      }
  }
}
onSelectCover(rowData,event,vehicleId,vehicleData,type,directType){
  
  if(type=='coverList'){
      let vehicle:any;
        vehicle = this.premiumList.find(ele=>ele.VehicleId==vehicleId);
      let coverList = vehicle?.CoverList;
      if(event){
        rowData['selected']= true;
        if(rowData.DifferenceYN==undefined && this.coverModificationYN=='Y'){
          rowData['DifferenceYN'] = 'Y'
        }
        if(this.selectedCoverList.length!=0){
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
          if(entry.length==0){
            
            if(rowData.SubCovers==null){
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicleId,
                "SectionId": rowData.SectionId,

              }
              this.selectedCoverList.push(element);
            }
            
            
           if(vehicle?.totalPremium){
              
              rowData['Modifiable']='N';
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                if(this.coverModificationYN!='Y' ){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                
              }
              else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
              }
              
            }
            else{
              rowData['Modifiable']='N';
             
               
                  vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
              
            }
            this.getTotalVehiclesCost();
            //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          }
          else{
            
           let sectionEntry = entry.find(ele=>ele.SectionId == rowData.SectionId);
          
           if(sectionEntry == undefined){
            if(rowData.SubCovers==null){
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicleId,
                "SectionId": rowData.SectionId,

              }
              this.selectedCoverList.push(element);
            }
            
           if(vehicle?.totalPremium){
              rowData['Modifiable']='N';
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                if(this.coverModificationYN!='Y'){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }


              }
              else{
                
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
              }
              
            }
            else{
              
              rowData['Modifiable']='N';
             
                  vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
            }
              this.getTotalVehiclesCost();
           }
           else{
              let covers:any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele=>ele.CoverId==rowData.CoverId);
            if(findCover.length==0) {
              if(rowData.SubCovers==null){
                let element = {
                      "CoverId": rowData.CoverId,
                       "SubCoverId": null,
                       "SubCoverYn": "N",
                }
                // let element = {
                //   "Covers": [
                //     {
                //       "CoverId": rowData.CoverId,
                //       "SubCoverId": null,
                //       "SubCoverYn": "N",
                //       //"isReferal": rowData.isReferal
                //     }
                //   ],
                //   "Id": vehicleId,
                //   "SectionId": rowData.SectionId,

                // }
                // this.selectedCoverList.push(element);
                sectionEntry.Covers.push(element)
                console.log("Selected Cover",this.selectedCoverList)
              }
              
              if(vehicle?.totalPremium){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                
              }
              else{
                
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                
              }
              console.log("Total Premium",rowData,vehicle)
              this.getTotalVehiclesCost();
            }
           }
          }
        }
        else{
          
          if(rowData.SubCovers==null){
            let element = {
              "Covers": [
                {
                  "CoverId": rowData.CoverId,
                  "SubCoverId": null,
                  "SubCoverYn": "N",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicleId,
              "SectionId": rowData.SectionId,

            }
            this.selectedCoverList.push(element);
            console.log("Selected Cover",this.selectedCoverList)
          }
         if(vehicle?.totalPremium){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
              this.getTotalVehiclesCost();
        }
        else{
          console.log("Row Data",vehicle)
          if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
          vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
          vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
          this.getTotalVehiclesCost();
        }
        // vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
        // vehicle['totalPremium'] = rowData.PremiumIncludedTax;
       
          // this.selectedCoverList.push(rowData);
          // this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
        }
      }
      else{
        rowData['selected']= false;
        let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
        if(entry){
          let sectionEntry = entry.find(ele=>ele.SectionId==rowData.SectionId);
          if(sectionEntry!=undefined){
            let covers:any[] = sectionEntry.Covers;
            let CoverIndex = covers.findIndex(ele=>ele.CoverId==rowData.CoverId);
            covers.splice(CoverIndex,1);
            if(this.coverModificationYN=='Y') {rowData['DifferenceYN'] = 'N';}
            if(directType=='change' && this.endorsementSection){
              if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN=='Y'){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
                }
              
            }
            else if(vehicle?.totalPremium){
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
              }
            
            }
            else{
              
              vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
            }
            // vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.PremiumIncludedTax;
            // vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
            this.getTotalVehiclesCost();
          }
          //
        }
        // else if(this.endorsementId==846){
        //   let covers:any[] = rowData.Covers;
        //   console.log("Coverssssssssss",covers)
        // }
      }

  }
  console.log("Final Selected Covers",this.premiumList)
}
getTotalVehiclesCost(){
  let totalCost = 0,i=0,totalLocalCost=0;
  
  for(let veh of this.premiumList){
    if(veh?.totalPremium) totalCost = totalCost+veh?.totalPremium;
    // if(veh?.totalLcPremium) totalLocalCost = totalLocalCost+veh?.totalLcPremium;
    i+=1;
    if(i==this.premiumList.length){
      this.localPremiumCost = totalLocalCost;
      this.totalPremium = totalCost;
    }
  }
}
public form = new FormGroup({})
  onSubmit(productItem){

  }
  ongetBenefitDetails(type){
    let ReqObj = {  
      "MSRefNo": this.premiumList[0].MSRefNo,
      "CdRefNo": this.premiumList[0].CdRefNo,
      "VdRefNo": this.premiumList[0].VdRefNo
    }
    let urlLink = `${this.motorApiUrl}shortquote/illustration/downloadpdf/${this.productId}`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            console.log("Final Pdf",data.Result)
            if(data.Result.PdfOutFilePath){
              if(type=='benefit'){
                var pdfResult = data.Result.PdfOutFile;    
                let pdfWindow = window.open("")
                pdfWindow.document.write("<iframe width='100%' height='100%' src='" + encodeURI(pdfResult) + "'></iframe>")
              }
              else{
                const link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.setAttribute('href', data?.Result.PdfOutFile);
                link.setAttribute('download','Benefits Illustration');
                document.body.appendChild(link);
                link.click();
                link.remove();
              }
            }
            else{alert("Null Response")}
        }
        else{alert("Null Response")}
      },
      (err) => { },
    );
  }
  canbeChecked(rowData){
    return rowData.selected;
  }
  get keys() {
    return this.columnHeader.map(({ key }) => key);
  }
  get innerKeys() {
    return this.innerColumnHeader.map(({ key }) => key);
  }
  ongetPremium(){
    this.premiumList = [];this.selectedCoverList=[];
    let dob=null,appId=null,sumInsured = null;
    if(this.sumInsured==undefined) sumInsured = null;
    else if(this.sumInsured.includes(',')){ sumInsured = this.sumInsured.replace(/,/g, '') }
    else sumInsured = this.sumInsured;
    if(this.userType!='Issuer'){
      appId = "1"; 
    }
    else{
      appId = this.loginId;
    }
    if (this.dateOfBirth != undefined && this.dateOfBirth != null && this.dateOfBirth != '') {
			dob = this.datePipe.transform(this.dateOfBirth, "dd/MM/yyyy");
		}
    let ReqObj = {
      "CustomerName": this.customerName,
      "Gender": this.gender,
      "DateOfBirth": dob,
      "PolicyTerm": this.termValue,
      "PayingTerm": this.payingTermValue,
      "SumInsured": sumInsured,
      "PaymentMode": this.paymentMode,
      "EmailId": this.emailId,
      "MobileNo": this.mobileno,
      "MobileCode": this.mobileCode,
      "SourceType": null,
      "BrokerCode": this.agencyCode,
      "BrokerBranchCode": this.brokerbranchCode,
      "BdmCode": null,
       "BranchCode": this.branchCode,
       "AgencyCode": this.agencyCode,
       "InsuranceId": this.insuranceId,
       "ProductId": this.productId,
       "LoginId": this.loginId,
       "ApplicationId":appId
   
   }
   let urlLink = `${this.motorApiUrl}shortquote/life`;
   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
     (data: any) => {
       if(data.Result!=null){
        if(data.Result.CoverList.length!=0){
          this.premiumList = [data.Result];
          this.checkSelectedCovers();
          this.premiumSection = true;
        }
        else{alert("Premium Details Not Available")}
       }
      },
      (err) => { },
    );
    
  }
  getTotalCost(rowData){
    if(rowData?.totalPremium) return rowData?.totalPremium;
    else return 0;
  }
  onSIChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  ongetTaxDetails(rowData){
    console.log("Tax Details",rowData);
    this.MinimumPremium = (rowData.MinimumPremium/rowData.ExchangeRate);
    this.premiumExcluedTax = rowData.PremiumExcluedTax;
    this.premiumIncluedTax = rowData.PremiumIncludedTax;
    this.dependantTaxList = [];this.taxList =[];
    this.premiumBeforeTax = 0;
    if(rowData.Taxes){
      if(rowData.Taxes.length!=0){
        this.dependantTaxList = rowData.Taxes.filter(ele=>ele.DependentYN=='N');
        if(this.dependantTaxList.length!=0){
          let i=0;
          for(let tax of this.dependantTaxList){this.premiumBeforeTax = this.premiumBeforeTax+tax.TaxAmount;i+=1;
              if(i==this.dependantTaxList.length) this.premiumBeforeTax = this.premiumBeforeTax + this.premiumExcluedTax;
          }
        }
        this.taxList = rowData.Taxes.filter(ele=>ele.DependentYN!='N');
      }
     
    }
  }
  CommaFormatted() {

    // format number
    if (this.sumInsured) {
      this.sumInsured = this.sumInsured.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  checkCoverSelection(vehicleData,coverData){
    
    return false;
  }
}
