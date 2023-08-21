//import { SharedService } from './../../../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import * as Mydatas from '../../'
import * as Mydatas from '../../../../../../app-config.json'
import { DatePipe } from '@angular/common';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
//import { SharedService } from '../../../shared/shared.service';
import { SharedService } from '../../../../../../shared/shared.service';
@Component({
  selector: 'app-new-uw-question-details',
  templateUrl: './new-uw-question-details.component.html',
  styleUrls: ['./new-uw-question-details.component.scss']
})
export class NewUwQuestionDetailsComponent implements OnInit {

  public activeMenu:any='UwQues';statusValue:any="Y";
  typeList:any[]=[];typeValue:any='';MandatoryYn:any="N";
  uwQuesId: string; public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  remarks: any;dataType:any="01";coreAppCode:any;
  regCode:any;loginId:any;optionList:any[]=[];
  questionDesc: any;
  effectiveDateEnd: any;effectiveDateStart: any;
  minDate: Date;
  insuranceId: string;productId: string;
  branchValue: any='';branchList:any[]=[];
  RegulatoryCode: any;DependantQuesList:any[]=[];
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.typeList = [
      {"text":"---Select---","value":''},
      {"text":"Radio Button","value":"01"},
      {"text":"TextBox","value":"02"},
    ];
    this.getBranchList();
    this.DependantQuesList = [
      {"Code":null,"CodeDesc":"---Select---"},
      {"Code":"01",CodeDesc:"Question 1"},
      {"Code":"02",CodeDesc:"Question 2"},
      {"Code":"03",CodeDesc:"Question 3"},
    ]
    this.optionList = [
      {
          "DependentUnderwriterId": null,
          "DependentUwAction": null,
          "DependentYn": "N",
          "LoadingPercent": "0",
          "ReferralYn": "N",
          "Status": "Y",
          "UwQuesOptionDesc": null,
          "UwQuesOptionId": this.optionList.length+1
      }
    ]
  }

  ngOnInit(): void {
    this.getAllUwQuesList();
  }
  getAllUwQuesList(){
    let ReqObj = {
      "Limit":"0",
      "Offset":"100",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode" : this.branchValue
      }
      let urlLink = `${this.CommonApiUrl1}master/getalluwquestions`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
            if(res?.Result){
                if(res?.Result.length!=0){
                  
                    this.DependantQuesList = data?.Result.filter(ele=>ele.UwQuestionId!=this.uwQuesId);
                }
            }
          },
          (err) => { },
        );
  }
  onAddOptionList(){
    let entry = {
          "DependentUnderwriterId": null,
          "DependentUwAction": null,
          "DependentYn": "N",
          "LoadingPercent": "0",
          "ReferralYn": "N",
          "Status": "Y",
          "UwQuesOptionDesc": null,
          "UwQuesOptionId":  this.optionList.length+1
    }
    this.optionList.push(entry);
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"",CodeDesc:"---Select---"},{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let uwId = JSON.parse(sessionStorage.getItem('uwQuesId'));
        if(uwId){
          this.uwQuesId = uwId?.UwQuestionId;
          this.branchValue = uwId?.BranchCode;
          if(this.uwQuesId!=null) this.getUwDetails();
        }
        else{
          this.uwQuesId = null;
        }
      }
    },
    (err) => { },
  );
  }
  deleteRow(index,optionId){
    this.optionList.splice(index,1);
  }
  clearRecords(){
    let entry = this.optionList[0];
    entry.UwQuesOptionDesc = null;
    entry.UwQuesOptionId = 0;
    entry.DependentUnderwriterId = null;
    entry.LoadingPercent = '0';
    entry.Status = "Y";
    entry.ReferralYn = 'N';
    entry.DependentYn = 'N';
  }
  getUwDetails(){
    let ReqObj = {
      "EffectiveDateStart": "",
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "UwQuestionId": this.uwQuesId,
      "BranchCode": this.branchValue
    }
    let urlLink = `${this.CommonApiUrl1}master/getbyuwquestionid`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res:any = data;
            if(res?.Result){
                 let details = res?.Result;
                 if(details?.QuestionType) this.typeValue = details?.QuestionType;
                 if(details?.Remarks) this.remarks = details?.Remarks;
                 if(details?.Status) this.statusValue = details?.Status;
                 if(details?.UwQuestionDesc) this.questionDesc = details?.UwQuestionDesc;
                 if(details?.MandatoryYn) this.MandatoryYn = details?.MandatoryYn;
                 if(details?.DataType) this.dataType = details?.DataType;
                 if(details?.UwQuestionId) this.uwQuesId = details?.UwQuestionId;
                if(details?.EffectiveDateStart!=null){
                  this.effectiveDateStart = this.onDateFormatInEdit(details?.EffectiveDateStart);
                }
                if(details?.Options!=null && details.Options.length!=0){
                    this.optionList = details?.Options;
                }
            }
          },
          (err) => { },
        );

  }
  onStartDateChange(){
    var d = this.effectiveDateStart;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.effectiveDateEnd = new Date(year + 28, month, day);
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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList'])
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
  }
  onProceed(){
    if(this.remarks==undefined) this.remarks = "";
    if(this.questionDesc==undefined) this.questionDesc = "";
    let ReqObj = {
      "BranchCode": this.branchValue,
      "CreatedBy": this.loginId,
      "DataType": this.dataType,
      "EffectiveDateStart": this.effectiveDateStart,
      "InsuranceId": this.insuranceId,
      "MandatoryYn": this.MandatoryYn,
      "Options": this.optionList,
      "ProductId": this.productId,
      "QuestionType": this.typeValue,
      "Remarks": this.remarks,
      "Status": this.statusValue,
      "UwQuestionDesc": this.questionDesc,
      "UwQuestionId": this.uwQuesId
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
      }
      else{
      ReqObj['EffectiveDateStart'] = "";
      }
      
    let urlLink = `${this.CommonApiUrl1}master/insertuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(res?.Result){
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
            //   'UnderWriter Question Details Inserted/Updated Successfully',
            //   'UnderWriter Question Details',
            //   config);
              sessionStorage.removeItem('uwQuesId');
              this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
             //this.ref.close();
          }
          else if(res?.ErrorMessage){
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
}
