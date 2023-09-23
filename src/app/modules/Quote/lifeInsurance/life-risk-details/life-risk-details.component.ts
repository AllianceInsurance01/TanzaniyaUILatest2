import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LifeInsurance } from './LifeInsurance';
import { ProductData } from './product';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-life-risk-details',
  templateUrl: './life-risk-details.component.html',
  styleUrls: ['./life-risk-details.component.css']
})
export class LifeRiskDetailsComponent {
  public fields: any[] = [];formSection:any=null;
  public productItem: ProductData = null;gender:any="M";
  termList:any[]=[];termValue:any=null;maxDobDate:any=null;
  paymentModeList: any[]=[];paymentMode:any="Y";
  premiumSection:boolean = false;premiumList:any[]=[]
  public dataSource: any;columnHeader: any[] = [];
  innerColumnHeader:any[]=[]
  currencyCode: any=null;
constructor(){
  this.fields[0] = new LifeInsurance().fields;
  this.productItem = new ProductData();
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

      ]
}
ngOnInit(){
  this.premiumList = [
    {
        "CoverId": "5",
        "CalcType": "P",
        "CoverName": "Base Cover",
        "CoverDesc": "Base Cover - Motor",
        "MinimumPremium": 250000,
        "CoverToolTip": null,
        "IsSubCover": "N",
        "SumInsured": 1000000,
        "SumInsuredLc": 1000000,
        "Rate": 3.5,
        "SubCoverId": null,
        "SubCoverDesc": null,
        "SubCoverName": null,
        "SectionId": "10",
        "Discounts": [
            {
                "DiscountId": "19",
                "DiscountDesc": "GPS Tracking ",
                "DiscountRate": "0.0",
                "DiscountAmount": 0,
                "DiscountCalcType": "P",
                "DiscountForId": null,
                "SubCoverId": "0",
                "MaxDiscountAmount": 3600000,
                "FactorTypeId": "1010.0",
                "CoverAgeType": null,
                "RegulatoryCode": null,
                "EffectiveDate": null,
                "PolicyEndDate": null
            }
        ],
        "Taxes": [
            {
                "isTaxExempted": "N",
                "TaxId": "1",
                "TaxRate": 18,
                "TaxAmount": 45000,
                "TaxDesc": "VAT-MAINLAND",
                "TaxExemptType": null,
                "TaxExemptCode": "",
                "TaxCalcType": "P",
                "RegulatoryCode": null,
                "EndtTypeId": null,
                "EndtTypeCount": null,
                "DependentYN": "N",
                "TaxExemptedAllowed": null,
                "MinimumTaxAmount": 0,
                "MinimumTaxAmountLC": 0,
                "TaxAmountLc": 45000,
                "TaxFor": null
            }
        ],
        "SubCovers": null,
        "FactorTypeId": "1001.0",
        "DependentCoverYN": "N",
        "DependentCoverId": "",
        "Exception": null,
        "Loadings": [
            {
                "LoadingId": "21",
                "LoadingDesc": "Fire & Theft Loading",
                "LoadingRate": "0.0",
                "LoadingAmount": 0,
                "LoadingCalcType": "A",
                "LoadingForId": null,
                "SubCoverId": null,
                "MaxLoadingAmount": 0,
                "FactorTypeId": "1006.0",
                "RegulatoryCode": null,
                "EffectiveDate": null,
                "PolicyEndDate": null
            }
        ],
        "CoverageType": "B",
        "isSelected": "D",
        "Notsutable": false,
        "PremiumBeforeDiscountLC": 35000,
        "PremiumAfterDiscountLC": 35000,
        "PremiumExcluedTaxLC": 250000,
        "PremiumIncludedTaxLC": 295000,
        "PremiumBeforeDiscount": 35000,
        "PremiumAfterDiscount": 35000,
        "PremiumExcluedTax": 250000,
        "PremiumIncludedTax": 295000,
        "ExchangeRate": 1,
        "Currency": "TZS",
        "isReferal": "N",
        "ReferalDescription": "",
        "ProRata": 100,
        "RegulatorSumInsured": 1000000,
        "RegulatorRate": 3.5,
        "UserOpt": "N",
        "CoverBasedOn": "sumInsured",
        "RegulatoryCode": "SP014001000001",
        "InsuranceId": "100002",
        "BranchCode": null,
        "AgencyCode": null,
        "ProductId": "5",
        "MSRefNo": "50994",
        "VehicleId": "1",
        "CdRefNo": "50992",
        "VdRefNo": "50993",
        "CreatedBy": "prakashuser",
        "RequestReferenceNo": "MOT-07444",
        "MultiSelectYn": "N",
        "SectionName": "MOTOR Private Vehicles",
        "ExcessPercent": 5,
        "ExcessAmount": 350000,
        "ExcessDesc": "5% of Claim Amount if Deductible Value is more than 100,000",
        "MinimumPremiumYn": "Y",
        "ProRataApplicable": "Y",
        "Endorsements": null,
        "EndtCount": 0,
        "EffectiveDate": "22/09/2023",
        "PolicyEndDate": "21/09/2024",
        "Status": "Y",
        "DiffPremiumIncludedTax": 0,
        "DiffPremiumIncludedTaxLC": null,
        "CoverageLimit": 300000000,
        "MinSumInsured": null
    },
    {
        "CoverId": "18",
        "CalcType": "P",
        "CoverName": "Excess PVT ",
        "CoverDesc": "Excess PVT ",
        "MinimumPremium": 0,
        "CoverToolTip": null,
        "IsSubCover": "N",
        "SumInsured": 250000,
        "SumInsuredLc": 250000,
        "Rate": 25,
        "SubCoverId": null,
        "SubCoverDesc": null,
        "SubCoverName": null,
        "SectionId": "10",
        "Discounts": null,
        "Taxes": [
            {
                "isTaxExempted": "N",
                "TaxId": "1",
                "TaxRate": 18,
                "TaxAmount": 11250,
                "TaxDesc": "VAT-MAINLAND",
                "TaxExemptType": null,
                "TaxExemptCode": "",
                "TaxCalcType": "P",
                "RegulatoryCode": null,
                "EndtTypeId": null,
                "EndtTypeCount": null,
                "DependentYN": "N",
                "TaxExemptedAllowed": null,
                "MinimumTaxAmount": 0,
                "MinimumTaxAmountLC": 0,
                "TaxAmountLc": 11250,
                "TaxFor": null
            }
        ],
        "SubCovers": null,
        "FactorTypeId": null,
        "DependentCoverYN": "Y",
        "DependentCoverId": "5",
        "Exception": null,
        "Loadings": null,
        "CoverageType": "O",
        "isSelected": "N",
        "Notsutable": false,
        "PremiumBeforeDiscountLC": 62500,
        "PremiumAfterDiscountLC": 62500,
        "PremiumExcluedTaxLC": 62500,
        "PremiumIncludedTaxLC": 73750,
        "PremiumBeforeDiscount": 62500,
        "PremiumAfterDiscount": 62500,
        "PremiumExcluedTax": 62500,
        "PremiumIncludedTax": 73750,
        "ExchangeRate": 1,
        "Currency": "TZS",
        "isReferal": "N",
        "ReferalDescription": "",
        "ProRata": 100,
        "RegulatorSumInsured": 250000,
        "RegulatorRate": 25,
        "UserOpt": "N",
        "CoverBasedOn": "sumInsured",
        "RegulatoryCode": "NA",
        "InsuranceId": "100002",
        "BranchCode": null,
        "AgencyCode": null,
        "ProductId": "5",
        "MSRefNo": "50994",
        "VehicleId": "1",
        "CdRefNo": "50992",
        "VdRefNo": "50993",
        "CreatedBy": "prakashuser",
        "RequestReferenceNo": "MOT-07444",
        "MultiSelectYn": "N",
        "SectionName": "MOTOR Private Vehicles",
        "ExcessPercent": 10,
        "ExcessAmount": 1000,
        "ExcessDesc": "None",
        "MinimumPremiumYn": "N",
        "ProRataApplicable": "Y",
        "Endorsements": null,
        "EndtCount": 0,
        "EffectiveDate": "22/09/2023",
        "PolicyEndDate": "21/09/2024",
        "Status": "Y",
        "DiffPremiumIncludedTax": 0,
        "DiffPremiumIncludedTaxLC": null,
        "CoverageLimit": 300000000,
        "MinSumInsured": null
    },
    {
        "CoverId": "89",
        "CalcType": "P",
        "CoverName": "Extension of Geographical Limits beyond East Africa",
        "CoverDesc": "Extension of Geographical Limits beyond East Africa",
        "MinimumPremium": 0,
        "CoverToolTip": null,
        "IsSubCover": "N",
        "SumInsured": 250000,
        "SumInsuredLc": 250000,
        "Rate": 5,
        "SubCoverId": null,
        "SubCoverDesc": null,
        "SubCoverName": null,
        "SectionId": "10",
        "Discounts": null,
        "Taxes": [
            {
                "isTaxExempted": "N",
                "TaxId": "1",
                "TaxRate": 18,
                "TaxAmount": 2250,
                "TaxDesc": "VAT-MAINLAND",
                "TaxExemptType": null,
                "TaxExemptCode": "",
                "TaxCalcType": "P",
                "RegulatoryCode": null,
                "EndtTypeId": null,
                "EndtTypeCount": null,
                "DependentYN": "N",
                "TaxExemptedAllowed": null,
                "MinimumTaxAmount": 0,
                "MinimumTaxAmountLC": 0,
                "TaxAmountLc": 2250,
                "TaxFor": null
            }
        ],
        "SubCovers": null,
        "FactorTypeId": "1024.0",
        "DependentCoverYN": "Y",
        "DependentCoverId": "5",
        "Exception": null,
        "Loadings": null,
        "CoverageType": "O",
        "isSelected": "N",
        "Notsutable": false,
        "PremiumBeforeDiscountLC": 12500,
        "PremiumAfterDiscountLC": 12500,
        "PremiumExcluedTaxLC": 12500,
        "PremiumIncludedTaxLC": 14750,
        "PremiumBeforeDiscount": 12500,
        "PremiumAfterDiscount": 12500,
        "PremiumExcluedTax": 12500,
        "PremiumIncludedTax": 14750,
        "ExchangeRate": 1,
        "Currency": "TZS",
        "isReferal": "N",
        "ReferalDescription": "",
        "ProRata": 100,
        "RegulatorSumInsured": 250000,
        "RegulatorRate": 5,
        "UserOpt": "N",
        "CoverBasedOn": "sumInsured",
        "RegulatoryCode": "99999",
        "InsuranceId": "100002",
        "BranchCode": null,
        "AgencyCode": null,
        "ProductId": "5",
        "MSRefNo": "50994",
        "VehicleId": "1",
        "CdRefNo": "50992",
        "VdRefNo": "50993",
        "CreatedBy": "prakashuser",
        "RequestReferenceNo": "MOT-07444",
        "MultiSelectYn": "N",
        "SectionName": "MOTOR Private Vehicles",
        "ExcessPercent": 10,
        "ExcessAmount": 1000,
        "ExcessDesc": "None",
        "MinimumPremiumYn": "N",
        "ProRataApplicable": "Y",
        "Endorsements": null,
        "EndtCount": 0,
        "EffectiveDate": "22/09/2023",
        "PolicyEndDate": "21/09/2024",
        "Status": "Y",
        "DiffPremiumIncludedTax": 0,
        "DiffPremiumIncludedTaxLC": null,
        "CoverageLimit": 10000000000000,
        "MinSumInsured": null
    },
    {
        "CoverId": "14",
        "CalcType": "P",
        "CoverName": "Excess Buy Back",
        "CoverDesc": "Excess Buy Back ",
        "MinimumPremium": 1000,
        "CoverToolTip": null,
        "IsSubCover": "N",
        "SumInsured": 250000,
        "SumInsuredLc": 250000,
        "Rate": 4,
        "SubCoverId": null,
        "SubCoverDesc": null,
        "SubCoverName": null,
        "SectionId": "10",
        "Discounts": null,
        "Taxes": [
            {
                "isTaxExempted": "N",
                "TaxId": "1",
                "TaxRate": 18,
                "TaxAmount": 1800,
                "TaxDesc": "VAT-MAINLAND",
                "TaxExemptType": null,
                "TaxExemptCode": "",
                "TaxCalcType": "P",
                "RegulatoryCode": null,
                "EndtTypeId": null,
                "EndtTypeCount": null,
                "DependentYN": "N",
                "TaxExemptedAllowed": null,
                "MinimumTaxAmount": 0,
                "MinimumTaxAmountLC": 0,
                "TaxAmountLc": 1800,
                "TaxFor": null
            }
        ],
        "SubCovers": null,
        "FactorTypeId": "1004.0",
        "DependentCoverYN": "Y",
        "DependentCoverId": "5",
        "Exception": null,
        "Loadings": null,
        "CoverageType": "O",
        "isSelected": "N",
        "Notsutable": false,
        "PremiumBeforeDiscountLC": 10000,
        "PremiumAfterDiscountLC": 10000,
        "PremiumExcluedTaxLC": 10000,
        "PremiumIncludedTaxLC": 11800,
        "PremiumBeforeDiscount": 10000,
        "PremiumAfterDiscount": 10000,
        "PremiumExcluedTax": 10000,
        "PremiumIncludedTax": 11800,
        "ExchangeRate": 1,
        "Currency": "TZS",
        "isReferal": "N",
        "ReferalDescription": "",
        "ProRata": 100,
        "RegulatorSumInsured": 250000,
        "RegulatorRate": 4,
        "UserOpt": "N",
        "CoverBasedOn": "sumInsured",
        "RegulatoryCode": "568756",
        "InsuranceId": "100002",
        "BranchCode": null,
        "AgencyCode": null,
        "ProductId": "5",
        "MSRefNo": "50994",
        "VehicleId": "1",
        "CdRefNo": "50992",
        "VdRefNo": "50993",
        "CreatedBy": "prakashuser",
        "RequestReferenceNo": "MOT-07444",
        "MultiSelectYn": "N",
        "SectionName": "MOTOR Private Vehicles",
        "ExcessPercent": 10,
        "ExcessAmount": 1000,
        "ExcessDesc": "None",
        "MinimumPremiumYn": "N",
        "ProRataApplicable": "Y",
        "Endorsements": null,
        "EndtCount": 0,
        "EffectiveDate": "22/09/2023",
        "PolicyEndDate": "21/09/2024",
        "Status": "Y",
        "DiffPremiumIncludedTax": 0,
        "DiffPremiumIncludedTaxLC": null,
        "CoverageLimit": 300000000,
        "MinSumInsured": null
    }
  ]
}
onSelectCover(rowData,event,vehicleId,vehicleData,type,directType){

}
public form = new FormGroup({})
  onSubmit(productItem){

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
    this.premiumSection = !this.premiumSection
  }
  checkCoverSelection(vehicleData,coverData){
    
    return false;
  }
}
