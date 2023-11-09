import { Insurance } from './../../../loginCreation/Company/new-company-details/insuranceModal';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json'

@Component({
  selector: 'app-clauses-list',
  templateUrl: './clauses-list.component.html',
  styleUrls: ['./clauses-list.component.scss']
})
export class ClausesListComponent implements OnInit {

  public tableData:any []=[];
  CountryList:any;
  CountryValue:any;
  insuranceName: any;activeMenu="Clauses";
  public columnHeader: any[] = [];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public ClausesId:any;
  public insuranceId:any;
  public ClausesData:any;sectionYn:any='N';
  public branchList:any;branchValue:any;
  BranchCode: any;productList:any;productValue:any;
  userDetails: any;
  sectionValue: any;
  sectionList: any[];
  insuranceList: { Code: string; CodeDesc: string; }[];
  loginId: any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;

     }

  ngOnInit(): void {

    this.columnHeader = [
      { key: 'ClausesDescription', display: 'Clauses Description' },
      { key: 'CoreAppCode', display: 'CoreAppCode' },
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
    let obj =  JSON.parse(sessionStorage.getItem('ClausesId'));
      if(obj){
        this.branchValue=obj.BranchCode
        this.productValue=obj.ProductId
        this.sectionValue=obj.SectionId
        this.insuranceId=obj.InsuranceId
        if(this.sectionValue=='99999'){
          this.sectionYn='N'
        }
        else{
          this.sectionYn='Y'
        }
      }
      this.getCompanyList();
      //sessionStorage.removeItem('ClausesId')
    // this.getBranchList();
    // this.getCompanyProductList();
  }
  onAddSection(){
    let ReqObj = {
      "ClausesId":null,
       "InsuranceId":this.insuranceId,
       "BranchCode": this.branchValue,
       "ProductId": this.productValue,
       "SectionId": this.sectionValue,
    }
    sessionStorage.setItem('ClausesId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/clausesMaster/newClausesDetails'])
  }

  getBranchList(type){
    if(type=='change'){this.ClausesData=[];this.branchValue=null;this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList('change')}
      }
    },
    (err) => { },
  );
  }
  onChangeSectionYn(){
   if(this.sectionYn!='Y'){
      this.sectionValue= '99999';
    }
    else{
      this.sectionValue = null;
      this.ClausesData = [];

    }
  }
  getCompanyProductList(type){
    if(type=='change'){this.ClausesData=[];this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
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
       this.productList = obj.concat(data?.Result);
       let docObj = JSON.parse(sessionStorage.getItem('ClausesId'))
       if(docObj){ this.sectionValue = docObj?.SectionId;
         this.productValue = docObj?.ProductId;
         console.log('LLLLLLLLLL',this.sectionValue);
         this.getSectionList(); this.getExistingClauses()  }
       else{ this.productValue='5'; this.getSectionList(); this.getExistingClauses()  }
      //  if(!this.productValue){ this.productValue = "5";
      //  this.getSectionList();
      //  this.getExistingClauses() }
       }

      },
      (err) => { },
    );
  }
  getExistingClauses(){

    if(this.sectionYn=='N'){
      //this.productValue="99999";
      this.sectionValue="99999"
    }
    let ReqObj = {
      "InsuranceId":this.insuranceId,
     "BranchCode":this.branchValue,
     "ProductId":this.productValue,
     "SectionId":this.sectionValue
    }
    let urlLink = `${this.CommonApiUrl1}master/getallclauses`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ClausesData = data?.Result;
        }
      },
      (err) => { },
    );
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
          let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId){this.getBranchList('direct'); this.getCompanyProductList('direct');}
          else{this.insuranceId='99999';this.getBranchList('direct'); this.getCompanyProductList('direct');}
        }
  
      },
      (err) => { },
    );
  }
  EditStatus(event){
    let ReqObj = {
      "ClausesId":event.ClausesId,
      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchValue,
      "ProductId": this.productValue,
      "SectionId":this.sectionValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/clauses/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        /*if(data.Result){
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
                  'Status Changed Successfully',
                  'Status Updated',
                  config);
                window.location.reload()
        }*/
      },
      (err) => { },
    );
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
        let secObj = JSON.parse(sessionStorage.getItem('ClausesId'))
        if (secObj) {
          this.sectionValue = secObj?.SectionId;
        }
       else {
        this.sectionValue = '99999';
       }
      }
    },
    (err) => { },
  );
  }
  onEditClauses(rowdata) {

    let ReqObj = {
      "ClausesId":rowdata.ClausesId,
       "InsuranceId":this.insuranceId,
        "BranchCode":this.branchValue,
        "ProductId":this.productValue,
        "SectionId":this.sectionValue,

    }
    sessionStorage.setItem('ClausesId', JSON.stringify(ReqObj));
    this.router.navigateByUrl('/Admin/clausesMaster/newClausesDetails');
  }

  onAddSectionList(){
    let ReqObj = {
      "ClausesId":null,
       "InsuranceId":this.insuranceId,
        "BranchCode":this.branchValue,
        "ProductId":this.productValue,
        "SectionId":this.sectionValue,
    }
    sessionStorage.setItem('ClausesIdValue', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/clausesMaster/AddClausesDetails'])
  }
}
