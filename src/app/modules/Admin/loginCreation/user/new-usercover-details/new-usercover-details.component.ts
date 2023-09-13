import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import { Cover } from './Cover';

@Component({
  selector: 'app-new-usercover-details',
  templateUrl: './new-usercover-details.component.html',
  styleUrls: ['./new-usercover-details.component.scss']
})
export class NewUsercoverDetailsComponent implements OnInit {
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
  excessValue: any;coverageLimit: any;coverageTypeValue: string;baseRate: any;
  minPremium: any;maxSumInsured: any;
  subCoverData: any;public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
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
  subDiscreteThirdName: any;subDiscreteFourthName: any;selectSubCoverSection:boolean = false;minDate:Date;
  BrokerCode:any;
  userLoginId: any;
  userId: any;
  minSumInsured: any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      this.minDate = new Date();
      let userObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    if(userObj){
      if(userObj.loginId) this.userLoginId = userObj.loginId;
      if(userObj.BrokerId) this.BrokerCode = userObj.BrokerId;
      console.log('Product loginid',this.userLoginId)
      if(userObj.InsuranceId) this.insuranceId = userObj.InsuranceId;
      console.log('Product insuranceId',this.insuranceId)
      if(userObj.userId) this.userId = userObj.userId;
    }
    this.userId = sessionStorage.getItem('editBroker');
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
      {"value": "G","text": "Grid"},
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
   }

  ngOnInit(): void {
    let coverId = sessionStorage.getItem('editBrokerCoverId');
    if(coverId){
      this.getEditCoverDetails(coverId);
    }
    else{
      this.coverDetails = new Cover();
      if(this.coverDetails?.Status == null) this.coverDetails.Status = 'Y';
      if(this.coverDetails?.SubCoverYn == null) this.coverDetails.SubCoverYn = 'N';
      if(this.coverDetails?.IsTaxExcempted == null) this.coverDetails.IsTaxExcempted = 'N';
    }
    this.getTaxTypeList();
  }
  dismiss() {
    //this.ref.close();
  }
  getEditCoverDetails(coverId){
    let ReqObj = {
        "InsuranceId":this.insuranceId,
        "CoverId": coverId,
        "ProductId":this.productId,
        "SectionId":this.sectionId
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
              if(this.coverDetails.CoverageType!='' && this.coverDetails.CoverageType!=null){
                this.coverageTypeValue = this.coverDetails.CoverageType.toLocaleLowerCase();
              }
              this.excessValue = this.coverDetails.Excess;
              this.coverageLimit = this.coverDetails.CoverageLimit;
              this.uploadOption = 'N';
              this.calcType = this.coverDetails.CalcType;
              this.baseRate = this.coverDetails.BaseRate;
              this.minPremium = this.coverDetails.MinimumPremium;
              this.minSumInsured = this.coverDetails.SumInsuredStart;
              this.maxSumInsured = this.coverDetails.SumInsuredEnd;
              this.onSubCoverChange();
              this.factorValue = this.coverDetails.FactorTypeId;
              if(this.factorValue!=null && this.factorValue!=undefined && this.factorValue!=''){
                this.onCoverFactorTypeChange();
              }
            //}
          }

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
      "InsuranceId": this.insuranceId
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
  onSaveSubCoverDetails(){
      this.subCoverData.CreatedBy = this.loginId
    let ReqObj = {
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
      "CreatedBy": this.subCoverData.CreatedBy,
      "EffectiveDateStart": this.subCoverData.EffectiveDateStart,
      "EffectiveDateEnd": this.subCoverData.EffectiveDateEnd,
      "Excess": this.subCoverData.Excess,
      "FactorTypeId": this.subCoverData.FactorTypeId,
      "BaseRate": this.subCoverData.BaseRate,
      "MinimumPremium":this.subCoverData.MinimumPremium,
      "SumInsuredStart": this.subCoverData.SumInsuredStart,
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
          //   'SubCover Details Inserted/Updated Successfully',
          //   'SubCover Details',
          //   config);
            this.onGetSubCoverList('indirect');
           //this.ref.close();
    }
    else if(data.ErrorMessage){
        if(res.ErrorMessage){
          for(let entry of res.ErrorMessage){
            // let type: NbComponentStatus = 'danger';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   entry.Field,
            //   entry.Message,
            //   config);
          }
          console.log("Error Iterate",data.ErrorMessage)
          //this.loginService.errorService(data.ErrorMessage);
        }
    }
  },
  (err) => { },
);
  }
  getFactorTypeDetails(subCoverId){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.sectionId,
      "CoverId": this.coverDetails.CoverId,
      "SubCoverId":subCoverId,
      "FactorTypeId": this.factorValue
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
    let urlLink = `${this.ApiUrl1}dropdown/taxexcemptiontype`;
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
      "CoverId":this.coverDetails.CoverId
      }
    let urlLink = `${this.ApiUrl1}master/dropdown/discountsectioncover`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.coverList = data?.Result;
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
                  this.getFactorTypeDetails(null);
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
                  this.getFactorTypeDetails(this.subCoverData.SubCoverId);
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
    let ReqObj = {
            "CoverId": this.coverDetails.CoverId,
            "CalcType": this.calcType,
            "CoreAppCode": this.coverDetails.CoreAppCode,
            "CoverDesc": this.coverDetails.CoverDesc,
            "CoverName": this.coverDetails.CoverName,
            "CoverageLimit": this.coverageLimit,
            "CoverageType": this.coverageTypeValue,
            "CreatedBy": this.coverDetails.CreatedBy,
            "EffectiveDateStart": this.coverDetails.EffectiveDateStart,
            "EffectiveDateEnd": this.coverDetails.EffectiveDateEnd,
            "Excess": this.excessValue,
            "FactorTypeId": this.factorValue,
            "BaseRate": this.baseRate,
            "MinimumPremium": this.minPremium,
            "SumInsuredStart": this.minSumInsured,
            "SumInsuredEnd": this.maxSumInsured,
            "Remarks": this.coverDetails.Remarks,
            "Status": this.coverDetails.Status,
            "SubCoverYn": this.coverDetails.SubCoverYn,
            "RegulatoryCode": this.coverDetails.RegulatoryCode,
            "DiscountCoverId":this.coverDetails.DiscountCoverId,
            "ToolTip": this.coverDetails.ToolTip,
            "GridDetails": [],
            "IsTaxExcempted": this.coverDetails.IsTaxExcempted,
            "TaxAmount": this.coverDetails.TaxAmount,
            "TaxCode": this.coverDetails.TaxCode,
            "TaxExcemptionReference": this.coverDetails.TaxExcemptionReference,
            "TaxExcemptionType": this.coverDetails.TaxExcemptionType,
            "InsuranceId": this.coverDetails.InsuranceId,
            "ProductId":this.coverDetails.ProductId,
            "SectionId":this.coverDetails.SectionId,
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
            if(value =='direct'){

                  if(this.calcType=='F'){
                      this.onSaveCoverFactorDetails();
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
                    this.router.navigate(['/Admin/userList/userCoverList']);
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
                for(let entry of res.ErrorMessage){
                  // let type: NbComponentStatus = 'danger';
                  // const config = {
                  //   status: type,
                  //   destroyByClick: true,
                  //   duration: 4000,
                  //   hasIcon: true,
                  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //   preventDuplicates: false,
                  // };
                  // this.toastrService.show(
                  //   entry.Field,
                  //   entry.Message,
                  //   config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );

  }
  onSaveCoverFactorDetails(){
    let ReqObj ={
      "AgencyCode": "",
      "BranchCode": "",
      "SubCoverYn": this.coverDetails.SubCoverYn,
      "InsuranceId": this.coverDetails.InsuranceId,
      "SectionId": this.coverDetails.SectionId,
      "CoverId": this.coverDetails.CoverId,
      "CreatedBy": this.loginId,
      "EffectiveDateStart": this.coverDetails.EffectiveDateStart,
      "EffectiveDateEnd": this.coverDetails.EffectiveDateEnd,
      "FactorTypeId": this.factorValue,
      "ProductId": this.coverDetails.ProductId,
      "Remakrs": this.coverDetails.Remarks,
      "Status":this.coverDetails.Status,
      "SubCoverId": null,
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
          this.router.navigate(['/Admin/userList/userCoverList']);
        }
        else if(data.ErrorMessage){
          if(data.ErrorMessage){
            for(let entry of data.ErrorMessage){
              // let type: NbComponentStatus = 'danger';
              // const config = {
              //   status: type,
              //   destroyByClick: true,
              //   duration: 4000,
              //   hasIcon: true,
              //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //   preventDuplicates: false,
              // };
              // this.toastrService.show(
              //   entry.Field,
              //   entry.Message,
              //   config);
            }
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

  getBackPage(){
    this.router.navigate(['/Admin/userList/userCoverList']);
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
      this.router.navigate(['/Admin/userList/userCoverList']);
    }
  }

  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
    if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
    if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
  }
}
