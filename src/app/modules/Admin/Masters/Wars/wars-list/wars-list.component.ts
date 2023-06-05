import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-wars-list',
  templateUrl: './wars-list.component.html',
  styleUrls: ['./wars-list.component.scss']
})
export class WarsListComponent implements OnInit {

  public tableData:any []=[];
  insuranceName: any;activeMenu="Wars";
  public columnHeader: any[] = [];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public WarRateId:any;
  public insuranceId:any;
  public branchList:any;branchValue:any;
  public WarsData:any;
  userDetails: any;
  productValue: any;
  productList: any;
  sectionYn: any='N';
  sectionList: any[];
  sectionValue: any;
  DocumentReferenceNo: any;
  constructor(private router:Router,private sharedService: SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.WarRateId =  sessionStorage.removeItem('BankCode');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     }

  ngOnInit(): void {
    sessionStorage.removeItem('WarsRateId')
    this.columnHeader = [
      { key: 'WarRateDesc', display: 'WarRate Description' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'EffectiveDateStart', display: 'Effective Date Start' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getBranchList();
    this.getCompanyProductList();
  }
  getBranchList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {

          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);
          if (!this.branchValue) { this.branchValue = "99999";}
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
       this.productList = data?.Result;
        let obj =[]
        this.productList = obj.concat(data?.Result)
        if(!this.productValue){ this.productValue = "5";
        this.getSectionList();this.getExistingWars(); }
        }

      },
      (err) => { },
    );
  }
  onAddSection(){
    let ReqObj = {
      "WarRateId": null,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
    }
    sessionStorage.setItem('WarRateId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/warsMaster/newWarsDetails'])
  }
  getExistingWars(){
    let ReqObj = {
      
      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      "WarRateId": this.WarRateId
    }
    let urlLink = `${this.CommonApiUrl1}master/getallwarrate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.WarsData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  public onEditSection(event) {
    let ReqObj = {
      "WarRateId": event.WarRateId,
      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      
    }
   console.log(this.DocumentReferenceNo)
    sessionStorage.setItem('WarRateId', JSON.stringify(ReqObj));
   this.router.navigateByUrl('/Admin/warsMaster/newWarsDetails');
  }
  EditStatus(event){
    let ReqObj = {
      "WarRateId":event.WarRateId,
      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchValue,
      "Status":event.ChangedStatus,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/warrate/changestatus`;
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
  onChangeSectionYn(){
    if(this.sectionYn!='Y'){
      this.sectionValue= '0';
     
    }
    else{
      this.sectionValue = null;
      this.WarsData = [];
      
    }
  }
  getSectionList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productValue,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.sectionList = obj.concat(data?.Result);
        console.log(this.sectionList);
        let secObj = JSON.parse(sessionStorage.getItem('WarRateId'))
        if(secObj){ this.sectionValue = secObj?.SectionId;
          console.log('',this.sectionValue);
          }
        this.sectionValue='0';
      }
    },
    (err) => { },
  );
  }
  onAddSectionList(){
    let ReqObj ={
    "WarrantyId":null,
      "BranchCode": this.branchValue,
      "ProductId":this.productValue,
     "SectionId":this.sectionValue
    }
    sessionStorage.setItem('ValueGet', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/warsMaster/addWarsDetails'])
  }
}
