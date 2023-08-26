import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit {

  public activeMenu:any='Dropdown';filterValue:any;@Input() DropdownId  :any;
  insuranceName: string;regionValue:any="";
  dropdownData:any[]=[];dropdownHeader:any[]=[];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;tableList:any;
  TypeList:any[]=[];TypeValue:any;
  TaxData:any[]=[];
  insuranceList: { Code: string; CodeDesc: string; }[];


  public branchList:any;branchValue:any;BranchCode:any;insuranceId:any;
  userDetails: any;

  constructor(private router:Router ,private sharedService:SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;

   }

  ngOnInit(): void {
    sessionStorage.removeItem("ItemId")
    this.dropdownHeader = [
      { key: 'CountryId', display: 'Country Id' },
      { key: 'TaxName', display: 'Tax Name' },
      { key: 'TaxDesc', display: 'Tax Description' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getCompanyList();

  }

  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
  
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          let docObj = JSON.parse(sessionStorage.getItem('addDocDetaisObj'));
          console.log('IIIIIIIIIIII',docObj)
          if(docObj){
            this.insuranceId = docObj?.insuranceid;
            this.getList('direct');
         }
          else{
            this.insuranceId=null;
          }
          
        }
  
      },
      (err) => { },
    );
  }
  getList(type){

    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          //let obj = [{Code:"",CodeDesc:""}];
          this.TypeList = data?.Result;
          let docObj = JSON.parse(sessionStorage.getItem('addDocDetaisObj'));
          console.log('IIIIIIIIIIII',docObj)
          if(docObj){
            console.log('iiiiiiiii',this.TypeValue)
            this.TypeValue= docObj?.ItemType;
           this.getExistingDropdown();
         }
         else{
          this.TypeValue=null;
         }
      
        }
      },
      (err) => { },

    );
  
  }

  getExistingDropdown(){
    let ReqObj = {
      "CountryId": this.TypeValue
    }
    let urlLink = `${this.ApiUrl1}master/getallcountrytax`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.TaxData = data?.Result;
            console.log('KKKKKKKKKKKK',this.TaxData);
            if(this.TypeValue!=undefined && this.TypeValue!=null){
              let docObj = {"ItemType":this.TypeValue,"insuranceid":this.insuranceId};
              sessionStorage.setItem('addDocDetaisObj',JSON.stringify(docObj));
            }
        }
      },
      (err) => { },
    );
  }

  onAddDropdowns(){
      let ReqObj = {
       "CountryId":this.TypeValue,
       "InsuranceId":this.insuranceId,
       "TaxId":null
      }
      sessionStorage.setItem('CountryDetails',JSON.stringify(ReqObj));
    this.router.navigate(['Admin/taxMaster/newtaxlist'])
  }
  onEditDrop(event){
    let ReqObj = {
      "CountryId":event.CountryId,
      "InsuranceId":this.insuranceId,
      "TaxId":event.TaxId
    }
    console.log("Edit Req Obj",event);
    sessionStorage.setItem('CountryDetails',JSON.stringify(ReqObj));
    this.router.navigate(['Admin/taxMaster/newtaxlist'])
  }
  EditStatus(event){
    let ReqObj = {
      "ItemId":event.DropdownId,
      "InsuranceId":"1000002",
      "BranchCode":this.branchValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}api/constanttabledetails/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
                window.location.reload()
        }
      },
      (err) => { },
    );
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

}

