import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import {premiaConfig} from './premiaconfig';

@Component({
  selector: 'app-premia-config-datalist',
  templateUrl: './premia-config-datalist.component.html',
  styleUrls: ['./premia-config-datalist.component.scss']
})
export class PremiaConfigDatalistComponent implements OnInit {

  public minDate:Date;
  DefaultYn:any='N';CaseConditionl:any='N';Status:any='N';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  columList: { Code: string; CodeDesc: string; }[];
  Datatype: any[];
  peemiaList: any[];
  premiaList: any[];
  Datatypes: any[];
  premiaConfigDetails:any;
  insuranceId: string;
  productId: string;
  loginId: any;
  PreId: any;
  SectionValue: any;
  ColumnId:any;
  DataTypeId:any;
  InputColumn:any;
  columnId: any;
  querykey: any;
  premiaTableName: any;
  ColumnNames:any;
  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe) {

    this.minDate=new Date();
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  if(userDetails){
    this.loginId = userDetails?.Result?.LoginId;
  }


  }

  ngOnInit(): void {

    this.getBranchLists()
    this.getmultpremiaList();
    let PremObj = JSON.parse(sessionStorage.getItem('editPremiaId'));
    this.PreId=PremObj?.PremiaId,

    console.log('PPPPPPPP',this.PreId)
    this.SectionValue=PremObj.SectionId;
    this.columnId=PremObj.ColumnId;
    this.querykey=PremObj.QueryKey;
    this.premiaTableName=PremObj.PremiaTableName;
    console.log("Addd",this.premiaTableName)

    if(this.columnId){
  this.getExistingpremia()
    }
    else{
      this.premiaConfigDetails = new premiaConfig();
      this.premiaConfigDetails.Remarks=null;
      this.premiaConfigDetails.ColumnId=null;
      this.ColumnNames=null;
      this.DataTypeId=null;
      this.premiaConfigDetails.DefaultValue=null;
      this.InputColumn=null;
      this.premiaConfigDetails.CaseCondition=null;

      if(this.premiaConfigDetails?.Status==null)  this.premiaConfigDetails.Status = 'Y';
      if(this.premiaConfigDetails.DefaultYn==null) this.premiaConfigDetails.DefaultYn='N';

      if(this.premiaConfigDetails.CaseConditionYn==null) this.premiaConfigDetails.CaseConditionYn='N';
    }

    this.getBranchList();
    this.getBranchListsss();

  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfig'])
  }
  onProceed(){

  }
  getBranchList() {
    //EserviceMotorDetails
    let ReqObj = {
      "InsuranceId": "100002",
    "BranchCode": "99999",
    "TableName": this.premiaTableName
    }
    let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.columList = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
  }
  getBranchLists() {
    let ReqObj = {
      "InsuranceId":"100002",
      "BranchCode":""
    }
    let urlLink = `${this.CommonApiUrl}dropdown/datatype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.Datatype = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
  }
  getpremiaList() {

    let urlLink = `${this.CommonApiUrl}dropdown/integratointable`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.peemiaList = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
  }
  getmultpremiaList() {

    let urlLink = `${this.CommonApiUrl}dropdown/sourcetable`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.premiaList = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
  }
  getBranchListsss() {

    let querykey = sessionStorage.getItem('QueryKey')
    let ReqObj = {
      /*"InsuranceId": "100002",
    "BranchCode": "99999",
    "TableName": "EserviceMotorDetails"*/
    //INS_MOTOR_DATA
    "QueryKey":this.querykey
    }
    let urlLink = `${this.CommonApiUrl}dropdown/querykeycolumns`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.Datatypes = obj.concat(data?.Result);
        }
      },
      (err) => { },
    );
}

getExistingpremia(){
  let ReqObj = {
    "InsuranceId":this.insuranceId,
    "BranchCode":"99999",
    "PremiaId":  this.PreId,
    "ProductId": this.productId,
    "SectionId": this.SectionValue,
     "ColumnId": this.columnId
       }
     let urlLink = `${this.CommonApiUrl}master/getpremiaconfigdata`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         console.log(data);
         if(data.Result){
           this.premiaConfigDetails= data.Result;
           console.log('ttttttt',this.premiaConfigDetails);
           this.getBranchList();
           this.ColumnNames=this.premiaConfigDetails.ColumnName;
           this.DataTypeId=this.premiaConfigDetails.DataTypeId;
           this.InputColumn=this.premiaConfigDetails.InputColumn;
           /*this.PremiaTableName=this.premiaDetails.PremiaTableName;
           this.SourceTableName=this.premiaDetails.SourceTableName;*/
           if(this.premiaConfigDetails){
             if(this.premiaConfigDetails?.EffectiveDateStart!=null){
               this.premiaConfigDetails.EffectiveDateStart= this.onDateFormatInEdit(this.premiaConfigDetails?.EffectiveDateStart)
             }/*if(this.premiaDetails?.EffectiveDateEnd!=null){
               this.premiaDetails.EffectiveDateEnd= this.onDateFormatInEdit(this.premiaDetails?.EffectiveDateEnd)
             }*/
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
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  onSave(){

   let  DateFormatType
     if(this.columnId){
       this.premiaConfigDetails.ColumnId=this.columnId
     }else{
       this.premiaConfigDetails.ColumnId=""
     }
    if(this.premiaConfigDetails.CaseConditionYn =='N'){
      this.premiaConfigDetails.CaseCondition="";
    }
    if(this.premiaConfigDetails.DefaultYn=='N'){
          this.premiaConfigDetails.DefaultValue="";
    }

    if(this.DataTypeId=='1' || this.DataTypeId=='2' ){
      DateFormatType=null;
    }

    if(this.DataTypeId=='3'){
      if(this.premiaConfigDetails.DateFormatType!=undefined && this.premiaConfigDetails.DateFormatType!='' &&  this.premiaConfigDetails.DateFormatType!=null){
        DateFormatType=this.premiaConfigDetails.DateFormatType;
      }
      else{
        DateFormatType="";
      }
    }

  if(this.ColumnId!=undefined && this.ColumnId!=null && this.ColumnId!=''){
      //let code = this.productItem
      //  let code = this.columList.find(ele=>ele.CodeDesc==code)
      //  console.log('codes',code)
      // this.premiaConfigDetails.ColumnName=this.ColumnId['Code']
        //  var code = this.columList.filter((ele=>ele.CodeDesc==code) => {
        //   if (val.Code == ) {
        //     return val
        //   }
        // })

        // let code= this.columList.filter(ele=>ele.CodeDesc== code);

        // let Code= this.ColumnId
        //console.log(countryId[0].Code);
      } else {
        //countryId = [""];


      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }

     /*if(this.ColumnNames!=undefined && this.ColumnNames!=null && this.ColumnNames!=''){
      //let code = this.productItem
      let code = this.peemiaList.find(ele=>ele.Code==this.ColumnNames)
      console.log('codes',code)
      this.premiaDetails.EntityName=code.CodeDesc;
      //code.label

      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }*/

     console.log('cccccccccccc',this.ColumnNames)
   let ReqObj={
    "CreatedBy":this.loginId,
   "EffectiveDateStart":this.premiaConfigDetails.EffectiveDateStart,
   "InsuranceId": this.insuranceId,
   "BranchCode":"99999",
   "PremiaId":this.PreId,
   "ProductId":this.productId,
   "SectionId":this.SectionValue,
   "ColumnId":this.premiaConfigDetails.ColumnId,
   "ColumnName":this.ColumnNames,
   "InputColumn":this.InputColumn,
   "Remarks": this.premiaConfigDetails.Remarks,
   "Status":this.premiaConfigDetails.Status,
   "DefaultYn":this.premiaConfigDetails.DefaultYn,
   "DefaultValue":this.premiaConfigDetails.DefaultValue,
   "DataTypeId":this.DataTypeId,
   "DateFormatType": DateFormatType,
   "CaseConditionYn":this.premiaConfigDetails.CaseConditionYn,
   "CaseCondition":this.premiaConfigDetails.CaseCondition
   }
   let urlLink = `${this.CommonApiUrl}master/insertpremiaconfigdata`;
   if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
     ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
   }
   else{
     ReqObj['EffectiveDateStart'] = "";
   }

   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
     (data: any) => {
         console.log(data);
         let res:any=data;
         if(data.Result){
           // let type: NbComponentStatus = 'success';
           //       const config = {
           //         status: type,
           //         destroyByClick: true,
           //         duration: 4000,
           //         hasIcon: true,
           //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
           //         preventDuplicates: false,
           //       };
           //       this.toastrService.show(
           //         'Referal Details Inserted/Updated Successfully',
           //         'Referal Details',
           //         config);
           //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
           //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
           this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfig'])

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



}

