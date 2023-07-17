import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-plantypelist',
  templateUrl: './plantypelist.component.html',
  styleUrls: ['./plantypelist.component.scss']
})
export class PlanTypeListComponent implements OnInit {
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
    insuranceList: { InsuranceId: string; CompanyName: string; }[];
    constructor(private router:Router,private sharedService: SharedService,
      private datePipe:DatePipe) {
        this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
        this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        const user = this.userDetails?.Result;
        // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
  
       }
  ngOnInit(): void {
    // sessionStorage.removeItem('EmiId')
    this.columnHeader = [
      { key: 'PlanTypeDescription', display: 'PlanType Description' },
      { key: 'RegulatoryCode', display: 'RegulatoryCode' },
      { key: 'CoreAppCode', display: 'CoreAppCode' },
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
  onAddSection(){
    let ReqObj = {
      "PlanTypeId":null,
      "InsuranceId":this.insuranceId,
       "BranchCode":this.branchValue,
       "ProductId":this.productValue,
       "SectionId":this.sectionValue,
  }
    sessionStorage.setItem('PlanTypeId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/PlanTypeMaster/plantypeDetails'])
  }

  getBranchList(type){
    if(type=='change'){this.tableData=[];this.branchValue=null;this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
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
//   onChangeSectionYn(){
//    if(this.sectionYn!='Y'){
//       this.sectionValue= '99999';
//     }
//     else{
//       this.sectionValue = null;
//       this.ClausesData = [];

//     }
//   }
  getCompanyProductList(type){
    if(type=='change'){this.tableData=[];this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
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
       let docObj = JSON.parse(sessionStorage.getItem('addnewObj'));
       console.log('IIIIIIIIIIII',docObj)
      
       if(docObj){
        this.productValue=docObj?.ProductId;
      this.getSectionList();
       }
       else{ this.productValue='5'; this.getSectionList();}
      //  if(!this.productValue){ this.productValue = "5";
      //  this.getSectionList();
      //  this.getExistingClauses() }
       }

      },
      (err) => { },
    );
  }
  getExistingClauses(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
     "BranchCode":this.branchValue,
     "ProductId":this.productValue,
     "SectionId":this.sectionValue
    }
    let urlLink = `${this.ApiUrl1}master/getallplantype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.tableData = data?.Result;
            if(this.insuranceId!=undefined && this.insuranceId!=null){
              let docObj = {"BranchCode":this.branchValue,"InsuranceId":this.insuranceId,"ProductId":this.productValue,
              "SectionId":this.sectionValue};
              sessionStorage.setItem('addnewObj',JSON.stringify(docObj));
            }
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
          let docObj = JSON.parse(sessionStorage.getItem('addnewObj'));
          if(docObj){
            this.insuranceId = docObj?.InsuranceId;
          console.log('iiiiiiiii',this.insuranceId);
          this.branchValue=docObj?.BranchCode;
          this.getBranchList('direct'); this.getCompanyProductList('direct');
          }
         else{
          this.getBranchList('direct'); this.getCompanyProductList('direct');
         }
         
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
        let docObj = JSON.parse(sessionStorage.getItem('addnewObj'));
        console.log('IIIIIIIIIIII',docObj)
        if(docObj){
          // this.insuranceId = docObj?.InsuranceId;
          // console.log('iiiiiiiii',this.insuranceId);
          // this.branchValue=docObj?.BranchCode;
          // this.productValue=docObj?.ProductId;
          this.sectionValue=docObj?.SectionId;
          this.getExistingClauses();
       }
       else{
        this.sectionValue=null;
        this.getExistingClauses();
       }
        
    //     let secObj = JSON.parse(sessionStorage.getItem('ClausesId'))
    //     if (secObj) {
    //       this.sectionValue = secObj?.SectionId;
    //     }
    //    else {
    //     this.sectionValue = '99999';
    //    }
      }
    },
    (err) => { },
  );
  }
  onEditSection(rowdata) {

    let ReqObj = {
        "PlanTypeId":rowdata.PlanTypeId,
       "InsuranceId":this.insuranceId,
        "BranchCode":this.branchValue,
        "ProductId":this.productValue,
        "SectionId":this.sectionValue,

    }
    sessionStorage.setItem('PlanTypeId', JSON.stringify(ReqObj));
    this.router.navigateByUrl('/Admin/PlanTypeMaster/plantypeDetails');
  }

  onAddSectionList(){
    let ReqObj = {
        "PlanTypeId":null,
        "InsuranceId":this.insuranceId,
         "BranchCode":this.branchValue,
         "ProductId":this.productValue,
         "SectionId":this.sectionValue,
    }
    sessionStorage.setItem('PlanTypeId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/PlanTypeMaster/plantypeDetails']);
  }
}
