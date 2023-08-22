import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { Taxdetails } from './tax-details.Model';


@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.scss']
})
export class NewTaxDetailsComponent implements OnInit {
  public activeMenu:any='Dropdown';filterValue:any;@Input() DropdownId  :any;
  insuranceName: string;regionValue:any="";
  dropdownData:any[]=[];dropdownHeader:any[]=[];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;tableList:any;
  TypeList:any[]=[];TypeValue:any;
  TaxData:any[]=[];
  taxDetails:any;
  minDate:any;
  public branchList:any;branchValue:any;BranchCode:any;insuranceId:any;
  userDetails: any;
  taxId: any;
  loginId: any;
  CountryId: any;

  constructor(private router:Router ,private sharedService:SharedService,private datePipe:DatePipe) {
    this.insuranceName = sessionStorage.getItem('insuranceName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    if(this.userDetails){
      this.loginId = this.userDetails?.Result?.LoginId;
    }
    this.minDate=new Date();
    this.taxDetails = new Taxdetails();
   
    
   }

  ngOnInit(): void {
    let taxdetail = JSON.parse(sessionStorage.getItem('CountryDetails'));
    console.log('UUUUUUUUUUUUUUU',taxdetail)
    if(taxdetail){
      this.insuranceId = taxdetail?.InsuranceId;
      console.log('NNNNNNNNNN',this.insuranceId)
    }
    if(this.insuranceId){
      this.getList();
    }

  }
  getEdittaxDetails(){
    let ReqObj =  {
      "CountryId": this.CountryId,
         "TaxId":this.taxId
  }
    let urlLink = `${this.ApiUrl1}master/getbycountrytaxid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.taxDetails = res.Result;
        this.CountryId = res?.Result.CountryId;
        if(this.taxDetails){
          if(this.taxDetails?.EffectiveDateStart!=null){
            this.taxDetails.EffectiveDateStart = this.onDateFormatInEdit(this.taxDetails?.EffectiveDateStart)
          }
        
        }
      }
      console.log("Final Modal Class",this.taxDetails);
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
  getList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.TypeList = data?.Result;
          let taxdetail = JSON.parse(sessionStorage.getItem('CountryDetails'));
          console.log('UUUUUUUUUUUUUUU',taxdetail)
          if(taxdetail){
            this.CountryId = taxdetail?.CountryId;
            this.taxId = taxdetail?.TaxId;
            console.log('RRRRRRRRRRR',this.taxDetails.CountryId);
          }
          if(this.taxId!=null && this.taxId!=undefined){
            this.getEdittaxDetails();
          }
          else{
            this.taxDetails = new Taxdetails();
            if(this.taxDetails?.Status==null)  this.taxDetails.Status = 'Y';
          }
        }
      },
      (err) => { },
    );
  }
  onProceed(){
    let tax
    if(this.taxId!=null && this.taxId!=undefined){
      tax=this.taxId
    }
    else{
      tax=null;
    }
    let ReqObj = {
      "CountryId": this.CountryId,
      "CreatedBy": this.loginId,
      "EffectiveDateStart":this.taxDetails.EffectiveDateStart,
      "Remarks":this.taxDetails.Remarks,
      "Status":this.taxDetails.Status,
      "TaxDesc":this.taxDetails.TaxDesc,
      "TaxId":this.taxId,
      "TaxName":this.taxDetails.TaxName
    }
    let urlLink = `${this.ApiUrl1}master/savecountrytax`;
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
                    this.router.navigate(['/Admin/taxMaster'])
          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
                 
                }
                console.log("Error Iterate",data.ErrorMessage)
          
              }
          }
        },
        (err) => { },
      );
  }
  ongetBack(){
    this.router.navigate(['/Admin/taxMaster']);
  }
}


