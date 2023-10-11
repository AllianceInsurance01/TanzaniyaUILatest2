import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
import { NewSubCoverDetailsComponent } from '../../../default-configuration/new-sub-cover-details/new-sub-cover-details.component';

@Component({
  selector: 'app-sub-cover-details',
  templateUrl: './sub-cover-details.component.html',
  styleUrls: ['./sub-cover-details.component.scss']
})
export class SubCoverDetailsComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any='SubCover';itemList:any[]=[];itemValue="";
  productId: string;
  constructor(private router:Router,public dialogService: MatDialog,) { 
    this.productId =  sessionStorage.getItem('companyProductId');
  }

  ngOnInit(): void {
    this.itemList = [
      {"Code":"","CodeDescription":"ALL"}
    ]
    this.columnHeader = [
      { key: 'SubCoverName', display: 'SubCover Name' },
      { key: 'SectionName', display: 'Section Name' },
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'EffectiveDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.tableData = [
      {
        "SubCoverId":"1",
        "InsuranceId":"100002",
        "SubCoverName":"Alt SubCover2",
        "SectionName":"All Risk",
        "CoverName":"Health",
        "SubCoverDesc":"Alt SubCover2 Desc",
        "CoreAppCode":"1",
        "Remarks":"Ok",
        "Status":"Y",
        "AmendId":"01",
        "EffectiveDate":"16/9/2022"
      },
      {
        "SubCoverId":"2",
        "InsuranceId":"100003",
        "SubCoverName":"Content SubCover2",
        "SectionName":"All Risk",
        "CoverName":"Accident",
        "SubCoverDesc":"Content SubCover2 Desc",
        "CoreAppCode":"2",
        "Remarks":"Ok",
        "Status":"Y",
        "AmendId":"01",
        "EffectiveDate":"16/9/2022"
      }
    ]
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
  }
  onAddSubCovers(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails/addNewSubCover']);
  }
  onEditSubCover(){
    /*this.dialogService.open(NewSubCoverDetailsComponent, {
      context: {
        title: 'SubCover Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewSubCoverDetailsComponent,{
      data: {
        title: 'SubCover Details'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

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
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
    if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
    if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
  }

}
