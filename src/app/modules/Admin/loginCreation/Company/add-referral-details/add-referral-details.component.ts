import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import { Referral } from './add-referralModel';

@Component({
  selector: 'app-add-referral-details',
  templateUrl: './add-referral-details.component.html',
  styleUrls: ['./add-referral-details.component.scss']
})
export class AddReferralDetailsComponent implements OnInit {

  /*sectionValue:any; public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  referralList:any[]=[];
  insuranceName: any;insuranceId:any;productId:any;loginId:any;
  constructor(private router:Router,private toastrService:NbToastrService,
    private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.getreferralList();
    // this.referralList = [
    //   {
    //     "SectionId": 3,
    //     "SectionName": "All Risk",
    //   },
    //   {
    //       "SectionId": 1,
    //       "SectionName": "Building"
    //   },
    // ]
  }

  ngOnInit(): void {


  }
  onSelectCustomer(rowData){
    if(rowData.isChecked){
        let entry =  {
          "CreatedBy": this.loginId,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "ReferalId":rowData.ReferalId

        }
        this.referralList.push(entry);
    }
    else{
      let index = this.referralList.findIndex(ele=>ele.SectionId==rowData.SectionId);
      this.referralList.splice(index,1);
    }
    console.log("Referral List",this.referralList);
  }
  getreferralList(){
    let ReqObj={
      "ProductId": this.productId,
      "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/getallnonselectedreferals`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.Result){
          this.columnHeader = [
            {
              key: 'ProductId',
              display: 'Select',
              config: {
                isChecked: true,
                model:'isChecked'
              },
            },
            { key: 'ReferalName', display: 'Referal Name' },
            { key: 'CoreAppCode', display: 'Core App Code' },
            { key: 'EffectiveDateStart', display: 'Date Start' },
            { key: 'Status', display: 'Status' },
            {
              key: 'AmendId',
              display: 'View',
              config: {
                isView: true,
              },
            },
          ];
          this.tableData=data.Result.map(x=>({
            ...x,
            isCheced:false
          }));
        }
      },
    );
  }


  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails']);
  }
  onProceed(){
    if(this.referralList.length!=0){
      let ReqObj = this.referralList;
    let urlLink = `${this.ApiUrl1}master/insertproductreferal`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
          if(data.Result){
            let type: NbComponentStatus = 'success';
                  const config = {
                    status: type,
                    destroyByClick: true,
                    duration: 4000,
                    hasIcon: true,
                    position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    preventDuplicates: false,
                  };
                  this.toastrService.show(
                    'Referral Details Inserted Successfully',
                    'Referral Details',
                    config);
                    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails']);
          }
          else if(data.ErrorMessage){
              if(data.ErrorMessage){
                for(let entry of data.ErrorMessage){
                  let type: NbComponentStatus = 'danger';
                  const config = {
                    status: type,
                    destroyByClick: true,
                    duration: 4000,
                    hasIcon: true,
                    position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    preventDuplicates: false,
                  };
                  this.toastrService.show(
                    entry.Field,
                    entry.Message,
                    config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
            }

        },
        (err) => { },
      );
    }
    else{
      let type: NbComponentStatus = 'danger';
      const config = {
        status: type,
        destroyByClick: true,
        duration: 4000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false,
      };
      this.toastrService.show(
        "Please Select Minimum One Section to Include",
        "Add Referal",
        config);
    }


  }*/


  public activeMenu:any='Dropdown' ;@Input() DropdownId  :any;
  insuranceName: string;regionValue:any="";
  paramList:any[]=[];paramKeylist:any[]=[];
  statusValue:any="Y";branchList:any;jsonList:any[]=[];
  public AppConfig:any = (Mydatas as any).default;

  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public MotorApiUrl:any=this.AppConfig.MotorApiUrl
  public branchCode:any;
  public DropDownDetails:any;
  public CustomerDetails:any;
  public ConstantTableDetails:any;
  minDate:any;
  tableList:any;tableNameList:any;KyeNameList:any;
  KeyTableValue:any;KeyNameValue:any;productId:any;
  insuranceId: string;keyTableList:any[]=[];
  loginId: any;
 value:any;
 editSection:boolean=false;
  constructor(private router:Router,private sharedService:SharedService ,private datePipe:DatePipe,)
   {
    this.minDate = new Date();
    this.productId =  sessionStorage.getItem('companyProductId');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let dropdownId = sessionStorage.getItem('ItemId');
    if(dropdownId){
      this.DropdownId = dropdownId
    }

    console.log('DDDDDDDDDD',this.DropdownId);
    this.ConstantTableDetails= new Referral();


    this.getTableType()

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
    if(this.DropdownId!=null && this.DropdownId!=undefined){
      this.getEditDropdownDetails();
     }
    else{
       this.ConstantTableDetails = new Referral();
       if(this.ConstantTableDetails?.Status==null)  this.ConstantTableDetails.Status = 'Y';
       if(this.ConstantTableDetails.RequestYn==null) this.ConstantTableDetails.RequestYn = "N";
       this.ConstantTableDetails.CreatedBy = this.loginId;
     }
    //this.getBranchList();*/

    console.log('DDDDDPPPPPPPPPP',this.ConstantTableDetails)

  }

