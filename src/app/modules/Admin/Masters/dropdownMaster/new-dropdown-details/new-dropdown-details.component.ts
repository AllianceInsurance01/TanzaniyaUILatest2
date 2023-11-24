import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { Dropdown } from './dropdown.Model';

@Component({
  selector: 'app-new-dropdown-details',
  templateUrl: './new-dropdown-details.component.html',
  styleUrls: ['./new-dropdown-details.component.scss']
})
export class NewDropdownDetailsComponent implements OnInit {
  public activeMenu:any='Dropdown' ;@Input() DropdownId  :any;TypeList:any[]=[];
  insuranceName: string;regionValue:any="";
  paramList:any[]=[];paramKeylist:any[]=[];
  statusValue:any="Y";branchList:any;jsonList:any[]=[];
  public AppConfig:any = (Mydatas as any).default;

  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public branchCode:any;
  public DropDownDetails:any;minDate:any;
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
  constructor(private router:Router,private sharedService:SharedService ,private datePipe:DatePipe,)
   {
    this.minDate = new Date();
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      // this.insuranceId = userDetails?.Result?.LoginBranchDetails[0].InsuranceId;
    }
    //this.DropdownId = sessionStorage.getItem('ItemId');
    this.DropDownDetails = new Dropdown();

    // this.paramList = [
    //   { "key":"", "ColumnName" : "" }
    // ];
    // this.paramKeylist = [
    //   {"text":"CoverId","value":"01"},
    //   {"text":"SectionId","value":"02"},
    //   {"text":"branchCode","value":"03"},
    //   {"text":"CountryId","value":"04"},
    //   {"text":"CityId","value":"05"},
    //   {"text":"InsuranceId","value":"06"},
    //   {"text":"subUserType","value":"07"},
    // ]
    // this.DropDownDetails = new Dropdown();
   }

  ngOnInit(): void {
    // if(this.DropdownId!=null && this.DropdownId!=undefined){

    // }
    // else{
    //   this.DropDownDetails = new Dropdown();
    //   if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = 'Y';
    //   if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "N";
    //   this.DropDownDetails.CreatedBy = this.loginId;
    // }

    let DropDown:any = JSON.parse(sessionStorage.getItem('ItemId'));

    console.log("Sno Obj",  DropDown)

    this.ItemId = DropDown?.ItemId;
    this.ItemCode=DropDown?.ItemCode;
    this.insuranceId=DropDown?.InsuranceId;
    //this.branchValue =  DropDown?.BranchCode;
    this.ItemValue= DropDown?.ItemType;

    if(this.ItemCode){
      this.getEditDropdownDetails()
    }
    else{
      this.ItemId=null;
      this.DropDownDetails = new Dropdown();
      if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = 'Y';
    }

    this.getBranchList();
    this.jsonList = [
      {
        "RequestJsonKey":"",
        "RequestColumn":"",
        "RequestTable": this.DropDownDetails.KeyTable,
        "Status":"Y"
      }
    ]
    this.getList()
  }
  delete(row:any)
  {
      const index = this.jsonList.indexOf(row);
      this.jsonList.splice(index, 1);
  }
  addItem(row:{RequestTable:any; RequestColumn:any;}){
  //addItem() {
    //var currentElement = this.jsonList[index];
    //this.jsonList.splice(index, 0, currentElement);
     this.jsonList.push(row);
  }
  getBranchList(){

    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        this.tableName();
      }
    },
    (err) => { },
    );
    }
    getEditDropdownDetails(){
      let ReqObj =  {
        /*"ItemId":this.DropdownId,
        "InsuranceId": this.insuranceId,
        "BranchCode":this.branchCode,
        "ProductId":this.productId*/
        "BranchCode": "99999",
        "InsuranceId": this.insuranceId,
        "ItemCode": this.ItemCode,
        "ItemType": this.ItemValue
    }
      let urlLink = `${this.CommonApiUrl1}master/getbyidlovdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.DropDownDetails = res.Result;
          this.ItemValue=res.Result.ItemType

          if(this.DropDownDetails){
            if(this.DropDownDetails?.EffectiveDateStart!=null){
              this.DropDownDetails.EffectiveDateStart = this.onDateFormatInEdit(this.DropDownDetails?.EffectiveDateStart)
            }
            if(this.DropDownDetails?.EffectiveDateEnd!=null){
              this.DropDownDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.DropDownDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.DropDownDetails);
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
    this.router.navigate(['/Admin/dropdownMaster'])
  }
  onAddRow(){

  }
  onProceed(){
let ItemId
    if(this.ItemId){
        ItemId=this.ItemId
    }
    else{
      ItemId=null;
    }

    /*if(this.ItemValue!=undefined && this.ItemValue!=null && this.ItemValue!=''){
      //let code = this.productItem
      let code = this.TypeList.find(ele=>ele.CodeDesc==this.ItemValue)
      console.log('codes',code)
      this.DropDownDetails.ItemValue=code.Code
      //code.label

      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }*/
    let ReqObj = {
        "BranchCode": "99999",
        "CoreAppCode": this.DropDownDetails.CoreAppCode,
        "CreatedBy": this.loginId,
        "EffectiveDateStart":this.DropDownDetails.EffectiveDateStart,
        "InsuranceId": this.insuranceId,
        "ItemCode":this.DropDownDetails.ItemCode,
        "ItemId": ItemId,
        "ItemType":this.ItemValue,
        "ItemValue":this.DropDownDetails.ItemValue,
        "RegulatoryCode":this.DropDownDetails.RegulatoryCode,
        "Remarks":this.DropDownDetails.Remarks,
        "Status":this.DropDownDetails.Status

    }
    let urlLink = `${this.CommonApiUrl1}master/insertlovdetails`;
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
          //         'Dropdown Details Inserted/Updated Successfully',
          //         'Dropdown Details',
          //         config);

                  this.router.navigate(['/Admin/dropdownMaster'])

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
            this.DropDownDetails = new Dropdown();
            console.log("Dropdwonssssssssss",this.DropDownDetails)
            if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = "Y";
            if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "Y";
          }
        }
        else{
          this.DropdownId = null;
            this.DropDownDetails = new Dropdown();
            console.log("Dropdwonssssssssss",this.DropDownDetails)
            if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = "Y";
            if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "N";
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
    this.DropDownDetails.KeyName = null;
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "TableName": this.DropDownDetails?.KeyTable
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


