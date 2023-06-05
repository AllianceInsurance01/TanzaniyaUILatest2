import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientComponent } from '../../client.component';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';
import { Validators,FormBuilder, FormGroup, FormControl, } from '@angular/forms';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-client-address',
  templateUrl: './client-address.component.html',
  styleUrls: ['./client-address.component.css']
})
export class ClientAddressComponent implements OnInit {

  regionList:any[]=[];stateList:any[]=[];
  form: FormGroup = new FormGroup({});
  cityList:any[]=[];customerDetails:any;
  regionValue:any="";stateValue:any="";
  cityValue:any="";streetValue:any="";
  address1:any="";address2:any="";faxValue:any="";
  telephone1:number=10;telephone2:any="";telephone3:any="";
  mobile1:any="";mobile2:any="";mobile3:any="";
  email1:any="";email2:any="";email3:any="";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  SaveOrSubmit:any;
  //minnumber:any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private clientComponent:ClientComponent,private fb: FormBuilder) {

    this.customerDetails = this.clientComponent.customerDetails;
    this.getStateList();
    //this.minnumber="^((\\+91-?)|0)?[0-9]{10}$"

    /*this.form = fb.group({
      telephone1: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })*/

    // }
   }
   /*get f(){
    return this.form.controls;
  }*/

  ngOnInit(): void {
    /*if(this.telephone1!='' && this.telephone1!=null && this.telephone1!= undefined){
      this.customerDetails['IdNumber'] = this.telephone1;

    }*/

  }
  // getRegionList(){
  //   let urlLink = `${this.ApiUrl1}master/dropdown/state`;
  //   this.sharedService.onGetMethodSync(urlLink).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       if(data.Result){
  //          this.regionList = data.Result;
  //          this.getStateList();
  //       }
  //     },
  //     (err) => { },
  //   );
//}

  getStateList(){
    let ReqObj = {
      "CountryId": this.customerDetails?.Nationality
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.stateList = data.Result;
           this.setClientDetails();
           //this.getCityList();
        }
      },
      (err) => { },
    );
  }
  getCityList(){
    let ReqObj = {
    "StateId": this.stateValue,
    "CountryId": this.customerDetails.Nationality
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/city`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.cityList = data.Result;

        }
      },
      (err) => { },
    );
  }
  setClientDetails(){
      console.log("Edit Value",this.customerDetails);

      //this.cityValue=cityValue;
      this.stateValue = this.customerDetails?.StateCode;
      if(this.stateValue)
      this.getCityList();
      this.cityValue = this.customerDetails?.CityName;
      this.streetValue = this.customerDetails?.Street;
      this.address1 = this.customerDetails?.Address1;
      this.address2 = this.customerDetails?.Address2;
      this.faxValue = this.customerDetails?.Fax;
      this.telephone1 = this.customerDetails?.TelephoneNo1;
      this.telephone2 = this.customerDetails?.TelephoneNo2;
      this.telephone3 = this.customerDetails?.TelephoneNo3;
      this.mobile1 = this.customerDetails?.MobileNo1;
      this.mobile2 = this.customerDetails?.MobileNo2;
      this.mobile3 = this.customerDetails?.MobileNo3;
      this.email1 = this.customerDetails?.Email1;
      this.email2 = this.customerDetails?.Email2;
      this.email3 = this.customerDetails?.Email3;

  }
  onProceed(submitType){
    this.customerDetails['StateCode'] = this.stateValue;
    this.customerDetails['CityName'] = this.cityValue;
    this.customerDetails['Street'] = this.streetValue;
    this.customerDetails['Address1'] = this.address1;
    this.customerDetails['Address2'] = this.address2;
    this.customerDetails['Fax'] = this.faxValue;
    this.customerDetails['TelephoneNo1'] = this.telephone1;
    this.customerDetails['TelephoneNo2'] = this.telephone2;
    this.customerDetails['TelephoneNo3'] = this.telephone3;
    this.customerDetails['MobileNo1'] = this.mobile1;
    this.customerDetails['MobileNo2'] = this.mobile2;
    this.customerDetails['MobileNo3'] = this.mobile3;
    this.customerDetails['Email1'] = this.email1;
    this.customerDetails['Email2'] = this.email2;
    this.customerDetails['Email3'] = this.email3;

    this.clientComponent.customerDetails = this.customerDetails;
    if(submitType=='save')
    { this.clientComponent.onUpdateDetails('save');}
    else {
      this.clientComponent.onUpdateDetails('submit');
    }


  }
}
