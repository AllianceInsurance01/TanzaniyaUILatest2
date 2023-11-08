import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  tableData:any []=[];
  insuranceName: any;activeMenu="Bank";
  public columnHeader: any[] = [];
  public insuranceId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public BankData:any []=[];
  public branchList:any;branchValue:any;
  userDetails:any;
  companyId: any=null;
  insuranceList: { Code: string; CodeDesc: string; }[];
  loginId: any;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');

      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      if(user.AttachedCompanies){
        if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
      }
      //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     }

  ngOnInit(): void {
    let bankObj = JSON.parse(sessionStorage.getItem('BankCode'))
    if(bankObj!=undefined && bankObj!=null && bankObj!="undefined"){
      this.companyId = bankObj?.CompanyId;
      this.branchValue = bankObj?.BranchCode
    }
    else this.companyId = this.insuranceId
    this.columnHeader = [
      { key: 'BankFullName', display: 'Bank Full Name' },
      { key: 'BankShortName', display: 'Bank Short Name' },
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
    this.getCompanyList();
}
createHyperLink(params): any {
  if (!params.data) { return; }
  const spanElement = document.createElement('span');
  spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
  spanElement.addEventListener('click', ($event) => {
    $event.preventDefault();
    // The below code is used to navigate from one page to another page in angular. you can change it          // according to your requirement.
    this.router.navigate([this.homeUrl]);
  });
  return spanElement;
}

get homeUrl(): string {
  return 'home';
}
getCompanyList(){
  let ReqObj = {
    "BrokerCompanyYn":"",
    "LoginId": this.loginId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
        this.insuranceList = defaultObj.concat(data.Result);
        if(this.companyId) this.getBranchList('direct');
      }

    },
    (err) => { },
  );
}
getBranchList(type){
  if(type=='change'){
    this.branchValue = null;
    this.BankData = [];
  }
 
  let ReqObj = {
    "InsuranceId": this.companyId
  }
  let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      let obj = [{Code:"99999",CodeDesc:"ALL"}];
      this.branchList = obj.concat(data?.Result);
      if(!this.branchValue){ this.branchValue = "99999"; this.getExistingBank() }
      else{this.getExistingBank()}
    }
  },
  (err) => { },

);
}
  onAddSection(){
    let ReqObj = {
      "BankCode" :null,
      "BranchCode": this.branchValue,
      "CompanyId": this.companyId
    }
    sessionStorage.setItem('BankCode',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/bankMaster/newBankDetails'])
  }
  onEditSection(event){
    let ReqObj = {
      "BankCode" :event.BankCode,
      "BranchCode": this.branchValue,
      "CompanyId": this.companyId
    }
    sessionStorage.setItem('BankCode',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/bankMaster/newBankDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "InsuranceId":this.companyId,
      "BranchCode":this.branchValue,
      "BankCode" :event.BankCode,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/bank/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
          /*let type: NbComponentStatus = 'success';
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
                window.location.reload()*/
        }
      },
      (err) => { },
    );
  }
  getExistingBank(){
    let ReqObj = {
      "InsuranceId": this.companyId,
      "BranchCode":this.branchValue,
    }
    let urlLink = `${this.CommonApiUrl1}master/getallbankdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.BankData = data?.Result;
        }
      },
      (err) => { },
    );
  }

}
