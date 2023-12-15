import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { ErrorModal } from './error.Model';

@Component({
  selector: 'app-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.scss']
})
export class NewErrorDetailsComponent implements OnInit {
  public activeMenu:any='Dropdown' ;@Input() DropdownId  :any;TypeList:any[]=[];
  insuranceName: string;regionValue:any="";
  paramList:any[]=[];paramKeylist:any[]=[];
  statusValue:any="Y";branchList:any;jsonList:any[]=[];
  public AppConfig:any = (Mydatas as any).default;

  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public branchCode:any;
  productList:any[]=[];
  ModuleList:any[]=[];
  
  //public ErrorModelDetails:any;
  minDate:any;
  public ErrorModelDetails:any;
  tableList:any;tableNameList:any;KyeNameList:any;
  KeyTableValue:any;KeyNameValue:any;productId:any;
  insuranceId: string;keyTableList:any[]=[];
  loginId: any;
 value:any;
 editSection:boolean=false;
  branchValue: any;
  ItemCode: any;
  ItemValue: any;
  ItemId: any;
    errorid: any;
    ModuleId: any;
    ErrorId: any;
  constructor(private router:Router,private sharedService:SharedService ,private datePipe:DatePipe,)
   {
    this.minDate = new Date();
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.ErrorModelDetails = new ErrorModal();
   }

  ngOnInit(): void {
    let DropDown:any = JSON.parse(sessionStorage.getItem('ErrorModule'));
    console.log("Sno Obj",  DropDown)
    this.productId=DropDown?.ProductId;
     this.insuranceId=DropDown?.InsuranceId;
    this.ModuleId=DropDown?.ModuleId;
    this.ErrorId=DropDown?.ErrorId;
    if(this.productId && this.ModuleId){
        this.getModuledropdown();
        this.getproductlist();
    }
    if(this.ErrorId!=null){
      this.getEditDropdownDetails();
    }
    else{
      this.ItemId=null;
      this.ErrorModelDetails = new ErrorModal();
      if(this.ErrorModelDetails?.Status==null)  this.ErrorModelDetails.Status = 'Y';
    }
  }

  getproductlist(){
    let urlLink = `${this.ApiUrl1}master/dropdown/product`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let obj = [{Code:"99999",CodeDesc:"ALL"}];
            this.productList = obj.concat(data?.Result);
            //this.getModuledropdown();
        }
      },
      (err) => { },
    );
  }


  getModuledropdown(){
    let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": "99999"
    }
    let urlLink = `${this.CommonApiUrl1}dropdown/errormodules`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ModuleList = data?.Result;
        }
      },
      (err) => { },
    );
  }
    getEditDropdownDetails(){
      let ReqObj =  {
        "ErrorCode": this.ErrorId,
        "InsuranceId": this.insuranceId,
        "ModuleId": this.ModuleId,
        "ProductId": this.productId
    }
      let urlLink = `${this.CommonApiUrl1}master/getbyerrorcode`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.ErrorModelDetails = res.Result;
          this.ItemValue=res.Result.ItemType

          if(this.ErrorModelDetails){
            if(this.ErrorModelDetails?.EffectiveDateStart!=null){
              this.ErrorModelDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ErrorModelDetails?.EffectiveDateStart)
            }
            if(this.ErrorModelDetails?.EffectiveDateEnd!=null){
              this.ErrorModelDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ErrorModelDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.ErrorModelDetails);
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
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }

  onAddCalEntry(){
    let entry = {
          "key":"",
          "ColumnName" : "",
    };
    this.paramList.push(entry);
  }
  onRemoveIndex(index){
    this.paramList.splice(index,1);
  }
  ongetBack(){
    this.router.navigate(['/Admin/errorMaster']);
  }
  onAddRow(){

  }
  onProceed(){

    let ReqObj = {
        "CreatedBy": this.loginId,
        "EffectiveDateStart": this.ErrorModelDetails.EffectiveDateStart,
        "ErrorField": this.ErrorModelDetails.ErrorField,
        "ErrorCode":  this.ErrorModelDetails.ErrorCode,
        "ErrorDesc": this.ErrorModelDetails.ErrorDesc,
        "InsuranceId": this.insuranceId,
        "ModuleId": this.ModuleId,
        "ProductId":this.productId,
        "Status":this.ErrorModelDetails.Status

    }
    let urlLink = `${this.CommonApiUrl1}master/inserterrormodules`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined)
    {
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
            this.router.navigate(['/Admin/errorMaster']);
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
  getList(){
    let ReqObj ={
      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/lovlist`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.TypeList = data?.Result;
        let docObj = JSON.parse(sessionStorage.getItem('ItemId'))
        if(docObj){
          this.ItemValue = docObj?.ItemType;


       }
        else{

          this.ItemValue="99999"

        }
        //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
      }
    },
    (err) => { },
  );
  }

  getTableType(){
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "BranchCode":"99999"
    }
    let urlLink = `${this.ApiUrl1}api/dropdown/tabletype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
          this.tableList = obj.concat(data?.Result);

        }
      },(err)=>{}
    );
  }
  tableName(){
    let Reqobj={
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}dropdown/mastertable`;
    this.sharedService.onPostMethodSync(urlLink,Reqobj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
          this.tableNameList = obj.concat(data?.Result);
          this.getKeyTableList();
        }
      },(err)=>{}
    );
  }
  getKeyTableList(){
    let Reqobj={
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}dropdown/eservicetable`;
    this.sharedService.onPostMethodSync(urlLink,Reqobj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
        this.keyTableList = obj.concat(data?.Result);
        let warranty:any = JSON.parse(sessionStorage.getItem('ItemId'));
        if(warranty){
          console.log("Edit Obj",warranty)
          this.DropdownId = warranty?.ItemId;
          if(this.DropdownId){
            this.getEditDropdownDetails();
          }
          else{
            this.DropdownId = null;
            this.ErrorModelDetails = new ErrorModal();
            console.log("Dropdwonssssssssss",this.ErrorModelDetails)
            if(this.ErrorModelDetails?.Status==null)  this.ErrorModelDetails.Status = "Y";
            if(this.ErrorModelDetails.RequestYn==null) this.ErrorModelDetails.RequestYn = "Y";
          }
        }
        else{
          this.DropdownId = null;
            this.ErrorModelDetails = new ErrorModal();
            console.log("Dropdwonssssssssss",this.ErrorModelDetails)
            if(this.ErrorModelDetails?.Status==null)  this.ErrorModelDetails.Status = "Y";
            if(this.ErrorModelDetails.RequestYn==null) this.ErrorModelDetails.RequestYn = "N";
          }
        }
      },(err)=>{}
    );
  }
  keyTable(){
    let Reqobj={
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}dropdown/eservicetable`;
    this.sharedService.onPostMethodSync(urlLink,Reqobj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
        this.KeyTableValue = obj.concat(data?.Result);

        }
      },(err)=>{}
    );
  }
  keyName(value){
    this.ErrorModelDetails.KeyName = null;
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "TableName": this.ErrorModelDetails?.KeyTable
    }
    let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
          this.KeyNameValue = obj.concat(data?.Result);
          if(value)
          {
            this.editSection=true;

          }

        }
      },(err)=>{}
    );
  }
}


