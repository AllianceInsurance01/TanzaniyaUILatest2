import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../../shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { CurrencyDetailsComponent } from '../currency-details/currency-details.component';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  stateValue:any;cityValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  insuranceId:any;
  CurrencyId:any;public activeMenu:any='Currency';cityList:any;
  insuranceName:any;
  currencyData:any[]=[];currencyHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  dialogService: any;
  insuranceList: { InsuranceId: string; CompanyName: string; }[];
  constructor(private router:Router, private sharedService: SharedService) {
    this.activeMenu = "Currency";
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.CurrencyId =  sessionStorage.getItem('CurrencyId');
    this.stateList = [
      { "Code":"01","CodeDesc":"TamilNadu"},
      { "Code":"02","CodeDesc":"Kerala"},
      { "Code":"03","CodeDesc":"Andhra Pradesh"},
    ];
    this.cityList = [
      { "Code":"01","CodeDesc":"Trichy"},
      { "Code":"02","CodeDesc":"Chennai"},
      { "Code":"03","CodeDesc":"Madurai"},
    ];
    this.currencyHeader = [
      { key: 'CurrencyName', display: 'Currency Name' },
      { key: 'CurrencyId', display: 'Currency Code' },
      { key: 'EntryDate', display: 'Effective Date' },
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
    //this.getExistingCurrency();

   }

  ngOnInit(): void {
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
    if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
    if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);
    // if(value=='Mail') this.router.navigate(['/Admin/companyList/companyConfigure/mailList']);
    // if(value=='Sms') this.router.navigate(['/Admin/companyList/companyConfigure/SmsList']);
    if(value=='Mail') this.router.navigate(['/Admin/mailMaster']);
    if(value=='Sms') this.router.navigate(['/Admin/smsMaster/newSmsDetails']);
  }
  EditStatus(event){
    let ReqObj = {
      "CurrencyId":event.CurrencyId,
      "InsuranceId":this.insuranceId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate

    }
    let urlLink = `${this.CommonApiUrl1}master/changestatuscurrencydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
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
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                window.location.reload()
        }
      },
      (err) => { },
    );
  }

  onEditCurrency(rowdata){

    sessionStorage.setItem('editCurrencyId',rowdata.CurrencyId);
    sessionStorage.setItem('Insuranceid',this.insuranceId);
    this.router.navigate(['/Admin/companyList/companyConfigure/currencyList/newCurrencyDetails']);

  }
  onAddNew(){
    sessionStorage.removeItem('editCurrencyId');
    sessionStorage.setItem('Insuranceid',this.insuranceId);
    this.router.navigate(['/Admin/companyList/companyConfigure/currencyList/newCurrencyDetails']);

    //this.router.navigate(['/Admin/loginCreation/Company/currencyMaster/currency-details'])
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }

  getExistingCurrency(type){

    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}master/getallcurrencydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.currencyData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"N",
      "Limit":"0",
      "Offset":""
    }
    let urlLink = `${this.ApiUrl1}master/getallinscompanydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"InsuranceId":"99999","CompanyName":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId) {this.getExistingCurrency('direct')}
           //{this.getBranchList('direct'); this.getCompanyProductList('direct');}
        }
  
      },
      (err) => { },
    );
  }

}
