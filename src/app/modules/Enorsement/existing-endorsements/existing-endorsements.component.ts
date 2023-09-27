import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../app-config.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-existing-endorsements',
  templateUrl: './existing-endorsements.component.html',
  styleUrls: ['./existing-endorsements.component.css']
})
export class ExistingEndorsementsComponent {
  userDetails: any;loginId: any;
  agencyCode: any;brokerbranchCode: any;
  branchCode: any;productId: any;
  userType: any;insuranceId: any;
  policyNo: any;quoteHeader:any;
  quoteData:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public tempUrl: any = this.AppConfig.TempUrl;
  currencyCode: any;
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.policyNo = sessionStorage.getItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('endorseStartDate')
    sessionStorage.removeItem('homeCommonDetails')
  }
  ngOnInit(){
    this.quoteHeader = [
      { key: 'policyNo', display: 'Policy No' },
      { key: 'quoteNo', display: 'QuoteNo' },
      // { key: 'requestReferenceNo', display: 'ReferenceNo' },
      { key: 'endorsementCategoryDesc', display: 'Category' },
      { key: 'endorsementDesc', display: 'Type' },
      { key: 'overallPremiumLc', display: 'Endorsements Premium' },
      { key: 'endtPremium', display: 'Endorsement Premium' },
      //{ key: 'MinimumPremium', display: 'Minimum' },
      { key: 'endorsementStatus', display: 'EndorsementStatus' },
      {
        key: 'actions',
        display: 'Edit',
        config: {
          isEndorseEdit: true
        },
      },

    ]
    this.getExistingEndorsements();
  }
  getExistingEndorsements(){
    let ReqObj = {
      "PolicyNo": this.policyNo,
      "CompanyId": this.insuranceId,   
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}endorsment/datas`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log("Endorsement List",data);
          this.quoteData = data;
          if(this.quoteData.length!=0){
            this.currencyCode = this.quoteData[0].currency
            
          }
      },
      (err) => { },
    );
  }
  checkCreateEndorse(){
    return ((this.quoteData.length==0) || !this.quoteData.some(ele=>ele.endorsementStatus=='P' || (ele.endorsementStatus=='C' && ele.endorsementTypeId==842)))
  }
  onCreateEndorsement(){
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.setItem('endorseStartDate',this.quoteData[0].policyStartDate);
      this.router.navigate(['/Home/policies/Endorsements/endorsementTypes'])
  }
  onGetSchedule(rowData){
    console.log("Received Entry",rowData)
    let entry = rowData.data;
    let ReqObj = {
      "QuoteNo":entry.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile);
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }
  downloadMyFile(data) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data.PdfOutFilePath);
    link.setAttribute('download', 'Schedule');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  onEditCovers(rowData){
    let obj = {
      "EndtTypeId":rowData.endorsementTypeId,
      "FieldsAllowed":[],
      "EffectiveDate":rowData.effectiveDate,
      "Remarks":rowData.endorsementRemarks,
      "QuoteNo": rowData.quoteNo, 
      "PolicyNo": rowData.policyNo
    }
    sessionStorage.setItem('endorseStartDate',this.quoteData[0].policyStartDate);
    sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
    sessionStorage.setItem('quoteReferenceNo',rowData.requestReferenceNo)
    this.router.navigate(['/Home/policies/Endorsements/endorsementTypes'])
  }
  ongetBack(){
    let page =  sessionStorage.getItem('Pagefrom');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('endorseStartDate');
    if(page=='Otherendorsement'){
      sessionStorage.setItem('otherpolicy',this.policyNo);
      sessionStorage.setItem('otherpolicysearch','otherpolicysearch')
    }
    else if(page=='endorsement'){
      sessionStorage.setItem('otherpolicy',null);
      sessionStorage.setItem('otherpolicysearch','policysearch')
    }
  this.router.navigate(['/Home/policies'])
}
}
