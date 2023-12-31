import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-issuer-list',
  templateUrl: './issuer-list.component.html',
  styleUrls: ['./issuer-list.component.scss']
})
export class IssuerListComponent implements OnInit {

  issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
  insuranceId:any;userDetails:any;subUserType:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  productId: string;
  loginId: any;
  constructor(private router:Router,private sharedService:SharedService,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.loginId = user.LoginId;
    let insurance = sessionStorage.getItem('issuerInsuranceId');
    if(insurance){
      this.insuranceId = insurance;
    }
    else this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');

    this.subUserType = sessionStorage.getItem('typeValue');
    this.getInsuranceList();
  }

  ngOnInit(): void {
  }
  getInsuranceList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    let ReqObj ={
      "BrokerCompanyYn": "N",
      "LoginId": this.loginId
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.companyList = data.Result;
            if(this.insuranceId) this.getIssuerList();

        }
      },
      (err) => { },
    );
   }
  getIssuerList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "UserType": "Issuer",
      "SubUserType":"",
      "Limit":"0",
      "Offset":"100"
      }
      let urlLink = `${this.CommonApiUrl}admin/getallissuers`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.issuerHeader = [
              { key: 'UserName', display: 'Issuer Name' },
              { key: 'LoginId', display: 'LoginID' },
              { key: 'UserMail', display: 'MailID' },
              { key: 'UserMobile', display: 'Mobile No' },
              { key: 'EntryDate', display: 'Created Date' },
              // { key: 'CreatedBy', display: 'Created By' },
              { key: 'Status', display: 'Status' },
              {
                key: 'actions',
                display: 'Action',
                config: {
                  isEdit: true,
                },
              },
            {
              key: 'configure',
              display: 'Configure',
              config: {
                isConfigure: true,
              },
            },
            ];
            this.issuerData = data.Result;
          }
        },
        (err) => { },
      );
  }
  onAddNew(){
    sessionStorage.removeItem('editIssuerLoginId');
    sessionStorage.setItem('issuerInsuranceId',this.insuranceId);
    this.router.navigate(['/Admin/issuerList/newIssuerDetails'])
  }
  onEdit(rowData){

    sessionStorage.setItem('issuerInsuranceId',rowData.InsuranceId);
      sessionStorage.setItem('editIssuerLoginId',rowData.LoginId);
      sessionStorage.setItem('ReferralId',rowData.ReferralIds);
      this.router.navigate(['/Admin/issuerList/newIssuerDetails'])
  }
  EditStatus(event){

    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "FactorTypeId":event.FactorTypeId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate,
      "NotifTemplateCode":event.NotifTemplateCode,
      //"CreatedBy":this.loginId,

    }
    let urlLink = `${this.ApiUrl1}master/notitemplete/changestatus`;
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
                  //this.getExistingNotification()
                //window.location.reload()
        }
      },
      (err) => { },
    );
    //console.log("Status Changed",event)
}
onConfigure(rowData:any){
  console.log('OOOOOOOOOOOO',rowData);
  sessionStorage.setItem('issuerInsuranceId',rowData.InsuranceId);
  sessionStorage.setItem('editIssuerLoginId',rowData.LoginId);
  sessionStorage.setItem('ReferralId',rowData.ReferralIds);
  let entry = {
    "issuerType":rowData.SubUserType,
    "loginId":rowData.LoginId,
    "InsuranceId": rowData.InsuranceId,
    "IssuerType":rowData.SubUserType
  }
  sessionStorage.setItem('issuerTypeDetails',JSON.stringify(entry));
  if(rowData.SubUserType=='high' || rowData.SubUserType == 'both'){
    this.router.navigate(['/Admin/issuerList/productReferralConfguration']);
  }
  else{
    this.router.navigate(['/Admin/issuerList/issuerMenuCongifuration']);
  }
  
  //this.router.navigate(['/Admin/issuerList/issuerMenuCongifuration']);
}

}
