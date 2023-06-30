import { SubCover } from './../new-cover-details/SubCover';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-cover-details',
  templateUrl: './cover-details.component.html',
  styleUrls: ['./cover-details.component.scss']
})
export class CoverDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any='Cover';loginId:any;
  insuranceName:any;insuranceId:any;productId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  sectionValue: any;
  sectionList: any;
  SubCoverYn='N';
  Sub:any;
  isConfigue:any="false";
  constructor(private router:Router,private sharedService: SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.getSectionList();
  }

  ngOnInit(): void {
    this.columnHeader = [
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'CoverDesc', display: 'Cover Desc' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'SubCoverYn',
        display: 'CoverRating',
        config: {
          isCoverRatingEdit:true,
        },
      },
      {
        key:'SubCover',
        display:'SubCoverRating',
        config:
        {
          isSubCoverRatingEdit:true,
        },
      }
      /*{
        key: 'configure',
        display: 'Rating',
          config: {
            isConfigure: true,
          },

        /*config: {
          isConfigure: true,
        },

      },*/
    ];
    //this.getCoversList();


  }
  getSectionList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.sectionList = data.Result;
          let sectionValue = sessionStorage.getItem('companySectionId');
          if(sectionValue){
            this.sectionValue = sectionValue;
            this.getCoversList();
          }
          else if(this.sectionList.length!=0){
            this.sectionValue = this.sectionList[0].Code;
            this.getCoversList();
          }
        }

        },
        (err) => { },
      );
  }
  getCoversList(){
    let ReqObj = {
      "Limit":"",
      "Offset":"100",
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId":this.sectionValue
    }
    let urlLink = `${this.ApiUrl1}master/getallsectioncoverdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            sessionStorage.setItem('companySectionId',this.sectionValue);
            this.tableData = data.Result;
        }
        if(this.SubCoverYn=='N')
        {

        }

      },
      (err) => { },
    );
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
  }
  onAddCovers(){
    sessionStorage.removeItem('companyCoverId');
    sessionStorage.removeItem('ratingSection');
    sessionStorage.removeItem('SubCoverEdit');
    sessionStorage.setItem('companySectionId',this.sectionValue);
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails/addNewCover']);
  }
  onCoverRatingEdit(rowData){
    // this.dialogService.open(NewCoverDetailsComponent, {
    //   context: {
    //     title: 'Cover Details'
    //   },
    // });
    sessionStorage.setItem('companyCoverId',rowData.CoverId);
    sessionStorage.removeItem('ratingSection');
   sessionStorage.removeItem('SubCoverEdit');
   sessionStorage.setItem('companySectionId',this.sectionValue);

    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails/updateCoverDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "CoverId":event.CoverId,
      "SectionId":this.sectionValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate

    }
    let urlLink = `${this.ApiUrl1}master/sectioncover/changestatus`;
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
                  this.getCoversList()
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }

  onEditCover(rowData){
    console.log("rating edit",rowData);
    sessionStorage.removeItem('companyCoverId')
   sessionStorage.removeItem('SubCoverEdit');
   sessionStorage.setItem('companySectionId',this.sectionValue);
    sessionStorage.setItem('ratingSection',rowData.CoverId);
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails/updateCoverDetails'])
  }
  onSubCoverRatingEdit(rowData)
  {
    console.log("SubCover Edit",rowData)
   sessionStorage.setItem("SubCoverEdit",rowData.CoverId);
   sessionStorage.removeItem('companyCoverId')
   sessionStorage.removeItem('ratingSection');
   sessionStorage.setItem('companySectionId',this.sectionValue);

   this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails/updateCoverDetails'])

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
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit'])
  }
}
