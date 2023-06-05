import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-premia-config',
  templateUrl: './premia-config.component.html',
  styleUrls: ['./premia-config.component.scss']
})
export class PremiaConfigComponent implements OnInit {

  public activeMenu:any="Premia";
  public premiaConfigData:any[]=[];
  public columnHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  premiaList:any;
  insuranceId: string;
  productId: string;
  PreId: any;
  SectionValue: any;
  querykey: any;
  PremiaTableName: any;
  constructor(private router:Router,private sharedService:SharedService) {
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
  }

  ngOnInit(): void {
    this.columnHeader = [
      { key: 'ColumnName', display: 'Premia Table Name' },
      { key: 'InputColumn', display: 'InputColumn'},
      { key: 'DefaultYn', display: 'Default Yn' },
      { key: 'EffectiveDateStart', display: 'Effective Date'},
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.premiaConfigData =[
      /*{
        "ColumnName":"Name",
        "InputTable":"MOTOR_DATA_DETAILS",
        "DefaultYn":"Y",
        "CaseConditionYN":"N",
        "EffectiveDateStart":"21-01-2023",
        "Status":"Y",
        "actions":"ColumnName",
      }*/
    ]
    let PremObj = JSON.parse(sessionStorage.getItem('editPremiaId'));
    this.PreId=PremObj?.PremiaId,
    this.SectionValue=PremObj.SectionId;

    this.querykey=PremObj.QueryKey;
    this.PremiaTableName=PremObj.PremiaTableName

    console.log('ttttttttt',this.PremiaTableName);

    if(this.PreId){
      this.getallPremiaConfig()
    }
  }
  onAddSection(){
    let entry = {
      "PremiaId":this.PreId,
      "SectionId": this.SectionValue,
      "QueryKey": this.querykey,
      "PremiaTableName":this.PremiaTableName,
      "ColumnId":null
    }
    sessionStorage.setItem('editPremiaId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfigDataList'])
  }
  onBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
  }

  onEditSection(rowdata){
    let entry = {
      "PremiaId":this.PreId,
      "SectionId": this.SectionValue,
      "ColumnId":rowdata.ColumnId,
      "QueryKey": this.querykey,
      "PremiaTableName":this.PremiaTableName
    }
    sessionStorage.setItem('editPremiaId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList/premiaConfigDataList'])
  }

  getallPremiaConfig(){
    let ReqObj={
      "InsuranceId": this.insuranceId,
      "BranchCode":"99999",
      "PremiaId": this.PreId,
      "ProductId":this.productId,
      "SectionId":this.SectionValue
    }
let urlLink = `${this.CommonApiUrl}master/getallpremiaconfigdata`;

   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.premiaConfigData = data?.Result.PremiaConfigDataMasterListRes ;
            console.log('tttttttt',this.premiaConfigData);
            /*if(this.sectionValue!=undefined && this.sectionValue!=null){
              let docObj = {"Section":this.sectionValue};
              sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
            }*/
        }
      },
(err) => { },
);
  }
  // onRedirect(value){
  //   if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
  //   if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
  //   if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
  //   if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
  //   if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
  //   if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
  //   if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
  //   if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
  //   if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
  //   if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
  //   if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
  //   if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
  //   if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
  //   if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
  //   if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
  //   if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
  // }


}