  keyChange()
  {
    if(this.ConstantTableDetails.KeyTable && this.ConstantTableDetails.KeyName)
    {
      window.open('http://192.168.1.18:8084/swagger-ui/#/MASTER%20%3A%20Drop%20Down%20Controller')
    }
  }
  change()
  {
    //this.value=value;

    console.log('YYYYYYYYY',this.ConstantTableDetails.RequestYn)
    if(this.ConstantTableDetails.RequestYn=='Y')
    {
      this.jsonList = [
        {
          "RequestJsonKey":"",
          "RequestColumn":"",
          "RequestTable":this.ConstantTableDetails.KeyTable,
          "Status":"Y"
        }
      ]
    }
    else
    {

    }

  }
  delete(row:any)
  {
      const index = this.jsonList.indexOf(row);
      this.jsonList.splice(index, 1);
  }
  //RequestedTable=this.DropDownDetails.KeyTable
  addItem(){
  //addItem() {
    //var currentElement = this.jsonList[index];
    //this.jsonList.splice(index, 0, currentElement);
    /*let entry = [{
      "factorId":"",
      "RatingFiledId":null,
      "RangeYn":"N",
      "ColumnsId": null,
      "Status": "Y",
      "FromColumnName":"",
      "ToColumnName":"",
      "FromDisplayName":"",
      "DiscreteDisplayName":"",
      "MasterYn":"N",
        "ApiUrl":null
    }]
    this.factorTypeList = entry.concat(this.factorTypeList);*/
    let entry = {
      "RequestJsonKey":"",
      "RequestColumn":"",
      "RequestTable":this.ConstantTableDetails.KeyTable,
      "Status":"Y"
    }
     this.jsonList.push(entry);
  }
  /*getBranchList(){

    let ReqObj = {
      "InsuranceId": this.insuranceId,
      //"SectionId": 1,
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        //this.tableName();
      }
    },
    (err) => { },
    );
    }*/
    getEditDropdownDetails(){

      console.log('EEEEEEE',this.DropdownId)
      let ReqObj =  {
        "ItemId":this.DropdownId,
        "InsuranceId": this.insuranceId,
        //"BranchCode":"99999",
        "ProductId":this.productId
    }
      let urlLink = `${this.ApiUrl1}api/getbyconstanttabledetailsid`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log('GGGGGGGGGG',data);
        let res:any = data;
        if(data.Result){
          this.ConstantTableDetails = data.Result.ConstantTableDetails;
          if(this.ConstantTableDetails){
            if(this.ConstantTableDetails.keyTable!=null){
              this.keyName('direct');
            }
            if(this.ConstantTableDetails?.EffectiveDateStart!=null){
              this.ConstantTableDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ConstantTableDetails?.EffectiveDateStart)
            }
            if(this.ConstantTableDetails?.EffectiveDateEnd!=null){
              this.ConstantTableDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ConstantTableDetails?.EffectiveDateEnd)
            }
          }
          if(data.Result.DropdownTableDetails.length!=0){
            let list = data.Result.DropdownTableDetails;
            this.jsonList =list
          }
        }
        console.log("Final Modal Class",this.ConstantTableDetails);
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
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
  }
  onAddRow(){

  }
  onProceed(){
    let ReqObj = {

        "ItemId":this.DropdownId,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "CreatedBy":  this.loginId,
        "EffectiveDateStart":this.ConstantTableDetails.EffectiveDateStart,
        //"TableName":this.DropDownDetails.TableName,
        "TableType":this.ConstantTableDetails.TableType,
        "ApiUrl":this.ConstantTableDetails.ApiUrl,
        //"BranchCode":this.DropDownDetails.BranchCode,
        "ApiName":this.ConstantTableDetails.ApiName,
        "KeyName":this.ConstantTableDetails.KeyName,
        "KeyTable":this.ConstantTableDetails.KeyTable,
        "RequestYn":this.ConstantTableDetails.RequestYn,
        "Status":this.ConstantTableDetails.Status,
        "DropdownTableDetails":this.jsonList,
        "BranchCode": "99999",
        "EntryDate": "29/11/2022",

        //"RequestJsonKey":RequestJsonKey,
        //"RequestColumn":RequestColumn,
        //"RequestTable":this.DropDownDetails.KeyTable,



    }
    let urlLink = `${this.ApiUrl1}api/insertconstanttabledetails`;
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
          //         'Referral Details Inserted/Updated Successfully',
          //         'Referral Details',
          //         config);

                  this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])

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
          this.tableName();

        }
      },(err)=>{}
    );
  }
  tableName(){
    let urlLink = `${this.CommonApiUrl1}dropdown/mastertable`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
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
    let urlLink = `${this.CommonApiUrl1}dropdown/eservicetable`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
        this.keyTableList = obj.concat(data?.Result);
        this.keyName('direct');

        //let warranty:any = JSON.parse(sessionStorage.getItem('DropdownId'));
        /*if(warranty){
          this.DropdownId = warranty?.DropdownId;
          if(this.DropdownId){
            this.getEditDropdownDetails();
          }
          else{
            this.DropdownId = null;
            this.DropDownDetails = new Referral();
            console.log("Dropdwonssssssssss",this.DropDownDetails)
            if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = "Y";
            if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "Y";
          }
        }
        else{
          this.DropdownId = null;
            this.DropDownDetails = new Referral();
            console.log("Dropdwonssssssssss",this.DropDownDetails)
            if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = "Y";
            if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "N";
          }*/
        }
      },(err)=>{}
    );
    console.log('DropDown',this.DropDownDetails)
  }
  keyTable(){

    let urlLink = `${this.CommonApiUrl1}dropdown/eservicetable`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
        this.KeyTableValue = obj.concat(data?.Result);



        }
      },(err)=>{}
    );
  }
  keyName(value){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": "99999",
      "TableName": this.ConstantTableDetails.KeyTable
    }
    let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data:any) => {
        if (data.Result){
          let obj = [];
          this.KeyNameValue = obj.concat(data?.Result);
          if(value=='change'){
            this.ConstantTableDetails.KeyName = null;
          }
        }
      },(err)=>{}
    );
  }
}



