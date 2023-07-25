import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { productgroup } from './productgroup';

@Component({
  selector: 'app-productgroupdetails',
  templateUrl: './productgroupdetails.component.html',
  styleUrls: ['./productgroupdetails.component.scss']
})
export class ProductGroupDetails implements OnInit {
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
    productgroupDetails:any;
    sectionList:any[]=[];
    branchList:any[]=[];
    GroupId: any;
  
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
      this.productgroupDetails = new productgroup();
     
    }
    ngOnInit(): void {
  
      let EmiObj = JSON.parse(sessionStorage.getItem('PlanTypeId'));
      this.plantypeid=EmiObj?.PlanTypeId;
      if(this.plantypeid!=null && this.plantypeid!=undefined){
        
      }
      else{
        this.productgroupDetails = new productgroup();
        if(this.productgroupDetails?.Status==null)  this.productgroupDetails.Status = 'Y';
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
      "GroupId":this.GroupId,
     "ProductId":this.productId,
     "BranchCode":this.branchvalue,
      "CompanyId":this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}master/getproductgroupbyid`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res:any = data;
          if(res.Result){
            this.productgroupDetails = res.Result;
            if(this.productgroupDetails){
              if(this.productgroupDetails?.Status==null)  this.productgroupDetails.Status = 'N';
              if(this.productgroupDetails?.EffectiveDateStart!=null){
                this.productgroupDetails.EffectiveDateStart = this.onDateFormatInEdit(this.productgroupDetails?.EffectiveDateStart)
              }
              if(this.productgroupDetails?.EffectiveDateEnd!=null){
                this.productgroupDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.productgroupDetails?.EffectiveDateEnd)
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
            let EmiObj = JSON.parse(sessionStorage.getItem('ProductTypeId'));
            console.log('OOOOOOOOOOOOO',EmiObj)
            if(EmiObj){
             
              this.insuranceId=EmiObj?.InsuranceId;
              this.productId=EmiObj?.ProductId;
              this.branchvalue=EmiObj?.BranchCode;
              this.GroupId=EmiObj?.GroupId;
              }          
              this.getCompanyProductList();
              if(this.GroupId!=null && this.GroupId!=undefined){
                this.getEditplanDetails();
              }
          }
        },
        (err) => { },
      );
    }
    ongetBack(){
      this.router.navigate(['Admin/ProductGroupMaster']);
    }
    onProceed(){
        let productname:any;
        console.log('PPPPPPPPP',this.productId,this.productList)
      if(this.productId!=undefined && this.productId!=null && this.productId!=''){
        //let code = this.productItem
        let code = this.productList.find(ele=>ele.ProductId==this.productId)
        console.log('codes',code)
       productname=code.ProductName;
        //code.label

        //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
       }
      let ReqObj = {
        "GroupId":this.GroupId,
       "ProductId":this.productId,
       "BranchCode":this.branchvalue,
       "CompanyId":this.insuranceId,
       "GroupDesc":this.productgroupDetails.GroupDesc,
       "BandDesc":this.productgroupDetails.BandDesc,
       "GroupFrom":this.productgroupDetails.GroupForm,
       "GroupTo":this.productgroupDetails.GroupTo,
        "ProductName":productname,
      "EffectiveDateStart":this.productgroupDetails.EffectiveDateStart,
        "Status":this.productgroupDetails.Status,
        "CoreAppCode":this.productgroupDetails.CoreAppCode,
      "CreatedBy":this.loginId,
      "Remarks":this.productgroupDetails.Remarks
      }
      let urlLink = `${this.CommonApiUrl}master/insertproductgroup`;
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
                      this.router.navigate(['/Admin/ProductGroupMaster']);
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
  
