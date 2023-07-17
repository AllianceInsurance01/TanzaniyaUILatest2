import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
// import { plantype } from './plantype.Model'
import { plantype } from './plantype';

@Component({
  selector: 'app-plantypedetails',
  templateUrl: './plantypedetails.component.html',
  styleUrls: ['./plantypedetails.component.scss']
})
export class PlanTypeDetails implements OnInit {
  public minDate:Date;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;EmiId:any
  loginId: any;
  policylList: any;
  productList:any[]=[];
  Status:any="N";
  Startpremium: any;
  Endpremium: any;
  sectionvalue: any;
  productvalue: any;
  plantypeid: any;
  branchvalue: any;
  plantypeDetails:any;
  sectionList:any[]=[];
  branchList:any[]=[];

  constructor(
    private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
      this.minDate = new Date();
    // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    console.log("pppppp",this.productId)
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.plantypeDetails = new plantype();
   
  }
  ngOnInit(): void {

    let EmiObj = JSON.parse(sessionStorage.getItem('PlanTypeId'));
    this.plantypeid=EmiObj?.PlanTypeId;
    if(this.plantypeid!=null && this.plantypeid!=undefined){
      
    }
    else{
      this.plantypeDetails = new plantype();
      if(this.plantypeDetails?.Status==null)  this.plantypeDetails.Status = 'N';
    //   this.emiDetails = new Emi();
    }
    this.getBranchList();
   
  }
  checkvalue(event)
  {
if(event.target.value < 0)
{
event.target.value=0;
}
  }
  getEditplanDetails(){
    let ReqObj = {
      "PlanTypeId":this.plantypeid,
      "BranchCode":this.branchvalue,
    "InsuranceId":this.insuranceId,
    "SectionId":this.sectionvalue,
    "ProductId":this.productId
    }
    let urlLink = `${this.ApiUrl1}master/getbyplantypeid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.plantypeDetails = res.Result;
          if(this.plantypeDetails){
            if(this.plantypeDetails?.Status==null)  this.plantypeDetails.Status = 'N';
            if(this.plantypeDetails?.EffectiveDateStart!=null){
              this.plantypeDetails.EffectiveDateStart = this.onDateFormatInEdit(this.plantypeDetails?.EffectiveDateStart)
            }
            if(this.plantypeDetails?.EffectiveDateEnd!=null){
              this.plantypeDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.plantypeDetails?.EffectiveDateEnd)
            }
          }
        }
      },
      (err) => { },
    );
  }
  getCompanyProductList(){
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "Limit":"0",
      "Offset":"100000"
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj =[]
        this.productList = obj.concat(data?.Result)
        }
      },
      (err) => { },
    );
  }
  getSectionList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.sectionList = obj.concat(data?.Result);
          console.log(this.sectionList);
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
  getBranchList() {

    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.branchList = obj.concat(data?.Result);
          let EmiObj = JSON.parse(sessionStorage.getItem('PlanTypeId'));
          console.log('OOOOOOOOOOOOO',EmiObj)
          if(EmiObj){
            this.sectionvalue=EmiObj?.SectionId;
            this.insuranceId=EmiObj?.InsuranceId;
            this.productId=EmiObj?.ProductId;
            this.branchvalue=EmiObj?.BranchCode;
            this.plantypeid=EmiObj?.PlanTypeId;
            }          
            this.getCompanyProductList();
            this.getSectionList();
            if(this.plantypeid!=null && this.plantypeid!=undefined){
              this.getEditplanDetails();
            }
        }
      },
      (err) => { },
    );
  }
  ongetBack(){
    this.router.navigate(['/Admin/PlanTypeMaster']);
  }
  onProceed(){
    // let createdBy="";
    // let Startpremium="",Endpremium="";
    // if(this.Startpremium==undefined) Startpremium = null;
    // else if(this.Startpremium.includes(',')){ Startpremium = this.Startpremium.replace(/,/g, '') }
    // else Startpremium = this.Startpremium;
    // if(this.Endpremium==undefined) Endpremium = null;
    // else if(this.Endpremium.includes(',')){ Endpremium = this.Startpremium.replace(/,/g, '') }
    // else Endpremium = this.Startpremium;
    let ReqObj = {
      "PlanTypeId":this.plantypeid,
      "PlanTypeDescription":this.plantypeDetails.PlanTypeDescription,
      "BranchCode":this.branchvalue,
      "InsuranceId":this.insuranceId,
      "SectionId":this.sectionvalue,
      "ProductId":this.productId,
      "EffectiveDateStart":this.plantypeDetails.EffectiveDateStart,
        "Status":this.plantypeDetails.Status,
      "Remarks":this.plantypeDetails.Remarks,
      "RegulatoryCode":this.plantypeDetails.RegulatoryCode,
      "CoreAppCode":this.plantypeDetails.CoreAppCode,
      "CreatedBy":this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/insertplantype`;
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
            //         'EMI Details Inserted/Updated Successfully',
            //         'EMI Details',
            //         config);
                    this.router.navigate(['/Admin/PlanTypeMaster']);
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

