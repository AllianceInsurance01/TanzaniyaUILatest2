import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { Cover } from './Cover';

@Component({
  selector: 'app-new-brokercover-details',
  templateUrl: './new-brokercover-details.component.html',
  styleUrls: ['./new-brokercover-details.component.scss']
})
export class NewBrokercoverDetailsComponent implements OnInit {

  btnNextPrev = {
    prev: true,
    next: false,
    index: 0
  }
  statusValue:any= "Y";cityList:any[]=[];typeList:any[]=[];typeValue:any="";
  taxValue:any = "N";calcTypeList:any[]=[];calcType:any="";title:any="";
  activeMenu:any="Cover";subCoverYN:any="N";subCoverList:any[]=[];addSubCoverSection:boolean=false;
  selectedCalcList:any[]=[];calculationTypes2:any[]=[];ratingSection:boolean = false;
  subCoverDetails: boolean;subCoversHeader:any[]=[];subCoversData:any[]=[];factorList:any[]=[];
  factorValue:any;factorTypeList:any[]=[];coverList:any[]=[];subCoversHeader2:any[]=[];
  coverDetails: any; loginId: any;selecSubCoverData:any[]=[];
  coverUploadSection: boolean= false;
  excessValue: any;
  coverageLimit: any;
  coverageTypeValue: string;
  viewFileName:any;
  baseRate: any;
  minPremium: any;
  maxSumInsured: any;
  subCoverData: any;public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  basedOnColumnList:any[]=[];
  taxTypeList: any[]=[];insuranceName:any;productId:any;
  uploadOption: string;insuranceId:any;sectionId:any;
  coverRangeFirst: boolean=false;coverRangeSecond: boolean=false;
  coverRangeThird: boolean=false;coverRangeFourth: boolean=false;
  coverDiscreteFirst: boolean=false;coverDiscreteSecond: boolean=false;
  coverDiscreteThird: boolean=false;coverDiscreteFourth: boolean=false;
  subCoverRangeFirst: boolean=false;subCoverRangeSecond: boolean=false;
  subCoverRangeThird: boolean=false;subCoverRangeFourth: boolean=false;
  subCoverDiscreteFirst: boolean=false;subCoverDiscreteSecond: boolean=false;
  subCoverDiscreteThird: boolean=false;subCoverDiscreteFourth: boolean=false;
  rangeFirstName: any;rangeSecondName: any;
  rangeThirdName: any;rangeFourthName: any;
  rangeFifthName: any;rangeSixthName: any;
  rangeSeventhName: any;rangeEigthName: any;
  discreteFirstName: any;discreteSecondName: any;
  discreteThirdName: any;discreteFourthName: any;
  subRangeFirstName: any;subRangeSecondName: any;
  subRangeThirdName: any;subRangeFourthName: any;
  subRangeFifthName: any;subRangeSixthName: any;
  subRangeSeventhName: any;subRangeEigthName: any;
  subDiscreteFirstName: any;subDiscreteSecondName: any;
  subDiscreteThirdName: any;subDiscreteFourthName: any;selectSubCoverSection:boolean = false;
  brokerLoginId: any;minDate:Date;
  brokerId: string;
  BranchCode: string;
  agencyCode: any;
  basedOnColumnValue: any;
  imageUrl:any;
  uploadDocList:any[]=[];
  veiwSelectedDocUrl:any;
  excessamount: any;
  excessDesc: any;
  uploadTranId: any=null;
  uploadStatus: any=null;
  uploadRecordsList: any[]=[];
  CoverList: any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      this.minDate = new Date();
      let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.brokerId = brokerObj.brokerId;
    }
    this.brokerId = sessionStorage.getItem('editBroker');
      //this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('brokerProductId');
      this.sectionId = sessionStorage.getItem('brokerSectionId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.coverDetails = new Cover();
    this.typeList = [
      {"value": "","text": "- - -Select- - -"},
      {"value": "b","text": "Base"},
      {"value": "o","text": "Optional"},
      {"value": "d","text": "Discount"},
    ];
    this.calcTypeList = [
      {"value": "","text": "- - -Select- - -"},
      {"value": "A","text": "Amount"},
      {"value": "M","text": "Mile"},
      {"value": "P","text": "Percentage"},
      {"value": "F","text": "Factor"},
    ]
    this.calculationTypes2 = [
      {"value": "","text": "Select"},
      {"value": "A","text": "Amount"},
      {"value": "M","text": "Mile"},
      {"value": "P","text": "Percentage"}
    ];
    // this.subCoversHeader = [
    //   { key: 'SubCoverName', display: 'SubCover Name' },
    //   { key: 'SubCoverDesc', display: 'SubCover Desc' },
    //   { key: 'EffectiveDate', display: 'Effective Date' },
    //   { key: 'Status', display: 'Status' },
    //   {
    //     key: 'actions',
    //     display: 'Action',
    //     config: {
    //       isEdit: true,
    //     },
    //   }
    // ];
    // this.subCoversData = [
    //   {
    //     "SubCoverId":"1",
    //     "InsuranceId":"100002",
    //     "SubCoverName":"Alt SubCover2",
    //     "SubCoverDesc":"Alt SubCover2 Desc",
    //     "CoreAppCode":"1",
    //     "Remarks":"Ok",
    //     "Status":"Y",
    //     "AmendId":"01",
    //     "EffectiveDate":"16/9/2022"
    //   },
    //   {
    //     "SubCoverId":"2",
    //     "InsuranceId":"100003",
    //     "SubCoverName":"Content SubCover2",
    //     "SubCoverDesc":"Content SubCover2 Desc",
    //     "CoreAppCode":"2",
    //     "Remarks":"Ok",
    //     "Status":"Y",
    //     "AmendId":"01",
    //     "EffectiveDate":"16/9/2022"
    //   }
    // ];
    this.getFactorTypeList()
   }

  ngOnInit(): void {
    let CoverId = sessionStorage.getItem('companyCoverId');
    let cover=  sessionStorage.getItem('SubCoverEdit');


    let coverObj = JSON.parse(sessionStorage.getItem('editBrokerCoverId'));
    let coverId=coverObj?.CoverId;

    let Branch =  sessionStorage.getItem('BranchCode')
      let agency =   sessionStorage.getItem('AgencyCode')
      this.BranchCode= Branch;
      this.agencyCode= agency;

    //this.BranchCode= sessionStorage.getItem('BranchCode');

    this.BranchCode
    if(coverId){
      sessionStorage.setItem('companyCoverId',coverId)
      this.BranchCode=coverObj.BranchCode;
      this.agencyCode=coverObj.AgencyCode;

      this.getEditCoverDetails(coverId);
        this.ratingSection = false;
      sessionStorage.removeItem('ratingSection');

    }

    if(CoverId){

      this.getEditCoverDetails(CoverId);

    }

    if(cover){

      this.getEditCoverDetails(cover);
    }



    else{
      this.coverDetails = new Cover();
      if(this.coverDetails?.Status == null) this.coverDetails.Status = 'Y';
      if(this.coverDetails?.SubCoverYn == null) this.coverDetails.SubCoverYn = 'N';
      if(this.coverDetails?.IsTaxExcempted == null) this.coverDetails.IsTaxExcempted = 'N';
    }
    this.getTaxTypeList();
    this.getcoverList();
  }
  dismiss() {
    //this.ref.close();
  }
  getcoverList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": "99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/coveragetypes`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          //this.holderTypeValue = null;
           this.CoverList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getEditCoverDetails(coverId){
    let ReqObj = {
        "InsuranceId":this.insuranceId,
        "CoverId": coverId,
        "ProductId":this.productId,
        "SectionId":this.sectionId,
        "BranchCode":this.BranchCode,
        "AgencyCode": this.agencyCode
      }
    let urlLink = `${this.ApiUrl1}master/getbysectioncoverid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.coverDetails = data.Result;
          if(this.coverDetails){
            if(this.coverDetails?.Status==null)  this.coverDetails.Status = 'N';
            if(this.coverDetails?.EffectiveDateStart!=null){
              this.coverDetails.EffectiveDateStart = this.onDateFormatInEdit(this.coverDetails?.EffectiveDateStart)
            }
            if(this.coverDetails?.EffectiveDateEnd!=null){
              this.coverDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.coverDetails?.EffectiveDateEnd);
              console.log("End Date",this.coverDetails.EffectiveDateEnd)
            }
            //if(this.coverDetails.SubCoverYn=='N'){
              this.subCoverDetails = false;
              if(this.coverDetails?.IsSelectedYn==null) this.coverDetails.IsSelectedYn = 'N';
              if(this.coverDetails.CoverageType!='' && this.coverDetails.CoverageType!=null){
                this.coverageTypeValue = this.coverDetails.CoverageType.toLocaleLowerCase();
              }
              this.basedOnColumnValue = this.coverDetails.CoverBasedOn;
              //this.excessValue = this.coverDetails.Excess;
              this.excessValue = this.coverDetails.ExcessPercent;
              this.excessamount= this.coverDetails.ExcessAmount;
              this.excessDesc=this.coverDetails.ExcessDesc;
              this.coverageLimit = this.coverDetails.CoverageLimit;
              this.uploadOption = 'N';
              this.calcType = this.coverDetails.CalcType;
              this.baseRate = this.coverDetails.BaseRate;
              this.minPremium = this.coverDetails.MinimumPremium;
              this.maxSumInsured = this.coverDetails.SumInsuredEnd;
              this.onSubCoverChange();
              this.factorValue = this.coverDetails.FactorTypeId;
              if(this.factorValue!=null && this.factorValue!=undefined && this.factorValue!=''){
                this.onCoverFactorTypeChange();
              }
              let SubCover=sessionStorage.getItem('SubCoverEdit');
              if(SubCover)
              {
                this.addSubCoverSection=false;
                this.ratingSection = false;
                this.onGetSubCoverList('direct');
              }
            //}
          }

        }

      },
      (err) => { },
    );
  }

  onExcelDownload(){
    let ReqObj = {
      "AgencyCode": "",
      "BranchCode": "",
      "CompanyId": this.insuranceId,
      "CoverId": this.coverDetails?.CoverId,
      "ProductId": this.coverDetails?.ProductId,
      "SectionId": this.coverDetails?.SectionId,
      "SubCoverId": null
    }
    let urlLink = `${this.ApiUrl1}file/download`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.File);
        link.setAttribute('download', 'FactorRateDetails');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }

  getBasedonList(){
    let ReqObj = {
      "ProductId": this.productId
        }
      let urlLink = `${this.ApiUrl1}dropdown/getproducttabledetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
             this.basedOnColumnList = data?.Result;
          }

        },
        (err) => { },
      );
  }
  onEditSubCover(rowData){
    let ReqObj =  {
      "SubCoverId": rowData.SubCoverId,
      "CoverId": this.coverDetails.CoverId,
      "SectionId": this.sectionId,
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode":this.BranchCode,
      "AgencyCode": this.agencyCode
    }
    let urlLink = `${this.ApiUrl1}master/getbycoversubcover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.subCoverData = data.Result;
          if(this.subCoverData){
            if(this.subCoverData?.Status==null)  this.subCoverData.Status = 'N';
            if(this.subCoverData?.EffectiveDateStart!=null){
              this.subCoverData.EffectiveDateStart = this.onDateFormatInEdit(this.subCoverData?.EffectiveDateStart)
            }
            if(this.subCoverData?.EffectiveDateEnd!=null){
              this.subCoverData.EffectiveDateEnd = this.onDateFormatInEdit(this.subCoverData?.EffectiveDateEnd);
              console.log("End Date",this.subCoverData.EffectiveDateEnd)
            }
            if(this.subCoverData.FactorTypeId!=null && this.subCoverData.FactorTypeId!=undefined && this.subCoverData.FactorTypeId!=''){
              this.onSubCoverFactorTypeChange();
            }
            this.addSubCoverSection = true;
          }
        }

        },
        (err) => { },
      );
  }
  getNonSelectedSubCovers(){
    let ReqObj = {
    "InsuranceId":this.insuranceId,
    "ProductId": this.productId,
    "SectionId": this.sectionId,
    "CoverId": this.coverDetails.CoverId,
    "Limit":"0",
    "Offset":"100000"
    }
    let urlLink = `${this.ApiUrl1}master/getallnonselectedcoversubcover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.subCoversHeader2 = [
            {
              key: 'CoverId',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'SubCoverName', display: 'SubCover Name' },
            { key: 'SubCoverDesc', display: 'SubCover Desc' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'Status', display: 'Status' },
          ];
          this.selecSubCoverData = data.Result.map(x=>({
            ...x,
            isChecked:false
          }));
          this.selectSubCoverSection = true;
        }


      },
      (err) => { },
    );
  }
  onSaveSubCoverDetails(value:any){
      this.subCoverData.CreatedBy = this.loginId
    let ReqObj = {
      "CoverBasedOn":this.subCoverData.CoverBasedOn,
      "CoverId": this.coverDetails.CoverId,
      "CalcType":this.subCoverData.CalcType,
      "SubCoverId":this.subCoverData.SubCoverId,
      "SectionId":this.sectionId,
      "ProductId":this.productId,
      "InsuranceId":this.insuranceId,
      "CoreAppCode": this.subCoverData.CoreAppCode,
      "SubCoverDesc": this.subCoverData.SubCoverDesc,
      "SubCoverName": this.subCoverData.SubCoverName,
      "CoverageLimit": this.subCoverData.CoverageLimit,
      "CoverageType": this.subCoverData.CoverageType,
      "CreatedBy":   this.loginId,
      "EffectiveDateStart": this.subCoverData.EffectiveDateStart,
      "EffectiveDateEnd": this.subCoverData.EffectiveDateEnd,
      "ExcessPercent": this.subCoverData.ExcessPercent,
      "ExcessAmount": this.subCoverData.ExcessAmount,
      "ExcessDesc": this.subCoverData.ExcessDesc,
      //"Excess": this.subCoverData.Excess,
      "FactorTypeId": this.subCoverData.FactorTypeId,
      "BaseRate": this.subCoverData.BaseRate,
      "MinimumPremium":this.subCoverData.MinimumPremium,
      "SumInsuredStart": this.subCoverData.MinimumPremium,
      "SumInsuredEnd": this.subCoverData.SumInsuredEnd,
      "Remarks":this.subCoverData.Remarks,
      "Status": this.subCoverData.Status,
      "RegulatoryCode": this.subCoverData.RegulatoryCode,
      "ToolTip": this.subCoverData.ToolTip,
      "IsTaxExcempted":this.subCoverData.IsTaxExcempted,
      "TaxAmount":this.subCoverData.TaxAmount,
      "TaxCode":this.subCoverData.TaxCode,
      "TaxExcemptionReference":this.subCoverData.TaxExcemptionReference,
      "TaxExcemptionType":this.subCoverData.TaxExcemptionType,
      "BranchCode":this.BranchCode,
      "AgencyCode": this.agencyCode,
      "GridDetails": []
    }
let urlLink = `${this.ApiUrl1}master/updatecoversubcover`;
if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
}
else{
ReqObj['EffectiveDateStart'] = "";
}
if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
}
else{
ReqObj['EffectiveDateEnd'] = "";
}
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
(data: any) => {
    console.log(data);
    let res:any=data;
  if(data.Result){
      if(value =='direct' || value == 'saveCover'){

     if(this.subCoverData.CalcType=='F'){
        this.onSaveCoverFactorDetails(this.subCoverData.SubCoverId,this.subCoverData.Remarks,this.subCoverData.FactorTypeId,this.subCoverData.EffectiveDateStart);
      }
     else{
     //let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'SubCover Details Inserted/Updated Successfully',
          //   'SubCover Details',
          //   config);
            this.onGetSubCoverList('indirect');
           //this.ref.close();
    }
  }
}
    else if(data.ErrorMessage){
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
          console.log("Error Iterate",data.ErrorMessage)
          //this.loginService.errorService(data.ErrorMessage);
        }
    }
  },
  (err) => { },
);
  }
  getFactorTypeDetails(subCoverId,FactorValue){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.sectionId,
      "CoverId": this.coverDetails.CoverId,
      "SubCoverId":subCoverId,
      "FactorTypeId":FactorValue,
      "BranchCode":this.BranchCode,
      "AgencyCode":this.agencyCode

    }
    let urlLink = `${this.ApiUrl1}master/getbyfactorrateid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            if(data.Result.FactorParams==null){
              this.factorTypeList = [];
              this.onAddFactorList();
            }
            else{
              this.factorTypeList = data.Result.FactorParams;
            }
        }


      },
      (err) => { },
    );
  }
  onCoverStartDateChange(){
    console.log("Start Date",this.coverDetails.EffectiveDateStart)
    var d = this.coverDetails.EffectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.coverDetails.EffectiveDateEnd = new Date(year + 28, month, day);
  }
  onSubCoverStartDateChange(){
    console.log("Start Date",this.subCoverData.EffectiveDateStart)
    var d = this.subCoverData.EffectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.subCoverData.EffectiveDateEnd = new Date(year + 28, month, day);
  }
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  onChangeCalcType(){
    if(this.calcType!= '' && this.calcType != undefined){
      if(this.calcType == 'G'){
        this.baseRate = null;
        this.minPremium = null;
        this.maxSumInsured = null;
        this.selectedCalcList = [
          {
            "CalculationType":"",
            "MinSuminsured" : "",
            "MaxSuminsured":"",
            "MinimumPremium":"",
            "BaseRate":""
          }
        ]
      }
      else if(this.calcType == 'F'){
        this.baseRate = null;
        this.minPremium = null;
        this.maxSumInsured = null;
        this.subCoverData.CalcType = [
              {
                "S.no":"",
                "param1":null,
                "param2":null,
                "param3":null,
                "calcType":"",
                "Rate":null,
                "MinimumPremium":null,
                "Status":"Y"
              }
        ]
      }
      else{

      }
    }
  }
  getTaxTypeList(){

    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.BranchCode
    }
    let urlLink = `${this.ApiUrl1}dropdown/taxexcemptiontype`;
    //let urlLink = `${this.CommonApiUrl}dropdown/taxexcemptiontype`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.taxTypeList = data?.Result;
           this.getFactorTypeList();

        }

      },
      (err) => { },
    );
  }
  getFactorTypeList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/factortype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.factorList = data?.Result;
           this.getExistingCoverist();
        }

      },
      (err) => { },
    );
  }
  getExistingCoverist(){
    let ReqObj = {
    "ProductId": this.productId,
      "SectionId": this.sectionId,
      "InsuranceId": this.insuranceId,
      "CoverId":this.coverDetails.CoverId,

      }
    let urlLink = `${this.ApiUrl1}master/dropdown/discountsectioncover`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.coverList = data?.Result;
           this.getBasedonList();

        }

      },
      (err) => { },
    );
  }
  onCoverFactorTypeChange(){
    if(this.factorValue != '' && this.factorValue!= undefined){
      this.rangeFirstName="";this.rangeSecondName="";
      this.rangeThirdName="";this.rangeFourthName="";
      this.rangeFifthName="";this.rangeSixthName="";
      this.rangeSeventhName="";this.rangeEigthName="";
      this.discreteFirstName="";this.discreteSecondName="";
      this.discreteThirdName="";this.discreteFourthName="";
      this.coverRangeFirst=false;this.coverRangeSecond=false;
      this.coverRangeThird=false;this.coverRangeFourth=false;
      this.coverDiscreteFirst=false;this.coverDiscreteSecond=false;
      this.coverDiscreteThird=false;this.coverDiscreteFourth=false;
      this.factorTypeList = [];
      let ReqObj = { "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "FactorTypeId": this.factorValue}
      let urlLink = `${this.ApiUrl1}master/getfactortypeforrating`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            let factorDetails = data.Result;
            let paramList:any[] = factorDetails.RatingFieldDetails;
            if(paramList.length!=0){
              let i=0;
              for(let param of paramList){
                if(param.RangeYn=='Y'){
                  if(param.ColumnsId=="1"){
                    this.rangeFirstName = param.FromDisplayName;
                    this.rangeSecondName = param.ToDisplayName;
                    this.coverRangeFirst = true;
                  }
                  else if(param.ColumnsId == '2'){
                    this.rangeThirdName = param.FromDisplayName;
                    this.rangeFourthName = param.ToDisplayName;
                    this.coverRangeSecond = true;
                  }
                  else if(param.ColumnsId == '3'){
                    this.rangeFifthName = param.FromDisplayName;
                    this.rangeSixthName = param.ToDisplayName;
                    this.coverRangeThird = true;
                  }
                  else if(param.ColumnsId == '4'){
                    this.rangeSeventhName = param.FromDisplayName;
                    this.rangeEigthName = param.ToDisplayName;
                    this.coverRangeFourth = true;
                  }
                }
                if(param.RangeYn=='N'){
                  if(param.ColumnsId=="5"){
                    this.discreteFirstName = param.DiscreteDisplayName;
                    this.coverDiscreteFirst = true;
                  }
                  else if(param.ColumnsId == '6'){
                    this.discreteSecondName = param.DiscreteDisplayName;
                    this.coverDiscreteSecond = true;
                  }
                  else if(param.ColumnsId == '7'){
                    this.discreteThirdName = param.DiscreteDisplayName;
                    this.coverDiscreteThird = true;
                  }
                  else if(param.ColumnsId == '8'){
                    this.discreteFourthName = param.DiscreteDisplayName;
                    this.coverDiscreteFourth = true;
                  }
                }
                i+=1;
                if(i==paramList.length){
                  this.getFactorTypeDetails(null,this.factorValue);
                }
              }
            }
          }

        },
        (err) => { },
      );
    }
  }
  onSubCoverFactorTypeChange(){
    if(this.subCoverData.FactorTypeId != '' && this.subCoverData.FactorTypeId!= undefined){
      this.factorTypeList = [];
      this.subCoverRangeFirst=false;this.subCoverRangeSecond=false;
      this.subCoverRangeThird=false;this.subCoverRangeFourth=false;
      this.subCoverDiscreteFirst=false;this.subCoverDiscreteSecond=false;
      this.subCoverDiscreteThird=false;this.subCoverDiscreteFourth=false;
      this.subRangeFirstName="";this.subRangeSecondName="";
      this.subRangeThirdName="";this.subRangeFourthName="";
      this.subRangeFifthName="";this.subRangeSixthName="";
      this.subRangeSeventhName="";this.subRangeEigthName="";
      this.subDiscreteFirstName="";this.subDiscreteSecondName="";
      this.subDiscreteThirdName="";this.subDiscreteFourthName="";
      let ReqObj = { "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "FactorTypeId": this.subCoverData.FactorTypeId}
      let urlLink = `${this.ApiUrl1}master/getfactortypeforrating`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            let factorDetails = data.Result;
            let paramList:any[] = factorDetails.RatingFieldDetails;
            if(paramList.length!=0){
              let i=0;
              for(let param of paramList){
                if(param.RangeYn=='Y'){
                  if(param.ColumnsId=="1"){
                    this.subRangeFirstName = param.FromDisplayName;
                    this.subRangeSecondName = param.ToDisplayName;
                    this.subCoverRangeFirst = true;
                  }
                  else if(param.ColumnsId == '2'){
                    this.subRangeThirdName = param.FromDisplayName;
                    this.subRangeFourthName = param.ToDisplayName;
                    this.subCoverRangeSecond = true;
                  }
                  else if(param.ColumnsId == '3'){
                    this.subRangeFifthName = param.FromDisplayName;
                    this.subRangeSixthName = param.ToDisplayName;
                    this.subCoverRangeThird = true;
                  }
                  else if(param.ColumnsId == '4'){
                    this.subRangeSeventhName = param.FromDisplayName;
                    this.subRangeEigthName = param.ToDisplayName;
                    this.subCoverRangeFourth = true;
                  }
                }
                if(param.RangeYn=='N'){
                  if(param.ColumnsId=="5"){
                    this.subDiscreteFirstName = param.DiscreteDisplayName;
                    this.subCoverDiscreteFirst = true;
                  }
                  else if(param.ColumnsId == '6'){
                    this.subDiscreteSecondName = param.DiscreteDisplayName;
                    this.subCoverDiscreteSecond = true;
                  }
                  else if(param.ColumnsId == '7'){
                    this.subDiscreteThirdName = param.DiscreteDisplayName;
                    this.coverDiscreteThird = true;
                  }
                  else if(param.ColumnsId == '8'){
                    this.subDiscreteFourthName = param.DiscreteDisplayName;
                    this.subCoverDiscreteFourth = true;
                  }
                }
                i+=1;
                if(i==paramList.length){
                  this.getFactorTypeDetails(this.subCoverData.SubCoverId,this.subCoverData.FactorTypeId);
                }
              }
            }
          }

        },
        (err) => { },
      );
    }
  }
  onCoverTypeChange(){
    this.coverDetails.DiscountCoverId = null;
  }
  onChangeSubCalcType(){
    if(this.subCoverData.CalcType!= '' && this.subCoverData.CalcType != undefined){
      if(this.subCoverData.CalcType == 'G'){
        this.subCoverData.BaseRate = null;
        this.subCoverData.MinimumPremium = null;
        this.subCoverData.SumInsuredEnd = null;
        this.selectedCalcList = [
          {
            "CalculationType":"",
            "MinSuminsured" : "",
            "MaxSuminsured":"",
            "MinimumPremium":"",
            "BaseRate":""
          }
        ]
      }
      else if(this.calcType == 'F'){
        this.subCoverData.BaseRate = null;
        this.subCoverData.MinimumPremium = null;
        this.subCoverData.SumInsuredEnd = null;
        this.subCoverData.FactorTypeId = null;
        console.log("Sub Factor ",this.subCoverData.FactorTypeId)
      }
      else{

      }
    }
  }
  onAddCalEntry(){
    let entry = {
          "CalculationType":"",
          "MinSuminsured" : "",
          "MaxSuminsured":"",
          "MinimumPremium":"",
          "BaseRate":""
    };
    this.selectedCalcList.push(entry);
  }
  nav(n) {
    switch (n) {
      case 'next': {
        this.btnNextPrev.index++
        if (this.btnNextPrev.index > 3) {
          this.btnNextPrev.prev = false
          this.btnNextPrev.next = true
        } else {
          this.btnNextPrev.prev = false
        }
      }; break;
      case 'prev': {
        this.btnNextPrev.index--
        if (this.btnNextPrev.index == 0) {
          this.btnNextPrev.prev = true
          this.btnNextPrev.next = false
        } else {
          this.btnNextPrev.next = false
        }
      }; break;

    }
  }
  onAddFactorList(){
      let entry = {
                "SNo":String(this.factorTypeList.length+1),
                "Param1":null,
                "Param2":null,
                "Param3":null,
                "Param4":null,
                "Param5":null,
                "Param6":null,
                "Param7":null,
                "Param8":null,
                "Param9":null,
                "Param10":null,
                "Param11":null,
                "Param12":null,
                "CalcType":"",
                "Rate":null,
                "MinimumPremium":null,
                "Status":"Y"
      }
      this.factorTypeList.push(entry);
  }
  onGetSubCoverList(type){
    if(this.coverDetails.CoverId!=null){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "ProductId": this.productId,
        "SectionId": this.sectionId,
        "CoverId": this.coverDetails.CoverId,
        "BranchCode":this.BranchCode,
        "AgencyCode":this.agencyCode,
        "Limit":"0",
        "Offset":""
        }
    let urlLink = `${this.ApiUrl1}master/getallcoversubcoverdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.subCoversHeader = [
            { key: 'SubCoverName', display: 'SubCover Name' },
            { key: 'SubCoverDesc', display: 'SubCover Desc' },
            { key: 'EffectiveDateStart', display: 'Start Date' },
            { key: 'EffectiveDateEnd', display: 'End Date' },
            { key: 'Status', display: 'Status' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            }
          ];
          this.subCoversData = data?.Result;
          if(type=='direct'){this.nav('next');}
          else{
            this.selectSubCoverSection = false;
            this.addSubCoverSection=!this.addSubCoverSection}
        }

      },
      (err) => { },
    );
    }
    else{
      this.onSaveCoverForm('subCover');
    }
  }
  onSaveCoverForm(value:any){
    if(this.coverDetails.CoverId==null){
      this.coverDetails.CreatedBy = this.loginId
    }
    if(this.coverageTypeValue=='D' || this.coverageTypeValue=='L'){
      this.coverDetails.DependentCoverYn = 'N';
      this.coverDetails.DependentCoverId = null;
    }
    else{
      this.coverDetails.DiscountCoverId = null;
    }
    if(this.coverageTypeValue=='B'){
      this.coverDetails.IsSelectedYn = 'D';
    }
    if(this.coverageTypeValue=='A'){this.excessDesc="None"}
    let ReqObj = {
            "CoverId": this.coverDetails.CoverId,
            "CalcType": this.calcType,
            "CoreAppCode": this.coverDetails.CoreAppCode,
            "CoverDesc": this.coverDetails.CoverDesc,
            "CoverBasedOn": this.basedOnColumnValue,
            "CoverName": this.coverDetails.CoverName,
            "CoverageLimit": this.coverageLimit,
            "CoverageType": this.coverageTypeValue,
            "CreatedBy": this.loginId,
            "EffectiveDateStart": this.coverDetails.EffectiveDateStart,
            "EffectiveDateEnd": this.coverDetails.EffectiveDateEnd,
            //"Excess": this.excessValue,
            "ExcessPercent": this.excessValue,
            "ExcessAmount":this.excessamount,
            "ExcessDesc":this.excessDesc,
            "FactorTypeId": this.factorValue,
            "BaseRate": this.baseRate,
            "MinimumPremium": this.minPremium,
            "SumInsuredStart": '1',
            "SumInsuredEnd": this.maxSumInsured,
            "Remarks": this.coverDetails.Remarks,
            "Status": this.coverDetails.Status,
            "SubCoverYn": this.coverDetails.SubCoverYn,
            "MultiSelectYn":this.coverDetails.MultiSelectYn,
            "ProRataYn":this.coverDetails.ProRataYn,
            "RegulatoryCode": this.coverDetails.RegulatoryCode,
            "DiscountCoverId":this.coverDetails.DiscountCoverId,
            "ToolTip": this.coverDetails.ToolTip,
            "IsSelectedYn": this.coverDetails?.IsSelectedYn,
            "GridDetails": [],
            "DependentCoverYn": this.coverDetails.DependentCoverYn,
            "DependentCoverId": this.coverDetails?.DependentCoverId,
            "IsTaxExcempted": this.coverDetails.IsTaxExcempted,
            "TaxAmount": this.coverDetails.TaxAmount,
            "TaxCode": this.coverDetails.TaxCode,
            "TaxExcemptionReference": this.coverDetails.TaxExcemptionReference,
            "TaxExcemptionType": this.coverDetails.TaxExcemptionType,
            "InsuranceId": this.coverDetails.InsuranceId,
            "ProductId":this.coverDetails.ProductId,
            "SectionId":this.coverDetails.SectionId,
            "BranchCode":this.BranchCode,
            "AgencyCode":this.agencyCode
    }
    let urlLink = `${this.ApiUrl1}master/updatesectioncover`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
      ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateEnd'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log(data);
          let res:any=data;
          if(data.Result){
            if(value =='direct' || value == 'saveCover'){

                  if(this.calcType=='F'){
                      this.onSaveCoverFactorDetails(null,this.coverDetails.Remarks,this.factorValue,this.coverDetails.EffectiveDateStart);
                  }
                  else{
                    // let type: NbComponentStatus = 'success';
                    // const config = {
                    //   status: type,
                    //   destroyByClick: true,
                    //   duration: 4000,
                    //   hasIcon: true,
                    //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    //   preventDuplicates: false,
                    // };
                    // this.toastrService.show(
                    //   'Cover Details Inserted/Updated Successfully',
                    //   'Cover Details',
                    //   config);
                    sessionStorage.removeItem('companyCoverId')
                    this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
                  }

            }
            else{
              let coverId = data.Result.SuccessId;
              sessionStorage.setItem('companyCoverId',coverId);
              this.coverDetails.coverId = coverId;
              this.onGetSubCoverList('direct');
            }
                 //this.ref.close();
          }
          else if(data.ErrorMessage){
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
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );

  }
  onSaveCoverFactorDetails(subcoverId,Remarks,FactorId,EffectiveDate){
    let ReqObj ={
      "AgencyCode": this.agencyCode,
      "BranchCode": this.BranchCode,
      "SubCoverYn": this.coverDetails.SubCoverYn,
      "InsuranceId": this.coverDetails.InsuranceId,
      "SectionId": this.coverDetails.SectionId,
      "CoverId": this.coverDetails.CoverId,
      "CreatedBy": this.loginId,
      "EffectiveDateStart": EffectiveDate,
      "EffectiveDateEnd": this.coverDetails.EffectiveDateEnd,
      "FactorTypeId": FactorId,
      "ProductId": this.coverDetails.ProductId,
      "Remakrs": Remarks,
      "Status":this.coverDetails.Status,
      "SubCoverId": subcoverId,
      "FactorParams": this.factorTypeList
    }
    let urlLink = `${this.ApiUrl1}master/insertfactorrates`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
      ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateEnd'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'Cover Details Inserted/Updated Successfully',
          //   'Cover Details',
          //   config);
          sessionStorage.removeItem('companyCoverId')
          this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
        }
        else if(data.ErrorMessage){
          if(data.ErrorMessage){
            // for(let entry of data.ErrorMessage){
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
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
          }
        }
      },
      (err) => { },
    );
  }
  onDeleteFactorRow(index){
    this.factorTypeList.splice(index,1);
  }
  onRemoveIndex(index){
    this.selectedCalcList.splice(index,1);
  }
  onSubCoverChange(){
    if(this.coverDetails.SubCoverYn=='Y'){
      this.subCoverList = [
        {
          "subCoverId":"",
          "subCoverName":"",
          "subCoverDesc":"",
          "regulatoryCode":"",
          "status":"Y"
        }
      ];
      this.excessValue = null;
      this.coverageLimit = null;
      this.coverageTypeValue = "";
      this.taxValue = 'N';
      this.calcType = "";
      this.baseRate = null;
      this.minPremium = null;
      this.maxSumInsured = null;
    }
  }
  onTaxYNChnage(){
    if(this.coverDetails.IsTaxExcempted == 'N'){
      this.coverDetails.TaxExcemptionType = null;
      this.coverDetails.TaxExcemptionReference = null;
    }
    else{
      this.coverDetails.TaxAmount = null;
      this.coverDetails.TaxCode = null;
    }
  }
  onUploadDocuments(target:any,fileType:any,type:any){
    console.log("Event ",target);
    let event:any = target.target.files;

    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;
        console.log("File Name",element,filename)
        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': element,'DocTypeId':'','filename':filename, 'JsonString': {} });

        }

    }
    console.log("Final File List",this.uploadDocList)
  }
  onDragDocument(target:any,fileType:any,type:any){
    let fileList = target;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;
        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': element,'DocTypeId':'','filename':filename, 'JsonString': {} });

        }
      }
  }
  onViewDocument(index:any) {
    console.log("Recieved View",this.uploadDocList[index]);
    this.viewFileName = this.uploadDocList[index].filename;
    this.veiwSelectedDocUrl = this.uploadDocList[index].url;
    //this.modalService.open(this.content, { size: 'md', backdrop: 'static' });
  }
  onDeleteDocument(index:any) {
          this.uploadDocList.splice(index,1);
  }
  clearDocList(){
    this.uploadDocList = [];
  }
  onFileUpload(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.coverDetails?.ProductId,
      "CoverId":this.coverDetails?.CoverId,
      "SubCoverId":null,
      "AgencyCode":"",
      "BranchCode":"",
      "CreatedBy":this.loginId,
      "SectionId":this.coverDetails?.SectionId
    }
    console.log("Reqw",ReqObj);
    let urlLink = `${this.ApiUrl1}batch/upload`;
    this.sharedService.onPostCoverDocumentMethodSync(urlLink, ReqObj,this.uploadDocList[0].url).subscribe(
      (data: any) => {
        if(data.ErrorMessage){
          if(data.ErrorMessage){
            // for(let entry of data.ErrorMessage){
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
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
          }
        }
        else{
          if(data.TranId){
            this.checkUploadStatus(data.TranId);
          }
          
        } 
      },
      (err) => { },
    );

  }
  onCheckReUpload(){
    this.uploadStatus = null;
    this.uploadDocList = [];
    this.uploadRecordsList = [];
  }
  checkUploadStatus(tranId){
    
    let urlLink = `${this.ApiUrl1}batch/getTranactionByTranId?tranId=${tranId}`;
        this.sharedService.onGetMethodSync(urlLink).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res.Status=='S'){
                  this.uploadTranId = tranId;
                  this.uploadStatus = null;
                  this.uploadDocList = [];
                  this.uploadRecordsList = [{"Status":res.Description,"ErrorRecords":res.ErrorRecord,"ValidRecords":res.ValidRecord,"TotalRecords":res.TotalRecord}]
                }
                else if(res.Status=='E'){
                  this.uploadStatus = 'Upload Failed..Please Try Again...'
                  setTimeout(() => 
                  {
                    this.uploadDocList = [];
                    this.uploadStatus = res?.Description;
                }, (4*1000));
                }
                else{
                  this.uploadStatus = res?.Description;
                  setTimeout(() => this.checkUploadStatus(tranId), (4*1000));
                }
              }
            },  
            (err) => { },
          );
  }
  onMoveRecords(){
    if(this.uploadTranId!=null){
      let urlLink = `${this.ApiUrl1}batch/doMainJob?tranId=${this.uploadTranId}`;
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              this.factorValue = this.coverDetails.FactorTypeId;
              if(this.factorValue!=null && this.factorValue!=undefined && this.factorValue!=''){
                this.uploadDocList = [];
                this.uploadStatus = null;
                this.uploadRecordsList = [];
                this.onCoverFactorTypeChange();
                this.coverUploadSection = false;
                
              }
            }
          },  
          (err) => { },
        );
    }
  }
  getBackPage(){
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
  }
  getSubCoverRating(){
    this.ratingSection = !this.ratingSection;
    this.subCoverDetails = true;
  }
  onProceed(){
    if(this.subCoverDetails){
      this.ratingSection = false;
      this.subCoverDetails = false;
    }
    else{
      this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
    }
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
  }
}
