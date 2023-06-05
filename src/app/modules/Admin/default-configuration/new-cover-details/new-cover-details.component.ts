import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Cover } from './Cover';
import { DatePipe } from '@angular/common';
import { SubCover } from './SubCover';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-new-cover-details',
  templateUrl: './new-cover-details.component.html',
  styleUrls: ['./new-cover-details.component.scss']
})
export class NewCoverDetailsComponent implements OnInit {

  statusValue:any= "Y";cityList:any[]=[];typeList:any[]=[];typeValue:any="";
  CoverList:any[]=[];
  taxValue:any = "N";calcTypeList:any[]=[];calcType:any="";title:any="";
  activeMenu:any="Cover";subCoverYN:any="N";subCoverList:any[]=[];
  selectedCalcList:any[]=[];calculationTypes2:any[]=[];ratingSection:boolean = false;
  SubCoverSection:boolean = false;
  subCoverDetails: boolean;coverList:any[]=[];subCoverData:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  coverDetails: any;subCoversHeader:any[]=[];
  coverageTypeValue: any;subCoversData:any[]=[];
  excessValue: any;basedOnColumnValue:any;
  coverageLimit: any;
  uploadOption: string;
  baseRate: any;
  minPremium: any;
  maxSumInsured: any;
  subCoverName: any;
  subCoverId: any;loginId:any;
  subCoverDesc: any;
  subCoverRegCode: any;
  btnNextPrev = {
    prev: true,
    next: false,
    index: 0
  };addSubCoverSection:boolean=false;
  taxTypeList: any[]=[];basedOnColumnList:any[]=[];
  minDate: Date;
  insuranceId: any;
  excessamount: any;
  excessDesc: any;
  subRatingSection: boolean;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      this.minDate = new Date();
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      //this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.coverDetails = new Cover();

    // this.typeList = [
    //   {"value": "","text": "- - -Select- - -"},
    //   {"value": "b","text": "Base"},
    //   {"value": "o","text": "Optional"},
    //   {"value": "d","text": "Discount"},
    //   {"value": "l","text": "Loading"},
    // ];
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
    this.subCoversHeader = [
      { key: 'SubCoverName', display: 'SubCover Name' },
      { key: 'SubCoverDesc', display: 'SubCover Desc' },
      { key: 'EffectiveDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.subCoversData = [
      {
        "SubCoverId":"1",
        "InsuranceId":"100002",
        "SubCoverName":"Alt SubCover2",
        "SubCoverDesc":"Alt SubCover2 Desc",
        "CoreAppCode":"1",
        "Remarks":"Ok",
        "Status":"Y",
        "AmendId":"01",
        "EffectiveDate":"16/9/2022"
      },
      {
        "SubCoverId":"2",
        "InsuranceId":"100003",
        "SubCoverName":"Content SubCover2",
        "SubCoverDesc":"Content SubCover2 Desc",
        "CoreAppCode":"2",
        "Remarks":"Ok",
        "Status":"Y",
        "AmendId":"01",
        "EffectiveDate":"16/9/2022"
      }
    ];
   }

