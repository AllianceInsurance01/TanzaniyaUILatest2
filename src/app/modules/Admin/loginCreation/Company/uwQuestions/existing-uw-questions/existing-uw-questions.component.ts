import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-existing-uw-questions',
  templateUrl: './existing-uw-questions.component.html',
  styleUrls: ['./existing-uw-questions.component.scss']
})
export class ExistingUwQuestionsComponent implements OnInit {

  public activeMenu:any='UwQues';
  questionData: any[]=[];
  columnHeader: any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;branchList:any[]=[];branchValue:any;
  productId: string;
  constructor(private router:Router,private sharedService: SharedService ,) {
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    this.columnHeader = [

      { key: 'UwQuestionDesc', display: 'Question' },
      { key: 'QuestionType', display: 'QuestionType' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
     // { key: 'InputTable', display: 'Input Table' },
      // { key: 'InputColumn', display: 'Input Column' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      // {
      //   key: 'actions',
      //   display: 'FactorTypeDetails',
      //   config: {
      //     isAdd: true,
      //   },
      // }
    ];
    //this.EditStatus(event);

  }


  ngOnInit(): void {
    this.getBranchList();
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getUWQuesList() }
      }
    },
    (err) => { },
  );
  }
  getUWQuesList(){
    let ReqObj = {
      "Limit":"0",
      "Offset":"100",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode" : this.branchValue
      }
      let urlLink = `${this.CommonApiUrl1}master/getalluwquestions`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
            if(res?.Result){
                this.questionData = res?.Result;
            }
          },
          (err) => { },
        );

  }
  onAddQuestion(){
    sessionStorage.removeItem('uwQuesId');
    this.router.navigate(['Admin/companyList/companyConfigure/productDetails/uwQuestionsList/updateUWQuestionDetails'])
  }
  EditStatus(event){

    console.log('tyuiop',event.ChangeEffectiveDate,event.ChangedStatus)
    let ReqObj = {
      "ProductId":this.productId,
      "UwQuestionId": event.UwQuestionId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "Status": event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/uwquestions/changestatus`;
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
                  this.getUWQuesList()
                  //this.router.navigate(['Admin/companyList/companyConfigure/productDetails/uwQuestionsList']);
                //window.location.reload()

        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList'])
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
  }
  onEditQues(rowData){
    if(rowData){
      let entry = {
        "UwQuestionId":rowData?.UwQuestionId,
        "BranchCode": this.branchValue
      }
      sessionStorage.setItem('uwQuesId',JSON.stringify(entry));
      this.router.navigate(['Admin/companyList/companyConfigure/productDetails/uwQuestionsList/updateUWQuestionDetails'])
    }

  }
}
