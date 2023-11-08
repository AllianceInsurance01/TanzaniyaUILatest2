import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './body-type-list.component.html',
  styleUrls: ['./body-type-list.component.scss']
})
export class BodyTypeListComponent implements OnInit {

  tableData:any []=[];
  insuranceName: any;activeMenu="BodyType";
  public columnHeader: any[] = [];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1
  public BodyTypeId:any;
  public insuranceId:any;
  public BodyTypeData:any[]=[];SectionId:any;
  public branchList:any;branchValue:any;
  userDetails: any;
  insuranceList: any[]=[];
  insuranceTypeList: any[]=[];
  loginId: any;searchSection:boolean=false;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.BodyTypeId = sessionStorage.getItem('BodyId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      if(user.AttachedCompanies){
        if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
      }
      //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     }

  ngOnInit(): void {
    let obj = JSON.parse(sessionStorage.getItem('BodyId'))
    if(obj){
      this.branchValue = obj.BranchCode;
      this.SectionId = obj.SectionId
      this.insuranceId = obj.InsuranceId
    }
    this.columnHeader = [
      { key: 'BodyNameEn', display: 'Body Name' },
      { key: 'RegulatoryCode', display: 'Regulatory Code' },
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
        if(this.insuranceId){this.getBranchList('direct');}
        else{this.insuranceId='99999';this.getBranchList('direct')}
      }

    },
    (err) => { },
  );
}
getBranchList(type){
  if(type=='change'){this.BodyTypeData=[];this.branchValue=null;}
  let ReqObj = {
    "InsuranceId": this.insuranceId
  }
  let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      let obj = [{Code:"99999",CodeDesc:"ALL"}];
      this.branchList = obj.concat(data?.Result);
      if(!this.branchValue){ this.branchValue = "99999";  }
      this.getSectionTypeList();
    }
  },
  (err) => { },
);
}
getSectionTypeList(){
  let ReqObj = {
    "InsuranceId":this.insuranceId,
    "ProductId":"5",
    "SectionId":'10'
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.insuranceTypeList = obj.concat(data?.Result);
        if(!this.SectionId){ this.SectionId = "99999"; this.getExistingBodyType() }
        else{
          this.getExistingBodyType()
        }
      }
    },
    (err) => { },
  );
}
getExistingBodyType(){
  if(this.SectionId!=null && this.SectionId!=undefined && this.branchValue!=null && this.branchValue!=undefined){
    let ReqObj = {
      "SectionId":this.SectionId,
      "InsuranceId":this.insuranceId,
     "BranchCode":this.branchValue,
    }
    let urlLink = `${this.CommonApiUrl1}master/getallmotorbody`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.BodyTypeData = data?.Result;
            this.searchSection = true;
        }
      },
      (err) => { },
    );
  }
  
}
EditStatus(event){
  let ReqObj = {
    "BodyId": event.BodyId,
    "Status": event.ChangedStatus,
    "InsuranceId":this.insuranceId,
    "BranchCode":this.branchValue,
    "EffectiveDateStart":event.ChangedEffectiveDate

  }
  let urlLink = `${this.CommonApiUrl1}master/bodytype/changestatus`;
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
  onAddBody(){
    let ReqObj = {
      "BodyId": null,
      "BranchCode": this.branchValue,
      "SectionId": this.SectionId,
      "InsuranceId": this.insuranceId
    }
    sessionStorage.setItem('BodyId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/bodyTypeMaster/newBodyTypeDetails'])
  }

  onEditBody(event) {
    let ReqObj = {
      "BodyId": event.BodyId,
      "BranchCode": this.branchValue,
      "SectionId": this.SectionId,
      "InsuranceId": this.insuranceId
    }
    sessionStorage.setItem('BodyId', JSON.stringify(ReqObj));
    this.router.navigateByUrl('/Admin/bodyTypeMaster/newBodyTypeDetails');
  }
}