  ngOnInit(): void {
    let coverId = sessionStorage.getItem('editGlobalCoverId');
    let subCover = sessionStorage.getItem('SubCoverEdit')
    let Id=sessionStorage.getItem('ratingSection');
    /*let SubCover = sessionStorage.getItem('SubCoverEdit');

    if(SubCover)
    {
      this.addSubCoverSection=false;
      this.nav('next')
      sessionStorage.removeItem('SubCoverEdit');
    }
  */if(coverId){
      this.getEditCoverDetails(coverId);
    }
    else if(Id)
    {
      this.getEditCoverDetails(Id);
     this.ratingSection=true;

    }
    else if(subCover){
      this.ratingSection=false;
      this.getEditCoverDetails(subCover);
    }
    else{
      this.coverDetails = new Cover();
      if(this.coverDetails?.Status == null) this.coverDetails.Status = 'Y';
      if(this.coverDetails?.SubCoverYn == null) this.coverDetails.SubCoverYn = 'N';
      if(this.coverDetails?.DependentCoverYn == null) this.coverDetails.DependentCoverYn = 'N';
      if(this.coverDetails?.MultiSelectYn == null) this.coverDetails.MultiSelectYn = 'N';
    }
    this.getTaxTypeList();
    this.getcoverList();
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
  getBasedonList(){
    let ReqObj = {
      "ProductId": "99999",
      "SectionId":""
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
  getTaxTypeList(){
    let ReqObj = {
      "InsuranceId": "",
      "BranchCode": "99999"
    }
    let urlLink = `${this.CommonApiUrl}dropdown/taxexcemptiontype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.taxTypeList = data?.Result;
           this.getCoverageType();
        }
      },
      (err) => { },
    );
  }
  getExistingCoverList(){
    let ReqObj = {
      "CoverId":this.coverDetails.CoverId
      }
    let urlLink = `${this.ApiUrl1}master/dropdown/discountcovers`;
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
  getCoverageType(){
    let ReqObj = {
      "InsuranceId":"",
      "BranchCode":""
    }
    let urlLink = `${this.ApiUrl1}dropdown/coveragetypes`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.typeList = data?.Result;
           this.getExistingCoverList();
        }

      },
      (err) => { },
    );
  }
  getEditCoverDetails(coverId){

    let ReqObj = { "CoverId":coverId }
    let urlLink = `${this.ApiUrl1}master/getbycoverid`;
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
                this.coverageTypeValue = this.coverDetails.CoverageType;
                // here taked the toLocaleLowerCase after CoverageType
              }

              this.excessValue = this.coverDetails.ExcessPercent;
              this.excessamount=this.coverDetails.ExcessAmount;
              this.excessDesc=this.coverDetails.ExcessDesc;

              this.basedOnColumnValue = this.coverDetails.CoverBasedOn;
              this.coverageLimit = this.coverDetails.CoverageLimit;
              this.uploadOption = 'N';
              this.calcType = this.coverDetails.CalcType;
              this.baseRate = this.coverDetails.BaseRate;
              this.minPremium = this.coverDetails.MinimumPremium;
              this.maxSumInsured = this.coverDetails.SumInsuredEnd;
              this.onSubCoverChange();
              let SubCover = sessionStorage.getItem('SubCoverEdit');
              if(SubCover)
              {
                this.addSubCoverSection=false;
                this.ratingSection = false;
                this.onGetSubCoverList('direct')
                //sessionStorage.removeItem('SubCoverEdit');
              }

            //}
          }

        }

      },
      (err) => { },
    );
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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }
  dismiss() {
    //this.ref.close();
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
  onRemoveIndex(index){
    this.selectedCalcList.splice(index,1);
  }
  onRedirect(value){
    this.activeMenu = value;
    if(value=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
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
  onAddSubCover(){
    this.addSubCoverSection = true;
    this.subCoverData = new SubCover();
    this.subRatingSection = false;
    this.subCoverData.CoverId = this.coverDetails.CoverId;
    if(this.subCoverData.Status == null) this.subCoverData.Status = 'Y';
  }
  onEditSubCover(rowData){
    let ReqObj = { "CoverId":rowData.CoverId,"SubCoverId": rowData.SubCoverId  }
    let urlLink = `${this.ApiUrl1}master/getbysubcover`;
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
            this.addSubCoverSection = true;
            this.subRatingSection = false;
          }
        }

        },
        (err) => { },
      );
  }
  getBackPage(){
    this.router.navigate(['/Admin/globalConfigure/existingCovers']);
  }
  getSubCoverRating(index:any){
    // let type: NbComponentStatus = 'danger';
    // const config = {
    //   status: type,
    //   destroyByClick: true,
    //   duration: 4000,
    //   hasIcon: true,
    //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //   preventDuplicates: false,
    // };
    let rowData = this.subCoverList[index];
    if(rowData){
      if(rowData.subCoverName==''){
        // this.toastrService.show(
        //   'SubCover Name',
        //   'Please Enter SubCover Name',
        //   config);
      }
     else if(rowData.subCoverDesc==''){
        // this.toastrService.show(
        //   'SubCover Description',
        //   'Please Enter SubCover Description',
        //   config);
      }
      else if(rowData.regulatoryCode==''){
        // this.toastrService.show(
        //   'Regulatory Code',
        //   'Please Enter Regulatory Code',
        //   config);
      }
      else{
        // this.subCoverName = rowData.subCoverName;
        // this.subCoverId = rowData.subCoverId;
        // this.subCoverDesc = rowData.subCoverDesc;
        // this.subCoverRegCode = rowData.regulatoryCode;
        this.ratingSection = !this.ratingSection;
        this.subCoverDetails = true;
      }
    }

  }
  onGetSubCoverList(type){
    if(this.coverDetails.CoverId!=null){
      let ReqObj = { "Limit":"0", "Offset":"100","CoverId":this.coverDetails.CoverId }
    let urlLink = `${this.ApiUrl1}master/getactivesubcover`;
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
          else{this.addSubCoverSection=!this.addSubCoverSection}
        }

      },
      (err) => { },
    );
    }
    else{
      this.onSaveCoverForm('subCover');
    }
  }
  onProceed(){

  }
  onSaveCoverForm(value:any){
    if(this.coverDetails.CoverId==null || this.coverDetails.CoverId==""){
      this.coverDetails.CreatedBy = this.loginId
    }
    this.coverDetails.CreatedBy = this.loginId
    console.log("Login",this.loginId,this.coverDetails.CreatedBy);
    let ReqObj = {
            "CoverId": this.coverDetails.CoverId,
            "CalcType": this.calcType,
            "CoreAppCode": null,
            "CoverDesc": this.coverDetails.CoverDesc,
            "CoverName": this.coverDetails.CoverName,
            "CoverBasedOn": "sumInsured",
            "CoverageLimit": this.coverageLimit,
            "CoverageType": this.coverageTypeValue,
            "CreatedBy": this.coverDetails.CreatedBy,
            "DiscountCoverId":this.coverDetails.DiscountCoverId,
            "DependentCoverYn": this.coverDetails.DependentCoverYn,
            "DependentCoverId": this.coverDetails?.DependentCoverId,
            "EffectiveDateStart": this.coverDetails.EffectiveDateStart,
            "EffectiveDateEnd": this.coverDetails.EffectiveDateEnd,
            "ProRataYn": this.coverDetails.ProRataYn,
            //"Excess": this.excessValue,
            "ExcessPercent": this.excessValue,
            "ExcessAmount":this.excessamount,
            "ExcessDesc":this.excessDesc,
            "FactorTypeId": null,
            "BaseRate": this.baseRate,
            "MinimumPremium": this.minPremium,
            "SumInsuredStart": this.minPremium,
            "SumInsuredEnd": this.maxSumInsured,
            "Remarks": this.coverDetails.Remarks,
            "Status": this.coverDetails.Status,
            "SubCoverYn": this.coverDetails.SubCoverYn,
            "MultiSelectYn":this.coverDetails.MultiSelectYn,
            "RegulatoryCode": this.coverDetails.RegulatoryCode,
            "ToolTip": this.coverDetails.ToolTip,
            "GridDetails": [],
            "IsTaxExcempted": this.coverDetails.IsTaxExcempted,
            "TaxAmount": "0",
            "TaxCode": "Vat",
            "TaxExcemptionReference": this.coverDetails.TaxExcemptionReference,
            "TaxExcemptionType": this.coverDetails.TaxExcemptionType
    }
    let urlLink = `${this.ApiUrl1}master/insertcover`;
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
                  sessionStorage.removeItem('editGlobalCoverId')
                this.router.navigate(['/Admin/globalConfigure/existingCovers']);
            }
            else{
              let coverId = data.Result.SuccessId;
              sessionStorage.setItem('editGlobalCoverId',coverId);
              this.coverDetails.CoverId = coverId;
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
  onSaveSubCoverDetails(){
      this.subCoverData.CreatedBy = this.loginId
    let ReqObj = {
      "CoverId": this.coverDetails.CoverId,
      "CalcType":this.subCoverData.CalcType,
      "SubCoverId":this.subCoverData.SubCoverId,
      "CoreAppCode": this.subCoverData.CoreAppCode,
      "CoverBasedOn": "sumInsured",
      "SubCoverDesc": this.subCoverData.SubCoverDesc,
      "SubCoverName": this.subCoverData.SubCoverName,
      "CoverageLimit": this.subCoverData.CoverageLimit,
      "CoverageType": this.subCoverData.CoverageType,
      "CreatedBy": this.loginId,
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
      "TaxAmount": "0",
      "TaxCode": "Vat",
      "TaxExcemptionReference":this.subCoverData.TaxExcemptionReference,
      "TaxExcemptionType":this.subCoverData.TaxExcemptionType,
      "GridDetails": []
    }
let urlLink = `${this.ApiUrl1}master/insertsubcover`;
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
}
