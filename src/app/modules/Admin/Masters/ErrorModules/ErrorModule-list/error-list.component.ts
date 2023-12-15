import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit {

  public EmiData:any[]=[];
  public columnHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public insuranceId: any;productId: any;
  EmiId: any;
  productList:any[]=[];
  insuranceList: { Code: string; CodeDesc: string; }[];
    insuranceName: string;
    userDetails: any;
    loginId: any;
    ModuleList:any[]=[];
    ModuleId:any;
    ModuleListss:any[]=[];

  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.loginId = user?.LoginId;
    // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    // this.productId =  sessionStorage.getItem('companyProductId');
      this.getCompanyList();
   }

  ngOnInit(): void {
    //sessionStorage.removeItem('EmiId')
    this.columnHeader = [
      { key: 'ErrorCode', display: 'Error Code' },
      { key: 'ErrorDesc', display: 'Error Description' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'ErrorField', display: 'Error Field' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
        //   let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.insuranceList = data.Result;

          let req=JSON.parse(sessionStorage.getItem('getback'));
          if(req.insuranceId!=null){
            this.insuranceId=req.insuranceId;
            this.getModuledropdown('direct');
            //this.getproductlist('direct');
          }
          else{
            this.insuranceId='';
            //this.getproductlist('direct');
          }
          
        }
  
      },
      (err) => { },
    );
  }
  onAddSection(){
    let entry = {
      "ProductId":this.productId,
      "InsuranceId":this.insuranceId,
      "ModuleId":this.ModuleId,
      "ErrorId":null
      }
      sessionStorage.setItem('ErrorModule',JSON.stringify(entry));
    this.router.navigate(['/Admin/errorMaster/errorDetails']);
  }
  onEditSection(rowdata){
    let entry = {
        "ProductId":this.productId,
        "InsuranceId":this.insuranceId,
        "ModuleId":rowdata.ModuleId,
        "ErrorId":rowdata.ErrorCode

        }
    sessionStorage.setItem('ErrorModule',JSON.stringify(entry));
    this.router.navigate(['/Admin/errorMaster/errorDetails']);
  }
  getExistingEmi(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
    }
    let urlLink = `${this.ApiUrl1}master/getallemidetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.EmiData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  getproductlist(type){
    if(type=='change'){
        this.productId="";
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/product`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let obj = [{Code:"99999",CodeDesc:"ALL"}];
            this.productList = obj.concat(data?.Result);
            let req=JSON.parse(sessionStorage.getItem('getback'));
            if(req.ProductId!=null){
              this.productId=req.ProductId;
              this.getList();
            }
            else{
                this.productId=null;
            }
            //this.getModuledropdown();
        }
      },
      (err) => { },
    );
  }


  getModuledropdown(type){
    if(type=='change'){
this.ModuleId=null;
    }
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
            console.log('JJJJJJJJ',this.ModuleList)
            let req=JSON.parse(sessionStorage.getItem('getback'));
            console.log('Moduless',req.ModuleIs);
            if(req.ModuleIs!=null){
                console.log('Moduless Changes',req.ModuleIs);
              this.ModuleId=req.ModuleIs;
              this.getproductlist('direct');
            }
            else{
                this.ModuleId=null;
            }
        }
      },
      (err) => { },
    );
  }
  getList(){
    let ReqObj={
        "InsuranceId": this.insuranceId,
        "ModuleId": this.ModuleId,
        "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl1}master/getallerrordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ModuleListss = data?.Result;
            if(this.insuranceId!=undefined && this.insuranceId!=null && this.ModuleId!=null && this.ModuleId!=undefined){
                let docObj = {"insuranceId":this.insuranceId,"ModuleIs": this.ModuleId,"ProductId": this.productId};
                sessionStorage.setItem('getback',JSON.stringify(docObj));
              }
        }
      },
      (err) => { },
    );

  }
}
